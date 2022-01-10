<template>
  <article class="prose max-w-none">
    <h1>LxrTable</h1>
    <v-box
      :code="codeLxrTableSimple"
      title="Simple, with sorting">
      <div class="w-full h-[200px] border-b not-prose">
        <lxr-table
          table-classes="table-fixed"
          :columns="simpleColumns"
          :rows="simpleSortedRows"
          :sort="simpleSort"
          @sort="simpleSort = $event"/>
      </div>
    </v-box>
    <v-box
      :code="codeLxrTableCustomCells"
      title="Custom cells">
      <div class="flex text-gray-700 w-full px-4 text-xs italic">
        Selected:
        <span class="font-bold ml-1">{{selectedRow?.name ?? 'none'}}</span>
      </div>
      <div class="w-full h-[200px] border-b not-prose">
        <lxr-table
          :columns="withActionColumns"
          :rows="withActionSortedRows"
          @selected="clickHandler" />
      </div>
    </v-box>
    <v-box
      :code="codeLxrTableInfiniteScroll"
      title="Infinite scroll">
      <div class="w-full h-[200px] border-b not-prose">
        <lxr-table
          :columns="withInfiniteColumns"
          :rows="infiniteRows"
          threshold="30%"
          :fetch-more-callback="fetchMoreCallback"/>
      </div>
    </v-box>
    <props-table class="not-prose" tag-name="lxr-table" :data-sheet="dataSheetLxrTable" :event-sheet="eventSheetLxrTable" />
  </article>
</template>

<script lang="ts" setup>
import { ref, unref, computed, defineComponent } from 'vue'
import { LxrColumn, LxrTableSort } from 'lxr-ui/dist/types/src/lib-components/LxrTable.vue'
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

const ActionsCellComponent = defineComponent({
  template: `
    <div class="flex justify-center py-0.5">
      <button
        class="transition-colors px-1 py-0.5 rounded border w-[70px]"
        :class="{
          'bg-yellow-100 hover:bg-yellow-200 border-yellow-300': selectedRow?.name === row.name,
          'bg-green-100 hover:bg-green-200 border-green-300': selectedRow?.name !== row.name
        }"
         @click="emit(\'selected\', row)">
         {{ selectedRow?.name === row.name ? 'Selected' : 'Click me' }}
      </button>
    </div>
  `,
  props: ['row', 'emit', 'selectedRow']
})

const selectedRow = ref<any>(null)

const withActionColumns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'actions', component: ActionsCellComponent, extraProps: () => ({ selectedRow: unref(selectedRow) }) }
]

const rows = generateRows(50)
const simpleSort = ref<null | LxrTableSort>(null)
const withActionSort = ref<null | LxrTableSort>(null)

const simpleSortedRows = computed(() => {
  const _sort = unref(simpleSort)
  if (_sort === null) return rows
  const [[key, asc]] = Object.entries(_sort)
  const sortingFactor = asc ? 1 : -1
  return [...rows].sort(({ [key as keyof Row]: A }, { [key as keyof Row]: B }) => A > B ? sortingFactor : A < B ? -sortingFactor : 0)
})

const withActionSortedRows = computed(() => {
  const _sort = unref(withActionSort)
  if (_sort === null) return rows
  const [[key, asc]] = Object.entries(_sort)
  const sortingFactor = asc ? 1 : -1
  return [...rows].sort(({ [key as keyof Row]: A }, { [key as keyof Row]: B }) => A > B ? sortingFactor : A < B ? -sortingFactor : 0)
})

const clickHandler = (row: any) => { selectedRow.value = row.name === unref(selectedRow)?.name ? null : row }

const withInfiniteColumns: LxrColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' }
]

const infiniteRows = ref(generateRows(50))

const fetchMoreCallback = async () => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      infiniteRows.value.push(...generateRows(50))
      resolve()
    }, 1000)
  })
}

const codeLxrTableSimple = `
  <template>
    <!-- important: set heigth property in the table container for sticky headers -->
    <div style="height: 200px;">
      <lxr-table
        :columns="columns"
        :rows="sortedRows"
        :sort="sort"
        @sort="sort = $event" />
    </div>
  </template>

  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  import Chance from 'chance' // we use chance.js in this example for generating demo data

  const chance = new Chance()

  // the interface for our row
  interface Row {
    name: string
    jobTitle: string
    country: string
  }

  // row generating method
  const generateRows = (count: number): Row[] => [...Array(count).keys()]
    .map(() => ({ name: chance.name(), jobTitle: chance.profession(), country: chance.country({ full: true }) }))

  // unsorted rows
  const rows = generateRows(50)

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'jobTitle', label: 'Job Title', sortable: true },
    { key: 'country', label: 'Country', sortable: true }
  ]

  // placeholder variable for sorting key and direction
  const sort = ref<null | Record<string, boolean>>(null)

  // computed variable for the sorted rows
  const sortedRows = computed(() => {
    if (sort.value === null) return rows
    const [[key, asc]] = Object.entries(sort.value)
    const sortingFactor = asc ? 1 : -1
    return [...rows].sort(({ [key as keyof Row]: A }, { [key as keyof Row]: B }) => A > B ? sortingFactor : A < B ? -sortingFactor : 0)
  })
  <\/script>
`

