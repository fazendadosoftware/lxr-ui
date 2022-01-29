<template>
  <ol class="not-prose list-none m-0 p-0 relative space-y-2" style="counter-reset:step;">
    <li
      v-for="(instruction, i) in instructions"
      :key="i"
      class="relative pl-10 xl:grid grid-cols-5 gap-16 before:content-[counter(step)] before:absolute before:left-0 before:flex before:items-center before:justify-center before:w-[calc(1.375rem+1px)] before:h-[calc(1.375rem+1px)] before:text-[0.625rem] before:font-bold before:text-slate-700 before:rounded-md before:shadow-sm before:ring-1 before:ring-slate-900/5 dark:before:bg-slate-700 dark:before:text-slate-200 dark:before:ring-0 dark:before:shadow-none dark:before:highlight-white/5"
      :class="{
        'before:text-white before:text-shadow before:ring-white': true,
        ' pb-8 after:absolute after:top-[calc(1.875rem+1px)] after:bottom-0 after:left-[0.6875rem] after:w-px after:bg-slate-200 dark:after:bg-slate-200/5': i < (instructions.length - 1)
      }"
      style="counter-increment: step;">
      <div class="mb-6 col-span-2 xl:mb-0">
        <h4
          class="text-sm leading-6 text-slate-900 font-semibold mb-2 dark:text-slate-200"
          :class="{ '!text-yellow-300 text-shadow': true }"
          v-text="instruction.title" />
        <div
          class="prose prose-slate prose-sm dark:prose-dark"
          :class="{ '!text-white text-shadow': true }"
          v-html="instruction.description" />
      </div>
      <code-box
        :code="instruction.code"
        :language="instruction.language"
        :filename="instruction.filename" />
    </li>
  </ol>
</template>

<script lang="ts" setup>
import CodeBox from '@/components/CodeBox.vue'

export interface Instruction {
  title: string
  description: string
  filename?: string
  language: string
  code: string
}

const instructions: Instruction[] = [
  {
    title: 'Install Lxr-UI',
    description: '<p>Install <code>lxr-ui</code> via npm or yarn.</p>',
    filename: 'Terminal',
    language: 'bash',
    code: `# NPM\nnpm install lxr-ui\n# Yarn\nyarn add lxr-ui`
  },
  {
    title: 'Use all components',
    description: '<p>You can import all components at once...</p>',
    filename: 'src/main.js',
    language: 'javascript',
    code: `import { createApp } from vue
import App from './App.vue'
import LxrUi from 'lxr-ui'
import 'lxr-ui/dist/lxr-ui.css'

createApp(App)
  .use(LxrUi)
  .mount('#app')
    `
  },
  {
    title: 'Use individual components',
    description: '<p>...or just the ones you need.</p>',
    filename: 'src/main.js',
    language: 'javascript',
    code: `import { createApp } from vue
import App from './App.vue'
import { LxrTable } from 'lxr-ui'
import 'lxr-ui/dist/lxr-ui.css'

createApp(App)
  .component('lxr-table', LxrUi)
  .mount('#app')
`
  }
]

</script>

<style lang="stylus">

pre.codebox
  & > code.hljs
    background transparent
</style>