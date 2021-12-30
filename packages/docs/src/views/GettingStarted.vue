<template>
  <div class="text-sm">
    <h1>Getting started</h1>
    <div class="bg-white border rounded-md shadow p-4">
      <h2 class="mb-3">Install with NPM or Yarn</h2>
      <prism language="bash" :code="installCode" />

      <h2 class="mt-5 mb-3">Use all components</h2>
      <prism language="js" :code="useAllComponents"/>
      <h2 class="mt-5 mb-3">Or individual components</h2>
      <prism language="js" :code="useIndividualComponents"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
const installCode = `
# NPM
npm install lxr-ui
# Yarn
yarn add lxr-ui
`

const useAllComponents = `
import { createApp } from 'vue'
import LxrUi from 'lxr-ui'

createApp
  .use(LxrUi)
`

const useIndividualComponents = `
import { createApp } from 'vue'
import { LxrTable } from 'lxr-ui'

createApp
  .component('lxr-table', LxrTable)
`
</script>
