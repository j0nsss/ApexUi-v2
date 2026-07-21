import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const { component_id } = await request.json()
  if (!component_id) {
    return NextResponse.json({ data: null, error: 'component_id is required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('bookmarks') as any)
    .insert({ user_id: user.id, component_id })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ data: null, error: 'Already bookmarked' }, { status: 409 })
    }
    return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: { bookmarked: true }, error: null })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const { component_id } = await request.json()
  if (!component_id) {
    return NextResponse.json({ data: null, error: 'component_id is required' }, { status: 400 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('bookmarks') as any)
    .delete()
    .eq('user_id', user.id)
    .eq('component_id', component_id)

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: { bookmarked: false }, error: null })
}
