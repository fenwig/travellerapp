-- ============================================================
-- SPACECRAFT STATUS — adds 'stolen' to the allowed statuses
-- ============================================================
-- Run this in the Supabase SQL editor (same workflow as the other
-- *-schema.sql files in this repo). Statuses are now: Active, Reserve,
-- Destroyed, Sold, Stolen, Other.

ALTER TABLE spacecraft DROP CONSTRAINT IF EXISTS spacecraft_status_check;
ALTER TABLE spacecraft ADD CONSTRAINT spacecraft_status_check
  CHECK (status IN ('active', 'reserve', 'destroyed', 'sold', 'stolen', 'other'));
