<template>
  <router-link
    v-if="!Array.isArray(item.children)"
    :to="{ name: item.key }"
    v-slot="{ navigate, isActive }"
    custom>
    <div
      @click="navigate"
      class="flex items-center space-x-2 transform duration-300 transition-all cursor-pointer text-sm font-semibold py-2"
      :class="{
        'text-white hover:bg-white/10 -mr-6 pl-8 -ml-8': !isActive,
        'text-white bg-white/20 translate-x-2 -mr-4 -ml-12 pl-12': isActive
      }">
      <span v-if="item?.icon" class="material-icons material-icons-outlined">
        {{item?.icon}}
      </span>
      <span>
        {{item.label}}
      </span>
    </div>
  </router-link>
  <template v-else>
    <div class="mb-6 last:mb-0">
      <div
        :class="{
          'text-xl font-semibold leading-loose mb-2': level === 0,
          'font-semibold text-xs rounded inline px-1 py-0.5 text-white bg-blue-800': level === 1
        }">
        {{item.label}}
      </div>
      <navigation-list-item v-for="child in item.children" :key="child.key" :item="child" :level="level + 1"/>
    </div>

  </template>
</template>

<script lang="ts" setup>
import { NavItem } from '../types'

const props = defineProps<{ item: NavItem, level: number }>()
</script>
