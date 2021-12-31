import { createRouter, createWebHistory } from 'vue-router'
import Views from './views'

const routes = [
  {
    path: process.env.NODE_ENV === 'production' ? '/lxr-ui/' : '/',
    component: Views.Home,
    children: [
      {
        path: '',
        name: 'landingPage',
        component: Views.LandingPage
      },
      {
        path: 'introduction',
        name: 'introduction',
        component: Views.Introduction
      },
      {
        path: 'getting-started',
        name: 'gettingStarted',
        component: Views.GettingStarted
      },
      {
        path: 'components',
        component: Views.Components,
        children: [
          {
            path: 'lxr-table',
            name: 'lxrTable',
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
