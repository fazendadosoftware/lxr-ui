<template>
  <div
    class="it-box not-prose bg-white rounded flex flex-col my-10 box-border w-full"
    :class="{ 'overflow-hidden': overflowHidden }">
    <h2 class="font-bold text-xl mt-4 py-4 px-6 leading-none">
      {{ title }}
    </h2>
    <slot name="description" />
    <div
      class="it-box-scene w-full p-6 flex-wrap leading-none flex justify-center items-center box-border">
      <slot />
    </div>

    <div
      class="it-box-code w-full relative overflow-auto"
      :style="{ 'max-height': expandHeight }">
      <it-tooltip ref="tooltip" :content="copyText" class="it-box-code-copy" placement="left">
        <it-button icon="file_copy" @click="clickCopy" />
      </it-tooltip>
      <prism class="border-solid border-t border-[#d3dae6]" language="html" :code="code" />
    </div>
    <it-button class="border-none rounded-none" icon="code" type="neutral" @click="toggleExpand">
      {{ expanded ? 'Hide code' : 'Show code' }}
    </it-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, unref } from 'vue'
const props = defineProps<{ code: string, title: string, overflowHidden?: boolean }>()
const { code, title, overflowHidden = true } = toRefs(props)
const expandHeight = ref('0px')
const copyText = ref('Copy to clipboard')
const expanded = ref(false)
const tooltip = ref<null | any>(null)

const toggleExpand = () => {
  expandHeight.value = unref(expandHeight) === '0px' ? '1000px' : '0px'
  expanded.value = !unref(expanded)
}

const clickCopy = async () => {
  copyText.value = 'Copied!'
  await navigator.clipboard.writeText(unref(code))
  unref(tooltip)?.setPopoverPosition()
}
</script>

<style lang="less">
.it-box {
  border: 1px solid #d3dae6;
  min-height: 150px;
  &-title {
    .it-tag {
      @apply ml-2;
    }
  }
  &-scene {
    & > * + * {
      @apply ml-4;
    }
    & > * {
      @apply mb-4;
    }
  }
  &-code {
    border-bottom: 1px solid #d3dae6;
    transition: max-height 0.4s;
    &-copy {
      position: absolute !important;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
