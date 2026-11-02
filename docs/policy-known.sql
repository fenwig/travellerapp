-- Policy wants (Pirates of Drinax Finale): lets the GM choose when the players learn what a world wants from a new Kingdom.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js).
-- Needs docs/attitudes.sql and docs/player-attitudes.sql to have been run first.

ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS known_policy BOOLEAN NOT NULL DEFAULT false;
