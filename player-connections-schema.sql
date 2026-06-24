-- ============================================================
-- PLAYER CONNECTIONS — Connections Rule (Core Rulebook p.19)
-- ============================================================
-- Tracks connections formed with other player characters during
-- character creation, shown/editable on Character Record's
-- Career & Associates tab. Run this in the Supabase SQL editor
-- (same workflow as the other *-schema.sql files in this repo).

CREATE TABLE IF NOT EXISTS character_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  other_character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
  other_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE character_connections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "connections_read" ON character_connections FOR SELECT TO authenticated USING (true);
CREATE POLICY "connections_insert" ON character_connections FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "connections_update" ON character_connections FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "connections_delete" ON character_connections FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
