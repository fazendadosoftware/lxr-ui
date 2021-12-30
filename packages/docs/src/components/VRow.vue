<template>
  <div
    :style="{ 'align-items': align, 'justify-content': justify, width: (width * 100) / 12 + '%' }"
    class="clear-both flex-wrap">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps<{
  width?: number,
  justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
  align?: 'stretch' | 'center' | 'start' | 'end'
}>()
const { width = 12, justify, align } = toRefs(props)
</script>
