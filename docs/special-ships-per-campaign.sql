-- Each campaign keeps its own list of Drinaxian Companion special ships already used (Piracy Encounter).
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/campaigns.sql to have been run first.

ALTER TABLE special_ships_used ADD COLUMN IF NOT EXISTS campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE;

-- Existing "used" ships belong to the first campaign.
UPDATE special_ships_used
   SET campaign_id = (SELECT id FROM campaigns ORDER BY created_at LIMIT 1)
 WHERE campaign_id IS NULL;

-- A ship is unique within a campaign, not across the whole app.
ALTER TABLE special_ships_used DROP CONSTRAINT IF EXISTS special_ships_used_pkey;
ALTER TABLE special_ships_used ALTER COLUMN campaign_id SET NOT NULL;
ALTER TABLE special_ships_used ADD PRIMARY KEY (campaign_id, name);
