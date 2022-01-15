<template>
  <div>
    <github-corner />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts" setup>
import GithubCorner from '@/components/GithubCorner.vue'
</script>
