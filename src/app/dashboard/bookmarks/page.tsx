import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ComponentCard } from '@/components/component-card/ComponentCard'
import type { ComponentWithMeta } from '@/types/component.types'

export const revalidate = 0

export default async function BookmarksPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // First get bookmarked component IDs
  const { data: bookmarkRows } = await supabase
    .from('bookmarks')
    .select('component_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const ids = (bookmarkRows ?? []).map((r: unknown) => (r as Record<string, unknown>).component_id as string)

  if (ids.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <p className="text-body text-text-muted">No bookmarks yet.</p>
        <p className="text-small text-text-disabled">Click the bookmark icon on any component to save it here.</p>
      </div>
    )
  }

  // Then fetch the components
  const { data: comps } = await supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .in('id', ids)

  const components = ((comps ?? []) as Record<string, unknown>[]).map((item) => ({
    ...item,
    tags: [],
    is_liked: false,
    is_bookmarked: true,
  })) as unknown as ComponentWithMeta[]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {components.map((comp) => (
        <ComponentCard key={comp.id} component={comp} />
      ))}
    </div>
  )
}
