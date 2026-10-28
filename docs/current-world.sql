-- Current world of each spacecraft (name + UWP profile, e.g. A9B2887-A).
-- Set on the Spacecraft Record; read by the Passenger, Freight, Buy Cargo and Sell Cargo calculators.
-- Run once in the Supabase SQL editor.

ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS current_world_name TEXT;
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS current_world_uwp TEXT;
