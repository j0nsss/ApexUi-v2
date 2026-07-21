CREATE TABLE public.tags (
  id          SERIAL PRIMARY KEY,
  name        TEXT UNIQUE NOT NULL CHECK (char_length(name) <= 30),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.component_tags (
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  tag_id        INTEGER NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (component_id, tag_id)
);

CREATE INDEX idx_component_tags_tag ON public.component_tags(tag_id);
