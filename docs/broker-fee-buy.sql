-- Remember the broker fee (10 or 20) paid on the purchase, so Sell Cargo can charge it
-- again at the sale. Cargo bought before this was added has no fee recorded.
-- Run once in the Supabase SQL editor.

ALTER TABLE spacecraft_cargo ADD COLUMN IF NOT EXISTS buy_fee_pct NUMERIC DEFAULT 0;
