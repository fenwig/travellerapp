-- Sell Cargo: stolen goods sold through an illicit buyer or broker.
-- Adds the stolen flag and the fence share taken to the cargo sales record.
-- Run once in the Supabase SQL editor (docs/stolen-cargo.sql must already have been run).

ALTER TABLE spacecraft_trade_log ADD COLUMN IF NOT EXISTS stolen BOOLEAN DEFAULT false;
ALTER TABLE spacecraft_trade_log ADD COLUMN IF NOT EXISTS fence_pct NUMERIC;   -- share of market value paid out (e.g. 25)
