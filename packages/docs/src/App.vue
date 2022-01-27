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

<style>
.text-shadow {
  text-shadow: 1px 1px 2px #71717A;
}
</style>