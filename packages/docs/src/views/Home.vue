<template>
  <div class="page">
    <sidebar />
    <v-row class="flex" justify="center">
      <v-col class="flex flex-col my-12" lg="9" sm="10" xs="11">
        <router-view />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style lang="less">
.page {
  padding-left: 14rem;
  left: 0;
}
@media only screen and (max-width: 900px) {
  .page {
    padding-left: 0px;
  }
}
</style>
