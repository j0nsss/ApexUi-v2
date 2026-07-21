import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { PreviewWidthControlsWrapper } from './PreviewWidthControlsWrapper'
import { CodePanel } from '@/components/code-panel/CodePanel'
import { EngagementButtons } from './EngagementButtons'

interface PageProps {
  params: { slug: string }
}

export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = await createServerSupabaseClient()
  const { data: result } = await supabase
    .from('components')
    .select('name, description_short')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  const meta = result as Record<string, unknown> | null
  if (!meta) return {}

  return {
    title: meta.name as string,
    description: meta.description_short as string,
    openGraph: {
      title: `${meta.name as string} | ApexUI`,
      description: meta.description_short as string,
    },
  }
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const supabase = await createServerSupabaseClient()

  const { data: result, error } = await supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single()

  if (error || !result) {
    notFound()
  }

  const componentRow = result as Record<string, unknown>
  const comp = {
    id: componentRow.id as string,
    slug: componentRow.slug as string,
    name: componentRow.name as string,
    description_short: componentRow.description_short as string,
    description_long: componentRow.description_long as string | null,
    preview_html: componentRow.preview_html as string,
    code_html: componentRow.code_html as string | null,
    code_tailwind: componentRow.code_tailwind as string | null,
    code_react: componentRow.code_react as string | null,
    code_vue: componentRow.code_vue as string | null,
    tech: componentRow.tech as string,
    like_count: componentRow.like_count as number,
    bookmark_count: componentRow.bookmark_count as number,
    view_count: componentRow.view_count as number,
    created_at: componentRow.created_at as string,
    category_id: componentRow.category_id as number,
    category: componentRow.category as { name: string; slug: string; icon: string | null },
    creator: componentRow.creator as { username: string; display_name: string; avatar_url: string | null } | null,
  }

  // Fetch related components (same category, exclude current)
  const { data: relatedResult } = await supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('status', 'published')
    .eq('category_id', comp.category_id)
    .neq('slug', params.slug)
    .order('like_count', { ascending: false })
    .limit(4)

  const relatedComponents: typeof comp[] = ((relatedResult ?? []) as Record<string, unknown>[]).map((r) => ({
    id: r.id as string,
    slug: r.slug as string,
    name: r.name as string,
    description_short: r.description_short as string,
    description_long: r.description_long as string | null,
    preview_html: r.preview_html as string,
    code_html: r.code_html as string | null,
    code_tailwind: r.code_tailwind as string | null,
    code_react: r.code_react as string | null,
    code_vue: r.code_vue as string | null,
    tech: r.tech as string,
    like_count: r.like_count as number,
    bookmark_count: r.bookmark_count as number,
    view_count: r.view_count as number,
    created_at: r.created_at as string,
    category_id: r.category_id as number,
    category: r.category as { name: string; slug: string; icon: string | null },
    creator: r.creator as { username: string; display_name: string; avatar_url: string | null } | null,
  }))

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-small text-text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-text-secondary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-text-secondary">{comp.name}</span>
      </nav>

      {/* Main layout: preview (60%) + code panel (40%) */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left: Preview area */}
        <div className="flex-1 lg:w-3/5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-h1 text-text-primary">{comp.name}</h1>
              <div className="mt-1 flex items-center gap-3 text-small text-text-muted">
                <span className="category-chip pointer-events-none text-xs">{comp.category.name}</span>
                <span>{comp.tech.replace('_', ' / ').toUpperCase()}</span>
                <span>{comp.like_count} likes</span>
                <span>{comp.view_count} views</span>
              </div>
            </div>
          </div>

          <PreviewWidthControlsWrapper
            previewHtml={comp.preview_html}
            title={comp.name}
          />
        </div>

        {/* Right: Code panel */}
        <div className="lg:w-2/5">
          <CodePanel
            codeHtml={comp.code_html}
            codeTailwind={comp.code_tailwind}
            codeReact={comp.code_react}
            codeVue={comp.code_vue}
          />
          <div className="mt-4 flex items-center gap-4">
            <EngagementButtons componentId={comp.id} />
          </div>
        </div>
      </div>

      {/* Description */}
      {comp.description_long && (
        <div className="mt-8 max-w-3xl">
          <h2 className="text-h2 text-text-primary">About this component</h2>
          <p className="mt-2 text-body text-text-secondary">{comp.description_long}</p>
        </div>
      )}

      {/* Creator credit */}
      {comp.creator && (
        <div className="mt-8 flex items-center gap-3 rounded-card border border-border-default bg-bg-surface p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-violet/20 text-sm font-semibold text-accent-violet">
            {comp.creator.display_name?.charAt(0) ?? '?'}
          </div>
          <div>
            <p className="text-label text-text-primary">{comp.creator.display_name}</p>
            <Link
              href={`/creators/${comp.creator.username}`}
              className="text-small text-text-muted hover:text-text-secondary"
            >
              @{comp.creator.username}
            </Link>
          </div>
        </div>
      )}

      {/* Related components */}
      {relatedComponents.length > 0 && (
        <section className="mt-12">
          <h2 className="text-h2 text-text-primary">Related Components</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedComponents.map((rc) => (
              <Link
                key={rc.id}
                href={`/components/${rc.slug}`}
                className="component-card overflow-hidden"
              >
                <div className="flex h-32 items-center justify-center overflow-hidden bg-[#0D0D10]">
                  <iframe
                    srcDoc={rc.preview_html}
                    title={`Preview of ${rc.name}`}
                    sandbox="allow-scripts"
                    loading="lazy"
                    className="h-full w-full"
                    style={{ border: 'none', background: '#0D0D10' }}
                  />
                </div>
                <div className="p-3">
                  <h3 className="truncate text-h3 text-text-primary">{rc.name}</h3>
                  <p className="mt-1 text-small text-text-muted">{rc.like_count} likes</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
