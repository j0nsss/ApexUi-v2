'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class PreviewErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Preview error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            className="flex min-h-[200px] flex-col items-center justify-center rounded-inner bg-[#0D0D10] text-center"
            role="alert"
          >
            <AlertTriangle className="mb-2 h-6 w-6 text-text-muted" />
            <p className="text-small text-text-muted">Preview unavailable</p>
          </div>
        )
      )
    }

    return this.props.children
  }
}
