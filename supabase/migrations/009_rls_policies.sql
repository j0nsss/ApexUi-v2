ALTER TABLE public.users      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles viewable by everyone"
  ON public.users FOR SELECT USING (TRUE);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Published components are viewable by everyone"
  ON public.components FOR SELECT USING (status = 'published');

CREATE POLICY "Creators can view their own components regardless of status"
  ON public.components FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Authenticated users can insert components"
  ON public.components FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their own components"
  ON public.components FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete their own components"
  ON public.components FOR DELETE USING (auth.uid() = creator_id);

CREATE POLICY "Admins have full access to components"
  ON public.components FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Anyone can view likes"
  ON public.likes FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can insert likes"
  ON public.likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
  ON public.likes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can only view their own bookmarks"
  ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert bookmarks"
  ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks"
  ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);
