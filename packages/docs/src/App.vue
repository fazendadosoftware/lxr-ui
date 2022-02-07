<template>
  <div class="relative">
    <github-corner />
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import GithubCorner from '@/components/GithubCorner.vue'
</script>
