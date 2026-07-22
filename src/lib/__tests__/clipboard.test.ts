import { copyToClipboard } from '../clipboard'

describe('copyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('copies text using clipboard API', async () => {
    const result = await copyToClipboard('hello world')
    expect(result).toBe(true)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world')
  })

  it('falls back to execCommand on failure', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
    })

    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()

    const textarea = document.createElement('textarea')
    jest.spyOn(document, 'createElement').mockReturnValue(textarea)
    textarea.select = jest.fn()
    document.execCommand = jest.fn().mockReturnValue(true)

    const result = await copyToClipboard('fallback text')
    expect(result).toBe(true)
  })

  it('returns false if all methods fail', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
    })

    document.execCommand = jest.fn().mockImplementation(() => { throw new Error() })

    const result = await copyToClipboard('fail')
    expect(result).toBe(false)
  })
})
