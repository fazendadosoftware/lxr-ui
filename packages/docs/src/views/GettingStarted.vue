<template>
  <content-template>
    <template #title>
      Getting started
    </template>
    <template #default>
      <instructions-list />
      <div>
        <h3 v-text="'1. Start by installing the library with NPM or Yarn.'"/>
        <code-box :code="installCode" language="bash" class="mx-auto"/>
        <h3 v-text="'2.a) You can import the entire library at once...'" />
        <code-box :code="importingEntireLibrary" language="javascript" filename="src/main.js" class="mx-auto"/>
        <h3 v-text="'2.b) or just the components you need.'" />
        <code-box :code="importingIndividualComponents" language="javascript" filename="src/main.js" class="mx-auto"/>
        <h3 v-text="'3) If you want to make use of Tailwindcss JIT capability...'" />
        <code-box :code="installTailwindCSS" language="bash" class="mx-auto"/>
        <code-box :code="importingIndividualComponents" language="javascript" filename="src/main.js" class="mx-auto"/>
        <code-box :code="importingIndividualComponents" language="javascript" filename="src/main.js" class="mx-auto"/>
      </div>
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
