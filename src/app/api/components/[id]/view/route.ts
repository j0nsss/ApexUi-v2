import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieName = `viewed_${params.id}`
  const existingCookie = request.cookies.get(cookieName)

  if (existingCookie) {
    return new NextResponse(null, { status: 204 })
  }

  const supabase = await createServerSupabaseClient()

  const { data } = await supabase
    .from('components')
    .select('view_count')
    .eq('id', params.id)
    .single()

  if (data) {
    await supabase.rpc('increment_view_count' as never, {
      component_id: params.id,
    } as never)
  }

  const response = new NextResponse(null, { status: 204 })
  response.cookies.set(cookieName, '1', {
    maxAge: 86400,
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })

  return response
}
