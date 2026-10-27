-- Speculative trade: lets a cargo row remember what was bought, so the
-- "selling goods" step can use it later. Run once in the Supabase SQL editor.
-- All columns are optional, so existing cargo rows are unaffected.

ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS trade_good_id INTEGER;   -- D66 number on the Trade Goods table
ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS purchase_price NUMERIC;  -- Cr per ton actually paid
ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS base_price NUMERIC;      -- Cr per ton base price
ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS origin_world TEXT;       -- where it was bought
ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS illegal BOOLEAN DEFAULT false;
