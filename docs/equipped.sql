-- "Equipped" switch on every inventory item: is the character carrying it on this adventure?
-- Existing items default to equipped, so nothing changes on current characters.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
ALTER TABLE character_armour    ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE character_weapons   ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE character_augments  ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE character_comms     ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE character_equipment ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE character_computers ADD COLUMN IF NOT EXISTS equipped BOOLEAN NOT NULL DEFAULT true;
