-- ============================================================
-- PLAYER CONNECTIONS — allow inserting the reciprocal entry
-- ============================================================
-- Forming a connection writes a row on BOTH characters involved, but
-- the original insert policy only allowed a player to insert rows
-- onto their OWN character — blocking the reciprocal half (the other
-- player's character). Connections are inherently a shared, two-sided
-- thing, so insert is opened up to any authenticated user (same as
-- the existing read policy); update/delete stay owner-restricted so a
-- player can only edit/remove their own side of a connection.
-- Run this in the Supabase SQL editor.

DROP POLICY IF EXISTS "connections_insert" ON character_connections;
CREATE POLICY "connections_insert" ON character_connections FOR INSERT TO authenticated WITH CHECK (true);
