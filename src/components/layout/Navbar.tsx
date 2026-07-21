'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import { useAuthStore } from '@/store/authStore'

const CATEGORY_LINKS = [
  { label: 'Buttons', href: '/?category=buttons' },
  { label: 'Cards', href: '/?category=cards' },
  { label: 'Loaders', href: '/?category=loaders' },
  { label: 'Forms', href: '/?category=forms' },
  { label: 'Inputs', href: '/?category=inputs' },
  { label: 'Navbars', href: '/?category=navbars' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, openAuthModal } = useAuthStore()

  return (
    <header
      className="sticky top-0 z-50 border-b border-border-default"
      style={{ background: 'rgba(9, 9, 11, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-text-primary">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-violet text-xs font-bold text-white">A</span>
          ApexUI
        </Link>

        {/* Center: Category links (desktop) */}
        <div className="hidden md:flex md:items-center md:gap-1">
          {CATEGORY_LINKS.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="rounded-md px-3 py-1.5 text-small text-text-secondary transition-colors hover:text-text-primary"
            >
              {cat.label}
            </Link>
          ))}
          <Link
            href="/?category=badges"
            className="rounded-md px-3 py-1.5 text-small text-text-secondary transition-colors hover:text-text-primary"
          >
            More
            <ChevronDown className="ml-0.5 inline h-3 w-3" />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Ctrl+K search trigger */}
          <button
            type="button"
            onClick={() => useSearchStore.getState().openPalette()}
            className="hidden items-center gap-2 rounded-md border border-border-default px-3 py-1.5 text-small text-text-muted transition-colors hover:text-text-secondary sm:flex"
            aria-label="Open search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search...</span>
            <kbd className="ml-1 rounded border border-border-default bg-bg-surface px-1.5 py-0.5 text-xs text-text-disabled">
              Ctrl+K
            </kbd>
          </button>

          {/* Sign In / Avatar */}
          {user ? (
            <Link
              href="/dashboard"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-violet/20 text-small font-semibold text-accent-violet"
              aria-label="Dashboard"
            >
              {user.email?.charAt(0).toUpperCase() ?? 'U'}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="hidden rounded-md px-3 py-1.5 text-small font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-block"
            >
              Sign In
            </button>
          )}

          {/* Submit CTA */}
          <Link
            href="/submit"
            className="rounded-md bg-accent-violet px-4 py-1.5 text-small font-semibold text-white transition-colors hover:bg-accent-violet-hover"
          >
            Submit
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="flex md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5 text-text-primary" />
          </button>
        </div>
      </nav>

      {/* Mobile Sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-bg-surface border-l border-border-default p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold text-text-primary">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-text-primary" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {CATEGORY_LINKS.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-body text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
                >
                  {cat.label}
                </Link>
              ))}
              <hr className="my-2 border-border-default" />
              {!user && (
                <button
                  type="button"
                  onClick={() => { openAuthModal(); setMobileOpen(false) }}
                  className="rounded-md px-3 py-2 text-left text-body text-text-secondary transition-colors hover:bg-bg-elevated hover:text-text-primary"
                >
                  Sign In
                </button>
              )}
              <Link
                href="/submit"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-md bg-accent-violet px-4 py-2.5 text-center text-body font-semibold text-white hover:bg-accent-violet-hover"
              >
                Submit a Component
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
