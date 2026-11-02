-- Player Attitudes (Pirates of Drinax): lets the GM choose what the players can see on the player Attitudes page and map.
-- Run once in the Supabase SQL editor (after a backup: node tools/backup.js), BEFORE the matching app update goes live.
-- Needs docs/attitudes.sql to have been run first.

ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS on_map BOOLEAN NOT NULL DEFAULT false;        -- world shown to the players
ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS known_patron BOOLEAN NOT NULL DEFAULT false;  -- players know who the patron is
ALTER TABLE port_attitudes ADD COLUMN IF NOT EXISTS known_need BOOLEAN NOT NULL DEFAULT false;    -- players know what the world requires

-- The two worlds the players know about at the start.
UPDATE port_attitudes SET on_map = true WHERE world IN ('Drinax', 'Theev');

-- OPTIONAL: make the attitude tables GM-only for changes, matching the GM-only page.
-- The page check (GM_EMAILS in supabase-config.js) is only a UI guard; this makes the database enforce it too.
-- If you give another account GM authority, add its email to both lists below and re-run.
-- Everyone logged in can still read, because the player page needs to.
-- DROP POLICY IF EXISTS port_attitudes_write ON port_attitudes;
-- CREATE POLICY port_attitudes_gm ON port_attitudes FOR ALL TO authenticated
--   USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
--   WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
-- DROP POLICY IF EXISTS standing_write ON standing;
-- CREATE POLICY standing_gm ON standing FOR ALL TO authenticated
--   USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
--   WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
-- DROP POLICY IF EXISTS attitude_log_write ON attitude_log;
-- CREATE POLICY attitude_log_gm ON attitude_log FOR ALL TO authenticated
--   USING ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'))
--   WITH CHECK ((auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com'));
