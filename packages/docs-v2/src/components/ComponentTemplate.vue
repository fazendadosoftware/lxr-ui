<template>
  <article class="component-article">
    <h1 class="px-8 sm:px-0" v-text="title" />
    <div v-if="demoComponent" class="section-container p-8">
      <component :is="demoComponent" />
    </div>
    <div v-for="(example, i) in examples" :key="i" class="section-container">
      <h2 class="px-8">{{example.title}}</h2>
      <div class="py-2 px-8 mb-4 overflow-hidden">
        <component :is="example.component" />
      </div>
      <div
        class="relative overflow-y-hidden transition-[max-height] ease-in-out duration-[0.4s] mx-8 mb-4 sm:rounded"
          :class="{
            'max-h-0': !codeExpandedIndex[i],
            'max-h-[1000px]': codeExpandedIndex[i]
          }">
        <highlightjs class="not-prose max-h-[300px] px-4" autodetect :code="example.code" />
        <button
          v-if="canCopy"
          v-tooltip.left="{ content: `<div class='text-xs'>Copy to clipboard</div>`, html: true, triggers: ['hover'] }"
          class="absolute top-0 right-0 border text-white opacity-60 hover:opacity-100 transition-opacity sm:rounded p-1 m-5"
          @click="copyToClipboard(example.code)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
        </button>
      </div>
      <button
        class="w-full border-t flex justify-center items-center cursor-pointer text-gray-800 hover:bg-gray-100 transition-colors py-2"
        @click="codeExpandedIndex[i] = !codeExpandedIndex[i]">
        <div class="relative text-sm font-medium">
          {{ !codeExpandedIndex[i] ? 'Show' : 'Hide'}} code
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute -left-6 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </div>
      </button>
    </div>
    <div
      v-for="(props, i) in componentProperties"
      :key="i"
      class="section-container">
      <component-props-table :component-properties="props" :typedef-index="typedefIndex" :component-events="componentEvents" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { ref, Ref, DefineComponent, computed } from 'vue'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github-dark.css'
import ComponentPropsTable from './ComponentPropsTable.vue'
import { ComponentExample, ComponentProperties, ComponentPropTypeDefIndex, ComponentEvent } from '../types'

const { component: Highlightjs } = hljsVuePlugin

defineProps<{
  title: string
  demoComponent?: DefineComponent
  examples?: ComponentExample[]
  typedefIndex: ComponentPropTypeDefIndex
  componentProperties: ComponentProperties[]
  componentEvents?: ComponentEvent[]
}>()


const codeExpandedIndex: Ref<Record<string, boolean>> = ref({})

const canCopy = computed(() => !!navigator.clipboard)

const copyToClipboard = async (code: string) => {
  await navigator?.clipboard?.writeText(code)
}
</script>

<style scoped>
.component-article {
  @apply prose prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline prose-h2:mt-8 prose-h2:mb-4 prose-pre:m-0 prose-pre:p-0 prose-pre:rounded-none max-w-none;
}
  
.section-container {
  @apply bg-white sm:rounded-md shadow overflow-auto mb-4 sm:mb-8;
}

</style>

<style lang="less">
.table-box {
  & + & {
    margin-top: 40px;
  }
}
.table {
  & th,
  td {
    line-height: 1;
    text-align: left;
    padding: 10px 16px;
    font-size: 13px;
    font-weight: 500;
  }
  & td {
    font-size: 13px;
    font-weight: normal;
    & > .it-tag {
      font-size: 12px !important;
      font-weight: normal;
    }
    & .it-tag + .it-tag {
      margin-left: 4px;
    }
  }
  & tr {
    border-top: 1px solid #d3dae6;
    border-bottom: 1px solid #d3dae6;
  }
  tr:last-child {
    border-bottom: none;
  }
}

.it-modal-body {
  max-width: 700px !important;
}
</style>
