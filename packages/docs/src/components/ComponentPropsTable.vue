<template>
  <div class="prose flex items-center">
    <h2>Props</h2>
    <div class="border border-sky-300 text-white rounded shadow-md px-1.5 py-0.5 text-xs font-medium tracking-wider">
      {{componentProperties.tag}}
    </div>
  </div>
  <div class="px-4">
    <table class="not-prose table m-0 w-full border-collapse bg-white rounded-md overflow-hidden">
      <thead class="bg-zinc-200">
        <tr>
          <th v-for="column in propColumns" :key="column.key">
            <span class="font-semibold text-gray-800 text-xs px-2 py-1">
              {{ column.label }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property of componentProperties.properties" :key="property.key">
          <td v-for="column of propColumns" :key="column.key">
            <span
              v-if="column.key === 'typeDef'"
              class="text-xs px-1 py-0.5 border border-gray-300 rounded text-gray-700 cursor-default font-mono bg-gray-100 whitespace-nowrap ml-1 first:ml-0"
              :class="{
                'cursor-pointer hover:bg-gray-200 transition-colors underline': typedefIndex[property[column.key]]
              }"
              @click="showTypingModal(property)">
              {{`${property[column.key]}${property.isArray ? '[]' : ''}`}}
            </span>
            <span v-else>
              {{`${property[column.key]}${column.key === 'key' && property.required ? '*' : ''}`}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <it-modal v-model="showModal">
    <template #header>
      <h3 class="font-bold">
        {{ selectedTyping?.key }}
      </h3>
    </template>

    <template #body>
      <p class="mb-4 text-xs italic">
        {{ selectedTyping?.description }}
      </p>
      <table class="table w-full">
        <thead>
          <tr class="bg-gray-200">
            <th
              v-for="column in typeColumns"
              :key="column.key"
              class="!font-medium">
              {{column.label}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in selectedTyping?.fields" :key="field.key">
            <td v-for="column in typeColumns" :key="column.key">
              <span
                :class="{
                  'text-xs px-1 py-0.5 border border-gray-300 rounded text-gray-700 cursor-default font-mono bg-gray-100 whitespace-nowrap ml-1 first:ml-0': column.key === 'type'
                }">
                {{ field[column.key] }}
              </span>
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
  <div v-if="Array.isArray(componentEvents) && componentEvents.length > 0" class="mb-4">
    <h2 class="!mt-4">Events</h2>
    <div class="px-4">
      <table class="not-prose table m-0 w-full border-collapse bg-white rounded-md overflow-hidden">
        <thead class="bg-zinc-200">
          <tr>
            <th v-for="column in eventColumns" :key="column.key">
              <span class="font-semibold text-gray-800 text-xs">
                {{ column.label }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event of componentEvents" :key="event.event">
            <td v-for="column of eventColumns" :key="column.key">
              <span
                :class="{
                    'text-xs px-1 py-0.5 border border-gray-300 rounded text-gray-700 cursor-default font-mono bg-gray-100 whitespace-nowrap ml-1 first:ml-0': column.key === 'callback'
                  }">
                {{event[column.key]}}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ComponentProperties, ComponentPropTypeDefIndex, ComponentProperty, ComponentPropTypeDef, ComponentPropTypeDefField, ComponentEvent } from '../types'
import { ref, toRefs, unref } from 'vue'

const props = defineProps<{
  componentProperties: ComponentProperties,
  typedefIndex: ComponentPropTypeDefIndex,
  componentEvents?: ComponentEvent[]
}>()

const { typedefIndex } = toRefs(props)

const propColumns: { key: keyof ComponentProperty, label: string }[] = [
  { key: 'key', label: 'Property' },
  { key: 'typeDef', label: 'Type' },
  { key: 'description', label: 'Description' }
]

const typeColumns: { key: keyof ComponentPropTypeDefField, label: string }[] = [
  { key: 'key', label: 'Property' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' }
]

const eventColumns: { key: keyof ComponentEvent, label: string }[] = [
  { key: 'event', label: 'Event' },
  { key: 'callback', label: 'Callback' },
  { key: 'description', label: 'Description' }
]

const showModal = ref<boolean>(false)
const selectedTyping = ref<ComponentPropTypeDef | null>(null)

const showTypingModal = (property: ComponentProperty) => {
  const typing = unref(typedefIndex)[property.typeDef] ?? null
  if (typing !== null) {
    selectedTyping.value = typing
    showModal.value = true
  }
}

</script>