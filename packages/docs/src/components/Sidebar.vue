<template>
  <div
    v-clickoutside="hideSidebar"
    class="sidebar select-none fixed left-0 box-border flex flex-col w-[15rem] bg-[#fafbfd] border-[#d3dae6] border-r h-full transition-all duration-[0.18s]"
    :style="{ left, zIndex }">
    <it-button class="burger" :icon="left === 'inherit' ? 'menu' : 'close'" @click="toggleSidebar" />
    <div class="px-[12px] py-[20px] bg-white border-[#d3dae6] border-b">
      <router-link :to="{ name: 'landingPage' }" class="logo-link">
        <img class="w-full px-6 py-2" src="../assets/img/lxr-ui-logo.svg" />
      </router-link>
      <div class="mt-4 flex flex-col">
        <a target="_blank" class="flex" rel="noopener noreferrer" href="https://github.com/fazendadosoftware/lxr-ui">
          <it-button size="small" block>
            <img src="../assets/img/github-logo.svg" class="mr-2 h-3"/>
            Github
          </it-button>
        </a>
        <a target="_blank" class="flex mt-2" rel="noopener noreferrer" href="https://twitter.com/lxr_ui">
          <it-button size="small" block>
            <img src="../assets/img/twitter-logo.svg" class="mr-2 h-3"/>
            Twitter
          </it-button>
        </a>
      </div>
    </div>
    <ul class="sidebar-menu w-full box-border list-none m-0 text-[14px] overflow-y-auto overflow-x-hidden">
      <li class="group-title-high">
        General
      </li>
      <li :class="{ 'active-menu-item': $route.name === 'introduction' }" @click="hideSidebar">
        <router-link :to="{ name: 'introduction' }">
          <span class="flex p-2">
            <it-icon outlined name="emoji_people" class="mr-2" />
            Introduction
          </span>
        </router-link>
      </li>
      <li :class="{ 'active-menu-item': $route.name === 'gettingStarted' }" @click="hideSidebar">
        <router-link :to="{ name: 'gettingStarted' }">
          <span class="flex p-2">
            <it-icon outlined name="whatshot" class="mr-2" />
            Getting started
          </span>
        </router-link>
      </li>
      <li class="group-title-high">
        Components
      </li>
      <template v-for="(item, key) in componentGroups" :key="key">
        <li class="group-title">{{ key }}</li>
        <template v-for="(component, i) in item as any" :key="i">
          <li
            :class="{ 'active-menu-item': $route.name === component.routeName }"
            @click="hideSidebar"
          >
            <router-link :to="{ name: component.routeName }">
              <span class="flex p-2">
                <it-icon :name="component.icon" class="mr-2" />
                {{ component.name }}
              </span>
            </router-link>
          </li>
        </template>
      </template>
      <li class="group-title-high">
        Tutorials
      </li>
      <div class="ml-10 italic text-xs text-gray-500">Coming soon...</div>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { IComponentListItem, ComponentGroup } from '../types.d'
import { componentsList } from '../data/components'

const route = useRoute()
const left = ref('inherit')
const zIndex = ref(0)
const components = ref<IComponentListItem[]>(componentsList)
const componentGroups = computed(() => {
  return Object.values(ComponentGroup).reduce((el, next) => {
    return {
      ...el,
      [next]: components.value
        .map((el) => {
          if (el.name === 'Switch') {
            el.icon =
              route.path === '/components/switch'
                ? 'toggle_on'
                : 'toggle_off'
          }
          return el
        })
        .filter((comp) => comp.group === next)
    }
  }, {})
})

const toggleSidebar = () => {
  left.value = left.value === 'inherit' ? '0px !important' : 'inherit'
  zIndex.value = zIndex.value === 0 ? 1 : 0
}

const hideSidebar = () => {
  if (left.value === 'inherit') {
    return
  }
  left.value = 'inherit'
  zIndex.value = 0
}
</script>

<style scoped>
.group-title {
  @apply select-none cursor-default text-sm font-semibold text-gray-800 !pt-[16px] !pr-[0px] !pb-[5px] !pl-[30px];
}
.group-title-high {
  @apply select-none cursor-default uppercase text-base font-semibold tracking-[1px] !pt-[20px] !pr-[0px] !pb-[5px] !pl-[30px];
}

.burger {
  @apply hidden absolute right-[-33px] top-[8px] z-50;
}
</style>

<style lang="less">
.sidebar {
  &-menu {
    & > li {
      display: list-item;
      box-sizing: border-box;
      padding: 0 15px;
    }
    & > li > a:not(.github) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 7px 4px 30px;
      width: 100%;
      box-sizing: border-box;
      font-weight: 500;
      font-size: 0.865rem;
      color: #69707d;
      transition: all 0.2s ease;
      &:hover {
        color: #131313;
        transform: translateX(4px);
      }
    }
  }
}
.active-menu-item {
  @apply font-bold;
  transition: all 0.3s;
  > a {
    color: #131313 !important;
    // padding: 4px 0 4px 30px !important;
    &:hover {
      transform: none !important;
    }
  }
  span {
    @apply rounded p-2 w-full;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 3px,
      rgba(50, 50, 93, 0.1) 0px 7px 14px, rgba(50, 50, 93, 0.05) 0px 0px 0px 1px;
  }
}
@media only screen and (max-width: 900px) {
  .sidebar {
    left: -15rem !important;
    &-menu {
      height: 93%;
    }
  }
  .burger {
    display: block !important;
  }
}
</style>
