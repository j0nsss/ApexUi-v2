import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function PATCH(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { display_name, bio, website_url, github_url, twitter_url, role_tag } = body

  const updates: Record<string, unknown> = {}

  if (typeof display_name === 'string' && display_name.length >= 1 && display_name.length <= 80) {
    updates.display_name = display_name
  }
  if (typeof bio === 'string' && bio.length <= 300) {
    updates.bio = bio
  }
  if (typeof website_url === 'string') updates.website_url = website_url
  if (typeof github_url === 'string') updates.github_url = github_url
  if (typeof twitter_url === 'string') updates.twitter_url = twitter_url
  if (typeof role_tag === 'string') updates.role_tag = role_tag

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ data: null, error: 'No valid fields to update.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('users')
    .update(updates as never)
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ data: null, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: updates, error: null })
}
