CREATE OR REPLACE VIEW public.trending_components AS
SELECT
  c.*,
  (
    (COUNT(l.id) FILTER (WHERE l.created_at > NOW() - INTERVAL '7 days') * 2) +
    (c.bookmark_count * 3) +
    (c.view_count / 100.0)
  ) AS trending_score
FROM public.components c
LEFT JOIN public.likes l ON l.component_id = c.id
WHERE c.status = 'published'
GROUP BY c.id
ORDER BY trending_score DESC;
