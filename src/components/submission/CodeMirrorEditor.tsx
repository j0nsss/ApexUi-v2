'use client'

import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const LANG_MAP: Record<string, ReturnType<typeof html>> = {
  html_css: html(),
  tailwind: html(),
  react_jsx: javascript(),
  vue: html(),
}

interface CodeMirrorEditorProps {
  code: string
  tech: string
  onChange: (code: string) => void
}

export function CodeMirrorEditor({ code, tech, onChange }: CodeMirrorEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

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
          onChange(viewRef.current!.state.doc.toString())
        }
      },
    })

    return () => {
      viewRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech])

  return (
    <div
      ref={editorRef}
      className="code-panel"
      style={{ minHeight: '400px', maxHeight: '600px' }}
    />
  )
}
