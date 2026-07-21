'use client'

import type { Database } from '@/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']

interface StepMetadataProps {
  formData: {
    name: string
    description_short: string
    description_long: string
    category_id: number
    tags: string[]
    tech: string
  }
  categories: Category[]
  onChange: (data: Partial<StepMetadataProps['formData']>) => void
  onNext: () => void
}

const TECH_OPTIONS = [
  { value: 'html_css', label: 'HTML + CSS' },
  { value: 'tailwind', label: 'Tailwind CSS' },
  { value: 'react_jsx', label: 'React / JSX' },
  { value: 'vue', label: 'Vue' },
]

export function StepMetadata({ formData, categories, onChange, onNext }: StepMetadataProps) {
  const canNext =
    formData.name.length >= 2 &&
    formData.name.length <= 60 &&
    formData.description_short.length >= 1 &&
    formData.description_short.length <= 200 &&
    formData.category_id > 0 &&
    formData.tech !== ''

  return (
    <div className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="name">
          Component Name *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Neon Pulse Button"
          maxLength={60}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
        <p className="mt-1 text-xs text-text-muted">{formData.name.length}/60</p>
      </div>

      {/* Short Description */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="description_short">
          Short Description *
        </label>
        <input
          id="description_short"
          type="text"
          value={formData.description_short}
          onChange={(e) => onChange({ description_short: e.target.value })}
          placeholder="Briefly describe what this component does"
          maxLength={200}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
        <p className="mt-1 text-xs text-text-muted">{formData.description_short.length}/200</p>
      </div>

      {/* Long Description */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="description_long">
          Description (optional)
        </label>
        <textarea
          id="description_long"
          value={formData.description_long}
          onChange={(e) => onChange({ description_long: e.target.value })}
          placeholder="Detailed usage notes, props, customization tips..."
          maxLength={2000}
          rows={4}
          className="w-full resize-none rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        />
        <p className="mt-1 text-xs text-text-muted">{formData.description_long.length}/2000</p>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1.5 block text-label text-text-primary" htmlFor="category_id">
          Category *
        </label>
        <select
          id="category_id"
          value={formData.category_id}
          onChange={(e) => onChange({ category_id: Number(e.target.value) })}
          className="w-full rounded-md border border-border-default bg-bg-surface px-3 py-2 text-body text-text-primary outline-none transition-colors focus:border-accent-violet focus:ring-1 focus:ring-accent-violet"
        >
          <option value={0}>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tech */}
      <div>
        <span className="mb-1.5 block text-label text-text-primary">Technology *</span>
        <div className="flex flex-wrap gap-2">
          {TECH_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ tech: opt.value })}
              className={`rounded-md border px-4 py-2 text-small font-medium transition-colors ${
                formData.tech === opt.value
                  ? 'border-accent-violet bg-accent-violet/10 text-accent-violet'
                  : 'border-border-default bg-bg-surface text-text-secondary hover:border-border-focus'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next */}
      <button
        type="button"
        disabled={!canNext}
        onClick={onNext}
        className="self-end rounded-md bg-accent-violet px-6 py-2 text-label font-semibold text-white transition-colors hover:bg-accent-violet-hover disabled:opacity-40"
      >
        Next &rarr;
      </button>
    </div>
  )
}
