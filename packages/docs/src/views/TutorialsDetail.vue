<template>
  <div v-if="tutorial">
    <div>{{tutorial?.title}}</div>
    <div>{{tutorial?.description}}</div>
    <div
      v-for="(section, i) in tutorial.content"
      :key="i">
      {{section}}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getTutorialById } from '../data/tutorials'
import { Tutorial } from '../types'
const { params: { id } } = useRoute()
const tutorial = ref<null | Tutorial>(null)

onBeforeMount(async () => {
  const { default: _tutorial } = await getTutorialById(id as string)
  tutorial.value = _tutorial
})
</script>