-- Accessories attached to a character's weapons (shown as sublines under each weapon).
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
CREATE TABLE IF NOT EXISTS character_weapon_accessories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weapon_id UUID REFERENCES character_weapons(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tl INTEGER,
  kg NUMERIC(6,2),
  effect TEXT
);

ALTER TABLE character_weapon_accessories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "weapon_acc_read" ON character_weapon_accessories;
CREATE POLICY "weapon_acc_read" ON character_weapon_accessories FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "weapon_acc_insert" ON character_weapon_accessories;
CREATE POLICY "weapon_acc_insert" ON character_weapon_accessories FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM character_weapons w JOIN characters c ON c.id = w.character_id WHERE w.id = weapon_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "weapon_acc_update" ON character_weapon_accessories;
CREATE POLICY "weapon_acc_update" ON character_weapon_accessories FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM character_weapons w JOIN characters c ON c.id = w.character_id WHERE w.id = weapon_id AND c.user_id = auth.uid()));

DROP POLICY IF EXISTS "weapon_acc_delete" ON character_weapon_accessories;
CREATE POLICY "weapon_acc_delete" ON character_weapon_accessories FOR DELETE TO authenticated
  USING (EXISTS (SELECT 1 FROM character_weapons w JOIN characters c ON c.id = w.character_id WHERE w.id = weapon_id AND c.user_id = auth.uid()));

-- GM account gets full access, same as the other character tables.
DROP POLICY IF EXISTS gm_full_access ON character_weapon_accessories;
CREATE POLICY gm_full_access ON character_weapon_accessories FOR ALL
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
