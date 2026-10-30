-- Monthly berthing cost on a spacecraft (Finance & Cargo tab). Counted in the per-period total.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS fin_berthing INTEGER DEFAULT 0;
