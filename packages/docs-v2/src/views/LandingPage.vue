<template>
  <div class="mx-auto container px-4 sm:px-0 md:px-4">
    <!-- hero section -->
    <section class="my-20 max-w-none border-b prose">
      <lxr-ui-logo class="stroke-blue-900 fill-leanix-blue-dark h-10 stroke-1"/>
      <h3>Vue 3 Component Library for Building LeanIX Custom Reports </h3>
      <div class="flex space-x-6 py-8">
        <router-link
          :to="{ name: Routes.GettingStarted }"
          custom
          v-slot="{ navigate }">
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-lg shadow text-white bg-leanix-blue hover:shadow-xl focus:outline-none transition-all"
            @click="navigate">
            Get started
          </button>
        </router-link>
        <router-link
          :to="{ name: Routes.Github }"
          custom
          v-slot="{navigate}">
          <button
            type="button"
            class="inline-flex items-center px-6 py-3 border border-gray-300 shadow text-lg font-medium rounded-lg text-gray-700 bg-white hover:shadow-xl focus:outline-none transition-all"
            @click="navigate">
            Github
          </button>
        </router-link>
      </div>
    </section>
    <!-- components section-->
    <section class="prose prose-stone max-w-none">
      <h1>Components</h1>
      <div
        v-for="category in components"
        :key="category.key">
        <h2>{{category.label}}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 pb-3">
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
