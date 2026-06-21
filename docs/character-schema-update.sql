-- ============================================================
-- TRAVELLER APP — CHARACTER SCHEMA UPDATE (ROSTER support)
-- Run in Supabase SQL Editor
-- ============================================================

ALTER TABLE characters ADD COLUMN IF NOT EXISTS player_name TEXT;
ALTER TABLE characters ADD COLUMN IF NOT EXISTS onboard BOOLEAN DEFAULT false;

ALTER TABLE characters DROP CONSTRAINT IF EXISTS characters_status_check;
ALTER TABLE characters ADD CONSTRAINT characters_status_check
  CHECK (status IN ('active', 'deceased', 'archived', 'other'));

-- ============================================================
-- Character Record overhaul (session 11): injuries, augment
-- bonuses, armour detail columns, character computers/Tech tab
-- ============================================================

-- Temporary injury points per characteristic (reduces effective stat/DM)
ALTER TABLE characters ADD COLUMN IF NOT EXISTS injuries JSONB DEFAULT '{}';

-- Armour: PRO+ / Conditions / TL columns (table already has type, protection, rad, kg, options)
ALTER TABLE character_armour ADD COLUMN IF NOT EXISTS conditions TEXT;
ALTER TABLE character_armour ADD COLUMN IF NOT EXISTS tl INTEGER;

-- Augments: optional structured stat/armour bonus so "Improvement" can feed
-- core characteristics / protection totals automatically
ALTER TABLE character_augments ADD COLUMN IF NOT EXISTS bonus_target TEXT
  CHECK (bonus_target IN ('str','dex','end_stat','int_stat','edu','soc','armour') OR bonus_target IS NULL);
ALTER TABLE character_augments ADD COLUMN IF NOT EXISTS bonus_value INTEGER DEFAULT 0;

-- CHARACTER COMPUTERS (Tech tab)
CREATE TABLE IF NOT EXISTS character_computers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Computer',
  processor INTEGER DEFAULT 0,
  bis BOOLEAN DEFAULT false,
  fib BOOLEAN DEFAULT false,
  tl INTEGER,
  options TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS character_computer_software (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  computer_id UUID REFERENCES character_computers(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  bandwidth NUMERIC(6,2) DEFAULT 0,
  tl INTEGER,
  active BOOLEAN DEFAULT true,
  note TEXT
);

ALTER TABLE character_computers ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_computer_software ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "computers_read" ON character_computers;
CREATE POLICY "computers_read" ON character_computers FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "computers_insert" ON character_computers;
CREATE POLICY "computers_insert" ON character_computers FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "computers_update" ON character_computers;
CREATE POLICY "computers_update" ON character_computers FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "computers_delete" ON character_computers;
CREATE POLICY "computers_delete" ON character_computers FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "computer_software_read" ON character_computer_software;
CREATE POLICY "computer_software_read" ON character_computer_software FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "computer_software_insert" ON character_computer_software;
CREATE POLICY "computer_software_insert" ON character_computer_software FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM character_computers c JOIN characters ch ON ch.id = c.character_id WHERE c.id = computer_id AND ch.user_id = auth.uid()));
DROP POLICY IF EXISTS "computer_software_update" ON character_computer_software;
CREATE POLICY "computer_software_update" ON character_computer_software FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM character_computers c JOIN characters ch ON ch.id = c.character_id WHERE c.id = computer_id AND ch.user_id = auth.uid()));
DROP POLICY IF EXISTS "computer_software_delete" ON character_computer_software;
CREATE POLICY "computer_software_delete" ON character_computer_software FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM character_computers c JOIN characters ch ON ch.id = c.character_id WHERE c.id = computer_id AND ch.user_id = auth.uid()));

-- ============================================================
-- Character Creation wizard (session 13): draft status + step tracker
-- ============================================================

ALTER TABLE characters ADD COLUMN IF NOT EXISTS creation_step INTEGER DEFAULT 1;
ALTER TABLE characters ADD COLUMN IF NOT EXISTS creation_data JSONB DEFAULT '{}';
ALTER TABLE characters ADD COLUMN IF NOT EXISTS creation_log TEXT;

ALTER TABLE characters DROP CONSTRAINT IF EXISTS characters_status_check;
ALTER TABLE characters ADD CONSTRAINT characters_status_check
  CHECK (status IN ('active', 'deceased', 'archived', 'other', 'draft'));
