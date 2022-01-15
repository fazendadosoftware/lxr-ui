import NestedRouterView from '@/views/components/NestedRouterView.vue'

export enum Routes {
  LandingPage = 'home',
  Introduction = 'introduction',
  GettingStarted = 'gettingStarted',
  LxrTable = 'lxrTable'
}

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/SidebarLayout.vue'),
    children: [
      {
        path: '',
        name: Routes.LandingPage,
        component: () => import('@/views/LandingPage.vue')
      },
      {
        path: 'introduction',
        name: Routes.Introduction,
        component: () => import('@/views/Introduction.vue')
      },
      {
        path: 'getting-started',
        name: Routes.GettingStarted,
        component: () => import('@/views/GettingStarted.vue')
      },
      {
        path: 'components',
        component: NestedRouterView,
        children: [
          {
            path: 'lxr-table',
            name: Routes.LxrTable,
            component: () => import('@/views/components/LxrTable.vue')
          }
        ]
      }
    ]
  }
  /*
  {
    path: '*',
    redirect: { name: Routes.LandingPage }
  }
  */
]

export default routes
