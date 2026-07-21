'use client'

import { type ReactNode, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'
import { CommandPalette } from '@/components/search/CommandPalette'
import { AuthModal } from '@/components/auth/AuthModal'

export function Providers({ children }: { children: ReactNode }) {
  const { setUser, setSession, setLoading } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [setUser, setSession, setLoading])

  return (
    <>
      {children}
      <CommandPalette />
      <AuthModal />
    </>
  )
}
