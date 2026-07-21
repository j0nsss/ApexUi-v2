CREATE TYPE component_tech AS ENUM ('html_css', 'tailwind', 'react_jsx', 'vue');
CREATE TYPE component_status AS ENUM ('draft', 'pending_review', 'published', 'rejected');

CREATE TABLE public.components (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug              TEXT UNIQUE NOT NULL,
  creator_id        UUID REFERENCES public.users(id) ON DELETE SET NULL,
  category_id       INTEGER NOT NULL REFERENCES public.categories(id),
  name              TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 60),
  description_short TEXT NOT NULL CHECK (char_length(description_short) <= 200),
  description_long  TEXT CHECK (char_length(description_long) <= 2000),
  tech              component_tech NOT NULL,
  status            component_status NOT NULL DEFAULT 'pending_review',

  code_html         TEXT,
  code_tailwind     TEXT,
  code_react        TEXT,
  code_vue          TEXT,

  preview_html      TEXT NOT NULL,

  thumbnail_url     TEXT,

  like_count        INTEGER NOT NULL DEFAULT 0,
  bookmark_count    INTEGER NOT NULL DEFAULT 0,
  view_count        INTEGER NOT NULL DEFAULT 0,

  rejection_reason  TEXT,
  reviewed_by       UUID REFERENCES public.users(id),
  reviewed_at       TIMESTAMPTZ,

  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER components_updated_at
  BEFORE UPDATE ON public.components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_components_status      ON public.components(status);
CREATE INDEX idx_components_category    ON public.components(category_id);
CREATE INDEX idx_components_creator     ON public.components(creator_id);
CREATE INDEX idx_components_created_at  ON public.components(created_at DESC);
CREATE INDEX idx_components_like_count  ON public.components(like_count DESC);
CREATE INDEX idx_components_view_count  ON public.components(view_count DESC);

CREATE INDEX idx_components_search
  ON public.components
  USING GIN ((name || ' ' || COALESCE(description_short, '')) gin_trgm_ops);
