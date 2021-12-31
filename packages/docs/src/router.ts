import { createRouter, createWebHistory } from 'vue-router'
import Views from './views'

const routes = [
  {
    path: process.env.NODE_ENV === 'production' ? '/lxr-ui/' : '/',
    component: Views.Home,
    children: [
      {
        path: '',
        component: Views.LandingPage
      },
      {
        path: '/introduction',
        component: Views.Introduction
      },
      {
        path: '/start',
        component: Views.GettingStarted
      },
      {
        path: '/components',
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
