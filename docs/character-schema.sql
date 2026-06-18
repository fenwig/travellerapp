-- ============================================================
-- TRAVELLER APP — CHARACTER SCHEMA
-- ============================================================

-- CHARACTERS
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  species TEXT DEFAULT 'Human',
  homeworld TEXT,
  portrait_url TEXT,
  age INTEGER,
  primary_role TEXT,
  secondary_role TEXT,
  str INTEGER DEFAULT 7,
  dex INTEGER DEFAULT 7,
  end_stat INTEGER DEFAULT 7,
  int_stat INTEGER DEFAULT 7,
  edu INTEGER DEFAULT 7,
  soc INTEGER DEFAULT 7,
  skills JSONB DEFAULT '{}',
  cash_on_hand INTEGER DEFAULT 0,
  pension INTEGER DEFAULT 0,
  debt INTEGER DEFAULT 0,
  living_costs INTEGER DEFAULT 0,
  ship_payment INTEGER DEFAULT 0,
  training_skill TEXT,
  training_specialty TEXT,
  training_weeks_complete INTEGER DEFAULT 0,
  training_periods_complete INTEGER DEFAULT 0,
  background_notes TEXT,
  previous_history TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'deceased', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CAREERS
CREATE TABLE character_careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  term_order INTEGER NOT NULL,
  career TEXT NOT NULL,
  assignment TEXT,
  rank INTEGER DEFAULT 0,
  rank_title TEXT,
  terms_served INTEGER DEFAULT 1,
  notes TEXT
);

-- ASSOCIATES
CREATE TABLE character_associates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ally', 'contact', 'rival', 'enemy')),
  name TEXT NOT NULL,
  description TEXT
);

-- ARMOUR
CREATE TABLE character_armour (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  protection INTEGER DEFAULT 0,
  rad INTEGER DEFAULT 0,
  kg NUMERIC(6,2) DEFAULT 0,
  options TEXT
);

-- WEAPONS
CREATE TABLE character_weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  tl INTEGER,
  range TEXT,
  damage TEXT,
  kg NUMERIC(6,2) DEFAULT 0,
  magazine INTEGER,
  traits TEXT
);

-- AUGMENTS
CREATE TABLE character_augments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  tl INTEGER,
  improvement TEXT
);

-- EQUIPMENT
CREATE TABLE character_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  mass NUMERIC(6,2) DEFAULT 0
);

-- WOUNDS
CREATE TABLE character_wounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  medication TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- JOURNAL
CREATE TABLE character_journal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  entry_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AUTO-UPDATE updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $func$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

CREATE TRIGGER characters_updated_at
  BEFORE UPDATE ON characters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ROW LEVEL SECURITY
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_associates ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_armour ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_weapons ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_augments ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_wounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_journal ENABLE ROW LEVEL SECURITY;

-- Characters: read by all, write by owner only
CREATE POLICY "characters_read" ON characters FOR SELECT TO authenticated USING (true);
CREATE POLICY "characters_insert" ON characters FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "characters_update" ON characters FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "characters_delete" ON characters FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- character_careers
CREATE POLICY "careers_read" ON character_careers FOR SELECT TO authenticated USING (true);
CREATE POLICY "careers_insert" ON character_careers FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "careers_update" ON character_careers FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "careers_delete" ON character_careers FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_associates
CREATE POLICY "associates_read" ON character_associates FOR SELECT TO authenticated USING (true);
CREATE POLICY "associates_insert" ON character_associates FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "associates_update" ON character_associates FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "associates_delete" ON character_associates FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_armour
CREATE POLICY "armour_read" ON character_armour FOR SELECT TO authenticated USING (true);
CREATE POLICY "armour_insert" ON character_armour FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "armour_update" ON character_armour FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "armour_delete" ON character_armour FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_weapons
CREATE POLICY "weapons_read" ON character_weapons FOR SELECT TO authenticated USING (true);
CREATE POLICY "weapons_insert" ON character_weapons FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "weapons_update" ON character_weapons FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "weapons_delete" ON character_weapons FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_augments
CREATE POLICY "augments_read" ON character_augments FOR SELECT TO authenticated USING (true);
CREATE POLICY "augments_insert" ON character_augments FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "augments_update" ON character_augments FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "augments_delete" ON character_augments FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_equipment
CREATE POLICY "equipment_read" ON character_equipment FOR SELECT TO authenticated USING (true);
CREATE POLICY "equipment_insert" ON character_equipment FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "equipment_update" ON character_equipment FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "equipment_delete" ON character_equipment FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_wounds
CREATE POLICY "wounds_read" ON character_wounds FOR SELECT TO authenticated USING (true);
CREATE POLICY "wounds_insert" ON character_wounds FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "wounds_update" ON character_wounds FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));
CREATE POLICY "wounds_delete" ON character_wounds FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM characters WHERE id = character_id AND user_id = auth.uid()));

-- character_journal
CREATE POLICY "journal_read" ON character_journal FOR SELECT TO authenticated USING (true);
CREATE POLICY "journal_insert" ON character_journal FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "journal_update" ON character_journal FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "journal_delete" ON character_journal FOR DELETE TO authenticated USING (auth.uid() = user_id);
