export interface NavItem {
  key: string
  label: string
  icon?: string
  children?: NavItem[]
  examples?: number
}
