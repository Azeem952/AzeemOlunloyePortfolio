CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (SELECT lower(auth.jwt() ->> 'email') = 'azeemolunloye@gmail.com'),
    false
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  );
$$;

CREATE POLICY "Admins can read roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  categories text[] NOT NULL DEFAULT '{}',
  year text NOT NULL DEFAULT '',
  client text NOT NULL DEFAULT '',
  duration text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  overview text NOT NULL DEFAULT '',
  problem text NOT NULL DEFAULT '',
  solution text NOT NULL DEFAULT '',
  architecture text[] NOT NULL DEFAULT '{}',
  workflow jsonb NOT NULL DEFAULT '[]'::jsonb,
  tools text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  outcome jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags text[] NOT NULL DEFAULT '{}',
  cover_url text,
  video_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published projects are public"
  ON public.projects FOR SELECT TO anon
  USING (published = true);

CREATE POLICY "Admins can read all projects"
  ON public.projects FOR SELECT TO authenticated
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE TABLE public.project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'image',
  url text NOT NULL,
  caption text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX project_media_project_idx ON public.project_media (project_id, sort_order);

GRANT SELECT ON public.project_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_media TO authenticated;
GRANT ALL ON public.project_media TO service_role;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media of published projects is public"
  ON public.project_media FOR SELECT TO anon
  USING (EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.published = true));

CREATE POLICY "Admins can read all media"
  ON public.project_media FOR SELECT TO authenticated
  USING (
    public.is_admin()
    OR EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.published = true)
  );

CREATE POLICY "Admins can insert media"
  ON public.project_media FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update media"
  ON public.project_media FOR UPDATE TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete media"
  ON public.project_media FOR DELETE TO authenticated
  USING (public.is_admin());

CREATE TABLE public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL UNIQUE,
  url text NOT NULL,
  filename text NOT NULL,
  content_type text NOT NULL DEFAULT '',
  size_bytes bigint NOT NULL DEFAULT 0,
  kind text NOT NULL DEFAULT 'image',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.media_library TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_library TO authenticated;
GRANT ALL ON public.media_library TO service_role;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media library is publicly readable"
  ON public.media_library FOR SELECT TO anon USING (true);

CREATE POLICY "Admins manage media library"
  ON public.media_library FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER project_media_updated_at BEFORE UPDATE ON public.project_media
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Admins can read media files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins can upload media files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins can update media files"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "Admins can delete media files"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());