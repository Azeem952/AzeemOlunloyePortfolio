-- Allow the public site (anonymous visitors) to submit the contact form.
GRANT INSERT ON public.contact_submissions TO anon;
CREATE POLICY "Anyone can submit the contact form"
  ON public.contact_submissions FOR INSERT TO anon
  WITH CHECK (true);

-- Allow public read of files in the private `media` bucket so the site's
-- media proxy can stream images/videos on any host without a service key.
CREATE POLICY "Media files are publicly readable"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'media');