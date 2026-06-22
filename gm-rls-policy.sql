-- Grants the GM account full (SELECT/INSERT/UPDATE/DELETE) access to every
-- character/spacecraft table, regardless of who owns the row. Run this once
-- in the Supabase SQL editor (Project -> SQL Editor -> New Query -> paste -> Run).
--
-- This is additive: Postgres combines multiple permissive RLS policies on
-- the same table with OR, so your existing owner-based policies keep working
-- unchanged for everyone else. Only the GM email gets the extra access.
--
-- To add/remove GM accounts later, edit the email list in the USING clause
-- and re-run (CREATE POLICY ... IF NOT EXISTS isn't supported for policies,
-- so DROP POLICY IF EXISTS first if you need to change the email list).

do $$
declare
  t text;
  tables text[] := array[
    'characters',
    'character_armour', 'character_associates', 'character_augments',
    'character_careers', 'character_computers', 'character_computer_software',
    'character_equipment', 'character_weapons', 'character_wounds',
    'spacecraft',
    'spacecraft_cargo', 'spacecraft_crew_roles', 'spacecraft_hired_crew',
    'spacecraft_mounts', 'spacecraft_passengers', 'spacecraft_sensors',
    'spacecraft_software', 'spacecraft_systems', 'spacecraft_weapons'
  ];
begin
  foreach t in array tables loop
    execute format(
      'drop policy if exists gm_full_access on %I;
       create policy gm_full_access on %I
         for all
         using ((auth.jwt() ->> ''email'') in (''mikelasagna@gmail.com''))
         with check ((auth.jwt() ->> ''email'') in (''mikelasagna@gmail.com''));',
      t, t
    );
  end loop;
end $$;
