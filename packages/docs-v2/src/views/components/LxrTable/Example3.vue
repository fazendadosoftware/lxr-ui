<template>
  <div class="h-[200px]">
    <lxr-table
      :columns="columns"
      :rows="rows"
      threshold="30%"
      :fetch-more-callback="fetchMoreCallback"/>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { ComponentMeta } from '../../../types.d'
import { generateRows } from './helpers'

export const meta: ComponentMeta = {
  title: 'Infinite scroll',
  code: `<template>
  <div class="h-[200px]">
    <lxr-table
      :columns="columns"
      :rows="rows"
      threshold="30%"
      :fetch-more-callback="fetchMoreCallback"/>
  </div>
</template>


<script lang="ts" setup>
import { LxrTable } from 'lxr-ui'
import { LxrColumn } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'
import Chance from 'chance'

const chance = new Chance()

const generateRow = () => ({
  name: chance.name(),
  jobTitle: chance.profession(),
})

const columns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' }
]

const rows = ref(generateRows(50))

const fetchMoreCallback = async () => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      rows.value.push(...generateRows(50))
      resolve()
    }, 1000)
  })
}
<\/script>`
}
</script>

<script lang="ts" setup>
import { LxrColumn } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'

const columns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' }
]

const rows = ref(generateRows(50))

const fetchMoreCallback = async () => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      rows.value.push(...generateRows(50))
      resolve()
    }, 1000)
  })
}
</script>