const codeLxrTableCustomCells = `
<template>
  <div class="flex text-gray-700 w-full px-4 text-xs italic">
    Selected:
    <span class="font-bold ml-1">{{selectedRow?.name ?? 'none'}}</span>
  </div>
  <!-- important: set heigth property in the table container for sticky headers -->
  <div style="height: 200px;">
    <lxr-table
      :columns="columns"
      :rows="rows"
      @selected="selectedEvtHandler"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent } from 'vue'
import Chance from 'chance' // we use chance.js in this example for generating demo data

const chance = new Chance()

// row generating method
const generateRows = (count: number) => [...Array(count).keys()]
  .map(() => ({ name: chance.name(), jobTitle: chance.profession() }))

// unsorted rows
const rows = generateRows(50)

// cell component is defined inline in this example, it can also be imported...
const ActionsCellComponent = defineComponent({
  template: \`
    <div class="flex justify-center py-0.5">
      <button
        class="transition-colors px-1 py-0.5 rounded border w-[70px]"
        :class="{
          'bg-yellow-100 hover:bg-yellow-200 border-yellow-300': selectedRow?.name === row.name,
          'bg-green-100 hover:bg-green-200 border-green-300': selectedRow?.name !== row.name
        }"
        @click="emit(\'selected\', row)">
        {{ selectedRow?.name === row.name ? 'Selected' : 'Click me' }}
      </button>
    </div>
  \`,
  props: ['row', 'emit', 'selectedRow']
})

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' },
  { key: 'actions', component: ActionsCellComponent, extraProps: () => ({ selectedRow: unref(selectedRow) }) }
]

// placeholder variable for holding the selected row
const selectedRow = ref<any>(null)

const selectedEvtHandler = (row: any) => { selectedRow.value = row.name === unref(selectedRow)?.name ? null : row }

<\/script>
`

const codeLxrTableInfiniteScroll = `
<template>
  <!-- important: set heigth property in the table container for sticky headers -->
  <div style="height: 200px;">
    <lxr-table
      :columns="columns"
      :rows="rows"
      threshold="30%"
      :fetch-more-callback="fetchMoreCallback"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Chance from 'chance' // we use chance.js in this example for generating demo data

const chance = new Chance()

// row generating method
const generateRows = (count: number) => [...Array(count).keys()]
  .map(() => ({ name: chance.name(), jobTitle: chance.profession() }))

const rows = ref(generateRows(50))

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'jobTitle', label: 'Job Title' }
]

const fetchMoreCallback = async () => {
  return new Promise<void>(resolve => {
    // simulate a 1s loading time...
    setTimeout(() => {
      // add 50 more rows
      rows.value.push(...generateRows(50))
      resolve()
    }, 1000)
  })
}

<\/script>
`

const dataSheetLxrTable = [
  {
    property: 'columns*',
    type: [
      [
        'LxrColumn[]',
        'LxrColumn',
        'Column definition object',
        [
          { key: 'key*', type: 'string', description: 'Column key' },
          { name: 'label*', type: 'string', description: 'Column header label' },
          { name: 'align', type: '"left" | "right" | "center"', description: 'Cell content alignment, defaults to "left"' },
          { name: 'sortable', type: 'boolean', description: 'Sets column as sortable, defaults to false' },
          { name: 'headerClasses', type: 'string', description: 'Classes applied to column header' },
          { name: 'cellClasses', type: 'string', description: 'Classes applied to column cells' },
          { name: 'component', type: 'Component', description: 'Custom component to be shown as column cells' },
          { name: 'extraProps', type: '() => Object', description: 'Extra properties to be passed to the custom component' }
        ]
      ]
    ],
    description: 'Table columns'
  },
  {
    property: 'rows*',
    type: ['any[]'],
    description: 'Table rows'
  },
  {
    property: 'sort',
    type: ['null | Record<string, boolean>'],
    description: 'Sorting key or null'
  },
  {
    property: 'threshold',
    type: ['string | number'],
    description: 'The threshold distance from the bottom of the content to call the infinite output event when scrolled. Value can be a number (pixels, from bottom) or string (in "px" or "%"). Defaults to "15%".'
  },
  {
    property: 'fetchMoreCallback',
    type: ['() => Promise<void>'],
    description: 'Optional callback that gets triggered when user scrolls below the defined threshold level.'
  },
  {
    property: 'tableClasses',
    type: ['string'],
    description: 'Optional css classes to be applied to the table element.'
  },
  {
    property: 'rowClasses',
    type: ['string'],
    description: 'Optional css classes to be applied to all table rows.'
  }
]

const eventSheetLxrTable = [
  {
    event: 'sort',
    callback: '(null | Record<string, boolean>) => void',
    description: 'Triggered on user UI interaction with column sort controls. \nCallback argument is either null (sorting disabled) or object having as key the sorting key and value a boolean refering the sorting direction (asc).'
  }
]

</script>
