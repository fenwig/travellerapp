-- NPC Fleet (GM): run once in the Supabase SQL editor.
-- An NPC ship is a spacecraft row with the status "npc". It stays off the Roster and every player page,
-- and is managed on the NPC Fleet page.
ALTER TABLE spacecraft DROP CONSTRAINT IF EXISTS spacecraft_status_check;
ALTER TABLE spacecraft ADD CONSTRAINT spacecraft_status_check
  CHECK (status IN ('active', 'fleet', 'npc', 'reserve', 'sold', 'destroyed', 'stolen', 'other'));
