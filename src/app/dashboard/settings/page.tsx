import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SettingsForm } from './SettingsForm'

export const revalidate = 0

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const profileData = profile as Record<string, unknown> | null
  if (!profileData) notFound()

  return (
    <div className="max-w-xl">
      <h2 className="text-h2 text-text-primary">Account Settings</h2>
      <p className="mt-1 text-small text-text-muted">Update your public profile information.</p>
      <div className="mt-6">
        <SettingsForm
          initialData={{
            display_name: profileData.display_name as string,
            bio: (profileData.bio as string) ?? '',
            website_url: (profileData.website_url as string) ?? '',
            github_url: (profileData.github_url as string) ?? '',
            twitter_url: (profileData.twitter_url as string) ?? '',
            role_tag: (profileData.role_tag as string) ?? '',
          }}
        />
      </div>
    </div>
  )
}
