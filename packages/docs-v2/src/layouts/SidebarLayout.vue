<template>
  <div>
    <transition-root as="template" :show="sidebarOpen">
      <t-dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
        <transition-child as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <dialog-overlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </transition-child>
        <transition-child as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full bg-leanix-blue">
            <transition-child as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <x-icon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </transition-child>
            <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div class="flex-shrink-0 flex items-center px-4">
                <img class="h-8 w-auto" src="../assets/img/lxr-ui-logo.svg" alt="Lxr-UI" />
              </div>
              <nav class="mt-5 px-2 space-y-1">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-leanix-blue-dark text-white' : 'text-white hover:bg-leanix-blue-dark hover:bg-opacity-75', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                  <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </nav>
            </div>
          </div>
        </transition-child>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </t-dialog>
    </transition-root>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex-1 flex flex-col min-h-0 bg-gradient-to-tl from-leanix-blue-dark to-leanix-blue text-white">
        <div class="flex-1 flex flex-col overflow-y-auto">
          <div class="flex flex-col justify-center items-center pt-4 pb-6 px-6 space-y-4 bg-gradient-to-b from-blue-400 to-leanix-blue border-b border-blue-400">
            <router-link
              :to="{name: Routes.LandingPage }"
              class="p-4 rounded-lg">
              <lxr-ui-logo class="stroke-blue-900 fill-blue-100 h-10 stroke-1"/>
            </router-link>
            <router-link
              :to="{ name: Routes.Github }"
              custom
              v-slot="{ navigate }">
              <button
                class="group w-full flex items-center justify-center rounded bg-leanix-blue text-white font-semibold border hover:text-leanix-blue-dark hover:bg-white transition-colors text-sm py-0.5"
                @click="navigate">
                <github-icon class="mr-1.5 w-4" :classes="'fill-white group-hover:fill-leanix-blue-dark transition-colors'" />
                Github
              </button>
            </router-link>
            <router-link
              :to="{ name: Routes.Twitter }"
              custom
              v-slot="{ navigate }">
              <button
                class="group w-full flex items-center justify-center rounded bg-leanix-blue text-white font-semibold border hover:text-leanix-blue-dark hover:bg-white transition-colors text-sm py-0.5"
                @click="navigate">
              <twitter-icon class="mr-1.5 w-4" :classes="'fill-white group-hover:fill-leanix-blue-dark transition-colors'" />
                Twitter
              </button>
            </router-link>
          </div>
          <div class="flex-1 bg-gradient-to-b from-leanix-blue to-leanix-blue-dark">
            <navigation-list />
          </div>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 md:hidden bg-leanix-blue">
        <button
          type="button"
          class="h-12 w-12 inline-flex items-center justify-center text-white hover:bg-leanix-blue-dark focus:outline-none"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <menu-icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="min-h-screen bg-blue-100">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DialogOverlay, TransitionChild, TransitionRoot, Dialog as TDialog } from '@headlessui/vue'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuIcon,
  UsersIcon,
  XIcon
} from '@heroicons/vue/outline'
import { Routes } from '../router'
import GithubIcon from '@/components/GithubIcon.vue'
import TwitterIcon from '@/components/TwitterIcon.vue'
import NavigationList from '@/components/NavigationList.vue'
import LxrUiLogo from '@/components/LxrUiLogo.vue'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartBarIcon, current: false }
]

const sidebarOpen = ref(false)
</script>
