-- ============================================================
-- TRAVELLER APP — SPACECRAFT SCHEMA UPDATE
-- Run in Supabase SQL Editor
-- ============================================================

-- Change purchase_value to support MCr with 3 decimal places
ALTER TABLE spacecraft ALTER COLUMN purchase_value TYPE NUMERIC(12,3);

-- Add hull tonnage (physical size of ship)
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS hull_tonnage NUMERIC(10,2) DEFAULT 0;

-- Replace streamlining text with simple boolean
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS streamlined BOOLEAN DEFAULT true;

-- Drop old streamlining column constraint and column
ALTER TABLE spacecraft DROP COLUMN IF EXISTS streamlining;

-- Mortgage value (run previously — kept here for reference)
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS mortgage_value NUMERIC(12,3) DEFAULT 0;

-- Computer type/TL (computer's own tech level, separate from ship TL)
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS computer_type TEXT DEFAULT 'Portable';
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS computer_tl NUMERIC DEFAULT 0;

-- Software: TL gating, active toggle, and gating note
ALTER TABLE spacecraft_software ADD COLUMN IF NOT EXISTS tl NUMERIC DEFAULT 0;
ALTER TABLE spacecraft_software ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT false;
ALTER TABLE spacecraft_software ADD COLUMN IF NOT EXISTS note TEXT;

-- Computer rework: Processor number replaces free-text Model; /bis and /fib
-- specialisation flags; computer_type no longer used (column left in place)
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS computer_processor NUMERIC DEFAULT 0;
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS computer_bis BOOLEAN DEFAULT false;
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS computer_fib BOOLEAN DEFAULT false;

-- Streamlined dropdown replaces boolean (Streamlined / Partially Streamlined / Unstreamlined)
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS streamlined_status TEXT DEFAULT 'Streamlined';

-- Sensor added to Primary power systems; Ship Sensors grade selector
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS power_sensor NUMERIC DEFAULT 0;
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS sensor_grade TEXT DEFAULT 'Basic';

-- Mounts table: replaces the old flat Weapons list. Each row is a group of
-- identical mounts (Fixed Mount / Single / Double / Triple Turret); `count`
-- is how many of that mount are installed; weapon slots are generated
-- per-instance client-side based on mount type.
CREATE TABLE IF NOT EXISTS spacecraft_mounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  mount_type TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  tl INTEGER,
  power NUMERIC DEFAULT 0
);
ALTER TABLE spacecraft_mounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "spacecraft_mounts_all" ON spacecraft_mounts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- spacecraft_weapons: link each weapon to a specific mount instance/slot
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS mount_id UUID REFERENCES spacecraft_mounts(id) ON DELETE CASCADE;
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS instance INTEGER;
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS slot INTEGER;
ALTER TABLE spacecraft_weapons ADD COLUMN IF NOT EXISTS power NUMERIC DEFAULT 0;
