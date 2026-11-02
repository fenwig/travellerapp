-- Attitudes (Pirates of Drinax): port attitudes, Standing with the Imperium and the Hierate, and a log of every change.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/campaigns.sql to have been run first.

CREATE TABLE IF NOT EXISTS port_attitudes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  sector TEXT NOT NULL,
  world TEXT NOT NULL,
  hex TEXT,
  attitude TEXT NOT NULL DEFAULT 'Neutral',   -- Haven, Friendly, Tolerant, Neutral, Suspicious, Unfriendly, Hostile
  note TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (campaign_id, world)
);

CREATE TABLE IF NOT EXISTS standing (
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  power TEXT NOT NULL,                         -- Imperium or Hierate
  value INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (campaign_id, power)
);

CREATE TABLE IF NOT EXISTS attitude_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  user_name TEXT,
  kind TEXT NOT NULL,                          -- port or standing
  subject TEXT NOT NULL,                       -- world name, or Imperium / Hierate
  old_value TEXT,
  new_value TEXT,
  note TEXT,
  details JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE port_attitudes ENABLE ROW LEVEL SECURITY;
ALTER TABLE standing ENABLE ROW LEVEL SECURITY;
ALTER TABLE attitude_log ENABLE ROW LEVEL SECURITY;

-- Everyone logged in can read; only the GM account can change anything.
DROP POLICY IF EXISTS port_attitudes_read ON port_attitudes;
CREATE POLICY port_attitudes_read ON port_attitudes FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS port_attitudes_gm ON port_attitudes;
CREATE POLICY port_attitudes_gm ON port_attitudes FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));

DROP POLICY IF EXISTS standing_read ON standing;
CREATE POLICY standing_read ON standing FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS standing_gm ON standing;
CREATE POLICY standing_gm ON standing FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));

DROP POLICY IF EXISTS attitude_log_read ON attitude_log;
CREATE POLICY attitude_log_read ON attitude_log FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS attitude_log_gm ON attitude_log;
CREATE POLICY attitude_log_gm ON attitude_log FOR ALL TO authenticated
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));

CREATE INDEX IF NOT EXISTS attitude_log_campaign_idx ON attitude_log (campaign_id, created_at DESC);

-- Added later: world data from Appendix 2 (run this part if you ran the script above earlier).
ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS uwp TEXT;
ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS trade_codes TEXT;
ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS policy TEXT;   -- Government/Security/Technology, e.g. 221; - null, X no negotiation

-- Added later: GM duties are shared, so anyone logged in can edit. Every change is still logged with the person's name.
-- Run this block in the Supabase SQL editor (it replaces the GM-only policies above).
DROP POLICY IF EXISTS port_attitudes_gm ON port_attitudes;
DROP POLICY IF EXISTS port_attitudes_write ON port_attitudes;
CREATE POLICY port_attitudes_write ON port_attitudes FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS standing_gm ON standing;
DROP POLICY IF EXISTS standing_write ON standing;
CREATE POLICY standing_write ON standing FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS attitude_log_gm ON attitude_log;
DROP POLICY IF EXISTS attitude_log_write ON attitude_log;
CREATE POLICY attitude_log_write ON attitude_log FOR ALL TO authenticated USING (true) WITH CHECK (true);
