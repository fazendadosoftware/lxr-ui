<template>
  <div class="h-[200px]">
    <lxr-table
      :columns="simpleColumns"
      :rows="simpleSortedRows"
      :sort="simpleSort"
      @sort="simpleSort = $event"/>
  </div>
</template>

<script lang="ts">
import { computed, ref, unref } from 'vue'
import { ComponentMeta } from '../../../types.d'
import { generateRows, Row } from './helpers'

export const meta: ComponentMeta = {
  title: 'Simple, with sorting',
  code: `<template>
  <div class="h-[200px]">
    <lxr-table
      :columns="columns"
      :rows="sortedRows"
      :sort="sort"
      @sort="sort = $event"/>
  </div>
</template>

<script lang="ts" setup>
import { LxrTable } from 'lxr-ui'
import { LxrColumn, LxrTableSort } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'
import Chance from 'chance'

const chance = new Chance()

interface Row {
  name: string
  jobTitle: string
  country: string
}

const generateRow = () => ({
  name: chance.name(),
  jobTitle: chance.profession(),
  country: chance.country({ full: true })
})

const columns: LxrColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'jobTitle', label: 'Job Title', sortable: true },
  { key: 'country', label: 'Country', sortable: true }
]

const sort = ref<null | LxrTableSort>(null)
const rows = generateRows(50)

const sortedRows = computed(() => {
  if (unref(sort) === null) return rows
  const [[key, asc]] = Object.entries(unref)
  const sortingFactor = asc ? 1 : -1
  return [...rows].sort(({ [key as keyof Row]: A }, { [key as keyof Row]: B }) => A > B ? sortingFactor : A < B ? -sortingFactor : 0)
})
<\/script>`
}
</script>

<script lang="ts" setup>
import { LxrColumn, LxrTableSort } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'

const simpleColumns: LxrColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'jobTitle', label: 'Job Title', sortable: true },
  { key: 'country', label: 'Country', sortable: true }
]

const simpleSort = ref<null | LxrTableSort>(null)
const rows = generateRows(50)

const simpleSortedRows = computed(() => {
  const _sort = unref(simpleSort)
  if (_sort === null) return rows
  const [[key, asc]] = Object.entries(_sort)
  const sortingFactor = asc ? 1 : -1
  return [...rows].sort(({ [key as keyof Row]: A }, { [key as keyof Row]: B }) => A > B ? sortingFactor : A < B ? -sortingFactor : 0)
})
</script>
