-- Fleet ships: run once in the Supabase SQL editor.
-- 1. A ship can now have the status "fleet" (a ship crewed entirely by NPCs). "stolen" is allowed too, as the Roster already offers it.
ALTER TABLE spacecraft DROP CONSTRAINT IF EXISTS spacecraft_status_check;
ALTER TABLE spacecraft ADD CONSTRAINT spacecraft_status_check
  CHECK (status IN ('active', 'fleet', 'reserve', 'sold', 'destroyed', 'stolen', 'other'));

-- 2. Which Ship Catalogue design a ship came from (empty for ships built by hand).
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS catalogue_id TEXT;
