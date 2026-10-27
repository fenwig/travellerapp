-- Character portraits: storage bucket + crop column.
-- Run once in the Supabase SQL editor.

-- 1. Where the face crop is remembered (centre point + zoom)
ALTER TABLE characters ADD COLUMN IF NOT EXISTS portrait_crop JSONB;

-- 2. Public bucket (anyone logged in or not can view the image URLs;
--    only owner/GM can upload, replace or delete — see policies below)
INSERT INTO storage.buckets (id, name, public)
VALUES ('portraits', 'portraits', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Files live at  <character_id>/<timestamp>.jpg
--    Owner of that character, or the GM email, may write.
DROP POLICY IF EXISTS "portraits_insert" ON storage.objects;
DROP POLICY IF EXISTS "portraits_update" ON storage.objects;
DROP POLICY IF EXISTS "portraits_delete" ON storage.objects;

CREATE POLICY "portraits_insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portraits' AND (
  (auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com')
  OR EXISTS (SELECT 1 FROM public.characters c
             WHERE c.id::text = (storage.foldername(name))[1] AND c.user_id = auth.uid())
));

CREATE POLICY "portraits_update" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portraits' AND (
  (auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com')
  OR EXISTS (SELECT 1 FROM public.characters c
             WHERE c.id::text = (storage.foldername(name))[1] AND c.user_id = auth.uid())
));

CREATE POLICY "portraits_delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portraits' AND (
  (auth.jwt() ->> 'email') IN ('mikelasagna@gmail.com')
  OR EXISTS (SELECT 1 FROM public.characters c
             WHERE c.id::text = (storage.foldername(name))[1] AND c.user_id = auth.uid())
));

-- Note: the GM saving a portrait onto ANOTHER player's character also needs
-- gm-rls-policy.sql to have been run (it lets the GM update the characters row).
