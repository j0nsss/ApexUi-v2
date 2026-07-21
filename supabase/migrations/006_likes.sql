CREATE TABLE public.likes (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  component_id  UUID NOT NULL REFERENCES public.components(id) ON DELETE CASCADE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, component_id)
);

CREATE INDEX idx_likes_component ON public.likes(component_id);
CREATE INDEX idx_likes_user      ON public.likes(user_id);

CREATE OR REPLACE FUNCTION sync_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.components
    SET like_count = like_count + 1
    WHERE id = NEW.component_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.components
    SET like_count = GREATEST(like_count - 1, 0)
    WHERE id = OLD.component_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER likes_sync_count
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW EXECUTE FUNCTION sync_like_count();
