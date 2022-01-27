<template>
  <router-link
    v-if="!Array.isArray(item.children)"
    v-slot="{ navigate, isActive }"
    :to="{ name: item.key }"
    custom>
    <div
      :class="{
        'text-white hover:bg-white/10 -mr-6 pl-8 -ml-8 opacity-70 hover:opacity-100': !isActive,
        'text-white bg-white/20 translate-x-2 -mr-4 -ml-12 pl-12 opacity-100': isActive
      }"
      class="flex items-center space-x-2 transform duration-300 transition-all cursor-pointer text-sm font-semibold py-0.5"
      @click="navigate">
      <span v-if="item?.icon" class="material-icons material-icons-outlined text-xl">
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
          'text-base tracking-widest font-bold leading-loose mb-2 uppercase': level === 0,
          'font-medium text-xs rounded inline px-1 py-0.5 text-white/90': level === 1
        }">
        {{item.label}}
      </div>
      <template v-if="Array.isArray(item.children) && item.children.length">
        <navigation-list-item
          v-for="child in item.children"
          :key="child.key"
          :item="child"
          :level="level + 1"/>
      </template>
      <span v-else class="italic text-xs opacity-70 -mt-2 ml-2 block">coming soon...</span>
    </div>

  </template>
</template>

<script lang="ts" setup>
import { NavItem } from '../types'

defineProps<{ item: NavItem, level: number }>()
</script>
