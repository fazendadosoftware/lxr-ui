import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { Routes } from './routes'

export { Routes }

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
