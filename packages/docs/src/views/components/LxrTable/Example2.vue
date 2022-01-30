<template>
  <div>
    <div class="flex text-gray-700 w-full mb-2 text-xs italic">
      Selected:
      <span class="font-bold ml-1">{{selectedRow?.name ?? 'none'}}</span>
    </div>
    <div class="h-[200px]">
      <lxr-table
      :columns="columns"
      :rows="rows"
      @selected="clickHandler" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, unref } from 'vue'
import { ComponentMeta } from '../../../types.d'
import { generateRows } from './helpers'

export const meta: ComponentMeta = {
  title: 'Custom cells',
  code: `<template>
  <div>
    <div class="flex text-gray-700 w-full mb-2 text-xs italic">
      Selected:
      <span class="font-bold ml-1">{{selectedRow?.name ?? 'none'}}</span>
    </div>
    <div class="h-[200px]">
      <lxr-table
      :columns="columns"
      :rows="rows"
      @selected="clickHandler" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, unref, defineComponent } from 'vue'
import { LxrTable } from 'lxr-ui'
import { LxrColumn } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'
import Chance from 'chance'

const chance = new Chance()

const generateRow = () => ({
  name: chance.name(),
  jobTitle: chance.profession(),
  country: chance.country({ full: true })
})

const generateRows = (count: number) => [...Array(count).keys()].map(generateRow)

const selectedRow = ref<any>(null)

const ActionsCellComponent = defineComponent({
  props: ['row', 'emit', 'selectedRow'],
  template: \`
    <div class="flex justify-center py-0.5">
      <button
        class="transition-colors px-1 rounded border w-[70px]"
        :class="{
          'bg-yellow-100 hover:bg-yellow-200 border-yellow-300': selectedRow?.name === row.name,
          'bg-green-100 hover:bg-green-200 border-green-300': selectedRow?.name !== row.name
        }"
         @click="emit(\'selected\', row)">
         {{ selectedRow?.name === row.name ? 'Selected' : 'Click me' }}
      </button>
    </div>
  \`
})

const columns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'actions', component: ActionsCellComponent, extraProps: () => ({ selectedRow: unref(selectedRow) }) }
]

const rows = generateRows(50)

const clickHandler = (row: any) => { selectedRow.value = row.name === unref(selectedRow)?.name ? null : row }
<\/script>`
}
</script>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { LxrColumn } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'

const selectedRow = ref<any>(null)

const ActionsCellComponent = defineComponent({
  // eslint-disable-next-line vue/require-prop-types
  props: ['row', 'emit', 'selectedRow'],
  template: `
    <div class="flex justify-center py-0.5">
      <button
        class="transition-colors px-1 rounded border w-[70px]"
        :class="{
          'bg-yellow-100 hover:bg-yellow-200 border-yellow-300': selectedRow?.name === row.name,
          'bg-green-100 hover:bg-green-200 border-green-300': selectedRow?.name !== row.name
        }"
         @click="emit(\'selected\', row)">
         {{ selectedRow?.name === row.name ? 'Selected' : 'Click me' }}
      </button>
    </div>
  `
})

const columns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'actions', component: ActionsCellComponent, extraProps: () => ({ selectedRow: unref(selectedRow) }) }
]

const rows = generateRows(50)

const clickHandler = (row: any) => { selectedRow.value = row.name === unref(selectedRow)?.name ? null : row }
</script>
