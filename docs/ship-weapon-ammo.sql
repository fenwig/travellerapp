-- Missile and torpedo counts on the Fleet cards: run once in the Supabase SQL editor.
-- (Safe to run if the column is already there.)
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS ammo INTEGER;
