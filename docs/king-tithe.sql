-- King of Drinax tithe (Pirates of Drinax): the share of all proceeds that goes to the King, set in Payout settings.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js).
-- Needs docs/campaign-finance.sql to have been run first. Until it is run the page still takes 10%, but the
-- percentage cannot be changed or saved.

ALTER TABLE party_settings ADD COLUMN IF NOT EXISTS pct_king INTEGER NOT NULL DEFAULT 10;
