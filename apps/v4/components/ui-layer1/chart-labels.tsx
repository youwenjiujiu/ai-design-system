/**
 * Layer 1 图表标签系统
 * 
 * 职责：
 * - 提供通用的图表标签组件
 * - 支持数值格式化和范围显示
 * - 集成设计令牌系统
 * - 支持多种标签类型和布局
 */

import React from 'react'
import { 
  type ChartSize, 
  type Theme,
  type ChartSemantic,
  chartTypography,
  themeTokens
} from './design-tokens-simple'

// ===========================================
// 标签基础接口
// ===========================================

export interface BaseLabelProps {
  /** 标签尺寸 */
  size?: ChartSize
  /** 主题 */
  theme?: Theme
  /** 业务语义 */
  semantic?: ChartSemantic
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

// ===========================================
// 数值格式化工具函数
// ===========================================

export interface NumberFormatOptions {
  /** 小数位数 */
  precision?: number
  /** 是否显示千分位分隔符 */
  showThousands?: boolean
  /** 单位 */
  unit?: string
  /** 单位位置 */
  unitPosition?: 'prefix' | 'suffix'
  /** 范围分隔符 */
  rangeSeparator?: string
  /** 最小值显示阈值 */
  minThreshold?: number
  /** 最大值显示阈值 */
  maxThreshold?: number
}

export const formatNumber = (
  value: number, 
  options: NumberFormatOptions = {}
): string => {
  const {
    precision = 1,
    showThousands = false,
    unit = '',
    unitPosition = 'suffix',
    minThreshold,
    maxThreshold
  } = options

  // 阈值检查
  if (minThreshold !== undefined && value < minThreshold) {
    return `<${formatNumber(minThreshold, { ...options, minThreshold: undefined, maxThreshold: undefined })}`
  }
  if (maxThreshold !== undefined && value > maxThreshold) {
    return `>${formatNumber(maxThreshold, { ...options, minThreshold: undefined, maxThreshold: undefined })}`
  }

  // 数值格式化
  let formattedValue = value.toFixed(precision)
  
  // 移除末尾的零
  if (precision > 0) {
    formattedValue = parseFloat(formattedValue).toString()
  }
  
  // 千分位分隔符
  if (showThousands) {
    const parts = formattedValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formattedValue = parts.join('.')
  }
  
  // 添加单位
  if (unit) {
    return unitPosition === 'prefix' ? `${unit}${formattedValue}` : `${formattedValue}${unit}`
  }
  
  return formattedValue
}

export const formatRange = (
  min: number, 
  max: number, 
  options: NumberFormatOptions = {}
): string => {
  const { rangeSeparator = '-' } = options
  const minFormatted = formatNumber(min, options)
  const maxFormatted = formatNumber(max, options)
  return `${minFormatted}${rangeSeparator}${maxFormatted}`
}

// ===========================================
// 数值标签组件 (Value Label)
// ===========================================

export interface ValueLabelProps extends BaseLabelProps {
  /** 数值 */
  value: number
  /** 格式化选项 */
  formatOptions?: NumberFormatOptions
  /** 是否加粗显示 */
  bold?: boolean
  /** 文字对齐 */
  textAlign?: 'left' | 'center' | 'right'
  /** 点击回调 */
  onClick?: (value: number) => void
}

export const ValueLabel: React.FC<ValueLabelProps> = ({
  value,
  formatOptions = {},
  size = 'md',
  theme = 'light',
  semantic = 'default',
  bold = false,
  textAlign = 'center',
  className = '',
  style,
  onClick
}) => {
  const currentTheme = themeTokens[theme]
  const formattedValue = formatNumber(value, formatOptions)
  
  const labelStyle: React.CSSProperties = {
    fontSize: chartTypography.labels.fontSize[size],
    fontWeight: bold ? chartTypography.labels.fontWeight.bold : chartTypography.labels.fontWeight.regular,
    fontFamily: chartTypography.labels.fontFamily,
    color: currentTheme.foreground.primary,
    textAlign,
    margin: 0,
    padding: 0,
    lineHeight: chartTypography.labels.lineHeight,
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    ...style
  }
  
  return (
    <span 
      className={`chart-value-label chart-value-label--${size} chart-value-label--${semantic} ${className}`}
      style={labelStyle}
      onClick={() => onClick?.(value)}
    >
      {formattedValue}
    </span>
  )
}

// ===========================================
// 范围标签组件 (Range Label)
// ===========================================

export interface RangeLabelProps extends BaseLabelProps {
  /** 最小值 */
  min: number
  /** 最大值 */
  max: number
  /** 格式化选项 */
  formatOptions?: NumberFormatOptions
  /** 是否加粗显示 */
  bold?: boolean
  /** 文字对齐 */
  textAlign?: 'left' | 'center' | 'right'
  /** 点击回调 */
  onClick?: (min: number, max: number) => void
}

export const RangeLabel: React.FC<RangeLabelProps> = ({
  min,
  max,
  formatOptions = {},
  size = 'md',
  theme = 'light',
  semantic = 'default',
  bold = false,
  textAlign = 'center',
  className = '',
  style,
  onClick
}) => {
  const currentTheme = themeTokens[theme]
  const formattedRange = formatRange(min, max, formatOptions)
  
  const labelStyle: React.CSSProperties = {
    fontSize: chartTypography.labels.fontSize[size],
    fontWeight: bold ? chartTypography.labels.fontWeight.bold : chartTypography.labels.fontWeight.regular,
    fontFamily: chartTypography.labels.fontFamily,
    color: currentTheme.foreground.primary,
    textAlign,
    margin: 0,
    padding: 0,
    lineHeight: chartTypography.labels.lineHeight,
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    ...style
  }
  
  return (
    <span 
      className={`chart-range-label chart-range-label--${size} chart-range-label--${semantic} ${className}`}
      style={labelStyle}
      onClick={() => onClick?.(min, max)}
    >
      {formattedRange}
    </span>
  )
}

// ===========================================
// 坐标轴标签组件 (Axis Label)
// ===========================================

export interface AxisLabelProps extends BaseLabelProps {
  /** 标签文本或数值 */
  value: string | number
  /** 轴类型 */
  axis: 'x' | 'y'
  /** 格式化选项 (仅当 value 为数字时有效) */
  formatOptions?: NumberFormatOptions
  /** 标签旋转角度 (度数) */
  rotation?: number
  /** 透明度 */
  opacity?: number
  /** 点击回调 */
  onClick?: (value: string | number) => void
}

export const AxisLabel: React.FC<AxisLabelProps> = ({
  value,
  axis,
  formatOptions = {},
  size = 'md',
  theme = 'light',
  semantic = 'default',
  rotation = 0,
  opacity = 0.7,
  className = '',
  style,
  onClick
}) => {
  const currentTheme = themeTokens[theme]
  
  const displayValue = typeof value === 'number' 
    ? formatNumber(value, formatOptions) 
    : value
  
  const labelStyle: React.CSSProperties = {
    fontSize: chartTypography.axes[axis].fontSize[size],
    fontWeight: chartTypography.axes[axis].fontWeight,
    fontFamily: chartTypography.axes[axis].fontFamily,
    color: currentTheme.foreground.muted,
    opacity,
    margin: 0,
    padding: 0,
    lineHeight: chartTypography.axes[axis].lineHeight,
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    transform: rotation !== 0 ? `rotate(${rotation}deg)` : undefined,
    transformOrigin: 'center',
    ...style
  }
  
  return (
    <text 
      className={`chart-axis-label chart-axis-label--${axis} chart-axis-label--${size} chart-axis-label--${semantic} ${className}`}
      style={labelStyle}
      onClick={() => onClick?.(value)}
    >
      {displayValue}
    </text>
  )
}

// ===========================================
// 数据点标签组件 (Data Point Label)
// ===========================================

export interface DataPointLabelProps extends BaseLabelProps {
  /** 数值 */
  value: number
  /** X 坐标 */
  x: number
  /** Y 坐标 */
  y: number
  /** 格式化选项 */
  formatOptions?: NumberFormatOptions
  /** 标签位置相对于数据点的偏移 */
  offset?: { x: number; y: number }
  /** 背景样式 */
  background?: boolean
  /** 背景颜色 */
  backgroundColor?: string
  /** 边框圆角 */
  borderRadius?: number
  /** 内边距 */
  padding?: number
  /** 点击回调 */
  onClick?: (value: number) => void
}

export const DataPointLabel: React.FC<DataPointLabelProps> = ({
  value,
  x,
  y,
  formatOptions = {},
  size = 'md',
  theme = 'light',
  semantic = 'default',
  offset = { x: 0, y: -8 },
  background = false,
  backgroundColor,
  borderRadius = 4,
  padding = 4,
  className = '',
  style,
  onClick
}) => {
  const currentTheme = themeTokens[theme]
  const formattedValue = formatNumber(value, formatOptions)
  
  const labelStyle: React.CSSProperties = {
    fontSize: chartTypography.dataLabels.fontSize[size],
    fontWeight: chartTypography.dataLabels.fontWeight,
    fontFamily: chartTypography.dataLabels.fontFamily,
    fill: currentTheme.foreground.primary,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    ...style
  }
  
  const backgroundStyle: React.CSSProperties = {
    fill: backgroundColor || currentTheme.background.elevated,
    stroke: currentTheme.border.muted,
    strokeWidth: 1,
    rx: borderRadius,
    ry: borderRadius
  }
  
  // 估算文本尺寸 (简化计算)
  const textWidth = formattedValue.length * chartTypography.dataLabels.fontSize[size] * 0.6
  const textHeight = chartTypography.dataLabels.fontSize[size]
  
  return (
    <g 
      className={`chart-data-point-label chart-data-point-label--${size} chart-data-point-label--${semantic} ${className}`}
      transform={`translate(${x + offset.x}, ${y + offset.y})`}
      onClick={() => onClick?.(value)}
    >
      {background && (
        <rect
          x={-textWidth / 2 - padding}
          y={-textHeight / 2 - padding}
          width={textWidth + padding * 2}
          height={textHeight + padding * 2}
          style={backgroundStyle}
        />
      )}
      <text style={labelStyle}>
        {formattedValue}
      </text>
    </g>
  )
}

// ===========================================
// 智能标签布局系统
// ===========================================

export interface LabelLayoutOptions {
  /** 标签间最小距离 */
  minDistance?: number
  /** 是否允许旋转 */
  allowRotation?: boolean
  /** 最大旋转角度 */
  maxRotation?: number
  /** 是否允许隐藏重叠标签 */
  allowHiding?: boolean
  /** 优先级函数 */
  priorityFn?: (index: number) => number
}

export interface LabelPosition {
  x: number
  y: number
  value: string | number
  width?: number
  height?: number
  rotation?: number
  visible?: boolean
}

export const optimizeLabelLayout = (
  labels: LabelPosition[],
  options: LabelLayoutOptions = {}
): LabelPosition[] => {
  const {
    minDistance = 20,
    allowRotation = true,
    maxRotation = 45,
    allowHiding = true,
    priorityFn = (index) => index
  } = options
  
  const optimizedLabels = [...labels]
  
  // 检测碰撞
  const hasCollision = (label1: LabelPosition, label2: LabelPosition): boolean => {
    const dx = Math.abs(label1.x - label2.x)
    const dy = Math.abs(label1.y - label2.y)
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < minDistance
  }
  
  // 简化的布局优化 (实际实现会更复杂)
  for (let i = 0; i < optimizedLabels.length; i++) {
    for (let j = i + 1; j < optimizedLabels.length; j++) {
      const label1 = optimizedLabels[i]
      const label2 = optimizedLabels[j]
      
      if (hasCollision(label1, label2)) {
        const priority1 = priorityFn(i)
        const priority2 = priorityFn(j)
        
        if (allowHiding) {
          // 隐藏优先级较低的标签
          if (priority1 < priority2) {
            label1.visible = false
          } else {
            label2.visible = false
          }
        } else if (allowRotation) {
          // 旋转标签
          label1.rotation = maxRotation
          label2.rotation = -maxRotation
        }
      }
    }
  }
  
  return optimizedLabels
}

// ===========================================
// 工具提示组件 (Tooltip)
// ===========================================

export interface TooltipProps extends BaseLabelProps {
  /** 是否显示 */
  visible: boolean
  /** X 坐标 */
  x: number
  /** Y 坐标 */
  y: number
  /** 标题 */
  title?: string
  /** 内容项目 */
  items: Array<{
    label: string
    value: number | string
    color?: string
    formatOptions?: NumberFormatOptions
  }>
  /** 箭头方向 */
  arrowDirection?: 'top' | 'bottom' | 'left' | 'right'
  /** 偏移 */
  offset?: { x: number; y: number }
}

export const Tooltip: React.FC<TooltipProps> = ({
  visible,
  x,
  y,
  title,
  items,
  size = 'md',
  theme = 'light',
  arrowDirection = 'bottom',
  offset = { x: 0, y: -10 },
  className = '',
  style
}) => {
  const currentTheme = themeTokens[theme]
  
  if (!visible) return null
  
  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    left: x + offset.x,
    top: y + offset.y,
    backgroundColor: currentTheme.background.elevated,
    border: `1px solid ${currentTheme.border.muted}`,
    borderRadius: 8,
    padding: 12,
    fontSize: chartTypography.tooltip.fontSize[size],
    fontFamily: chartTypography.tooltip.fontFamily,
    color: currentTheme.foreground.primary,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    minWidth: 120,
    pointerEvents: 'none',
    ...style
  }
  
