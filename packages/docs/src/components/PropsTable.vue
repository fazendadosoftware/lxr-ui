<template>
  <div class="table-box border border-[#d3dae6] rounded-[4px] flex flex-col box-border overflow-x-auto overflow-y-hidden">
    <h2 v-if="dataSheet" class="py-4 px-6 leading-none bg-white">
      Props <it-tag v-if="tagName">{{ tagName }}</it-tag>
    </h2>
    <table v-if="dataSheet" class="table w-full border-collapse bg-white">
      <thead class="bg-[#fafbfd] border-[#f2f7ff] border-t border-b">
        <tr>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Property
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Type
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Description
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) of dataSheet" :key="i">
          <td v-for="(col, j) of item" :key="j">
            <div v-if="Array.isArray(col)">
              <span
                v-for="(t, n) of col"
                :key="n"
                class="text-xs px-1 py-0.5 border border-gray-300 rounded text-gray-700 cursor-default font-mono bg-gray-100 whitespace-nowrap ml-1 first:ml-0"
                :class="{
                  '!cursor-pointer hover:bg-gray-200 transition-colors underline': Array.isArray(t)
                }"
                @click="Array.isArray(t) ? showTypingModal(t) : undefined">
                {{Array.isArray(t) ? t[0] : t}}
              </span>
            </div>
            <span v-else>{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 v-if="slotSheet" class="py-4 px-6 leading-none bg-white">Slots</h2>
    <table v-if="slotSheet" class="table">
      <thead>
        <tr>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Name
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Description
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, j) of slotSheet" :key="j">
          <td v-for="(col, i) in item" :key="i">
            <span>{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 v-if="methodSheet" class="py-4 px-6 leading-none bg-white">Methods</h2>
    <table v-if="methodSheet" class="table">
      <thead>
        <tr>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Method
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Description
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Arguments
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in methodSheet" :key="item.property">
          <td v-for="(col, i) in item" :key="i">
            <span>{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 v-if="eventSheet" class="py-4 px-6 leading-none bg-white">Events</h2>
    <table v-if="eventSheet" class="table bg-white">
      <thead>
        <tr>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Type
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Callback
            </span>
          </th>
          <th>
            <span class="font-semibold text-gray-800 text-xs">
              Description
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in eventSheet" :key="i">
          <td v-for="(col, j) in item" :key="j">
            <span
              v-if="j === 'callback'"
              :key="j"
              class="text-xs whitespace-nowrap px-1 py-0.5 border border-gray-300 rounded text-gray-700 cursor-default font-mono bg-gray-100">
              {{col}}
            </span>
            <span v-else class="leading-5">{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <it-modal v-model="showModal">
      <template #header>
        <h3 class="font-bold">
          {{ selectedTyping?.[1] }}
        </h3>
      </template>

      <template #body>
        <p class="mb-4 text-xs italic">
          {{ selectedTyping?.[2] }}
        </p>
        <table class="table w-full">
          <thead>
            <tr class="bg-gray-200">
              <th class="font-bold">Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in selectedTyping?.[3]" :key="i" class="hover:bg-gray-100 transition-colors">
              <td v-for="(col, j) in item" :key="j">
                <span>{{ col }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #actions>
        <it-button type="primary" @click="showModal = false">
          Close
        </it-button>
      </template>
    </it-modal>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue'

export interface DataSheetProperty {
  key: string
  type: string[]
  required: boolean
  description: string
}

export interface EventSheetItem {
  event: string
  description: string
  callback: string
}

export interface SlotSheetItem {
  name: string
  description: string
}

export interface PropsTableProps {
  tagName: string
  dataSheet: DataSheetProperty[]
  eventSheet?: EventSheetItem[]
  methodSheet?: any[]
  slotSheet?: SlotSheetItem[]
}

const props = defineProps<PropsTableProps>()
const { tagName, dataSheet, eventSheet, methodSheet, slotSheet } = toRefs(props)
const showModal = ref<boolean>(false)
const selectedTyping = ref<any>(null)

const showTypingModal = (typing: any) => {
  selectedTyping.value = typing
  showModal.value = true
}
</script>

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
