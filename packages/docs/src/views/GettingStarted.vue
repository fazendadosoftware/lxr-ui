<template>
  <content-template>
    <template #title>
      Getting started
    </template>
    <template #default>
      <h2>Install with NPM or Yarn</h2>
      <highlightjs language="bash" :code="installCode" />

      <h2>Use all components</h2>
      <highlightjs language="js" :code="useAllComponents"/>
      <h2>Or individual components</h2>
      <highlightjs language="js" :code="useIndividualComponents"/>
    </template>
  </content-template>
</template>

<script lang="ts" setup>
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github-dark.css'

const { component: Highlightjs } = hljsVuePlugin

const installCode = `# NPM
npm install lxr-ui
# Yarn
yarn add lxr-ui
`

const useAllComponents = `import { createApp } from 'vue'
import LxrUi from 'lxr-ui'

createApp
  .use(LxrUi)
`

const useIndividualComponents = `import { createApp } from 'vue'
import { LxrTable } from 'lxr-ui'

createApp
  .component('lxr-table', LxrTable)
`
</script>
