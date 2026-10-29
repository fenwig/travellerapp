-- Piracy Encounter: marks cargo rows that were taken from a prey ship, so the
-- spoils (fence share, royal tithe) can be worked out later.
-- Run once in the Supabase SQL editor.

ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS stolen BOOLEAN DEFAULT false;
