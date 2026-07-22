import { generateSlug } from '../slug'

describe('generateSlug', () => {
  it('lowercases and slugifies basic text', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(generateSlug('Hello! World? #2024')).toBe('hello-world-2024')
  })

  it('handles multiple spaces', () => {
    expect(generateSlug('hello   world')).toBe('hello-world')
  })

  it('handles empty-ish input', () => {
    expect(generateSlug('a')).toBe('a')
  })
})
