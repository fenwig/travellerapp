-- Adds an Effect column to a character's general equipment list.
ALTER TABLE character_equipment ADD COLUMN IF NOT EXISTS effect TEXT;
