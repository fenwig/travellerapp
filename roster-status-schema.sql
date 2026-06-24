-- ============================================================
-- ROSTER STATUS — adds 'reserve' to the allowed character statuses
-- ============================================================
-- Run this in the Supabase SQL editor (same workflow as the other
-- *-schema.sql files in this repo). Player-facing statuses are now:
-- active (only one per player, enforced in app code), reserve,
-- archived, deceased, other. 'draft' remains for in-progress
-- Character Creation wizard characters (not player-selectable).

ALTER TABLE characters DROP CONSTRAINT IF EXISTS characters_status_check;
ALTER TABLE characters ADD CONSTRAINT characters_status_check
  CHECK (status IN ('active', 'reserve', 'archived', 'deceased', 'other', 'draft'));
