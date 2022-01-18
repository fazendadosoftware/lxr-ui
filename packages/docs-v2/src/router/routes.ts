import NestedRouterView from '@/views/NestedRouterView.vue'
import { NavItem } from '../types'

export enum Routes {
  LandingPage = 'home',
  Introduction = 'introduction',
  GettingStarted = 'gettingStarted',
  LxrTable = 'lxrTable',
  Github = 'github',
  Twitter = 'twitter'
}

interface LibraryComponentCategoryIndex {
  dataDisplay: string
}

export interface LibraryComponent {
  path: string
  name: Routes
  component: () => Promise<typeof import('*.vue')>
  meta: { category: keyof LibraryComponentCategoryIndex, icon: string, label: string, examples: number }
}

const libraryComponentCategoryIndex: LibraryComponentCategoryIndex = {
  dataDisplay: 'Data Display'
}

const components: LibraryComponent[] = [
  {
    path: 'lxr-table',
    name: Routes.LxrTable,
    component: () => import('@/views/components/LxrTable.vue'),
    meta: { category: 'dataDisplay', icon: 'view_module', label: 'LxrTable', examples: 3 }
  }
]

export const getLibraryComponentNavItems = (): NavItem[] => {
  const categoryIndex = components
    .reduce((accumulator: Record<string, NavItem[]>, component) => {
      const navItem = { key: component.name, label: component.meta.label, icon: component.meta.icon, examples: component.meta.examples }
      if (!accumulator[component.meta.category]) accumulator[component.meta.category] = []
      accumulator[component.meta.category].push(navItem)
      return accumulator
    }, {})

  const navItems = Object.entries(categoryIndex)
    .reduce((accumulator: NavItem[], [category, navItems]) => {
      const categoryLabel = libraryComponentCategoryIndex[category as keyof LibraryComponentCategoryIndex]
      const navItem = { key: category, label: categoryLabel, children: navItems }
      accumulator.push(navItem)
      return accumulator
    }, [])
  return navItems
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
        children: components
      }
    ]
  },
  {
    path: '/github',
    name: Routes.Github,
    component: () => import('@/views/NestedRouterView.vue'),
    beforeEnter: () => {
      window.open('https://github.com/fazendadosoftware/lxr-ui')
      return false
    }
  },
  {
    path: '/twitter',
    name: Routes.Twitter,
    component: () => import('@/views/NestedRouterView.vue'),
    beforeEnter: () => {
      window.open('https://twitter.com/lxr_ui')
      return false
    }
  }
  /*
  {
    path: '*',
    redirect: { name: Routes.LandingPage }
  }
  */
]

export default routes
