'use client'

import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { copyToClipboard } from '@/lib/clipboard'
import toast from 'react-hot-toast'

interface CopyButtonProps {
  code: string
  format?: string
}

export function CopyButton({ code, format }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      toast.success(`${format ?? 'Code'} copied!`)
      setTimeout(() => setCopied(false), 2000)
    } else {
      toast.error('Failed to copy code.')
    }
  }, [code, format])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-small font-medium transition-all ${
        copied
          ? 'text-accent-emerald'
          : 'text-text-muted hover:bg-bg-elevated hover:text-text-secondary'
      }`}
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  )
}
