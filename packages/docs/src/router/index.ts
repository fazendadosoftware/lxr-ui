import { createRouter, createWebHashHistory } from 'vue-router'
import routes, { Routes, getLibraryComponentNavItems } from './routes'

export { Routes, getLibraryComponentNavItems }

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
