<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { LxrUiSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  LxrUiSample,
  // }
});
</script>

<template>
  <div id="app">
    <lxr-ui-sample />
  </div>
</template>
