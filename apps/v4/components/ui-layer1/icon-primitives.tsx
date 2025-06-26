/**
 * Layer 1 图标原始组件 - 无样式图标基础设施
 * 
 * 职责：
 * - 提供通用的 SVG 图标渲染器
 * - 基于设计令牌的样式应用
 * - 图标数据结构定义
 * - 不包含具体业务图标组件
 */

import React from 'react'
import { iconTokens } from './design-tokens-simple'
import type { IconSize, IconColor } from './design-tokens-simple'

// 图标数据接口
export interface IconData {
  viewBox?: string
  paths: Array<{
    d: string
    fill?: string
    stroke?: string
    strokeWidth?: string | number
    fillRule?: string
    clipRule?: string
  }>
  circles?: Array<{
    cx: string | number
    cy: string | number
    r: string | number
    fill?: string
    stroke?: string
    strokeWidth?: string | number
  }>
  rects?: Array<{
    x: string | number
    y: string | number
    width: string | number
    height: string | number
    rx?: string | number
    fill?: string
    stroke?: string
    strokeWidth?: string | number
  }>
  groups?: Array<{
    children: React.ReactNode
    transform?: string
    opacity?: string | number
  }>
}

// 基础图标属性
export interface IconProps {
  /** 图标尺寸 */
  size?: IconSize
  /** 图标颜色 */
  color?: IconColor
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  style?: React.CSSProperties
  /** 是否禁用 */
  disabled?: boolean
  /** 点击事件 */
  onClick?: () => void
  /** 可访问性标签 */
  'aria-label'?: string
  /** 图标数据 */
  data: IconData
}

/**
 * Layer 1 基础图标渲染器
 * 
 * 这是唯一的图标组件，所有图标都通过传入 data 来渲染
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ 
    size = 'md', 
    color = 'primary', 
    className = '',
    style = {},
    disabled = false,
    onClick,
    'aria-label': ariaLabel,
    data,
    ...props 
  }, ref) => {
    const sizeValue = iconTokens.sizes[size]
    const colorValue = iconTokens.colors[color]
    
    const combinedClassName = [
      'icon-primitive',
      `icon-primitive--${size}`,
      `icon-primitive--${color}`,
      disabled && 'icon-primitive--disabled',
      onClick && 'icon-primitive--clickable',
      className
    ].filter(Boolean).join(' ')

    const combinedStyle = {
      width: sizeValue,
      height: sizeValue,
      color: colorValue,
      opacity: disabled ? 0.5 : 1,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'opacity 0.2s ease, color 0.2s ease',
      flexShrink: 0,
      ...style
    }

    return (
      <svg
        ref={ref}
        className={combinedClassName}
        style={combinedStyle}
        viewBox={data.viewBox || "0 0 30 30"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={disabled ? undefined : onClick}
        aria-label={ariaLabel || 'icon'}
        role={onClick ? 'button' : 'img'}
        tabIndex={onClick && !disabled ? 0 : undefined}
        {...props}
      >
        {/* 渲染路径 */}
        {data.paths?.map((path, index) => (
          <path
            key={`path-${index}`}
            d={path.d}
            fill={path.fill || 'currentColor'}
            stroke={path.stroke}
            strokeWidth={path.strokeWidth}
            fillRule={path.fillRule as any}
            clipRule={path.clipRule as any}
          />
        ))}
        
        {/* 渲染圆形 */}
        {data.circles?.map((circle, index) => (
          <circle
            key={`circle-${index}`}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            fill={circle.fill || 'currentColor'}
            stroke={circle.stroke}
            strokeWidth={circle.strokeWidth}
          />
        ))}
        
        {/* 渲染矩形 */}
        {data.rects?.map((rect, index) => (
          <rect
            key={`rect-${index}`}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            rx={rect.rx}
            fill={rect.fill || 'currentColor'}
            stroke={rect.stroke}
            strokeWidth={rect.strokeWidth}
          />
        ))}
        
        {/* 渲染分组 */}
        {data.groups?.map((group, index) => (
          <g
            key={`group-${index}`}
            transform={group.transform}
            opacity={group.opacity}
          >
            {group.children}
          </g>
        ))}
      </svg>
    )
  }
)

Icon.displayName = 'Icon'

/**
 * 图标工具函数
 */
export function getIconSize(size: IconSize = 'md'): number {
  return iconTokens.sizes[size]
}

export function getIconColor(color: IconColor = 'primary'): string {
  return iconTokens.colors[color]
}

/**
 * 预设图标样式
 */
export const iconPresets = {
  toolbar: { size: 'sm' as IconSize, color: 'primary' as IconColor },
  navigation: { size: 'md' as IconSize, color: 'primary' as IconColor },
  status: { size: 'lg' as IconSize, color: 'success' as IconColor },
  control: { size: 'md' as IconSize, color: 'primary' as IconColor },
  monitoring: { size: 'md' as IconSize, color: 'secondary' as IconColor },
}

/**
 * 图标间距工具
 */
export const iconSpacing = {
  gap: iconTokens.spacing.gap,      // 6px - 图标与文本间距
  margin: iconTokens.spacing.margin, // 5px - 图标外边距
}