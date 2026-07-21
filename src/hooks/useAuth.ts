'use client'

import { useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

const ORIGIN = typeof window !== 'undefined' ? window.location.origin : ''

export function useAuth() {
  const { user, session, isLoading, openAuthModal } = useAuthStore()

  const signInWithGitHub = useCallback(async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${ORIGIN}/auth/callback` },
    })
    if (error) console.error('GitHub sign-in error:', error.message)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${ORIGIN}/auth/callback` },
    })
    if (error) console.error('Google sign-in error:', error.message)
  }, [])

  const signOut = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
  }, [])

  return {
    user,
    session,
    isLoading,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
    openAuthModal,
  }
}
