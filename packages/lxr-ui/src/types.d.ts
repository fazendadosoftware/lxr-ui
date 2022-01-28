import { Component } from 'vue'

// LxrTable types
export interface LxrCellComponentProps {
  row?: any
  column?: LxrColumn
  emit?: (type: string, event: any) => void
}

export interface LxrColumn {
  key: string
  label?: string
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  headerClasses?: string
  cellClasses?: string
  component?: Component<LxrCellComponentProps>
  extraProps?: () => Object
}

export type LxrTableSort = Record<string, boolean>