  const titleStyle: React.CSSProperties = {
    fontWeight: 600,
    marginBottom: title ? 8 : 0,
    fontSize: chartTypography.tooltip.fontSize[size],
    color: currentTheme.foreground.primary
  }
  
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    fontSize: chartTypography.tooltip.fontSize[size]
  }
  
  const labelStyle: React.CSSProperties = {
    color: currentTheme.foreground.muted,
    marginRight: 8
  }
  
  const valueStyle: React.CSSProperties = {
    fontWeight: 500,
    color: currentTheme.foreground.primary
  }
  
  return (
    <div 
      className={`chart-tooltip chart-tooltip--${size} chart-tooltip--${arrowDirection} ${className}`}
      style={tooltipStyle}
    >
      {title && <div style={titleStyle}>{title}</div>}
      {items.map((item, index) => {
        const displayValue = typeof item.value === 'number' 
          ? formatNumber(item.value, item.formatOptions) 
          : item.value
        
        return (
          <div key={index} style={itemStyle}>
            <div style={labelStyle}>
              {item.color && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    backgroundColor: item.color,
                    borderRadius: '50%',
                    marginRight: 6
                  }}
                />
              )}
              {item.label}
            </div>
            <div style={valueStyle}>{displayValue}</div>
          </div>
        )
      })}
    </div>
  )
}

// ===========================================
// 导出
// ===========================================

export {
  ValueLabel,
  RangeLabel,
  AxisLabel,
  DataPointLabel,
  Tooltip,
  formatNumber,
  formatRange,
  optimizeLabelLayout
}

export default {
  ValueLabel,
  RangeLabel,
  AxisLabel,
  DataPointLabel,
  Tooltip,
  formatNumber,
  formatRange,
  optimizeLabelLayout
}