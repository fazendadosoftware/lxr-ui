<template>
  <div>
    <lxr-table
      table-classes="table-fixed"
      :columns="simpleColumns"
      :rows="simpleSortedRows"
      :sort="simpleSort"
      @sort="simpleSort = $event"/>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { LxrColumn, LxrTableSort } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue.d'
import Chance from 'chance'

const chance = new Chance()

interface Row {
  name: string
  jobTitle: string
  country: string
}
const generateRow = (): Row => ({
  name: chance.name(),
  jobTitle: chance.profession(),
  country: chance.country({ full: true })
})

const generateRows = (count: number) => [...Array(count).keys()].map(generateRow)

const simpleColumns: LxrColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'jobTitle', label: 'Job Title', sortable: true },
  { key: 'country', label: 'Country', sortable: true }
]

const selectedRow = ref<unknown>(null)

</script>