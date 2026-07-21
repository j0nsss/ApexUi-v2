import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/?auth=required')
  }

  const tabs = [
    { label: 'My Components', href: '/dashboard', exact: true },
    { label: 'Bookmarks', href: '/dashboard/bookmarks', exact: false },
    { label: 'Settings', href: '/dashboard/settings', exact: false },
  ]

  return (
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-h1 text-text-primary">Dashboard</h1>

      {/* Tab navigation */}
      <nav className="mt-6 flex gap-1 border-b border-border-default" aria-label="Dashboard tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-t-md px-4 py-2 text-small font-medium text-text-muted transition-colors hover:text-text-primary"
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6">{children}</div>
    </main>
  )
}
