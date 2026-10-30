-- Several ships can be Active at once, and each character is onboard ONE specific ship.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.

-- 1. Remove the "only one active ship" rules.
DROP INDEX IF EXISTS one_active_spacecraft;
DROP INDEX IF EXISTS one_active_spacecraft_per_campaign;

-- 2. A character is onboard a particular ship (empty = not on any ship).
--    If a ship is deleted, the character simply becomes "not onboard".
ALTER TABLE characters
  ADD COLUMN IF NOT EXISTS onboard_ship_id UUID REFERENCES spacecraft(id) ON DELETE SET NULL;

-- 3. Carry over today's "onboard" tick boxes: those characters go onto their campaign's active ship.
UPDATE characters c
   SET onboard_ship_id = s.id
  FROM spacecraft s
 WHERE c.onboard = true
   AND c.onboard_ship_id IS NULL
   AND s.campaign_id = c.campaign_id
   AND s.status = 'active';
