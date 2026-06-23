-- ============================================================
-- MUSTERING-OUT BENEFITS — schema additions
-- ============================================================
-- Two mustering-out benefit types ("Ship Share" and "TAS Membership")
-- had no column to record them against. Run this in the Supabase SQL
-- editor (same workflow as gm-rls-policy.sql) to add them.

ALTER TABLE characters ADD COLUMN IF NOT EXISTS ship_shares INTEGER DEFAULT 0;
ALTER TABLE characters ADD COLUMN IF NOT EXISTS tas_member BOOLEAN DEFAULT false;
