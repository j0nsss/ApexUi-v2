'use client'

import { useRef, useEffect } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

type CodeLanguage = 'html' | 'css' | 'javascript'

const LANG_MAP: Record<CodeLanguage, ReturnType<typeof html>> = {
  html: html(),
  css: css(),
  javascript: javascript(),
}

interface CodeBlockProps {
  code: string
  language?: CodeLanguage
}

export function CodeBlock({ code, language = 'html' }: CodeBlockProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    if (viewRef.current) {
      viewRef.current.destroy()
    }

    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        oneDark,
        LANG_MAP[language] ?? LANG_MAP.html,
        EditorView.editable.of(false),
        EditorView.lineWrapping,
      ],
    })

    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    })

    return () => {
      viewRef.current?.destroy()
    }
  }, [code, language])

  return (
    <div
      ref={editorRef}
      className="code-panel"
      style={{ minHeight: '200px', maxHeight: '480px' }}
    />
  )
}
