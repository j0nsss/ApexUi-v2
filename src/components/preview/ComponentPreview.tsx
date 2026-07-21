'use client'

import { useRef, useState } from 'react'
import { PreviewErrorBoundary } from './PreviewErrorBoundary'

interface ComponentPreviewProps {
  previewHtml: string
  title: string
  minHeight?: number
  maxWidth?: number | string
}

export function ComponentPreview({ previewHtml, title, minHeight = 200, maxWidth = '100%' }: ComponentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [error, setError] = useState(false)

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
          srcDoc={previewHtml}
          title={`Live preview of ${title}`}
          sandbox="allow-scripts"
          loading="lazy"
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
