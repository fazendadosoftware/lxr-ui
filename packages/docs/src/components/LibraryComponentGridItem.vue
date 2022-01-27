<template>
  <router-link
    v-slot="{ navigate }"
    :to="{ name: component.key }"
    custom>
    <div
      class="bg-white prose prose-h3:m-0 border border-gray-100 shadow rounded-md px-4 py-2 sm:px-6 sm:py-3 space-y-1 cursor-pointer hover:shadow-xl transition-all duration-300"
      @click="navigate">
      <div class="flex space-x-2 items-center">
        <h3 class="flex items-center text-sm sm:text-lg text-gray-700">
          <span v-if="component.icon" class="material-icons material-icons-outlined mr-1 text-sm sm:text-xl">
            {{ component.icon }}
          </span>
          {{component.label}}
        </h3>
      </div>
      <div class="ml-1 text-sm font-medium text-gray-500">
        {{ `${examples} example${examples === 1 ? '' : 's'}` }} 
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { toRefs, watch, ref } from 'vue'
import { NavItem } from '../types.d'
const props = defineProps<{ component: NavItem }>()
const { component } = toRefs(props)
const examples = ref<null | number>(null)

watch(component, async component => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  examples.value = (await component?.examples)?.length ?? null
}, { immediate: true })
</script>
