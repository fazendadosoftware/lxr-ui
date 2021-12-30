<template>
  <div class="page">
    <sidebar />
    <github-corner
      url="https://github.com/fazendadosoftware/lxr-ui"
      :size="80"
      :corner-color="'#151513'"
      :git-color="'white'"
    />
    <v-row class="flex bg-gradient-to-br from-indigo-100 min-h-screen" justify="center">
      <v-col class="flex flex-col my-12" lg="9" sm="10" xs="11">
        <router-view />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '../components/Sidebar.vue'
import GithubCorner from '../components/GithubCorner.vue'
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
