DROP POLICY IF EXISTS "Anyone can submit the contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit the contact form"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (
  char_length(btrim(name)) BETWEEN 2 AND 100
  AND char_length(btrim(email)) BETWEEN 5 AND 255
  AND position('@' in email) > 1
  AND char_length(btrim(message)) BETWEEN 10 AND 4000
  AND (subject IS NULL OR char_length(subject) <= 150)
  AND source = 'contact-page'
);

CREATE POLICY "Admins can read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

GRANT SELECT ON public.contact_submissions TO authenticated;