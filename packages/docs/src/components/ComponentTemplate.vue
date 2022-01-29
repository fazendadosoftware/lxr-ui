<template>
  <article class="prose prose-a:text-yellow-300 prose-a:underline prose-a:font-bold prose-h1:text-white prose-h2:text-sky-300 prose-h2:py-4 prose-h2:px-6 prose-h2:m-0 prose-p:text-white max-w-none -mt-6 sm:mt-0 px-8 py-0">
    <h1 class="text-shadow px-4 sm:px-0 sm:mt-8 tracking-wider" v-text="title" />
    <div v-if="demoComponent" class="section-container p-8">
      <component :is="demoComponent" />
    </div>
    <div v-for="(example, i) in examples" :key="i" class="section-container">
      <div class="absolute top-3.5 right-3 px-5 pb-1 pt-6 transform rotate-45 translate-x-1/2 -translate-y-1/2 bg-leanix-blue-dark text-white text-xs">
        example
      </div>
      <h2 class="tracking-wide !text-yellow-300">{{example.title}}</h2>
      <div class="px-4">
        <div class="bg-white rounded-md overflow-hidden">
          <component :is="example.component" />
        </div>
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
        class="w-full bg-slate-700/50 border-t border-slate-500/30 flex justify-center items-center cursor-pointer text-slate-500 hover:text-slate-400 transition-colors py-2"
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

.section-container {
  @apply bg-slate-800 rounded-xl shadow-lg overflow-hidden mb-4 sm:mb-8 relative;
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
