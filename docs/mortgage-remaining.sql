-- Mortgage Remaining on a spacecraft: starts at the Mortgage Amount and goes down with each payment.
-- This column was in docs/spacecraft-schema-update.sql but was never added to the live database, so ship-record
-- mortgage payments were not being saved and the Time Tracker payment function (charges_pay) failed with
-- "column s.mortgage_remaining does not exist". Safe to run more than once.
ALTER TABLE spacecraft ADD COLUMN IF NOT EXISTS mortgage_remaining NUMERIC(12,3);
