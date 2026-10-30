-- Campaign Finance: one shared party fund per campaign, a ledger of every change, payout percentages,
-- and the two functions that move money safely.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/campaigns.sql and docs/time-tracker.sql to have been run first.

CREATE TABLE IF NOT EXISTS party_fund (
  campaign_id UUID PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
  balance BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS party_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_id UUID,
  user_name TEXT,
  kind TEXT NOT NULL,            -- deposit, withdraw, disbursement, income, expense, reverse
  category TEXT,                 -- Passenger, Freight, Cargo, Mission, General, Maintenance Period, ...
  note TEXT,
  amount BIGINT NOT NULL,        -- the change to the party fund (negative = money out)
  balance_after BIGINT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,   -- who got what: { players: [{id, name, amount}], gross, pct, ... }
  reversed_by UUID
);

CREATE TABLE IF NOT EXISTS party_settings (
  campaign_id UUID PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
  pct_passenger INTEGER NOT NULL DEFAULT 50,
  pct_freight INTEGER NOT NULL DEFAULT 50,
  pct_cargo INTEGER NOT NULL DEFAULT 50,
  pct_mission INTEGER NOT NULL DEFAULT 50
);

-- Cargo sales are banked into the fund once; this remembers which ledger entry took each one.
ALTER TABLE spacecraft_trade_log ADD COLUMN IF NOT EXISTS banked_ledger_id UUID;
-- Part-payments toward the current 28-day maintenance period (Time Tracker).
ALTER TABLE campaign_time ADD COLUMN IF NOT EXISTS period_paid BIGINT NOT NULL DEFAULT 0;

ALTER TABLE party_fund ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_settings ENABLE ROW LEVEL SECURITY;

-- Everyone logged in can read the fund and ledger. Only the functions below can change them.
DROP POLICY IF EXISTS party_fund_read ON party_fund;
CREATE POLICY party_fund_read ON party_fund FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS party_ledger_read ON party_ledger;
CREATE POLICY party_ledger_read ON party_ledger FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS party_settings_all ON party_settings;
CREATE POLICY party_settings_all ON party_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Move money. Changes the fund, any players' Cash on Hand and writes the ledger line as ONE step, so the
-- numbers can never drift apart. Runs with owner rights because players are not allowed to edit each other's
-- characters directly. Refuses to take the fund (or anyone's cash) below zero.
CREATE OR REPLACE FUNCTION party_apply(
  p_campaign UUID, p_kind TEXT, p_category TEXT, p_note TEXT,
  p_fund_delta BIGINT, p_players JSONB DEFAULT '[]'::jsonb, p_details JSONB DEFAULT '{}'::jsonb
) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  bal BIGINT; new_bal BIGINT; pl JSONB; led UUID; uname TEXT; cash NUMERIC; cname TEXT;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not logged in'; END IF;
  INSERT INTO party_fund (campaign_id, balance) VALUES (p_campaign, 0) ON CONFLICT (campaign_id) DO NOTHING;
  SELECT balance INTO bal FROM party_fund WHERE campaign_id = p_campaign FOR UPDATE;
  new_bal := bal + p_fund_delta;
  IF new_bal < 0 THEN
    RAISE EXCEPTION 'Not enough in the party fund: it holds Cr% and this needs Cr%', bal, -p_fund_delta;
  END IF;
  FOR pl IN SELECT * FROM jsonb_array_elements(COALESCE(p_players, '[]'::jsonb)) LOOP
    UPDATE characters SET cash_on_hand = COALESCE(cash_on_hand, 0) + (pl->>'amount')::BIGINT
     WHERE id = (pl->>'id')::UUID AND campaign_id = p_campaign
     RETURNING cash_on_hand, name INTO cash, cname;
    IF NOT FOUND THEN RAISE EXCEPTION 'A character in this payout is not in this campaign'; END IF;
    IF cash < 0 THEN RAISE EXCEPTION '% would go below zero cash on hand', cname; END IF;
  END LOOP;
  UPDATE party_fund SET balance = new_bal, updated_at = now() WHERE campaign_id = p_campaign;
  SELECT COALESCE(raw_user_meta_data->>'display_name', email) INTO uname FROM auth.users WHERE id = auth.uid();
  INSERT INTO party_ledger (campaign_id, user_id, user_name, kind, category, note, amount, balance_after, details)
  VALUES (p_campaign, auth.uid(), uname, p_kind, p_category, p_note, p_fund_delta, new_bal,
          COALESCE(p_details, '{}'::jsonb) || jsonb_build_object('players', COALESCE(p_players, '[]'::jsonb)))
  RETURNING id INTO led;
  RETURN led;
END $$;

-- Undo an entry by adding an equal and opposite one (history is never deleted).
CREATE OR REPLACE FUNCTION party_reverse(p_ledger UUID) RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE r party_ledger; inv JSONB; led UUID;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not logged in'; END IF;
  SELECT * INTO r FROM party_ledger WHERE id = p_ledger FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Ledger entry not found'; END IF;
  IF r.reversed_by IS NOT NULL THEN RAISE EXCEPTION 'That entry has already been reversed'; END IF;
  IF r.kind = 'reverse' THEN RAISE EXCEPTION 'A reversal cannot be reversed'; END IF;
  SELECT COALESCE(jsonb_agg(jsonb_build_object('id', e->>'id', 'name', e->>'name', 'amount', -((e->>'amount')::BIGINT))), '[]'::jsonb)
    INTO inv FROM jsonb_array_elements(COALESCE(r.details->'players', '[]'::jsonb)) e;
  led := party_apply(r.campaign_id, 'reverse', r.category, 'Reversal of: ' || COALESCE(r.note, r.kind), -r.amount, inv,
                     jsonb_build_object('reversal_of', r.id));
  UPDATE party_ledger SET reversed_by = led WHERE id = r.id;
  UPDATE spacecraft_trade_log SET banked_ledger_id = NULL WHERE banked_ledger_id = r.id;
  RETURN led;
END $$;

REVOKE ALL ON FUNCTION party_apply(UUID, TEXT, TEXT, TEXT, BIGINT, JSONB, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION party_reverse(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION party_apply(UUID, TEXT, TEXT, TEXT, BIGINT, JSONB, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION party_reverse(UUID) TO authenticated;
