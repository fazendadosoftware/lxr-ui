<template>
  <div class="px-6 py-4 cursor-default select-none">
    <div
      v-for="section in navItems"
      :key="section.key"
      class="mb-6">
      <div
        v-text="section.label"
        class="text-xl font-semibold leading-loose mb-2"/>
      <div
        v-if="Array.isArray(section.children)"
        class="pl-4">
        <router-link
          v-for="child in section.children"
          :key="child.key"
          :to="{ name: child.key }"
          v-slot="{ isActive }">
          <div
            class="flex items-center space-x-2 transform duration-300 transition-all cursor-pointer text-sm font-semibold py-2"
            :class="{
              'text-blue-100 hover:bg-leanix-blue/100 -mr-6 -ml-12 pl-12': !isActive,
              'text-white bg-leanix-blue/100 translate-x-2 -mr-4 -ml-12 pl-12': isActive
            }">
            <span v-if="child.icon" class="material-icons material-icons-outlined">
              {{child.icon}}
            </span>
            <span>
              {{child.label}}
            </span>
          </div>
          
        </router-link>
      </div>
      <div
        v-else
        class="italic">
        Coming soon...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Routes } from '../router'

const navItems = [
  {
    key: 'general',
    label: 'General',
    children: [
      { key: Routes.Introduction, label: 'Introduction', icon: 'emoji_people' },
      { key: Routes.GettingStarted, label: 'Getting Started', icon: 'whatshot' }
    ]
  },
  {
    key: 'components',
    label: 'Components',
    children: [
      { key: Routes.LxrTable, label: 'LxrTable', icon: 'view_module' }
    ]
  },
  {
    key: 'tutorials',
    label: 'Tutorials'
  }
]
</script>
