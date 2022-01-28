<template>
  <ol class="not-prose list-none m-0 p-0 relative space-y-2 mb-16" style="counter-reset:step;">
    <li
      v-for="(instruction, i) in instructions"
      :key="i"
      class="relative pl-10 xl:grid grid-cols-5 gap-16 before:content-[counter(step)] before:absolute before:left-0 before:flex before:items-center before:justify-center before:w-[calc(1.375rem+1px)] before:h-[calc(1.375rem+1px)] before:text-[0.625rem] before:font-bold before:text-slate-700 before:rounded-md before:shadow-sm before:ring-1 before:ring-slate-900/5 dark:before:bg-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5 pb-8 after:absolute after:top-[calc(1.875rem+1px)] after:bottom-0 after:left-[0.6875rem] after:w-px after:bg-slate-200 dark:after:bg-slate-200/5"
      style="counter-increment: step;">
      <div class="mb-6 col-span-2 xl:mb-0">
        <h4 class="text-sm leading-6 text-slate-900 font-semibold mb-2 dark:text-slate-200" v-text="instruction.title" />
        <div class="prose prose-slate prose-sm dark:prose-dark" v-html="instruction.description" />
      </div>
      <div class="relative z-10 -ml-10 col-span-3 bg-slate-800 rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
        <div class="relative flex text-slate-400 text-xs leading-6">
          <div class="mt-2 flex-none text-sky-300 border-t border-b border-t-transparent border-b-sky-300 px-4 py-1 flex items-center">
            Terminal
          </div>
          <div class="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
            <div class="flex-auto -mr-px bg-slate-700/50 border border-slate-500/30 rounded-tl"/>
          </div>
          <div class="absolute top-2 right-0 h-8 flex items-center pr-4">
            <div class="relative flex -mr-2">
              <button type="button" class="text-slate-500 hover:text-slate-400">
                <svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-8 h-8">
                  <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19"></path><path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <highlightjs :language="'bash'" :code="installCode" class="codebox"/>
      </div>
    </li>
  </ol>
</template>

<script lang="ts" setup>
import 'highlight.js/lib/common'
// import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

export interface Instruction {
  title: string
  description: string
  filename?: string
  code: string
}

const { component: Highlightjs } = hljsVuePlugin

const instructions: Instruction[] = [
  {
    title: 'Install Tailwind CSS',
    description: '<p>Install <code>tailwindcss</code> via npm, and create your <code>tailwind.config.js</code> <!-- -->file.</p>',
    filename: 'Terminal',
    code: `npm install -D tailwindcss\npx tailwindcss init`
  }
]

const installCode = `# NPM
npm install lxr-ui
# Yarn
yarn add lxr-ui
`
</script>

<style lang="stylus">

pre.codebox
  & > code.hljs
    background transparent
</style>