export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface SubmissionFormData {
  name: string
  description_short: string
  description_long: string
  category_id: number
  tags: string[]
  tech: 'html_css' | 'tailwind' | 'react_jsx' | 'vue'
  code: string
  agreedToTerms: boolean
}
