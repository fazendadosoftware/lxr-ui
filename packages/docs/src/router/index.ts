import { createRouter, createWebHistory } from 'vue-router'
import routes, { Routes, getLibraryComponentNavItems } from './routes'

export { Routes, getLibraryComponentNavItems }

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
