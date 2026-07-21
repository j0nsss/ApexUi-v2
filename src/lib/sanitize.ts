import createDOMPurify from 'isomorphic-dompurify'

const DOMPurify = createDOMPurify()

export function sanitizeForStorage(html: string): string {
  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseenter', 'onmouseleave', 'onsubmit', 'onfocus', 'onblur', 'onchange', 'oninput', 'onkeydown', 'onkeyup', 'onkeypress'],
    FORBID_TAGS: ['script'],
    ALLOW_DATA_ATTR: false,
  })
}

export function sanitizeForPreview(html: string): string {
  return DOMPurify.sanitize(html, {
    FORCE_BODY: true,
    ADD_TAGS: ['style'],
    ADD_ATTR: ['class', 'style', 'id'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseenter', 'onmouseleave', 'onsubmit', 'onfocus', 'onblur'],
  })
}
