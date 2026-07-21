'use client'

import { type ReactNode } from 'react'
import { CommandPalette } from '@/components/search/CommandPalette'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CommandPalette />
    </>
  )
}
