-- ============================================================
-- TRAVELLER APP — SPACECRAFT SCHEMA
-- Run in Supabase SQL Editor
-- ============================================================

-- SPACECRAFT (main row)
CREATE TABLE spacecraft (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  ship_class TEXT,
  tl INTEGER,
  streamlining TEXT DEFAULT 'Streamlined' CHECK (streamlining IN ('Streamlined', 'Partial', 'Unstreamlined')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'reserve', 'sold', 'destroyed', 'other')),

  -- Hull / Armour / Fuel
  hull_max INTEGER DEFAULT 0,
  hull_current INTEGER DEFAULT 0,
  armour_max INTEGER DEFAULT 0,
  armour_current INTEGER DEFAULT 0,
  fuel_max INTEGER DEFAULT 0,
  fuel_current INTEGER DEFAULT 0,

  -- Capacity
  staterooms INTEGER DEFAULT 0,
  low_berths INTEGER DEFAULT 0,
  cargo_max NUMERIC(8,2) DEFAULT 0,
  purchase_value BIGINT DEFAULT 0,

  -- Drives
  jump_drive INTEGER DEFAULT 0,
  m_drive INTEGER DEFAULT 0,
  power_plant INTEGER DEFAULT 0,

  -- Power allocation
  power_max INTEGER DEFAULT 0,
  power_current INTEGER DEFAULT 0,
  power_basic INTEGER DEFAULT 0,
  power_m_drive INTEGER DEFAULT 0,
  power_j_drive INTEGER DEFAULT 0,
  power_weapons INTEGER DEFAULT 0,
  power_turrets INTEGER DEFAULT 0,
  power_extra JSONB DEFAULT '[
    {"label":"","value":0},
    {"label":"","value":0},
    {"label":"","value":0},
    {"label":"","value":0},
    {"label":"","value":0}
  ]',

  -- Computer
  computer_model TEXT,
  computer_bandwidth INTEGER DEFAULT 0,

  -- Critical hits (11 locations, severity 0–6)
  critical_hits JSONB DEFAULT '{
    "Sensors": 0,
    "Power Plant": 0,
    "Fuel": 0,
    "Weapon": 0,
    "Armour": 0,
    "Hull": 0,
    "M-Drive": 0,
    "Cargo": 0,
    "J-Drive": 0,
    "Crew": 0,
    "Bridge": 0
  }',

  -- Free text
  damage_notes TEXT,
  notes TEXT,

  -- Finance (per Maintenance Period)
  fin_mortgage BIGINT DEFAULT 0,
  fin_fuel BIGINT DEFAULT 0,
  fin_maintenance BIGINT DEFAULT 0,
  fin_salaries BIGINT DEFAULT 0,
  fin_other BIGINT DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SOFTWARE PACKAGES
CREATE TABLE spacecraft_software (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  bandwidth INTEGER DEFAULT 0
);

-- SENSORS (multiple lines)
CREATE TABLE spacecraft_sensors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL
);

-- SYSTEMS (multiple lines)
CREATE TABLE spacecraft_systems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL
);

-- WEAPONS
CREATE TABLE spacecraft_weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  mount TEXT,
  tl INTEGER,
  range TEXT,
  damage TEXT,
  ammo INTEGER,
  traits TEXT
);

-- CARGO
CREATE TABLE spacecraft_cargo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  tonnage NUMERIC(8,2) DEFAULT 0
);

-- PASSENGERS (one row per destination booking)
CREATE TABLE spacecraft_passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  destination TEXT,
  high_passage INTEGER DEFAULT 0,
  middle_passage INTEGER DEFAULT 0,
  basic_passage INTEGER DEFAULT 0,
  working_passage INTEGER DEFAULT 0,
  low_passage INTEGER DEFAULT 0
);

-- HIRED CREW (NPCs)
CREATE TABLE spacecraft_hired_crew (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  salary BIGINT DEFAULT 0
);

-- CREW ROLE ASSIGNMENTS
CREATE TABLE spacecraft_crew_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  character_id UUID REFERENCES characters(id) ON DELETE SET NULL,
  hired_crew_id UUID REFERENCES spacecraft_hired_crew(id) ON DELETE SET NULL
);

-- ============================================================
-- AUTO-UPDATE updated_at
-- ============================================================
CREATE TRIGGER spacecraft_updated_at
  BEFORE UPDATE ON spacecraft
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- All authenticated users can read and write all spacecraft
-- ============================================================
ALTER TABLE spacecraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_software ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_weapons ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_cargo ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_hired_crew ENABLE ROW LEVEL SECURITY;
ALTER TABLE spacecraft_crew_roles ENABLE ROW LEVEL SECURITY;

-- All authenticated users can do everything
DO $$ DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'spacecraft','spacecraft_software','spacecraft_sensors','spacecraft_systems',
    'spacecraft_weapons','spacecraft_cargo','spacecraft_passengers',
    'spacecraft_hired_crew','spacecraft_crew_roles'
  ] LOOP
    EXECUTE format('
      CREATE POLICY "%s_all" ON %s FOR ALL TO authenticated USING (true) WITH CHECK (true);
    ', t, t);
  END LOOP;
END $$;
