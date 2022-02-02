<template>
  <content-template>
    <template #title>
      Getting started
    </template>
    <template #default>
      <instructions-list class="mt-8 overflow-auto px-4"/>
    </template>
  </content-template>
</template>

<script lang="ts" setup>
import CodeBox from '@/components/CodeBox.vue'
import InstructionsList from '@/components/InstructionsList.vue'

const installCode = `# NPM
npm install lxr-ui
# Yarn
yarn add lxr-ui
`

const importingEntireLibrary = `import { createApp } from 'vue'
import LxrUi from 'lxr-ui'
import 'lxr-ui/dist/lxr-ui.css'

createApp
  .use(LxrUi)
  .mount('#app')
`

const importingIndividualComponents = `import { createApp } from 'vue'
import { LxrTable } from 'lxr-ui'
import 'lxr-ui/dist/lxr-ui.css'

createApp
  .component('lxr-table', LxrTable)
  .mount('#app')
`

const installTailwindCSS = `npm install -D tailwindcss
npx tailwindcss init`

const importingLibraryWithTailwindJIT = `import { createApp } from 'vue'
import LxrUi from 'lxr-ui'
import 'tailwindcss/tailwind.css'

createApp
  .use(LxrUi)
  .mount('#app')
`

</script>
