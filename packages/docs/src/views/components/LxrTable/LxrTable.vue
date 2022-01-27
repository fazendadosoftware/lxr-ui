<template>
  <component-template 
    title="LxrTable"
    :examples="examples"
    :typedef-index="typedefIndex"
    :component-properties="componentProperties"
    :component-events="componentEvents">
  </component-template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ComponentExample, ComponentPropTypeDefIndex, ComponentProperties, ComponentEvent } from '../../../types'
import Example1, { meta as metaExample1 } from './Example1.vue'
import Example2, { meta as metaExample2 } from './Example2.vue'
import Example3, { meta as metaExample3 } from './Example3.vue'

export const examples: ComponentExample[] = [
  { ...metaExample1, component: Example1 },
  { ...metaExample2, component: Example2 },
  { ...metaExample3, component: Example3 }
]

const typedefIndex: ComponentPropTypeDefIndex = {
  LxrColumn: {
    key: 'LxrColumn',
    description: 'Column definition object',
    fields: [
      { key: 'key*', type: 'string', description: 'Column key' },
      { key: 'label*', type: 'string', description: 'Column header label' },
      { key: 'align', type: '"left" | "right" | "center"', description: 'Cell content alignment, defaults to "left"' },
      { key: 'sortable', type: 'boolean', description: 'Sets column as sortable, defaults to false' },
      { key: 'headerClasses', type: 'string', description: 'Classes applied to column header' },
      { key: 'cellClasses', type: 'string', description: 'Classes applied to column cells' },
      { key: 'component', type: 'Component', description: 'Custom component to be shown as column cells' },
      { key: 'extraProps', type: '() => Object', description: 'Extra properties to be passed to the custom component' }
    ]
  }
}

const componentProperties: ComponentProperties[] = [
  {
    tag: 'lxr-table',
    properties: [
      { key: 'columns', required: true, typeDef: 'LxrColumn', isArray: true, description: 'Table columns' },
      { key: 'rows', required: true, typeDef: 'any', isArray: true, description: 'Table rows' },
      { key: 'sort', typeDef: 'null | Record<string, boolean>', description: 'Table rows' },
      { key: 'threshold', typeDef: 'string | number', description: 'The threshold distance from the bottom of the content to call the infinite output event when scrolled. Value can be a number (pixels, from bottom) or string (in "px" or "%"). Defaults to "15%".' },
      { key: 'fetchMoreCallback', typeDef: '() => Promise<void>', description: 'Optional callback that gets triggered when user scrolls below the defined threshold level.' },
      { key: 'tableClasses', typeDef: 'string', description: 'Optional css classes to be applied to the table element.' },
      { key: 'rowClasses', typeDef: 'string', description: 'Optional css classes to be applied to all table rows.' }
    ]
  }
]

const componentEvents: ComponentEvent[] = [
  {
    event: 'sort',
    callback: '(null | Record<string, boolean>) => void',
    description: 'Triggered on user UI interaction with column sort controls. \nCallback argument is either null (sorting disabled) or object having as key the sorting key and value a boolean refering the sorting direction (asc).'
  }
]

export default defineComponent({
  setup () {
    return {
      examples,
      typedefIndex,
      componentProperties,
      componentEvents
    }
  }
})

</script>
