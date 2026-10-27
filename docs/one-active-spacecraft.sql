-- Database-level guarantee: at most ONE spacecraft can have status 'active'.
-- Run once in the Supabase SQL editor.
--
-- If this errors with "could not create unique index", more than one ship is
-- currently Active. Set all but one to Reserve on the Roster, then run it again.

CREATE UNIQUE INDEX IF NOT EXISTS one_active_spacecraft
  ON spacecraft ((true))
  WHERE status = 'active';
