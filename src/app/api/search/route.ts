import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { checkSearchRateLimit } from '@/lib/rate-limit-helpers'
import type { ApiResponse } from '@/types/api.types'

export async function GET(request: NextRequest) {
  const rateLimitResponse = await checkSearchRateLimit(request)
  if (rateLimitResponse) return rateLimitResponse

  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category')

  if (!q.trim()) {
    return NextResponse.json<ApiResponse<never[]>>({ data: [], error: null })
  }

  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('components')
    .select('*, creator:users(username, display_name, avatar_url), category:categories(name, slug, icon)')
    .eq('status', 'published')
    .ilike('name', `%${q}%`)
    .order('like_count', { ascending: false })
    .limit(20)

  if (category) {
    query = query.eq('category.slug', category)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json<ApiResponse<null>>({ data: null, error: error.message }, { status: 500 })
  }

  const results = (data ?? []).map((item: unknown) => {
    const row = item as Record<string, unknown>
    return {
      ...row,
      tags: [],
      is_liked: false,
      is_bookmarked: false,
    } as never
  })

  return NextResponse.json<ApiResponse<never[]>>({ data: results, error: null })
}
