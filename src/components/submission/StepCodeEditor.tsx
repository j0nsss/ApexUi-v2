'use client'

import { useState, useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { buildHtmlCssPreview, buildTailwindPreview, buildReactPreview } from '@/lib/preview-builder'

interface StepCodeEditorProps {
  code: string
  tech: string
  onCodeChange: (code: string) => void
  onBack: () => void
  onNext: () => void
}

const LANG_MAP: Record<string, ReturnType<typeof html>> = {
  html_css: html(),
  tailwind: html(),
  react_jsx: javascript(),
  vue: html(),
}

export function StepCodeEditor({ code, tech, onCodeChange, onBack, onNext }: StepCodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const [previewHtml, setPreviewHtml] = useState('')
  const [bgLight, setBgLight] = useState(false)

  // Build preview on code change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!code.trim()) {
        setPreviewHtml('')
        return
      }
      let built = ''
      switch (tech) {
        case 'html_css':
          built = buildHtmlCssPreview(code)
          break
        case 'tailwind':
          built = buildTailwindPreview(code)
          break
        case 'react_jsx':
          built = buildReactPreview(code)
          break
        case 'vue':
          built = buildHtmlCssPreview(code)
          break
      }
      setPreviewHtml(built)
    }, 500)
    return () => clearTimeout(timer)
  }, [code, tech])

  // Init CodeMirror
  useEffect(() => {
    if (!editorRef.current) return
    if (viewRef.current) viewRef.current.destroy()

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        oneDark,
        LANG_MAP[tech] ?? html(),
        EditorView.lineWrapping,
      ],
    })

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
      dispatch: (tr) => {
        viewRef.current?.update([tr])
        if (tr.docChanged) {
          onCodeChange(viewRef.current!.state.doc.toString())
        }
      },
    })

    return () => {
      viewRef.current?.destroy()
    }
  }, [tech, code, onCodeChange])

  const codeLen = code.length

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Editor pane */}
      <div className="flex-1 lg:w-1/2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-label text-text-primary">Code Editor</span>
          <span className={`text-xs ${codeLen > 10000 ? 'text-accent-amber' : 'text-text-muted'}`}>
            {codeLen} / 10,000 chars {codeLen > 10000 ? '(soft limit)' : ''}
          </span>
        </div>
        <div
          ref={editorRef}
          className="code-panel"
          style={{ minHeight: '400px', maxHeight: '600px' }}
        />
        {codeLen > 50000 && (
          <p className="mt-1 text-xs text-accent-red">Code exceeds 50,000 char limit.</p>
        )}
      </div>

      {/* Preview pane */}
      <div className="flex-1 lg:w-1/2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-label text-text-primary">Live Preview</span>
          <button
            type="button"
            onClick={() => setBgLight(!bgLight)}
            className="rounded-md border border-border-default bg-bg-surface px-3 py-1 text-xs text-text-secondary transition-colors hover:bg-bg-elevated"
          >
            {bgLight ? 'Dark' : 'Light'} Background
          </button>
        </div>
        <div
          className="overflow-hidden rounded-inner"
          style={{ background: bgLight ? '#FFFFFF' : '#0D0D10', minHeight: '400px' }}
        >
          {previewHtml ? (
            <iframe
              srcDoc={previewHtml}
              title="Live preview"
              sandbox="allow-scripts"
              className="h-full w-full"
              style={{ border: 'none', minHeight: '400px', background: '#0D0D10', display: 'block' }}
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center text-small text-text-muted">
              Start typing to see a preview
            </div>
          )}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex w-full justify-between lg:absolute lg:bottom-0 lg:left-0 lg:p-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md border border-border-default bg-bg-surface px-6 py-2 text-label font-medium text-text-primary transition-colors hover:bg-bg-elevated"
        >
          &larr; Back
        </button>
        <button
          type="button"
          disabled={!code.trim() || codeLen > 50000}
          onClick={onNext}
          className="rounded-md bg-accent-violet px-6 py-2 text-label font-semibold text-white transition-colors hover:bg-accent-violet-hover disabled:opacity-40"
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}
