import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Globe, Github, Twitter } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { ComponentCard } from '@/components/component-card/ComponentCard'
import type { ComponentWithMeta } from '@/types/component.types'

interface PageProps {
  params: { username: string }
}

export const revalidate = 3600

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase
    .from('users')
    .select('display_name, bio')
    .eq('username', params.username)
    .single()

  const profile = data as Record<string, unknown> | null
  if (!profile) return {}

  return {
    title: `${profile.display_name as string} | ApexUI`,
    description: (profile.bio as string) ?? `Creator profile on ApexUI`,
  }
}

export default async function CreatorProfilePage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()

  const { data: userResult } = await supabase
    .from('users')
    .select('*')
    .eq('username', params.username)
    .single()

  const profile = userResult as Record<string, unknown> | null
  if (!profile) notFound()

  const displayName = profile.display_name as string
  const username = profile.username as string
  const bio = profile.bio as string | null
  const roleTag = profile.role_tag as string | null
  const websiteUrl = profile.website_url as string | null
  const githubUrl = profile.github_url as string | null
  const twitterUrl = profile.twitter_url as string | null

  // Fetch published components by this creator
  const { data: compsData } = await supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('creator_id', profile.id as string)
    .eq('status', 'published')
    .order('like_count', { ascending: false })

  const components = ((compsData ?? []) as Record<string, unknown>[]).map((item) => ({
    ...item,
    tags: [],
    is_liked: false,
    is_bookmarked: false,
  })) as unknown as ComponentWithMeta[]

  const totalLikes = components.reduce((sum, c) => sum + c.like_count, 0)
  const totalBookmarks = components.reduce((sum, c) => sum + c.bookmark_count, 0)

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile header */}
      <div className="flex flex-col items-center gap-4 border-b border-border-default pb-8 text-center sm:flex-row sm:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent-violet/20 text-2xl font-bold text-accent-violet">
          {displayName?.charAt(0) ?? '?'}
        </div>

        <div className="flex-1">
          <h1 className="text-h1 text-text-primary">{displayName}</h1>
          <p className="text-small text-text-muted">@{username}</p>

          {roleTag && (
            <span className="mt-1 inline-block rounded-pill border border-border-default bg-bg-surface px-3 py-0.5 text-xs text-text-secondary">
              {roleTag}
            </span>
          )}

          {bio && (
            <p className="mt-2 max-w-lg text-body text-text-secondary">{bio}</p>
          )}

          {/* Social links */}
          <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
            {websiteUrl && (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-text-secondary" aria-label="Website">
                <Globe className="h-4 w-4" />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-text-secondary" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            )}
            {twitterUrl && (
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-text-muted transition-colors hover:text-text-secondary" aria-label="Twitter / X">
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex shrink-0 gap-6 text-center">
          <div>
            <p className="text-h3 text-text-primary">{components.length}</p>
            <p className="text-xs text-text-muted">Components</p>
          </div>
          <div>
            <p className="text-h3 text-text-primary">{totalLikes}</p>
            <p className="text-xs text-text-muted">Likes</p>
          </div>
          <div>
            <p className="text-h3 text-text-primary">{totalBookmarks}</p>
            <p className="text-xs text-text-muted">Bookmarks</p>
          </div>
        </div>
      </div>

      {/* Component grid */}
      <div className="mt-8">
        {components.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <p className="text-body text-text-muted">No published components yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {components.map((comp) => (
              <ComponentCard key={comp.id} component={comp} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
