import { createServerSupabaseClient } from '@/lib/supabase/server'
import { SubmissionWizard } from '@/components/submission/SubmissionWizard'

export const dynamic = 'force-dynamic'

export default async function SubmitPage() {
  const supabase = await createServerSupabaseClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-h1 text-text-primary">Submit a Component</h1>
      <p className="mt-1 text-body text-text-muted">
        Share your UI component with the ApexUI community.
      </p>
      <div className="mt-8">
        <SubmissionWizard categories={categories ?? []} />
      </div>
    </div>
  )
}
