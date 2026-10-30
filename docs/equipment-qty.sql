-- Quantity on a character's drugs, bandages and other counted equipment.
-- NULL means "not a counted item"; the page shows a Quantity line when it is set.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
ALTER TABLE character_equipment ADD COLUMN IF NOT EXISTS qty INTEGER;
