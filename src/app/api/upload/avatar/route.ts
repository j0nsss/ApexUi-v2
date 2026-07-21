import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('avatar') as File | null

  if (!file) {
    return NextResponse.json({ data: null, error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ data: null, error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 })
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ data: null, error: 'File too large. Max 2MB.' }, { status: 400 })
  }

  const ext = file.type.split('/')[1]
  const filePath = `${user.id}/${Date.now()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json({ data: null, error: uploadError.message }, { status: 500 })
  }

  const { data: publicUrl } = supabase.storage.from('avatars').getPublicUrl(filePath)

  // Update user profile
  await supabase.from('users').update({ avatar_url: publicUrl.publicUrl } as never).eq('id', user.id)

  return NextResponse.json({ data: { url: publicUrl.publicUrl }, error: null })
}
