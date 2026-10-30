-- Communications gear on the Character Record's Tech tab.
-- Run once in the Supabase SQL editor.
CREATE TABLE IF NOT EXISTS character_comms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tl INTEGER,
  mass NUMERIC(6,2),
  range TEXT,
  features TEXT
);

ALTER TABLE character_comms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "comms_read" ON character_comms;
CREATE POLICY "comms_read" ON character_comms FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "comms_insert" ON character_comms;
CREATE POLICY "comms_insert" ON character_comms FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "comms_update" ON character_comms;
CREATE POLICY "comms_update" ON character_comms FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "comms_delete" ON character_comms;
CREATE POLICY "comms_delete" ON character_comms FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- GM account gets full access, same as the other character tables.
DROP POLICY IF EXISTS gm_full_access ON character_comms;
CREATE POLICY gm_full_access ON character_comms FOR ALL
  USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
  WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
