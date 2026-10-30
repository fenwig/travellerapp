-- Campaign Time Tracker: the campaign date (365-day year) and a log of who moved it.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/campaigns.sql to have been run first.

CREATE TABLE IF NOT EXISTS campaign_time (
  campaign_id UUID PRIMARY KEY REFERENCES campaigns(id) ON DELETE CASCADE,
  year INTEGER NOT NULL DEFAULT 1105,
  day INTEGER NOT NULL DEFAULT 1,
  -- the absolute day number (year x 365 + day - 1) at which the last 28-day maintenance period was closed
  last_paid_abs INTEGER NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID
);

CREATE TABLE IF NOT EXISTS campaign_time_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE NOT NULL,
  user_id UUID,
  user_name TEXT,
  note TEXT,
  from_abs INTEGER,
  to_abs INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE campaign_time ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_time_log ENABLE ROW LEVEL SECURITY;

-- Anyone logged in can read and move the campaign clock (GM duties are shared).
DROP POLICY IF EXISTS campaign_time_all ON campaign_time;
CREATE POLICY campaign_time_all ON campaign_time FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS campaign_time_log_read ON campaign_time_log;
CREATE POLICY campaign_time_log_read ON campaign_time_log FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS campaign_time_log_insert ON campaign_time_log;
CREATE POLICY campaign_time_log_insert ON campaign_time_log FOR INSERT TO authenticated WITH CHECK (true);
