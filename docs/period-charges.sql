-- Itemised ship expenses: every 28-day period adds a charge line per ship per expense (mortgage, maintenance,
-- life support, salaries, berthing, other). Lines stay "due" until paid from the party fund (Time Tracker).
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/campaigns.sql, docs/time-tracker.sql and docs/campaign-finance.sql to have been run first.

CREATE TABLE IF NOT EXISTS period_charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  ship_id UUID NOT NULL REFERENCES spacecraft(id) ON DELETE CASCADE,
  ship_name TEXT,
  period_abs INTEGER NOT NULL,          -- the campaign day number on which this period's bills fell due
  kind TEXT NOT NULL,                   -- mortgage, maintenance, life_support, salaries, berthing, other
  amount BIGINT NOT NULL,
  status TEXT NOT NULL DEFAULT 'due',   -- due or paid
  paid_at TIMESTAMPTZ,
  paid_by UUID,
  paid_ledger_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (ship_id, period_abs, kind)
);

-- The campaign day up to which charge lines have been created.
ALTER TABLE campaign_time ADD COLUMN IF NOT EXISTS charged_through_abs INTEGER;

ALTER TABLE period_charges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS period_charges_read ON period_charges;
CREATE POLICY period_charges_read ON period_charges FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS period_charges_insert ON period_charges;
CREATE POLICY period_charges_insert ON period_charges FOR INSERT TO authenticated WITH CHECK (true);
-- Marking a line paid happens only through charges_pay() below.

-- Pay the chosen lines from the party fund in one step. Any life support still due for the ships and periods
-- involved is always added (it cannot be skipped). Lines that were already paid are ignored, so two people
-- clicking at once cannot pay the same bill twice. Mortgage lines also reduce the ship's Mortgage Remaining.
CREATE OR REPLACE FUNCTION charges_pay(p_campaign UUID, p_ids UUID[], p_note TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  ids UUID[]; total BIGINT; cnt INTEGER; led UUID; lines JSONB;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not logged in'; END IF;

  SELECT array_agg(DISTINCT c.id) INTO ids FROM period_charges c
   WHERE c.campaign_id = p_campaign AND c.status = 'due'
     AND (c.id = ANY(p_ids)
          OR (c.kind = 'life_support' AND EXISTS (
                SELECT 1 FROM period_charges s
                 WHERE s.id = ANY(p_ids) AND s.ship_id = c.ship_id AND s.period_abs = c.period_abs)));
  IF ids IS NULL THEN RETURN jsonb_build_object('paid', 0, 'total', 0); END IF;

  PERFORM 1 FROM period_charges WHERE id = ANY(ids) FOR UPDATE;
  SELECT COALESCE(SUM(amount), 0), COUNT(*), array_agg(id) INTO total, cnt, ids
    FROM period_charges WHERE id = ANY(ids) AND status = 'due';
  IF cnt = 0 THEN RETURN jsonb_build_object('paid', 0, 'total', 0); END IF;

  SELECT jsonb_agg(jsonb_build_object('ship', ship_name, 'kind', kind, 'amount', amount, 'period', period_abs)
                   ORDER BY period_abs, ship_name, kind)
    INTO lines FROM period_charges WHERE id = ANY(ids);

  led := party_apply(p_campaign, 'expense', 'Ship Expenses', COALESCE(p_note, 'Ship expenses'),
                     -total, '[]'::jsonb, jsonb_build_object('lines', lines));

  UPDATE period_charges SET status = 'paid', paid_at = now(), paid_by = auth.uid(), paid_ledger_id = led
   WHERE id = ANY(ids);

  UPDATE spacecraft s
     SET mortgage_remaining = GREATEST(0, COALESCE(s.mortgage_remaining, s.mortgage_value, 0) - m.amt / 1000000.0)
    FROM (SELECT ship_id, SUM(amount) AS amt FROM period_charges
           WHERE id = ANY(ids) AND kind = 'mortgage' GROUP BY ship_id) m
   WHERE s.id = m.ship_id;

  RETURN jsonb_build_object('paid', cnt, 'total', total, 'ledger', led);
END $$;

REVOKE ALL ON FUNCTION charges_pay(UUID, UUID[], TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION charges_pay(UUID, UUID[], TEXT) TO authenticated;
