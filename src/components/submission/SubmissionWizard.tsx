'use client'

import { useState, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Database } from '@/types/database.types'
import type { SubmissionFormData } from '@/types/api.types'
import { StepMetadata } from './StepMetadata'
import { StepCodeEditor } from './StepCodeEditor'
import { StepReview } from './StepReview'

type Category = Database['public']['Tables']['categories']['Row']

const INITIAL_DATA: SubmissionFormData = {
  name: '',
  description_short: '',
  description_long: '',
  category_id: 0,
  tags: [],
  tech: '' as SubmissionFormData['tech'],
  code: '',
  agreedToTerms: false,
}

interface SubmissionWizardProps {
  categories: Category[]
}

export function SubmissionWizard({ categories }: SubmissionWizardProps) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SubmissionFormData>(INITIAL_DATA)
  const [error, setError] = useState<string | null>(null)

  const updateData = (partial: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...partial } as SubmissionFormData))
  }

  const categoryName = categories.find((c) => c.id === formData.category_id)?.name ?? ''

  const handleSubmit = async () => {
    setError(null)
    const body = formData

    const res = await fetch('/api/components', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const json = await res.json()
    if (!res.ok || json.error) {
      setError(json.error ?? 'Submission failed')
      return
    }

    startTransition(() => {
      router.push(`/components/${json.data.slug}?submitted=true`)
    })
  }

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-small font-bold transition-colors ${
                s === step
                  ? 'bg-accent-violet text-white'
                  : s < step
                  ? 'bg-accent-teal text-white'
                  : 'border border-border-default text-text-muted'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            <span
              className={`hidden text-small md:inline ${
                s === step ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              {s === 1 ? 'Metadata' : s === 2 ? 'Code' : 'Review'}
            </span>
            {s < 3 && <div className="h-px w-8 bg-border-default" />}
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-md border border-accent-red/30 bg-accent-red/5 px-4 py-3 text-small text-accent-red">
          {error}
        </div>
      )}

      {/* Steps */}
      {step === 1 && (
        <StepMetadata
          formData={formData}
          categories={categories}
          onChange={updateData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <StepCodeEditor
          code={formData.code}
          tech={formData.tech}
          onCodeChange={(code) => updateData({ code })}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StepReview
          formData={formData}
          categoryName={categoryName}
          onBack={() => setStep(2)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
