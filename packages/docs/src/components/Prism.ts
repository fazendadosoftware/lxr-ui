/* global Prism */
import { defineComponent, h } from 'vue'
import 'prismjs'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/plugins/autolinker/prism-autolinker.min'
import 'prismjs/plugins/autolinker/prism-autolinker.css'

function assign (obj: any) {
  for (let i = 1; i < arguments.length; i++) {
    // eslint-disable-next-line guard-for-in, prefer-rest-params
    for (const p in arguments[i]) {
      obj[p] = arguments[i][p]
    }
  }

  return obj
}

export default defineComponent({
  props: {
    code: {
      type: String
    },
    inline: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'markup'
    }
  },
  render: function render (ctx: any) {
    const code =
      ctx.$props.code ||
      (ctx.children && ctx.children.length > 0 ? ctx.children[0].text : '')
    const inline = ctx.$props.inline
    const language = ctx.$props.language
    // @ts-ignore
    const prismLanguage = Prism.languages[language]
    const className = 'language-'.concat(language)

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error(
        'Prism component for language "'.concat(
          language,
          '" was not found, did you forget to register it? See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/'
        )
      )
    }

    if (inline) {
      return h(
        'code',
        // @ts-ignore
        assign({}, ctx.$data, {
          class: [ctx.$data.class, className],
          // @ts-ignore
          domProps: assign({}, ctx.$data.domProps, {
            // @ts-ignore
            innerHTML: Prism.highlight(code, prismLanguage)
          })
        })
      )
    }

    return h(
      'pre',
      // @ts-ignore
      assign({}, ctx.$data, {
        class: [ctx.$data.class, className]
      }),
      [
        h('code', {
          class: className,
          // @ts-ignore
          innerHTML: Prism.highlight(code, prismLanguage)
        })
      ]
    )
  }
})
