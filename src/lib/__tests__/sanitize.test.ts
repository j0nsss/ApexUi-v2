import { sanitizeForStorage, sanitizeForPreview } from '../sanitize'

describe('sanitizeForStorage', () => {
  it('strips script tags', () => {
    const result = sanitizeForStorage('<script>alert(1)</script><p>hello</p>')
    expect(result).not.toContain('<script>')
    expect(result).toContain('<p>')
  })

  it('strips onerror attributes', () => {
    const result = sanitizeForStorage('<img src=x onerror="alert(1)">')
    expect(result).not.toContain('onerror')
  })

  it('strips onload attributes', () => {
    const result = sanitizeForStorage('<body onload="alert(1)">')
    expect(result).not.toContain('onload')
  })

  it('allows safe HTML', () => {
    const result = sanitizeForStorage('<div class="foo"><p>Safe content</p></div>')
    expect(result).toContain('Safe content')
  })
})

describe('sanitizeForPreview', () => {
  it('strips script tags but preserves style', () => {
    const result = sanitizeForPreview('<script>alert(1)</script><style>.btn{color:red}</style>')
    expect(result).not.toContain('<script>')
    expect(result).toContain('.btn')
  })

  it('strips event handler attributes', () => {
    const result = sanitizeForPreview('<button onclick="alert(1)">Click</button>')
    expect(result).not.toContain('onclick')
  })
})
