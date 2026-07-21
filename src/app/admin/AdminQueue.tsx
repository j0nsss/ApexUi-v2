'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ComponentPreview } from '@/components/preview/ComponentPreview'

interface PendingComponent {
  id: number
  name: string
  slug: string
  description_short: string
  preview_html: string | null
  tech: string | null
  created_at: string
  creator: { username: string | null; display_name: string | null; avatar_url: string | null } | null
  category: { name: string; slug: string; icon: string | null } | null
}

interface AdminQueueProps {
  initialComponents: PendingComponent[]
}

export function AdminQueue({ initialComponents }: AdminQueueProps) {
  const router = useRouter()
  const [components, setComponents] = useState(initialComponents)

  const handleAction = async (id: number, action: 'approve' | 'reject') => {
    const res = await fetch(`/api/admin/components/${id}/${action}`, { method: 'POST' })
    if (res.ok) {
      setComponents((prev) => prev.filter((c) => c.id !== id))
      router.refresh()
    } else {
      const json = await res.json()
      alert(json.error ?? `Failed to ${action}`)
    }
  }

  if (components.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-2 text-text-muted">
        <span className="text-h3">🏆</span>
        <p className="text-body">All caught up! No components pending review.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {components.map((c) => (
        <div
          key={c.id}
          className="flex flex-col rounded-card border border-border-default bg-bg-surface"
        >
          {/* Preview */}
          <div className="overflow-hidden rounded-t-card border-b border-border-default">
            <ComponentPreview
              previewHtml={c.preview_html ?? ''}
              title={c.name}
              minHeight={180}
            />
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-label font-semibold text-text-primary">{c.name}</h3>
              <span className="shrink-0 rounded-pill bg-accent-amber/10 px-2 py-0.5 text-xs text-accent-amber">
                {c.tech ?? 'unknown'}
              </span>
            </div>

            {c.category && (
              <span className="text-xs text-text-muted">{c.category.icon} {c.category.name}</span>
            )}

            <p className="line-clamp-2 text-small text-text-secondary">
              {c.description_short}
            </p>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-text-muted">
                {c.creator?.display_name ?? c.creator?.username ?? 'Unknown'}
              </span>
              <span className="text-xs text-text-muted">
                {new Date(c.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Actions */}
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => handleAction(c.id, 'approve')}
                className="flex-1 rounded-md bg-accent-teal px-3 py-1.5 text-small font-semibold text-white transition-colors hover:bg-accent-teal/90"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => handleAction(c.id, 'reject')}
                className="flex-1 rounded-md bg-accent-red px-3 py-1.5 text-small font-semibold text-white transition-colors hover:bg-accent-red/90"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
