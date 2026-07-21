function wrapBase(html: string, extraHead?: string): string {
  return `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${extraHead ?? ''}
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  margin: 0;
  padding: 1rem;
  background: #0D0D10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}
</style>
</head><body>${html}</body></html>`
}

export function buildHtmlCssPreview(html: string): string {
  return wrapBase(html)
}

export function buildTailwindPreview(html: string): string {
  return wrapBase(html, '<script src="https://cdn.tailwindcss.com"></script>')
}

export function buildReactPreview(jsxCode: string): string {
  return wrapBase(
    '<div id="root"></div>',
    `
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">${jsxCode}</script>
`
  )
}
