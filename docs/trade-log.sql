-- Cargo sales record: one row per good sold on the Sell Cargo page.
-- Shown on the Spacecraft Record (Finance & Cargo tab).
-- Run once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS spacecraft_trade_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spacecraft_id UUID REFERENCES spacecraft(id) ON DELETE CASCADE NOT NULL,
  sold_at TIMESTAMPTZ DEFAULT now(),
  trade_good_id INTEGER,
  good_name TEXT NOT NULL,
  tons NUMERIC(8,2) DEFAULT 0,
  purchase_price NUMERIC,      -- Cr per ton paid
  sale_price NUMERIC,          -- Cr per ton received
  origin_world TEXT,           -- where it was bought
  sold_world TEXT,             -- where it was sold
  gross NUMERIC,               -- tons x sale price
  broker_fee NUMERIC DEFAULT 0,
  illegal BOOLEAN DEFAULT false
);

ALTER TABLE spacecraft_trade_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "spacecraft_trade_log_all" ON spacecraft_trade_log;
CREATE POLICY "spacecraft_trade_log_all" ON spacecraft_trade_log
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
