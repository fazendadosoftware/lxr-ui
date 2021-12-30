import { createRouter, createWebHistory } from 'vue-router'
import Views from './views'

const routes = [
  {
    path: '/',
    component: Views.Home,
    children: [
      {
        path: '',
        component: Views.Landing
      },
      {
        path: 'introduction',
        component: Views.Introduction
      },
      {
        path: 'start',
        component: Views.GettingStarted
      },
      {
        path: 'components',
        component: Views.Components,
        children: [
          {
            path: 'lxr-table',
            component: Views.LxrTable
          }
        ]
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})
