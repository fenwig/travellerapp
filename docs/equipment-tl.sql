-- Adds a Tech Level column to a character's general equipment list.
ALTER TABLE character_equipment ADD COLUMN IF NOT EXISTS tl INTEGER;
