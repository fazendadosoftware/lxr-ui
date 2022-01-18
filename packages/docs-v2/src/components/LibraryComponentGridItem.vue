<template>
  <router-link
    :to="{ name: component.key }"
    custom
    v-slot="{ navigate }">
    <div
      class="bg-white prose prose-h3:m-0 border border-gray-100 shadow rounded-md px-6 py-2 space-y-1 cursor-pointer hover:shadow-xl transition-all duration-300"
      @click="navigate">
      <div class="flex space-x-2 items-center">
        <h3 class="flex items-center">
          <span v-if="component.icon" class="material-icons mr-1">
            {{ component.icon }}
          </span>
          {{component.label}}
        </h3>
      </div>
      <div class="ml-1 text-sm font-medium text-gray-500">
        {{ `${component.examples} example${component.examples === 1 ? '' : 's'}` }} 
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { NavItem } from '../types.d'
const props = defineProps<{ component: NavItem }>()
const { component } = toRefs(props)
</script>
