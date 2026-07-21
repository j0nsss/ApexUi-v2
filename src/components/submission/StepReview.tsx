'use client'

import { useState } from 'react'
import { ComponentPreview } from '@/components/preview/ComponentPreview'
import { buildHtmlCssPreview, buildTailwindPreview, buildReactPreview } from '@/lib/preview-builder'

interface StepReviewProps {
  formData: {
    name: string
    description_short: string
    description_long: string
    category_id: number
    tags: string[]
    tech: string
    code: string
    agreedToTerms: boolean
  }
  categoryName: string
  onBack: () => void
  onSubmit: () => Promise<void>
}

const TECH_LABELS: Record<string, string> = {
  html_css: 'HTML + CSS',
  tailwind: 'Tailwind CSS',
  react_jsx: 'React / JSX',
  vue: 'Vue',
}

export function StepReview({ formData, categoryName, onBack, onSubmit }: StepReviewProps) {
  const [submitting, setSubmitting] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const previewHtml = (() => {
    switch (formData.tech) {
      case 'tailwind':
        return buildTailwindPreview(formData.code)
      case 'react_jsx':
        return buildReactPreview(formData.code)
      default:
        return buildHtmlCssPreview(formData.code)
    }
  })()

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await onSubmit()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary card */}
      <div className="rounded-card border border-border-default bg-bg-surface p-4">
        <h3 className="text-h3 text-text-primary">{formData.name}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-pill border border-border-default bg-bg-elevated px-2.5 py-0.5 text-xs text-text-secondary">
            {categoryName}
          </span>
          <span className="rounded-pill border border-border-default bg-bg-elevated px-2.5 py-0.5 text-xs text-text-secondary">
            {TECH_LABELS[formData.tech] ?? formData.tech}
          </span>
        </div>
        <p className="mt-2 text-small text-text-secondary">{formData.description_short}</p>
        {formData.description_long && (
          <p className="mt-2 text-small text-text-muted">{formData.description_long}</p>
        )}
        {formData.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {formData.tags.map((tag) => (
              <span key={tag} className="rounded-pill bg-accent-violet/10 px-2 py-0.5 text-xs text-accent-violet">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Preview */}
      <div>
        <p className="mb-2 text-label text-text-primary">Preview</p>
        <ComponentPreview previewHtml={previewHtml} title={formData.name} minHeight={300} />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2.5 text-small text-text-secondary">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border-default bg-bg-surface text-accent-violet accent-accent-violet"
        />
        <span>
          I confirm this is my original work and I am licensing it under the MIT License.
        </span>
      </label>

      {/* Nav buttons */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-border-default bg-bg-surface px-6 py-2 text-label font-medium text-text-primary transition-colors hover:bg-bg-elevated"
        >
          &larr; Back
        </button>
        <button
          type="button"
          disabled={!agreed || submitting}
          onClick={handleSubmit}
          className="rounded-md bg-accent-violet px-8 py-2 text-label font-semibold text-white transition-colors hover:bg-accent-violet-hover disabled:opacity-40"
        >
          {submitting ? 'Submitting...' : 'Submit for Review'}
        </button>
      </div>
    </div>
  )
}
