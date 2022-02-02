import { DefineComponent } from 'vue'
export interface NavItem {
  key: string
  label: string
  icon?: string
  children?: NavItem[]
  examples?: Promise<unknown>
}

export interface ComponentMeta {
  title: string
  code: string
}
export interface ComponentExample extends ComponentMeta {
  // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
  component: DefineComponent<{}, {}, any>
}

export interface ComponentProperty {
  key: string
  required?: boolean
  typeDef: string
  isArray?: boolean
  description: string
}

export interface ComponentProperties {
  tag: string
  properties: ComponentProperty[]
}

export interface ComponentPropTypeDefField {
  key: string
  type: string
  description: string
}
export interface ComponentPropTypeDef {
  key: string
  description: string
  fields: ComponentPropTypeDefField[]
}

export type ComponentPropTypeDefIndex = Record<string, ComponentPropTypeDef>

export interface ComponentEvent {
  event: string
  callback: string
  description: string
}

export interface TutorialMeta {
  id: string
  title: string
  shortDescription: string
}

export interface TutorialSection {
  title: string
  description: string
  content: string
}
export interface Tutorial extends TutorialMeta {
  description: string
  content: TutorialSection[]
}
