-- Loaded missile / torpedo type on a launcher (Spacecraft Record weapons, used by the Fleet cards): run once in the Supabase SQL editor.
-- Empty means standard missiles or torpedoes.
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS ammo_type TEXT;
