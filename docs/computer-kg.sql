-- Weight (kg) of a character's computers, shown on the Computers cards on the Tech tab.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
ALTER TABLE character_computers ADD COLUMN IF NOT EXISTS kg NUMERIC;
