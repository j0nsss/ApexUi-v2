import { buildHtmlCssPreview, buildTailwindPreview, buildReactPreview } from '../preview-builder'

describe('buildHtmlCssPreview', () => {
  it('wraps HTML in base template', () => {
    const result = buildHtmlCssPreview('<p>Hello</p>')
    expect(result).toContain('<!DOCTYPE html>')
    expect(result).toContain('<p>Hello</p>')
    expect(result).not.toContain('cdn.tailwindcss.com')
  })
})

describe('buildTailwindPreview', () => {
  it('injects Tailwind CDN script', () => {
    const result = buildTailwindPreview('<div class="flex">Test</div>')
    expect(result).toContain('cdn.tailwindcss.com')
    expect(result).toContain('Test')
  })
})

describe('buildReactPreview', () => {
  it('injects React, ReactDOM, Babel scripts and wraps JSX', () => {
    const result = buildReactPreview('function App() { return <h1>Hi</h1> }')
    expect(result).toContain('unpkg.com/react@18')
    expect(result).toContain('unpkg.com/react-dom@18')
    expect(result).toContain('@babel/standalone')
    expect(result).toContain('type="text/babel"')
    expect(result).toContain('App()')
  })
})
