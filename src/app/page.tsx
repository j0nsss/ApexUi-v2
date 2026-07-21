import { createServerSupabaseClient } from '@/lib/supabase/server'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryFilterStrip } from '@/components/home/CategoryFilterStrip'
import { SortControls } from '@/components/home/SortControls'
import { ComponentGrid } from '@/components/home/ComponentGrid'
import type { ComponentWithMeta } from '@/types/component.types'

export const revalidate = 3600

export default async function Home() {
  const supabase = await createServerSupabaseClient()

  // Fetch component count
  const { count: componentCount } = await supabase
    .from('components')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  // Fetch initial components
  const { data: initialData } = await supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('status', 'published')
    .order('like_count', { ascending: false })
    .range(0, 11)

  const initialComponents: ComponentWithMeta[] = (initialData ?? []).map((item: unknown) => {
    const row = item as Record<string, unknown>
    return {
      ...row,
      tags: [],
      is_liked: false,
      is_bookmarked: false,
    } as unknown as ComponentWithMeta
  })

  return (
    <main id="main-content">
      <HeroSection componentCount={componentCount ?? 11} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CategoryFilterStrip categories={categories ?? []} />
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-h2 text-text-primary">Components</h2>
          <SortControls />
        </div>
      </div>

      <ComponentGrid initialComponents={initialComponents} />
    </main>
  )
}
