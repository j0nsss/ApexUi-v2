'use client'

import { useRef, useState, useMemo } from 'react'
import { sanitizeForPreview } from '@/lib/sanitize'
import { PreviewErrorBoundary } from './PreviewErrorBoundary'

const CSP = "default-src 'self'; style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com https://cdnjs.cloudflare.com; img-src 'self' data:;"

interface ComponentPreviewProps {
  previewHtml: string
  title: string
  minHeight?: number
  maxWidth?: number | string
}

export function ComponentPreview({ previewHtml, title, minHeight = 200, maxWidth = '100%' }: ComponentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [error, setError] = useState(false)

  // Client-side sanitize (defense in depth)
  const safeHtml = useMemo(() => sanitizeForPreview(previewHtml), [previewHtml])

  const handleError = () => setError(true)

  if (error) {
    return (
      <PreviewErrorBoundary>
        <div className="flex min-h-[200px] items-center justify-center bg-[#0D0D10] text-center">
          <p className="text-small text-text-muted">Preview failed to load</p>
        </div>
      </PreviewErrorBoundary>
    )
  }

  return (
    <PreviewErrorBoundary>
      <div
        className="overflow-hidden rounded-inner"
        style={{ maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }}
      >
        <iframe
          ref={iframeRef}
          srcDoc={safeHtml}
          title={`Live preview of ${title}`}
          sandbox="allow-scripts"
          loading="lazy"
          {...{ csp: CSP }}
          onError={handleError}
          className="w-full"
          style={{
            border: 'none',
            minHeight: `${minHeight}px`,
            background: '#0D0D10',
            display: 'block',
          }}
        />
      </div>
    </PreviewErrorBoundary>
  )
}
