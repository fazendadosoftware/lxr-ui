export enum ComponentGroup {
  Base = 'Base',
  // Form = 'Form',
  // Feedback = 'Feedback',
  // DataDisplay = 'Data Display',
  // Navigation = 'Navigation',
}

export interface IComponentListItem {
  name: string
  icon: string
  iconOutlined?: boolean
  route: string
  group: ComponentGroup
  examples?: number
}
