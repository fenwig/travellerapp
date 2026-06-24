-- ============================================================
-- TRUTHER CAREER — Following (FOL) characteristic
-- ============================================================
-- Truther (Traveller Companion p.35-36) introduces a new tracked
-- characteristic, Following (FOL), used in place of a normal rank
-- ladder. Run this in the Supabase SQL editor (same workflow as
-- gm-rls-policy.sql / mustering-benefits-schema.sql).

ALTER TABLE characters ADD COLUMN IF NOT EXISTS following INTEGER DEFAULT 0;
