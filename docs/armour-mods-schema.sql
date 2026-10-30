-- Modifications attached to a character's armour (shown as sublines under each armour row).
-- Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS character_armour_mods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  armour_id UUID REFERENCES character_armour(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tl INTEGER,
  kg NUMERIC(6,2),
  effect TEXT,
  prot_bonus INTEGER DEFAULT 0,
  rad_bonus INTEGER DEFAULT 0
);

ALTER TABLE character_armour_mods ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "armour_mods_read" ON character_armour_mods;
CREATE POLICY "armour_mods_read" ON character_armour_mods FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "armour_mods_insert" ON character_armour_mods;
CREATE POLICY "armour_mods_insert" ON character_armour_mods FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM character_armour a JOIN characters c ON c.id = a.character_id WHERE a.id = armour_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "armour_mods_update" ON character_armour_mods;
CREATE POLICY "armour_mods_update" ON character_armour_mods FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM character_armour a JOIN characters c ON c.id = a.character_id WHERE a.id = armour_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "armour_mods_delete" ON character_armour_mods;
CREATE POLICY "armour_mods_delete" ON character_armour_mods FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM character_armour a JOIN characters c ON c.id = a.character_id WHERE a.id = armour_id AND c.user_id = auth.uid()));

-- GM account gets full access, same as the other character tables.
DROP POLICY IF EXISTS gm_full_access ON character_armour_mods;
CREATE POLICY gm_full_access ON character_armour_mods FOR ALL
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
