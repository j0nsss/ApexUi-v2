'use client'

import { useState } from 'react'
import { ComponentPreview } from '@/components/preview/ComponentPreview'
import { PreviewWidthControls, getPreviewWidthPx } from '@/components/preview/PreviewWidthControls'
import type { PreviewWidth } from '@/components/preview/PreviewWidthControls'

interface PreviewWidthControlsWrapperProps {
  previewHtml: string
  title: string
}

export function PreviewWidthControlsWrapper({ previewHtml, title }: PreviewWidthControlsWrapperProps) {
  const [width, setWidth] = useState<PreviewWidth>('desktop')
  const maxWidth = getPreviewWidthPx(width) || '100%'

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <PreviewWidthControls value={width} onChange={setWidth} />
      </div>
      <ComponentPreview
        previewHtml={previewHtml}
        title={title}
        minHeight={400}
        maxWidth={maxWidth}
      />
    </div>
  )
}
