import type { MetadataRoute } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createServerSupabaseClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: components } = await (supabase.from('components') as any)
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const componentUrls = (components ?? []).map((c: { slug: string; updated_at: string }) => ({
    url: `https://apexui.dev/components/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://apexui.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://apexui.dev/submit',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...componentUrls,
  ]
}
