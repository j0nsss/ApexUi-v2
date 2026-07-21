import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { ComponentWithMeta } from '@/types/component.types'

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

  const components: ComponentWithMeta[] = (data ?? []).map((item: unknown) => {
    const row = item as Record<string, unknown>
    return {
      ...row,
      tags: [],
      is_liked: false,
      is_bookmarked: false,
    } as unknown as ComponentWithMeta
  })

  return NextResponse.json({
    data: components,
    error: null,
    totalCount: count ?? 0,
  })
}
