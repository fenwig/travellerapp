-- Piracy Encounter: remembers which named special ships (Drinaxian Companion) have already been used,
-- so each one turns up only once. Shared by everyone who uses the app.
-- Run once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS special_ships_used (
  name TEXT PRIMARY KEY,
  used_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE special_ships_used ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "special_ships_read" ON special_ships_used;
CREATE POLICY "special_ships_read" ON special_ships_used FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "special_ships_insert" ON special_ships_used;
CREATE POLICY "special_ships_insert" ON special_ships_used FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "special_ships_delete" ON special_ships_used;
CREATE POLICY "special_ships_delete" ON special_ships_used FOR DELETE TO authenticated USING (true);
