-- Ship crew morale (Fleet and NPC Fleet pages): run once in the Supabase SQL editor.
-- morale       = the ship's current MOR (NULL until the starting MOR is rolled).
-- morale_class = NPC ships only: 'merchant', 'armed' or 'naval' (sets the starting roll: 1D+3, 1D+6, 1D+8).
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS morale INTEGER;
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS morale_class TEXT;
