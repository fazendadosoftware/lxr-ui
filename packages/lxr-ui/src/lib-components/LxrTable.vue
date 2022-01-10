<template>
  <div class="overflow-y-auto h-full text-[12px]" @scroll.passive="scrollHandler">
    <table
      class="min-w-full !border-separate [border-spacing:0]"
      :class="{
        [tableClasses ?? '']: true
      }">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="select-none font-normal cursor-default sticky top-0 bg-[#f0f0f0] first:border-l border-t border-b border-r border-[#ccc]"
            :class="{ [column?.headerClasses ?? '']: true }">
            <div
              class="group inline-flex justify-center items-center relative px-[4px] py-[2px]"
              :class="{
                'cursor-pointer': column.sortable || getSortingDirection(column) !== null
              }">
              <span
                :class="{ 'group-hover:underline': column.sortable || getSortingDirection(column) !== null }"
                @click="sortEvtHandler(column)">
                {{ column.label }}
              </span>
              <transition
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                enter-active-class="transition-opacity"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                leave-active-class="transition-opacity">
                <div
                  v-if="getSortingDirection(column) !== null"
                  class="absolute -right-2 content-arrow-up h-2.5"
                  :class="{
                    'content-arrow-up': getSortingDirection(column) === 'asc',
                    'content-arrow-down': getSortingDirection(column) === 'desc'
                  }"/>
              </transition>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          class="group"
          :class="rowClasses">
          <td
            v-for="(column, j) in columns"
            :key="`${i}-${j}`"
            class="first:border-l border-r border-b border-[#ccc]"
            :class="{ [column.cellClasses ?? '']: true }"
            :style="getCellStyle(column)">
            <component
              v-if="column.component"
              :is="column.component"
              v-bind="{ row, column, emit, ...(column?.extraProps?.() ?? {}) }" />
            <div
              v-else
              class="px-[4px] py-[2px] block">
              {{ row[column.key] }}
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="transition-opacity"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="transition-opacity">
          <tr v-if="fetchingMore && typeof fetchMoreCallback === 'function'">
            <td :colspan="columns.length">
              <div class="flex items-center justify-center space-x-2 py-[2px] border-x bg-[#f0f0f0]">
                <font-awesome-icon icon="sync" spin />
                <span class="text-sm">Loading...</span>
              </div>
            </td>
          </tr>
        </transition>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, unref, ref, getCurrentInstance, Component } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync } from '@fortawesome/free-solid-svg-icons'

export interface LxrCellComponentProps {
  row?: any
  column?: LxrColumn
  emit?: (type: string, event: any) => void
}

export interface LxrColumn {
  key: string
  label?: string
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  headerClasses?: string
  cellClasses?: string
  component?: Component<LxrCellComponentProps>
  extraProps?: () => Object
}

export type LxrTableSort = Record<string, boolean>

export interface LxrTableProps {
  columns: LxrColumn[]
  rows: any[]
  sort?: LxrTableSort
  /*
  *  The threshold distance from the bottom
  *  of the content to call the infinite output event when scrolled.
  *  The threshold value can be either a percent, or
  *  in pixels. For example, use the value of 10% for the infinite
  *  output event to get called when the user has scrolled 10%
  *  from the bottom of the page. Use the value 100px when the
  *  scroll is within 100 pixels from the bottom of the page.
  */
  threshold?: string | number
  fetchMoreCallback?: () => Promise<void>
  tableClasses?: string
  rowClasses?: string
}

library.add(faSync)

const props = defineProps<LxrTableProps>()
const { columns, threshold, fetchMoreCallback, sort, tableClasses } = toRefs(props)
const fetchingMore = ref(false)
const instance = getCurrentInstance()

const emit = (type: string, evt: any) => instance?.emit(type, evt)

const getCellStyle = (column: LxrColumn) => {
  const { align = 'left' } = column
  const style = `text-align: ${align}`
  return style
}

const getSortingDirection = (column: LxrColumn) => {
  const colSort = unref(sort)?.[column.key] ?? null
  return colSort === true
    ? 'asc'
    : colSort === false
      ? 'desc'
      : null
}

const scrollHandler = async (evt: any) => {
  if (unref(fetchingMore)) return
  const _threshold = unref(threshold) ?? 100
  const { target: { scrollTop, clientHeight, scrollHeight } } = evt
  const scrollDiff = scrollHeight - (scrollTop + clientHeight)

  const fetchMore = async () => {
    fetchingMore.value = true
    try {
      await unref(fetchMoreCallback)?.()
    } finally {
      fetchingMore.value = false
    }
  }

  if (typeof _threshold === 'number') {
    if (scrollDiff < _threshold) await fetchMore()
  } else if (typeof _threshold === 'string') {
    if (!_threshold.endsWith('%') && !_threshold.endsWith('px')) throw Error('invalid threshold unit, should be "%" or "px"')
    if (_threshold.endsWith('px')) {
      const pixels = parseInt(_threshold.slice(0, -2))
      if (isNaN(pixels)) throw Error(`Invalid threshold ${_threshold}`)
      if (scrollDiff < pixels) await fetchMore()
    } else if (_threshold.endsWith('%')) {
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight
      const thresholdPercentage = parseInt(_threshold.slice(0, -1)) / 100
      if (scrollPercentage > thresholdPercentage) await fetchMore()
    }
  }
}

const sortEvtHandler = (column: LxrColumn) => {
  const colSortStatus = unref(sort)?.[column.key] ?? null
  const nextSortState = colSortStatus === null ? true : colSortStatus === false ? null : false
  if (column.sortable) instance?.emit('sort', nextSortState === null ? null : { [column.key]: nextSortState })
}

</script>
