import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { AdminQueue } from './AdminQueue'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/?auth=required')

  // Check admin role
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: profile } = await (supabase.from('users') as any)
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/')

  const { data: pending } = await supabase
    .from('components')
    .select('*, creator:users!components_creator_id_fkey(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('status', 'pending_review')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-h2 text-text-primary">Moderation Queue</h1>
      <p className="mt-1 text-small text-text-muted">
        {pending?.length ?? 0} component{(pending?.length ?? 0) !== 1 ? 's' : ''} pending review
      </p>
      <div className="mt-6">
        <AdminQueue initialComponents={pending ?? []} />
      </div>
    </div>
  )
}
