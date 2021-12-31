import { createApp } from 'vue/dist/vue.esm-bundler.js'
import Equal from 'equal-vue'
import LxrUI from 'lxr-ui'
import { router } from './router'
import App from './App.vue'
import Prism from './components/Prism'

import VCol from './components/VCol.vue'
import VRow from './components/VRow.vue'
import CodeBox from './components/CodeBox.vue'
import DemoBox from './components/DemoBox.vue'
import VBox from './components/VBox.vue'
import PropsTable from './components/PropsTable.vue'

import { clickOutside } from './directives'

import './styles/main.css'
import './styles/prism-tomorrow.css'
import 'equal-vue/dist/style.css'

const app = createApp(App)
  .directive('clickoutside', clickOutside)
  .component('prism', Prism)
  .component('v-col', VCol)
  .component('v-row', VRow)
  .component('code-block', CodeBox)
  .component('demo-box', DemoBox)
  .component('v-box', VBox)
  .component('props-table', PropsTable)
  .use(router)
  .use(Equal)
  .use(LxrUI)

app.mount('#app')
