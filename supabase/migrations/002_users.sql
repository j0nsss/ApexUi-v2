CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT UNIQUE NOT NULL CHECK (char_length(username) BETWEEN 2 AND 40),
  display_name  TEXT NOT NULL CHECK (char_length(display_name) BETWEEN 1 AND 80),
  bio           TEXT CHECK (char_length(bio) <= 300),
  avatar_url    TEXT,
  website_url   TEXT,
  github_url    TEXT,
  twitter_url   TEXT,
  role_tag      TEXT CHECK (role_tag IN (
                  'Frontend Engineer',
                  'Full-Stack Developer',
                  'UI Designer',
                  'UX Designer',
                  'Indie Hacker',
                  'Student',
                  'Other'
                )),
  is_admin      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
