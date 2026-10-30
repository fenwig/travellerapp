-- Campaigns: every character and spacecraft belongs to one campaign, and each campaign has its own Roster.
-- Run once in the Supabase SQL editor (after taking a backup: node tools/backup.js).
--
-- Everything that exists today is put into one starting campaign. Change the name below if you like,
-- or rename it later in the Campaigns table. Spacecraft cargo, trade log and current world already hang
-- off the spacecraft, so they follow the ship into its campaign automatically.

CREATE TABLE IF NOT EXISTS campaigns (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Everyone logged in can see every campaign; only the GM account can add, rename or delete them.
DROP POLICY IF EXISTS campaigns_select ON campaigns;
CREATE POLICY campaigns_select ON campaigns FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS campaigns_gm_all ON campaigns;
CREATE POLICY campaigns_gm_all ON campaigns FOR ALL TO authenticated
  USING      ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));

ALTER TABLE characters ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id);
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id);

-- Put all existing characters and ships into the starting campaign.
DO $$
DECLARE cid UUID;
BEGIN
  SELECT id INTO cid FROM campaigns ORDER BY created_at LIMIT 1;
  IF cid IS NULL THEN
    INSERT INTO campaigns (name) VALUES ('Tutorial') RETURNING id INTO cid;
  END IF;
  UPDATE characters SET campaign_id = cid WHERE campaign_id IS NULL;
  UPDATE spacecraft SET campaign_id = cid WHERE campaign_id IS NULL;
END $$;

CREATE INDEX IF NOT EXISTS characters_campaign_idx ON characters (campaign_id);
CREATE INDEX IF NOT EXISTS spacecraft_campaign_idx ON spacecraft (campaign_id);

-- "Only one active ship" now means one active ship PER CAMPAIGN.
DROP INDEX IF EXISTS one_active_spacecraft;
CREATE UNIQUE INDEX IF NOT EXISTS one_active_spacecraft_per_campaign
  ON spacecraft (campaign_id) WHERE status = 'active';
