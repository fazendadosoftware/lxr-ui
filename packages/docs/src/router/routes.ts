import NestedRouterView from '@/views/NestedRouterView.vue'
import { NavItem } from '../types'

export enum Routes {
  LandingPage = 'home',
  Introduction = 'introduction',
  GettingStarted = 'gettingStarted',
  LxrTable = 'lxrTable',
  Github = 'github',
  Twitter = 'twitter',
  Tutorials = 'tutorials',
  Tutorial = 'tutorial'
}

interface LibraryComponentCategoryIndex {
  dataDisplay: string
}

export interface LibraryComponent {
  path: string
  name: Routes
  component: () => Promise<typeof import('*.vue') | any>
  meta: { category: keyof LibraryComponentCategoryIndex, icon: string, label: string }
}

const libraryComponentCategoryIndex: LibraryComponentCategoryIndex = {
  dataDisplay: 'Data Display'
}

const components: LibraryComponent[] = [
  {
    path: 'lxr-table',
    name: Routes.LxrTable,
    component: () => import('@/views/components/LxrTable/LxrTable.vue'),
    meta: { category: 'dataDisplay', icon: 'view_module', label: 'LxrTable' }
  }
]

export const getLibraryComponentNavItems = (): NavItem[] => {
  const categoryIndex = components
    .reduce((accumulator: Record<string, NavItem[]>, component) => {
      const navItem = { key: component.name, label: component.meta.label, icon: component.meta.icon, examples: component.component().then(({ examples }) => examples) }
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
        component: () => import('@/views/MarkdownTemplate.vue')
      },
      {
        path: 'getting-started',
        name: Routes.GettingStarted,
        component: () => import('@/views/GettingStarted.vue')
      },
      {
        path: 'component',
        component: NestedRouterView,
        children: components
      },
      {
        path: 'tutorials',
        component: NestedRouterView,
        children: [
          {
            path: '',
            name: Routes.Tutorials,
            component: () => import('@/views/TutorialsMaster.vue')
          },
          {
            path: ':id',
            name: Routes.Tutorial,
            component: () => import('@/views/MarkdownTemplate.vue')
          }
        ]
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
  }
]

export default routes
