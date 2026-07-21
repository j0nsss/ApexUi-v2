import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { generateSlug } from '@/lib/slug'
import { sanitizeForStorage } from '@/lib/sanitize'
import { buildHtmlCssPreview, buildTailwindPreview, buildReactPreview } from '@/lib/preview-builder'
import type { ComponentWithMeta } from '@/types/component.types'
import type { SubmissionFormData } from '@/types/api.types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const sort = searchParams.get('sort') ?? 'trending'
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '12', 10)))
  const offset = (page - 1) * limit

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)', { count: 'exact' })
    .eq('status', 'published')

  if (category) {
    query = query.eq('category.slug', category)
  }

  switch (sort) {
    case 'latest':
      query = query.order('created_at', { ascending: false })
      break
    case 'liked':
      query = query.order('like_count', { ascending: false })
      break
    case 'bookmarked':
      query = query.order('bookmark_count', { ascending: false })
      break
    case 'trending':
    default:
      query = query.order('like_count', { ascending: false }).order('view_count', { ascending: false })
      break
  }

  const { data, error, count } = await query.range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  }

  // Fetch engagement state for authenticated users
  const { data: { user } } = await supabase.auth.getUser()
  const compIds = (data ?? []).map((c: Record<string, unknown>) => c.id as string)
  let likedIds = new Set<string>()
  let bookmarkedIds = new Set<string>()

  if (user && compIds.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: likes } = await (supabase.from('likes') as any)
      .select('component_id')
      .eq('user_id', user.id)
      .in('component_id', compIds)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: bookmarks } = await (supabase.from('bookmarks') as any)
      .select('component_id')
      .eq('user_id', user.id)
      .in('component_id', compIds)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (likes) likedIds = new Set((likes as any[]).map((l: any) => l.component_id))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (bookmarks) bookmarkedIds = new Set((bookmarks as any[]).map((b: any) => b.component_id))
  }

  const components: ComponentWithMeta[] = (data ?? []).map((item: unknown) => {
    const row = item as Record<string, unknown>
    return {
      ...row,
      tags: [],
      is_liked: likedIds.has(row.id as string),
      is_bookmarked: bookmarkedIds.has(row.id as string),
    } as unknown as ComponentWithMeta
  })

  return NextResponse.json({
    data: components,
    error: null,
    totalCount: count ?? 0,
  })
}

const TECH_LIST = ['html_css', 'tailwind', 'react_jsx', 'vue'] as const

function buildPreviewHtml(code: string, tech: string): string {
  switch (tech) {
    case 'tailwind':
      return buildTailwindPreview(code)
    case 'react_jsx':
      return buildReactPreview(code)
    default:
      return buildHtmlCssPreview(code)
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (!user || authError) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const body: SubmissionFormData = await request.json()

  // Validation
  if (!body.name || body.name.length < 2 || body.name.length > 60) {
    return NextResponse.json({ data: null, error: 'Name must be between 2-60 characters' }, { status: 400 })
  }
  if (!body.description_short || body.description_short.length > 200) {
    return NextResponse.json({ data: null, error: 'Short description is required (max 200 chars)' }, { status: 400 })
  }
  if (body.description_long && body.description_long.length > 2000) {
    return NextResponse.json({ data: null, error: 'Long description max 2000 characters' }, { status: 400 })
  }
  if (!body.category_id) {
    return NextResponse.json({ data: null, error: 'Category is required' }, { status: 400 })
  }
  if (!body.tech || !(TECH_LIST as readonly string[]).includes(body.tech)) {
    return NextResponse.json({ data: null, error: 'Valid technology selection is required' }, { status: 400 })
  }
  if (!body.code || body.code.length < 1 || body.code.length > 50000) {
    return NextResponse.json({ data: null, error: 'Code is required (max 50,000 chars)' }, { status: 400 })
  }
  if (!body.agreedToTerms) {
    return NextResponse.json({ data: null, error: 'You must agree to the terms' }, { status: 400 })
  }

  const slug = generateSlug(body.name)

  // Check slug uniqueness
  const { data: existing } = await supabase
    .from('components')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  const finalSlug = existing ? `${slug}-${Date.now()}` : slug

  // Sanitize code and build preview
  const sanitizedCode = sanitizeForStorage(body.code)
  const previewHtml = buildPreviewHtml(sanitizedCode, body.tech)

  const adminClient = createSupabaseAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = adminClient.from('components') as any

  const { error: insertError } = await db
    .insert({
      name: body.name,
      slug: finalSlug,
      description_short: body.description_short,
      description_long: body.description_long || null,
      category_id: body.category_id,
      tech: body.tech,
      code_html: body.tech === 'html_css' ? sanitizedCode : null,
      code_tailwind: body.tech === 'tailwind' ? sanitizedCode : null,
      code_react: body.tech === 'react_jsx' ? sanitizedCode : null,
      code_vue: body.tech === 'vue' ? sanitizedCode : null,
      preview_html: previewHtml,
      creator_id: user.id,
      status: 'pending_review',
    })
    .select('slug')
    .single()

  if (insertError) {
    return NextResponse.json({ data: null, error: insertError.message }, { status: 500 })
  }

  // Insert tags
  if (body.tags && body.tags.length > 0) {
    const tagRows = body.tags.map((tag) => ({
      component_slug: finalSlug,
      tag: tag.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ''),
    })).filter((t) => t.tag.length > 0)

    if (tagRows.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (adminClient.from('component_tags') as any).insert(tagRows)
    }
  }

  return NextResponse.json({ data: { slug: finalSlug }, error: null }, { status: 201 })
}
