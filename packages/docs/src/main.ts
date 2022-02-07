import { createApp } from 'vue/dist/vue.esm-bundler.js'
import LxrUI from 'lxr-ui'
import { VTooltip } from 'floating-vue'
import Equal from 'equal-vue'
import router from './router'
import ContentTemplate from './components/ContentTemplate.vue'
import ComponentTemplate from './components/ComponentTemplate.vue'
import App from './App.vue'

import './tailwind.css'
import 'floating-vue/dist/style.css'
import 'equal-vue/dist/style.css'
// import 'animate.css'

createApp(App)
  .use(LxrUI)
  .use(Equal)
  .use(router)
  .directive('tooltip', VTooltip)
  .component('component-template', ComponentTemplate)
  .component('content-template', ContentTemplate)
  .mount('#app')
