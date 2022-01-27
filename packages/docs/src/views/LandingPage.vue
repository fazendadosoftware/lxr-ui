<template>
  <div class="mx-auto container space-y-4 sm:space-y-10 px-8 sm:pt-20">
    <!-- hero section -->
    <section class="max-w-none prose flex flex-col items-center sm:items-start">
      <lxr-ui-logo class="stroke-gray-600 fill-white drop-shadow h-10 stroke-1"/>
      <h3 class="text-white text-shadow text-center">A Vue 3 Component Library for Building LeanIX Custom Reports </h3>
      <div class="flex space-x-6 py-8">
        <router-link
          v-slot="{navigate}"
          :to="{ name: Routes.Introduction }"
          custom>
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 border border-gray-100 shadow text-lg font-medium rounded-lg text-gray-700 bg-white hover:shadow-xl focus:outline-none transition-all"
            @click="navigate">
            Introduction
          </button>
        </router-link>
        <router-link
          v-slot="{ navigate }"
          :to="{ name: Routes.GettingStarted }"
          custom>
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg shadow bg-yellow-300 hover:shadow-xl focus:outline-none transition-all"
            @click="navigate">
            Get started
          </button>
        </router-link>
      </div>
    </section>
    <!-- components section-->
    <section class="prose max-w-none">
      <h1 class="text-white text-shadow text-2xl sm:text-4xl">Components</h1>
      <div
        v-for="category in components"
        :key="category.key">
        <h2 class="text-white text-shadow text-xl sm:text-2xl mt-0">{{category.label}}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-3">
          <library-component-grid-item
            v-for="component in category?.children ?? []"
            :key="component.key"
            :component="component" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import LxrUiLogo from '@/components/LxrUiLogo.vue'
import LibraryComponentGridItem from '@/components/LibraryComponentGridItem.vue'
import { getLibraryComponentNavItems, Routes } from '../router'
const components = getLibraryComponentNavItems()
</script>
