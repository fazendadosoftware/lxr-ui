<template>
  <div class="relative z-10 -ml-10 col-span-3 bg-slate-800 rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
    <div class="relative flex text-slate-400 text-xs leading-6">
      <div class="mt-2 flex-none text-sky-300 border-t border-b border-t-transparent border-b-sky-300 px-4 py-1 flex items-center">
        {{filename}}
      </div>
      <div class="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
        <div class="flex-auto -mr-px bg-slate-700/50 border border-slate-500/30 rounded-tl"/>
      </div>
      <div v-if="canCopy" class="absolute top-2 right-0 h-8 flex items-center pr-4">
        <div class="relative flex -mr-2">
          <button
          type="button"
          class="text-slate-500 hover:text-slate-400 transition-colors"
          @click="copyToClipboard(code)">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-8 h-8">
              <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19"></path><path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5"/>
            </svg>
          </button>
          <transition
            enter-from-class="scale-95 translate-y-0.5 opacity-0"
            enter-to-class="scale-100 translate-y-0 opacity-100"
            enter-active-class="transform ease-out duration-200 transition origin-bottom"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            leave-active-class="transition ease-in duration-100">
            <div v-if="copied" class="absolute bottom-full left-1/2 mb-3.5 pb-1 -translate-x-1/2">
              <div class="relative bg-sky-500 text-white font-mono text-[0.625rem] leading-6 font-medium px-1.5 rounded-lg">
                Copied
                <svg
                  aria-hidden="true"
                  width="16"
                  height="6"
                  viewBox="0 0 16 6"
                  class="text-sky-500 absolute top-full left-1/2 -mt-px -ml-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <highlightjs :language="language" :code="code" class="codebox"/>
  </div>
</template>

<script lang="ts" setup>
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import { computed, ref } from 'vue'

export interface CodeSnippet {
  filename?: string
  language: string
  code: string
}

const { component: Highlightjs } = hljsVuePlugin

defineProps<{ language: string, code: string, filename?: string }>()

const canCopy = computed(() => !!navigator.clipboard)
const copied = ref(false)

const copyToClipboard = async (code: string) => {
  await navigator?.clipboard?.writeText(code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1000)
}

</script>

<style lang="stylus">

pre.codebox
  & > code.hljs
    background transparent
</style>