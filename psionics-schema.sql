-- ============================================================
-- PSIONICS — Psionic Strength (PSI) characteristic
-- ============================================================
-- Core Rulebook p.227-237. PSI is not normally rolled during
-- creation — it's tested via specific Life Events, the Psionic
-- Community pre-career option, or referee permission. Run this
-- in the Supabase SQL editor (same workflow as
-- gm-rls-policy.sql / truther-believer-schema.sql).

ALTER TABLE characters ADD COLUMN IF NOT EXISTS psi INTEGER;
