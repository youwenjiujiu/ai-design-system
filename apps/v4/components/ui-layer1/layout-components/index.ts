/**
 * Layer 1 Layout Components - Index
 * 
 * 导出所有布局组件，供 Layer 2 业务组件使用
 */

// 容器组件
export { default as WidgetContainer } from './WidgetContainer'
export type { WidgetContainerProps } from './WidgetContainer'

export { default as SlotContainer } from './SlotContainer'
export type { SlotContainerProps } from './SlotContainer'

// 文本布局组件
export { default as Title1LineLayout } from './Title1LineLayout'
export type { Title1LineLayoutProps } from './Title1LineLayout'

export { default as Title2LinesLayout } from './Title2LinesLayout'
export type { Title2LinesLayoutProps } from './Title2LinesLayout'

export { default as Title3LinesLayout } from './Title3LinesLayout'
export type { Title3LinesLayoutProps } from './Title3LinesLayout'

// 控制组件
export { default as ButtonControlLayout } from './ButtonControlLayout'
export type { ButtonControlLayoutProps } from './ButtonControlLayout'

// 工具函数和类型
export * from '../design-tokens-simple'