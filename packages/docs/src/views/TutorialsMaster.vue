<template>
  <content-template>
    <template #title>
      Tutorials
    </template>
    <template #default>
      <div class="overflow-auto px-4 flex flex-col space-y-4">
        <router-link
          v-for="(tutorial, i) in meta"
          :key="i"
          v-slot="{ navigate }"
          :to="{ name: Routes.Tutorial, params: { id: tutorial.id } }"
          custom>
          <button
            class="bg-slate-800 hover:bg-slate-800/90 transition-colors rounded-xl shadow-lg px-4 py-2 prose max-w-none"
            @click="navigate">
            <h3 class="!text-sky-500 mb-2 leading-6">{{tutorial.title}}</h3>
            <p class="text-base overflow-hidden text-ellipsis">{{tutorial.shortDescription}}</p>
          </button>
        </router-link>
      </div>
    </template>
  </content-template>
</template>

<script lang="ts" setup>
import { Routes } from '../router'
import { getTutorialMetas } from '../data'

const meta = getTutorialMetas()
</script>