<template>
  <div class="relative rounded-md prose prose-a:font-thin prose-a:text-blue-300/40">
    <component
      :is="url ? 'a' : 'div'"
      v-if="filename"
      :href="url"
      target="_blank"
      class="not-prose absolute top-2 left-6 text-xs tracking-wide italic"
      :class="{
        ' hover:text-blue-300 transition-colors cursor-pointer': url,
        'cursor-default text-blue-300/40': !url
      }">
      {{filename}}
    </component>
    <highlightjs class="pt-5" :autodetect="!language" :language="language" :code="code"/>
    <button
      v-if="canCopy"
      v-tooltip.left="{ content: `<div class='text-xs'>Copy to clipboard</div>`, html: true }"
      class="absolute top-0 right-0 text-blue-300/40 hover:text-blue-300 border border-blue-300/40 hover:border-blue-300 p-1 rounded-md m-2 transition-colors cursor-pointer"
      :class="{
        'animate-shake': shake
      }"
      @click="copyToClipboard(code)">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import 'highlight.js/lib/common'
// import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// hljs.registerLanguage('javascript', javascript)
const { component: Highlightjs } = hljsVuePlugin

defineProps<{ code: string, language?: string, filename?: string, url?: string }>()

const canCopy = computed(() => !!navigator.clipboard)
const shake = ref(false)

const copyToClipboard = async (code: string) => {
  await navigator?.clipboard?.writeText(code)
  shake.value = true
  setTimeout(() => { shake.value = false }, 1000)
}
</script>
