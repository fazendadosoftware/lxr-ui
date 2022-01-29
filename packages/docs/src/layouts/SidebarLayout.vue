<template>
  <div>
    <transition-root as="template" :show="sidebarOpen">
      <t-dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
        <transition-child as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <dialog-overlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </transition-child>
        <transition-child as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-leanix-blue">
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto flex flex-col items-start space-y-8 text-white">
              <router-link
                v-slot="{ navigate }"
                :to="{ name: Routes.LandingPage }"
                custom>
                <lxr-ui-logo
                  class="stroke-gray-600 fill-white drop-shadow h-10 cursor-pointer px-6 mt-4"
                  @click="navigate"/>
              </router-link>
              <navigation-list />
            </div>
          </div>
        </transition-child>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </t-dialog>
    </transition-root>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-r-white/10">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 text-white">
        <div class="flex-1 flex flex-col overflow-y-auto">
          <div class="flex flex-col justify-center items-center pt-4 pb-6 px-6 space-y-4">
            <router-link
              :to="{name: Routes.LandingPage }"
              class="p-4 rounded-lg">
              <lxr-ui-logo class="stroke-gray-600 fill-white drop-shadow h-11 w-auto"/>
            </router-link>
            <router-link
              v-slot="{ navigate }"
              :to="{ name: Routes.Github }"
              custom>
              <button
                class="group w-full flex items-center justify-center rounded bg-leanix-blue-dark text-white font-semibold border hover:text-leanix-blue-dark hover:bg-white transition-colors text-sm py-0.5"
                @click="navigate">
                <github-icon class="mr-1.5 w-4" :classes="'fill-white group-hover:fill-leanix-blue-dark transition-colors'" />
                Github
              </button>
            </router-link>
          </div>
          <div class="flex-1">
            <navigation-list />
          </div>
        </div>
      </div>
    </div>
    <div class="min-h-screen md:pl-64 flex flex-col flex-1 bg-gradient-to-r from-leanix-blue-dark to-blue-500 via-blue-700">
      <div class="sticky top-0 z-10 md:hidden">
        <button
          type="button"
          class="h-12 w-12 inline-flex items-center justify-center text-white hover:bg-leanix-blue-dark focus:outline-none"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <menu-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1 container py-8 sm:px-8 mx-auto max-w-[960px]">
        <router-view v-slot="{ Component }">
          <transition
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity duration-300"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-to-class="opacity-0"
            mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { DialogOverlay, TransitionChild, TransitionRoot, Dialog as TDialog } from '@headlessui/vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'
import { Routes } from '../router'
import GithubIcon from '@/components/GithubIcon.vue'
import NavigationList from '@/components/NavigationList.vue'
import LxrUiLogo from '@/components/LxrUiLogo.vue'

const sidebarOpen = ref(false)

onBeforeRouteUpdate(() => { if (unref(sidebarOpen)) sidebarOpen.value = false })
</script>
