import { Plugin } from 'vite'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import hljs from 'highlight.js'

const markedOptions: marked.MarkedOptions = {
  highlight: (code, lang) => {
    const highlighted = lang ? hljs.highlight(lang, code) : hljs.highlightAuto(code)
    return highlighted.value
  }
}

const sanitizeHtmlOptions: sanitizeHtml.IOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'pre', 'code', 'p', 'img', 'span', 'a'],
  allowedAttributes: {
    code: ['class'],
    span: ['class'],
    img: ['src', 'alt'],
    a: ['href', 'target'],
    p: ['class']
  }
}

const fileRegex = /\.(md)$/

// ref: https://github.com/hmsk/vite-plugin-markdown/blob/main/src/index.ts
const plugin = (): Plugin => ({
  name: 'vite-plugin-markdown',
  enforce: 'pre',
  transform (code, id) {
    if (fileRegex.test(id)) {
      const markup = marked(code, markedOptions)
      console.log('MARKUP', markup)
      const html = sanitizeHtml(markup, sanitizeHtmlOptions)
      return {
        code: `export default ${JSON.stringify(html)}`,
        map: null // provide source map if available
      }
    }
  }
})

export default plugin
