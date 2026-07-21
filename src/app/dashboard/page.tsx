import { createServerSupabaseClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Eye, Heart, Bookmark } from 'lucide-react'

export const revalidate = 0

const STATUS_COLORS: Record<string, string> = {
  published: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/30',
  pending_review: 'text-accent-amber bg-accent-amber/10 border-accent-amber/30',
  rejected: 'text-accent-red bg-accent-red/10 border-accent-red/30',
  draft: 'text-text-disabled bg-bg-elevated border-border-default',
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: components } = await supabase
    .from('components')
    .select('*, category:categories(name, slug)')
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false })

  const rows = (components ?? []) as unknown as {
    id: string
    slug: string
    name: string
    status: string
    like_count: number
    view_count: number
    bookmark_count: number
    created_at: string
    category: { name: string; slug: string }
  }[]

  return (
    <div>
      {rows.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-body text-text-muted">No components yet.</p>
          <Link href="/submit" className="mt-3 rounded-md bg-accent-violet px-4 py-2 text-small font-semibold text-white">
            Submit your first component
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-small">
            <thead>
              <tr className="border-b border-border-default text-text-muted">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Category</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">
                  <span className="flex items-center gap-1"><Heart className="h-3 w-3" /> Likes</span>
                </th>
                <th className="pb-3 pr-4 font-medium">
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> Views</span>
                </th>
                <th className="pb-3 font-medium">
                  <span className="flex items-center gap-1"><Bookmark className="h-3 w-3" /> Saved</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((comp) => (
                <tr key={comp.id} className="border-b border-border-default text-text-secondary hover:bg-bg-surface">
                  <td className="py-3 pr-4">
                    <Link href={`/components/${comp.slug}`} className="text-text-primary transition-colors hover:text-accent-violet">
                      {comp.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{comp.category?.name ?? '-'}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline rounded-pill border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[comp.status] ?? ''}`}>
                      {comp.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{comp.like_count}</td>
                  <td className="py-3 pr-4">{comp.view_count}</td>
                  <td className="py-3">{comp.bookmark_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
