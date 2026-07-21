'use client'

import { Smartphone, Tablet, Monitor } from 'lucide-react'

export type PreviewWidth = 'mobile' | 'tablet' | 'desktop'

const WIDTH_MAP: Record<PreviewWidth, number> = {
  mobile: 375,
  tablet: 768,
  desktop: 0,
}

interface PreviewWidthControlsProps {
  value: PreviewWidth
  onChange: (width: PreviewWidth) => void
}

const OPTIONS: { key: PreviewWidth; icon: typeof Smartphone; label: string }[] = [
  { key: 'mobile', icon: Smartphone, label: 'Mobile (375px)' },
  { key: 'tablet', icon: Tablet, label: 'Tablet (768px)' },
  { key: 'desktop', icon: Monitor, label: 'Desktop (100%)' },
]

export function PreviewWidthControls({ value, onChange }: PreviewWidthControlsProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-bg-surface p-1">
      {OPTIONS.map((opt) => {
        const Icon = opt.icon
        const isActive = value === opt.key
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            className={`rounded-md p-1.5 transition-colors ${
              isActive
                ? 'bg-accent-violet/10 text-accent-violet shadow-sm'
                : 'text-text-muted hover:text-text-secondary'
            }`}
            aria-label={opt.label}
            aria-pressed={isActive}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}

export function getPreviewWidthPx(width: PreviewWidth): number {
  return WIDTH_MAP[width]
}
