'use client'

import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { CopyButton } from './CopyButton'

interface CodePanelProps {
  codeHtml?: string | null
  codeTailwind?: string | null
  codeReact?: string | null
  codeVue?: string | null
}

type TabId = 'html' | 'tailwind' | 'react' | 'vue'

const TAB_LABELS: Record<TabId, string> = {
  html: 'HTML',
  tailwind: 'Tailwind',
  react: 'React',
  vue: 'Vue',
}

const TAB_LANGUAGES: Record<TabId, 'html' | 'javascript'> = {
  html: 'html',
  tailwind: 'html',
  react: 'javascript',
  vue: 'html',
}

export function CodePanel({ codeHtml, codeTailwind, codeReact, codeVue }: CodePanelProps) {
  const tabs: { id: TabId; code: string | null | undefined }[] = [
    { id: 'html', code: codeHtml },
    { id: 'tailwind', code: codeTailwind },
    { id: 'react', code: codeReact },
    { id: 'vue', code: codeVue },
  ]

  const availableTabs = tabs.filter((t) => t.code)
  const [activeTab, setActiveTab] = useState<TabId>(availableTabs[0]?.id ?? 'html')

  if (availableTabs.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-inner bg-bg-base">
        <p className="text-small text-text-muted">No code available</p>
      </div>
    )
  }

  const activeCode = availableTabs.find((t) => t.id === activeTab)?.code ?? ''

  return (
    <div className="overflow-hidden rounded-card border border-border-default bg-bg-surface">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border-default px-3 py-2">
        <div className="flex items-center gap-1">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-3 py-1 text-small font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent-violet/10 text-accent-violet'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {TAB_LABELS[tab.id]}
            </button>
          ))}
        </div>

        <CopyButton code={activeCode} format={TAB_LABELS[activeTab]} />
      </div>

      {/* Code content */}
      <CodeBlock code={activeCode} language={TAB_LANGUAGES[activeTab]} />
    </div>
  )
}
