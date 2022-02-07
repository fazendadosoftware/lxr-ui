<template>
  <article
    class="text-shadow flex-1 flex flex-col prose prose-a:text-yellow-300 prose-a:underline prose-a:font-bold prose-h1:text-white prose-h2:text-yellow-300 prose-p:text-white max-w-none -mt-6 sm:mt-0 px-6 sm:px-0 py-0 overflow-auto">
    <div class="max-w-[960px] mx-auto pt-8 pb-0 sm:pt-16 w-full">
      <div v-html="markdown" />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { getContentById } from '../data'

const { name, params: { id } } = useRoute()
const markdown = ref('')

onBeforeMount(async () => {
  markdown.value = await getContentById((id ?? name) as string)
})
</script>