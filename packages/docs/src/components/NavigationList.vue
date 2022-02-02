<template>
  <div class="px-6 cursor-default select-none">
    <navigation-list-item
      v-for="item in navItems"
      :key="item.key"
      :item="item"
      :level="0"
    />
  </div>
</template>

<script lang="ts" setup>
import NavigationListItem from '@/components/NavigationListItem.vue'
import { Routes, getLibraryComponentNavItems } from '../router'
import { NavItem } from '../types.d'

const navItems: NavItem[] = [
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
    children: getLibraryComponentNavItems()
  },
  {
    key: 'tutorials',
    label: 'Tutorials',
    children: [
      { key: Routes.Tutorials, label: 'Online Catalog', icon: 'menu_book' }
    ]
  }
]
</script>
