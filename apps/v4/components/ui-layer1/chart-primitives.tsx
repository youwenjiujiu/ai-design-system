/**
 * Layer 1 图表基础组件
 * 
 * 职责：
 * - 提供无样式的图表基础设施
 * - 基于 Figma 图表规范 (23910:4724, 23258:3904)
 * - 集成设计令牌系统
 * - 支持所有图表类型的原始渲染能力
 */

import React from 'react'
import { 
  chartTokens, 
  chartGradients, 
  chartTypography,
  type ChartType, 
  type ChartSize, 
  type ChartSemantic,
  type Theme,
  createChartConfig,
  getChartGradient
} from './design-tokens-simple'

// 临时主题tokens，如果design-tokens-simple中没有导出themeTokens
const themeTokens = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    muted: '#f5f5f5'
  },
  dark: {
    background: '#000000', 
    foreground: '#ffffff',
    muted: '#1a1a1a'
  }
}
import { DataPointLabel, AxisLabel, type NumberFormatOptions } from './chart-labels'

// ===========================================
// 图表可访问性助手
// ===========================================

interface AccessibilityHelperProps {
  semantic: ChartSemantic
  value?: number | string
  unit?: string
  range?: [number, number]
  chartType: string
  'aria-label'?: string
}

const createChartAccessibilityProps = (
  props: BaseChartProps & AccessibilityHelperProps
) => {
  const defaultAriaLabel = `${props.semantic} ${props.chartType} showing ${props.value}${props.unit ? ` ${props.unit}` : ''}${props.range ? ` with range ${props.range[0]} to ${props.range[1]}` : ''}`
  
  // 为交互一致性提供默认处理器
  const hasClickInteraction = props.onClick || props.onDataClick
  const needsDefaultHoverFeedback = hasClickInteraction && !props.onHover && !props.onMouseEnter && !props.onMouseLeave
  const needsDefaultFocusFeedback = hasClickInteraction && !props.onFocus && !props.onBlur
  
  return {
    onMouseEnter: props.onMouseEnter || (needsDefaultHoverFeedback ? () => {
      // 默认悬停反馈：略微改变透明度（通过CSS或其他视觉反馈）
      console.debug(`Chart ${props.semantic}: hover enter`)
    } : undefined),
    onMouseLeave: props.onMouseLeave || (needsDefaultHoverFeedback ? () => {
      console.debug(`Chart ${props.semantic}: hover leave`)
    } : undefined),
    onFocus: props.onFocus || (needsDefaultFocusFeedback ? () => {
      console.debug(`Chart ${props.semantic}: focus`)
    } : undefined),
    onBlur: props.onBlur || (needsDefaultFocusFeedback ? () => {
      console.debug(`Chart ${props.semantic}: blur`)
    } : undefined),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        props.onClick?.()
        if (typeof props.value === 'number') {
          props.onDataClick?.(props.value)
        }
      }
      props.onKeyDown?.(e)
    },
    role: props.role || 'img',
    'aria-label': props['aria-label'] || defaultAriaLabel,
    'aria-describedby': props['aria-describedby'],
    'aria-description': props['aria-description'],
    tabIndex: hasClickInteraction ? (props.tabIndex ?? 0) : undefined,
    ...(props['aria-labelledby'] && { 'aria-labelledby': props['aria-labelledby'] }),
    // 确保可点击图表有title属性作为备用可访问性标签
    ...(hasClickInteraction && !props['aria-label'] && !props['aria-labelledby'] && { 
      title: defaultAriaLabel 
    })
  }
}

// ===========================================
// 基础图表接口
// ===========================================

export interface BaseChartProps {
  /** 图表尺寸 */
  size?: ChartSize
  /** 主题 */
  theme?: Theme
  /** 业务语义 */
  semantic?: ChartSemantic
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
  /** 标题 */
  title?: string
  /** 是否显示动画 */
  animated?: boolean
  
  // 交互回调
  /** 点击回调 */
  onClick?: () => void
  /** 数据点击回调 */
  onDataClick?: (value: number, index?: number) => void
  /** 悬停回调 */
  onHover?: (value?: number) => void
  /** 鼠标进入回调 */
  onMouseEnter?: (event: React.MouseEvent) => void
  /** 鼠标离开回调 */
  onMouseLeave?: (event: React.MouseEvent) => void
  /** 焦点回调 */
  onFocus?: (event: React.FocusEvent) => void
  /** 失焦回调 */
  onBlur?: (event: React.FocusEvent) => void
  /** 键盘事件回调 */
  onKeyDown?: (event: React.KeyboardEvent) => void
  
  // 可访问性属性
  /** 可访问性标签 */
  'aria-label'?: string
  /** 标签引用ID */
  'aria-labelledby'?: string
  /** 描述引用ID */
  'aria-describedby'?: string
  /** 描述文本 */
  'aria-description'?: string
  /** 角色 */
  role?: string
  /** Tab索引 */
  tabIndex?: number
}

// ===========================================
// 渐变定义组件
// ===========================================

interface GradientDefsProps {
  id: string
  gradient: NonNullable<ReturnType<typeof getChartGradient>>
}

const GradientDefs: React.FC<GradientDefsProps> = ({ id, gradient }) => {
  if (gradient.type === 'linear') {
    return (
      <defs>
        <linearGradient 
          id={id} 
          x1="0%" 
          y1="0%" 
          x2={gradient.direction === 'horizontal' ? '100%' : '0%'} 
          y2={gradient.direction === 'vertical' ? '100%' : '0%'}
        >
          {gradient.stops.map((stop, index) => (
            <stop 
              key={index} 
              offset={`${stop.position * 100}%`} 
              stopColor={stop.color} 
            />
          ))}
        </linearGradient>
      </defs>
    )
  }
  
  if (gradient.type === 'angular') {
    return (
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          {gradient.stops.map((stop, index) => (
            <stop 
              key={index} 
              offset={`${stop.position * 100}%`} 
              stopColor={stop.color} 
            />
          ))}
        </radialGradient>
      </defs>
    )
  }
  
  return null
}

// ===========================================
// 环形图基础组件 (Donut Chart)
// ===========================================

export interface DonutChartProps extends BaseChartProps {
  /** 数值 (0-100) */
  value: number
  /** 最大值 */
  max?: number
  /** 显示数值标签 */
  showValue?: boolean
  /** 显示单位标签 */
  unitLabel?: string
  /** 描边宽度覆盖 */
  strokeWidth?: number
  /** 显示外部边框 */
  showOuterStroke?: boolean
  /** 外部边框透明度 */
  outerStrokeOpacity?: number
}

export const DonutChart = React.forwardRef<SVGSVGElement, DonutChartProps>(
  ({ 
    value,
    max = 100,
    size = 'md',
    theme = 'light',
    semantic = 'energy_reduction',
    showValue = true,
    unitLabel,
    strokeWidth,
    showOuterStroke = false,
    outerStrokeOpacity = 0.2,
    title,
    animated = true,
    className = '',
    style,
    onClick,
    ...props 
  }, ref) => {
    
    // 获取配置
    const config = createChartConfig('donut', semantic, size, theme)
    const tokens = chartTokens.donut
    const sizeConfig = chartTokens.sizes[size]
    const gradient = getChartGradient('donut', semantic)
    const currentTheme = themeTokens[theme]
    
    // 计算参数
    const diameter = tokens.diameter[size]
    const radius = diameter / 2
    const strokeWidthValue = strokeWidth || tokens.strokeWidth[size]
    const innerRadius = radius - strokeWidthValue / 2
    const circumference = 2 * Math.PI * innerRadius
    const percentage = Math.min(Math.max(value / max, 0), 1)
    const strokeDasharray = circumference
    const strokeDashoffset = circumference * (1 - percentage)
    
    // 中心位置
    const centerX = sizeConfig.width / 2
    const centerY = sizeConfig.height / 2
    
    // 渐变ID
    const gradientId = `donut-gradient-${semantic}-${Math.random().toString(36).substr(2, 9)}`
    
    // 容器样式
    const containerStyle: React.CSSProperties = {
      width: sizeConfig.container.width,
      height: sizeConfig.container.height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
    
    // SVG样式
    const svgStyle: React.CSSProperties = {
      width: sizeConfig.width,
      height: sizeConfig.height,
      transform: `rotate(${tokens.startAngle}deg)`,
      transition: animated ? 'all 0.3s ease' : 'none'
    }
    
    // 数值显示样式
    const valueStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: chartTypography.mainValue.fontSize[size],
      fontWeight: chartTypography.mainValue.fontWeight,
      fontFamily: chartTypography.mainValue.fontFamily,
      textAlign: 'center',
      pointerEvents: 'none'
    }
    
    return (
      <div
        style={containerStyle}
        className={`chart-donut chart-donut--${size} chart-donut--${semantic} ${className}`}
        onClick={onClick}
        {...createChartAccessibilityProps({
          ...props,
          semantic,
          value,
          unit: unitLabel,
          range: [0, max],
          chartType: 'donut chart'
        })}
      >
        {/* 标题 */}
        {title && (
          <h3 style={{
            fontSize: chartTypography.title.fontSize[size],
            fontWeight: chartTypography.title.fontWeight,
            fontFamily: chartTypography.title.fontFamily,
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        )}
        
        {/* 图表容器 */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <svg
            ref={ref}
            style={svgStyle}
            viewBox={`0 0 ${sizeConfig.width} ${sizeConfig.height}`}
            className="chart-donut__svg"
          >
            {/* 渐变定义 */}
            {gradient && <GradientDefs id={gradientId} gradient={gradient} />}
            
            {/* 背景环 (主题感知) */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              fill="none"
              stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
              strokeWidth={strokeWidthValue}
              className="chart-donut__background"
            />
            
            {/* 进度环 */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              fill="none"
              stroke={gradient ? `url(#${gradientId})` : '#33A0FF'}
              strokeWidth={strokeWidthValue}
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: animated ? 'stroke-dashoffset 1s ease-in-out' : 'none'
              }}
              className="chart-donut__progress"
            />
            
            {/* 外部描边圆圈 (基于 Figma SVG: 23639:5065) */}
            {showOuterStroke && (
              <circle
                cx={centerX}
                cy={centerY}
                r={radius - 1} // 稍微小一点避免被裁切
                fill="none"
                stroke={currentTheme.foreground.primary}
                strokeOpacity={outerStrokeOpacity}
                strokeWidth={1}
                className="chart-donut__outer-stroke"
              />
            )}
          </svg>
          
          {/* 中心数值显示 */}
          {showValue && (
            <div style={valueStyle}>
              <div style={{ color: gradient?.stops[0]?.color || '#33A0FF' }}>
                {Math.round(value)}
                {unitLabel && (
                  <span style={{ 
                    fontSize: `${chartTypography.unitLabel.fontSize[size]}px`,
                    opacity: 0.7,
                    marginLeft: '2px'
                  }}>
                    {unitLabel}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
)

DonutChart.displayName = 'DonutChart'

// ===========================================
// 条形图基础组件 (Bar Chart)
// ===========================================

export interface BarChartProps extends BaseChartProps {
  /** 当前值 */
  value: number
  /** 范围 [min, max] */
  range?: [number, number]
  /** 显示范围标签 */
  showRangeLabels?: boolean
  /** 显示网格线 */
  showGridLines?: boolean
  /** 单位 */
  unit?: string
  /** 条形高度覆盖 */
  barHeight?: number
}

export const BarChart = React.forwardRef<SVGSVGElement, BarChartProps>(
  ({ 
    value,
    range,
    size = 'md',
    theme = 'light',
    semantic = 'temperature_range',
    showRangeLabels = true,
    showGridLines = true,
    unit = '',
    barHeight,
    title,
    animated = true,
    className = '',
    style,
    onClick,
    ...props 
  }, ref) => {
    
    // 获取配置
    const config = createChartConfig('bar', semantic, size, theme)
    const tokens = chartTokens.bar
    const sizeConfig = chartTokens.sizes[size]
    const gradient = getChartGradient('bar', semantic)
    
    // 计算参数
    const barWidth = tokens.width[size]
    const barHeightValue = barHeight || tokens.height[size]
    const [minValue, maxValue] = range || [0, 100]
    const normalizedValue = Math.min(Math.max(value, minValue), maxValue)
    const percentage = (normalizedValue - minValue) / (maxValue - minValue)
    const barLength = barWidth * percentage
    
    // 渐变ID
    const gradientId = `bar-gradient-${semantic}-${Math.random().toString(36).substr(2, 9)}`
    
    // 容器样式
    const containerStyle: React.CSSProperties = {
      width: sizeConfig.container.width,
      height: sizeConfig.container.height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
    
    // 图表区域位置
    const chartY = 60  // 为标题和标签留空间
    const labelY = chartY + 40  // 标签位置
    
    return (
      <div
        style={containerStyle}
        className={`chart-bar chart-bar--${size} chart-bar--${semantic} ${className}`}
        onClick={onClick}
        {...createChartAccessibilityProps({
          ...props,
          semantic,
          value,
          unit,
          range,
          chartType: 'bar chart'
        })}
      >
        {/* 标题 */}
        {title && (
          <h3 style={{
            fontSize: chartTypography.title.fontSize[size],
            fontWeight: chartTypography.title.fontWeight,
            fontFamily: chartTypography.title.fontFamily,
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        )}
        
        {/* 图表容器 */}
        <div style={{ position: 'relative' }}>
          <svg
            ref={ref}
            width={sizeConfig.width}
            height={sizeConfig.height}
            viewBox={`0 0 ${sizeConfig.width} ${sizeConfig.height}`}
            className="chart-bar__svg"
          >
            {/* 渐变定义 */}
            {gradient && <GradientDefs id={gradientId} gradient={gradient} />}
            
            {/* 网格线 */}
            {showGridLines && (
              <g className="chart-bar__grid">
                {[0, 0.25, 0.5, 0.75, 1].map((position, index) => (
                  <line
                    key={index}
                    x1={12 + barWidth * position}
                    y1={chartY - 10}
                    x2={12 + barWidth * position}
                    y2={chartY + barHeightValue + 10}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth={tokens.gridLines.stroke}
                    opacity={tokens.gridLines.opacity}
                  />
                ))}
              </g>
            )}
            
            {/* 背景条 */}
            <rect
              x={12}
              y={chartY}
              width={barWidth}
              height={barHeightValue}
              fill="rgba(255, 255, 255, 0.1)"
              rx={barHeightValue / 2}
              className="chart-bar__background"
            />
            
            {/* 进度条 */}
            <rect
              x={12}
              y={chartY}
              width={barLength}
              height={barHeightValue}
              fill={gradient ? `url(#${gradientId})` : '#33A0FF'}
              rx={barHeightValue / 2}
              style={{
                transition: animated ? 'width 1s ease-in-out' : 'none'
              }}
              className="chart-bar__progress"
            />
            
            {/* 主数值标签 */}
            <text
              x={12 + barLength}
              y={chartY - 8}
              fontSize={chartTypography.mainValue.fontSize[size]}
              fontFamily={chartTypography.mainValue.fontFamily}
              fontWeight={chartTypography.mainValue.fontWeight}
              fill={gradient?.stops[0]?.color || '#33A0FF'}
              textAnchor="middle"
              className="chart-bar__main-value"
            >
              {normalizedValue}{unit}
            </text>
            
            {/* 范围标签 */}
            {showRangeLabels && range && (
              <g className="chart-bar__range-labels">
                {/* 最小值标签 */}
                <text
                  x={12}
                  y={labelY}
                  fontSize={chartTypography.rangeLabel.fontSize[size]}
                  fontFamily={chartTypography.rangeLabel.fontFamily}
                  fill="rgba(255, 255, 255, 1)"
                  textAnchor="start"
                >
                  {minValue}
                </text>
                
                {/* 最大值标签 */}
                <text
                  x={12 + barWidth}
                  y={labelY}
                  fontSize={chartTypography.rangeLabel.fontSize[size]}
                  fontFamily={chartTypography.rangeLabel.fontFamily}
                  fill="rgba(255, 255, 255, 1)"
                  textAnchor="end"
                >
                  {maxValue}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    )
  }
)

BarChart.displayName = 'BarChart'

// ===========================================
// 多环形图基础组件 (Multi-Ring Chart)
// ===========================================

export interface MultiRingSegment {
  /** 数值 */
  value: number
  /** 百分比 (可选，自动计算) */
  percentage?: number
  /** 自定义颜色 (可选，否则使用语义色) */
  color?: string
  /** 段落标识 (用于回调) */
  id?: string
}

export interface MultiRingLabel {
  /** 主标签 */
  primary: string
  /** 次要标签 (可选) */
  secondary?: string
  /** 自定义样式 */
  style?: React.CSSProperties
}

export interface MultiRingChartProps extends BaseChartProps {
  /** 分段数据 */
  segments: MultiRingSegment[]
  /** 数据标签 (可选) */
  labels?: MultiRingLabel[]
  /** 显示标签区域 */
  showLabels?: boolean
  /** 显示背景环 */
  showBackgroundRing?: boolean
  /** 自定义起始角度 */
  startAngle?: number
  /** 分段点击回调 */
  onSegmentClick?: (segment: MultiRingSegment, index: number) => void
  /** 分段hover回调 */
  onSegmentHover?: (segment: MultiRingSegment | null, index: number) => void
}

export const MultiRingChart = React.forwardRef<SVGSVGElement, MultiRingChartProps>(
  ({ 
    segments,
    labels,
    size = 'md',
    theme = 'light',
    semantic = 'consumption_planning',
    showLabels = true,
    showBackgroundRing = true,
    startAngle = -90,
    title,
    animated = true,
    onSegmentClick,
    onSegmentHover,
    className = '',
    style,
    onClick,
    ...props 
  }, ref) => {
    
    // 获取配置
    const config = createChartConfig('multiRing', semantic, size, theme)
    const tokens = chartTokens.multiRing
    const sizeConfig = chartTokens.sizes[size]
    const gradient = getChartGradient('multiRing', semantic)
    
    // 计算参数
    const radius = tokens.radius[size]
    const strokeWidth = tokens.strokeWidth[size]
    const centerX = sizeConfig.width / 2
    const centerY = sizeConfig.height / 2
    
    // 计算总值和百分比
    const totalValue = segments.reduce((sum, seg) => sum + seg.value, 0)
    const segmentsWithPercentage = segments.map(seg => ({
      ...seg,
      percentage: seg.percentage || (seg.value / totalValue)
    }))
    
    // 获取颜色配置
    const segmentColors = gradient?.type === 'segments' 
      ? gradient.colors 
      : ['#33A0FF', '#70BCFF', '#8BECFF', '#8DFEF8'] // 默认颜色
    
    // 计算每个分段的角度
    const gapAngle = tokens.segments.gapAngle
    const totalGapAngle = gapAngle * segments.length
    const availableAngle = 360 - totalGapAngle
    
    const segmentAngles = segmentsWithPercentage.map((seg, index) => {
      const segmentAngle = seg.percentage * availableAngle
      const currentStartAngle = startAngle + 
        segmentsWithPercentage.slice(0, index).reduce((sum, s) => sum + (s.percentage * availableAngle) + gapAngle, 0)
      
      return {
        startAngle: currentStartAngle,
        endAngle: currentStartAngle + segmentAngle,
        sweepAngle: segmentAngle,
        color: seg.color || segmentColors[index % segmentColors.length]
      }
    })
    
    // 创建SVG弧形路径
    const createArcPath = (startAngle: number, endAngle: number, innerRadius: number, outerRadius: number) => {
      const startAngleRad = (startAngle * Math.PI) / 180
      const endAngleRad = (endAngle * Math.PI) / 180
      
      const x1 = centerX + innerRadius * Math.cos(startAngleRad)
      const y1 = centerY + innerRadius * Math.sin(startAngleRad)
      const x2 = centerX + outerRadius * Math.cos(startAngleRad)
      const y2 = centerY + outerRadius * Math.sin(startAngleRad)
      
      const x3 = centerX + outerRadius * Math.cos(endAngleRad)
      const y3 = centerY + outerRadius * Math.sin(endAngleRad)
      const x4 = centerX + innerRadius * Math.cos(endAngleRad)
      const y4 = centerY + innerRadius * Math.sin(endAngleRad)
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
      
      return [
        `M ${x1} ${y1}`,
        `L ${x2} ${y2}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
        `L ${x4} ${y4}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
        'Z'
      ].join(' ')
    }
    
    // 容器样式
    const containerStyle: React.CSSProperties = {
      width: sizeConfig.container.width,
      height: sizeConfig.container.height + (showLabels ? (labels?.length || segments.length) * tokens.labelArea.height : 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
    
    // SVG样式
    const svgStyle: React.CSSProperties = {
      width: sizeConfig.width,
      height: sizeConfig.height,
      transition: animated ? 'all 0.3s ease' : 'none'
    }
    
    const innerRadius = radius - strokeWidth / 2
    const outerRadius = radius + strokeWidth / 2
    
    return (
      <div
        style={containerStyle}
        className={`chart-multi-ring chart-multi-ring--${size} chart-multi-ring--${semantic} ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* 标题 */}
        {title && (
          <h3 style={{
            fontSize: chartTypography.title.fontSize[size],
            fontWeight: chartTypography.title.fontWeight,
            fontFamily: chartTypography.title.fontFamily,
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        )}
        
        {/* 图表容器 */}
        <div style={{ position: 'relative' }}>
          <svg
            ref={ref}
            style={svgStyle}
            viewBox={`0 0 ${sizeConfig.width} ${sizeConfig.height}`}
            className="chart-multi-ring__svg"
          >
            {/* 背景环 */}
            {showBackgroundRing && (
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={tokens.backgroundRing.stroke}
                strokeWidth={strokeWidth}
                opacity={tokens.backgroundRing.opacity}
                className="chart-multi-ring__background"
              />
            )}
            
            {/* 分段环形 */}
            {segmentAngles.map((angleData, index) => {
              const segment = segmentsWithPercentage[index]
              
              return (
                <path
                  key={segment.id || index}
                  d={createArcPath(angleData.startAngle, angleData.endAngle, innerRadius, outerRadius)}
                  fill={angleData.color}
                  style={{
                    cursor: onSegmentClick ? 'pointer' : 'default',
                    transition: animated ? 'opacity 0.3s ease' : 'none'
                  }}
                  className={`chart-multi-ring__segment chart-multi-ring__segment--${index}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSegmentClick?.(segment, index)
                  }}
                  onMouseEnter={() => onSegmentHover?.(segment, index)}
                  onMouseLeave={() => onSegmentHover?.(null, -1)}
                />
              )
            })}
          </svg>
        </div>
        
        {/* 数据标签区域 */}
        {showLabels && labels && (
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: `${tokens.labelArea.gap}px`
          }}>
            {labels.map((label, index) => (
              <div
                key={index}
                style={{
                  height: tokens.labelArea.height,
                  backgroundColor: tokens.labelArea.backgroundColor,
                  borderRadius: tokens.labelArea.borderRadius,
                  padding: tokens.labelArea.padding,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: tokens.labelArea.fontSize,
                  fontFamily: chartTypography.title.fontFamily,
                  color: segmentColors[index % segmentColors.length],
                  fontWeight: '500',
                  ...label.style
                }}
                className={`chart-multi-ring__label chart-multi-ring__label--${index}`}
              >
                <span className="chart-multi-ring__label-primary">
                  {label.primary}
                </span>
                {label.secondary && (
                  <span 
                    className="chart-multi-ring__label-secondary"
                    style={{ opacity: 0.8 }}
                  >
                    {label.secondary}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

MultiRingChart.displayName = 'MultiRingChart'

// ===========================================
// 线形图基础组件 (Line Chart)
// ===========================================

export interface LineDataPoint {
  /** X轴值 */
  x: number
  /** Y轴值 */
  y: number
  /** 数据点标识 (用于回调) */
  id?: string
}

export interface LineDataSeries {
  /** 数据系列名称 */
  name: string
  /** 数据点数组 */
  data: LineDataPoint[]
  /** 业务语义 (决定颜色和样式) */
  semantic: ChartSemantic
  /** 是否显示数据点 */
  showPoints?: boolean
  /** 自定义线条样式 */
  strokeDasharray?: string
}

export interface LineChartProps extends BaseChartProps {
  /** 数据系列 (支持多条线) */
  series: LineDataSeries[]
  /** X轴范围 [min, max] */
  xRange?: [number, number]
  /** Y轴范围 [min, max] */
  yRange?: [number, number]
  /** X轴标签数组 (可选) */
  xLabels?: string[]
  /** Y轴标签数组 (可选) */
  yLabels?: string[]
  /** 显示网格线 */
  showGridLines?: boolean
  /** 显示图例 */
  showLegend?: boolean
  /** 图例位置 */
  legendPosition?: 'top' | 'bottom' | 'left' | 'right'
  /** 数据点点击回调 */
  onPointClick?: (point: LineDataPoint, seriesIndex: number, pointIndex: number) => void
  /** 数据点hover回调 */
  onPointHover?: (point: LineDataPoint | null, seriesIndex: number, pointIndex: number) => void
}

export const LineChart = React.forwardRef<SVGSVGElement, LineChartProps>(
  ({ 
    series,
    xRange,
    yRange,
    xLabels,
    yLabels,
    size = 'md',
    theme = 'light',
    semantic = 'flow_monitoring',
    showGridLines = true,
    showLegend = true,
    legendPosition = 'top',
    title,
    animated = true,
    onPointClick,
    onPointHover,
    className = '',
    style,
    onClick,
    ...props 
  }, ref) => {
    
    // 获取配置
    const config = createChartConfig('line', semantic, size, theme)
    const tokens = chartTokens.line
    const sizeConfig = chartTokens.sizes[size]
    
    // 计算数据范围
    const allDataPoints = series.flatMap(s => s.data)
    const calculatedXRange = xRange || [
      Math.min(...allDataPoints.map(p => p.x)),
      Math.max(...allDataPoints.map(p => p.x))
    ]
    const calculatedYRange = yRange || [
      Math.min(...allDataPoints.map(p => p.y)),
      Math.max(...allDataPoints.map(p => p.y))
    ]
    
    // 图表绘制区域 (减去边距)
    const chartWidth = tokens.width[size] - tokens.padding.left - tokens.padding.right
    const chartHeight = tokens.height[size] - tokens.padding.top - tokens.padding.bottom
    const chartX = tokens.padding.left
    const chartY = tokens.padding.top
    
    // 坐标转换函数
    const scaleX = (x: number) => {
      const [minX, maxX] = calculatedXRange
      return chartX + (x - minX) / (maxX - minX) * chartWidth
    }
    
    const scaleY = (y: number) => {
      const [minY, maxY] = calculatedYRange
      return chartY + chartHeight - (y - minY) / (maxY - minY) * chartHeight
    }
    
    // 生成SVG路径
    const createLinePath = (data: LineDataPoint[]) => {
      if (data.length === 0) return ''
      
      const path = data.map((point, index) => {
        const x = scaleX(point.x)
        const y = scaleY(point.y)
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
      }).join(' ')
      
      return path
    }
    
    // 生成网格线位置
    const gridLines = {
      horizontal: showGridLines ? [
        calculatedYRange[0],
        calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.25,
        calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.5,
        calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.75,
        calculatedYRange[1]
      ] : [],
      vertical: showGridLines ? [
        calculatedXRange[0],
        calculatedXRange[0] + (calculatedXRange[1] - calculatedXRange[0]) * 0.25,
        calculatedXRange[0] + (calculatedXRange[1] - calculatedXRange[0]) * 0.5,
        calculatedXRange[0] + (calculatedXRange[1] - calculatedXRange[0]) * 0.75,
        calculatedXRange[1]
      ] : []
    }
    
    // 容器样式
    const containerStyle: React.CSSProperties = {
      width: sizeConfig.container.width,
      height: sizeConfig.container.height + (showLegend ? 40 : 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
    
    return (
      <div
        style={containerStyle}
        className={`chart-line chart-line--${size} chart-line--${semantic} ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* 标题 */}
        {title && (
          <h3 style={{
            fontSize: chartTypography.title.fontSize[size],
            fontWeight: chartTypography.title.fontWeight,
            fontFamily: chartTypography.title.fontFamily,
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        )}
        
        {/* 图例 */}
        {showLegend && legendPosition === 'top' && (
          <div style={{
            display: 'flex',
            gap: `${tokens.legend.gap}px`,
            fontSize: tokens.legend.fontSize[size],
            opacity: tokens.legend.opacity
          }}>
            {series.map((seriesData, index) => {
              const gradient = getChartGradient('line', seriesData.semantic)
              const color = gradient?.stops[0]?.color || '#33A0FF'
              
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.legend.itemGap}px`
                }}>
                  <div style={{
                    width: 16,
                    height: 2,
                    backgroundColor: color,
                    borderRadius: 1
                  }} />
                  <span>{seriesData.name}</span>
                </div>
              )
            })}
          </div>
        )}
        
        {/* 图表容器 */}
        <div style={{ position: 'relative' }}>
          <svg
            ref={ref}
            width={tokens.width[size]}
            height={tokens.height[size]}
            viewBox={`0 0 ${tokens.width[size]} ${tokens.height[size]}`}
            className="chart-line__svg"
          >
            {/* 渐变定义 */}
            <defs>
              {series.map((seriesData, index) => {
                const gradient = getChartGradient('line', seriesData.semantic)
                if (!gradient) return null
                
                const gradientId = `line-gradient-${seriesData.semantic}-${index}`
                
                return (
                  <linearGradient 
                    key={gradientId}
                    id={gradientId}
                    x1="0%" 
                    y1="0%" 
                    x2="100%" 
                    y2="0%"
                  >
                    {gradient.stops.map((stop, stopIndex) => (
                      <stop 
                        key={stopIndex} 
                        offset={`${stop.position * 100}%`} 
                        stopColor={stop.color} 
                      />
                    ))}
                  </linearGradient>
                )
              })}
            </defs>
            
            {/* 网格线 */}
            {showGridLines && (
              <g className="chart-line__grid">
                {/* 水平网格线 */}
                {gridLines.horizontal.map((y, index) => (
                  <line
                    key={`h-${index}`}
                    x1={chartX}
                    y1={scaleY(y)}
                    x2={chartX + chartWidth}
                    y2={scaleY(y)}
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.3}
                    strokeDasharray="2,2"
                    strokeLinecap="round"
                  />
                ))}
                {/* 垂直网格线 */}
                {gridLines.vertical.map((x, index) => (
                  <line
                    key={`v-${index}`}
                    x1={scaleX(x)}
                    y1={chartY}
                    x2={scaleX(x)}
                    y2={chartY + chartHeight}
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.3}
                    strokeDasharray="2,2"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            )}
            
            {/* Y轴标签 */}
            {tokens.axes.y.show && (
              <g className="chart-line__y-axis">
                {gridLines.horizontal.map((y, index) => (
                  <text
                    key={index}
                    x={chartX - tokens.axes.y.labelGap}
                    y={scaleY(y) + 4}
                    fontSize={tokens.axes.y.fontSize[size]}
                    fill="white"
                    fillOpacity={tokens.axes.y.opacity}
                    textAnchor="end"
                    className="chart-line__y-label"
                  >
                    {yLabels ? yLabels[index] : y.toFixed(1)}
                  </text>
                ))}
              </g>
            )}
            
            {/* X轴标签 */}
            {true && (
              <g className="chart-line__x-axis">
                {gridLines.vertical.map((x, index) => (
                  <text
                    key={index}
                    x={scaleX(x)}
                    y={chartY + chartHeight + tokens.axes.x.labelGap + 12}
                    fontSize={tokens.axes.x.fontSize[size]}
                    fill="white"
                    fillOpacity={tokens.axes.x.opacity}
                    textAnchor="middle"
                    className="chart-line__x-label"
                  >
                    {xLabels ? xLabels[index] : x.toFixed(1)}
                  </text>
                ))}
              </g>
            )}
            
            {/* 数据线条 */}
            {series.map((seriesData, seriesIndex) => {
              const gradient = getChartGradient('line', seriesData.semantic)
              const gradientId = `line-gradient-${seriesData.semantic}-${seriesIndex}`
              const color = gradient?.stops[0]?.color || '#33A0FF'
              const strokeDasharray = gradient?.strokeDasharray || seriesData.strokeDasharray || 'none'
              
              return (
                <g key={seriesIndex} className={`chart-line__series chart-line__series--${seriesIndex}`}>
                  {/* 线条路径 */}
                  <path
                    d={createLinePath(seriesData.data)}
                    fill="none"
                    stroke={gradient ? `url(#${gradientId})` : color}
                    strokeWidth={tokens.strokeWidth[size]}
                    strokeDasharray={strokeDasharray === 'none' ? undefined : strokeDasharray}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition: animated ? 'stroke-dashoffset 1s ease-in-out' : 'none'
                    }}
                    className="chart-line__path"
                  />
                  
                  {/* 数据点 */}
                  {(seriesData.showPoints !== false && tokens.dataPoints.showPoints) && (
                    seriesData.data.map((point, pointIndex) => (
                      <circle
                        key={`${seriesIndex}-${pointIndex}`}
                        cx={scaleX(point.x)}
                        cy={scaleY(point.y)}
                        r={tokens.dataPoints.radius[size]}
                        fill={color}
                        stroke="white"
                        strokeWidth={tokens.dataPoints.strokeWidth[size]}
                        style={{
                          cursor: onPointClick ? 'pointer' : 'default',
                          transition: animated ? 'r 0.2s ease' : 'none'
                        }}
                        className="chart-line__point"
                        onClick={(e) => {
                          e.stopPropagation()
                          onPointClick?.(point, seriesIndex, pointIndex)
                        }}
                        onMouseEnter={() => onPointHover?.(point, seriesIndex, pointIndex)}
                        onMouseLeave={() => onPointHover?.(null, -1, -1)}
                      />
                    ))
                  )}
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* 底部图例 */}
        {showLegend && legendPosition === 'bottom' && (
          <div style={{
            display: 'flex',
            gap: `${tokens.legend.gap}px`,
            fontSize: tokens.legend.fontSize[size],
            opacity: tokens.legend.opacity
          }}>
            {series.map((seriesData, index) => {
              const gradient = getChartGradient('line', seriesData.semantic)
              const color = gradient?.stops[0]?.color || '#33A0FF'
              
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${tokens.legend.itemGap}px`
                }}>
                  <div style={{
                    width: 16,
                    height: 2,
                    backgroundColor: color,
                    borderRadius: 1
                  }} />
                  <span>{seriesData.name}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

LineChart.displayName = 'LineChart'

// ===========================================
// 柱状图基础组件 (Column Chart)
// ===========================================

export interface ColumnDataPoint {
  /** X轴值 (通常是时间或标签) */
  x: number | string
  /** Y轴值 (数值) */
  y: number
  /** 数据点标识 */
  id?: string
  /** 自定义标签 */
  label?: string
}

export interface ColumnChartProps extends BaseChartProps {
  /** 柱状图数据 */
  data: ColumnDataPoint[]
  /** X轴标签数组 (可选) */
  xLabels?: string[]
  /** Y轴标签数组 (可选) */
  yLabels?: string[]
  /** Y轴值范围 [min, max] */
  yRange?: [number, number]
  /** 显示网格线 */
  showGridLines?: boolean
  /** 显示数据标签 */
  showDataLabels?: boolean
  /** 数据标签格式化函数 */
  labelFormatter?: (value: number) => string
  /** 柱子点击回调 */
  onBarClick?: (point: ColumnDataPoint, index: number) => void
  /** 柱子hover回调 */
  onBarHover?: (point: ColumnDataPoint | null, index: number) => void
}

export const ColumnChart = React.forwardRef<SVGSVGElement, ColumnChartProps>(
  ({ 
    data,
    xLabels,
    yLabels,
    yRange,
    size = 'md',
    theme = 'light',
    semantic = 'rt_efficiency_distribution',
    showGridLines = true,
    showDataLabels = true,
    labelFormatter = (value) => value.toFixed(1),
    title,
    animated = true,
    onBarClick,
    onBarHover,
    className = '',
    style,
    onClick,
    ...props 
  }, ref) => {
    
    // 获取配置
    const config = createChartConfig('column', semantic, size, theme)
    const sizeConfig = chartTokens.sizes[size]
    
    // 计算数据范围
    const calculatedYRange = yRange || [0, Math.max(...data.map(d => d.y)) * 1.1]
    
    // 图表绘制区域 (使用固定配置)
    const padding = { top: 20, right: 20, bottom: 40, left: 40 }
    const barConfig = { width: 20, gap: 8 }
    
    const chartWidth = sizeConfig.width - padding.left - padding.right
    const chartHeight = sizeConfig.height - padding.top - padding.bottom
    const chartX = padding.left
    const chartY = padding.top
    
    // 柱子宽度和间距
    const barWidth = barConfig.width
    const barGap = barConfig.gap
    const totalBarSpace = barWidth + barGap
    const startX = chartX + (chartWidth - (data.length * totalBarSpace - barGap)) / 2
    
    // Y轴坐标转换函数
    const scaleY = (y: number) => {
      const [minY, maxY] = calculatedYRange
      return chartY + chartHeight - (y - minY) / (maxY - minY) * chartHeight
    }
    
    // 生成网格线位置
    const gridLines = showGridLines ? [
      calculatedYRange[0],
      calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.25,
      calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.5,
      calculatedYRange[0] + (calculatedYRange[1] - calculatedYRange[0]) * 0.75,
      calculatedYRange[1]
    ] : []
    
    // 获取渐变
    const barGradient = getChartGradient('column', semantic)
    const labelGradient = getChartGradient('column', 'data_labels')
    const barGradientId = `column-gradient-${semantic}`
    const labelGradientId = `column-label-gradient-${semantic}`
    
    // 容器样式
    const containerStyle: React.CSSProperties = {
      width: sizeConfig.container.width,
      height: sizeConfig.container.height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
    
    return (
      <div
        style={containerStyle}
        className={`chart-column chart-column--${size} chart-column--${semantic} ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* 标题 */}
        {title && (
          <h3 style={{
            fontSize: chartTypography.title.fontSize[size],
            fontWeight: chartTypography.title.fontWeight,
            fontFamily: chartTypography.title.fontFamily,
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        )}
        
        {/* 图表容器 */}
        <div style={{ position: 'relative' }}>
          <svg
            ref={ref}
            width={sizeConfig.width}
            height={sizeConfig.height}
            viewBox={`0 0 ${sizeConfig.width} ${sizeConfig.height}`}
            className="chart-column__svg"
          >
            {/* 渐变定义 */}
            <defs>
              {/* 柱子渐变 */}
              {barGradient && (
                <linearGradient 
                  id={barGradientId}
                  x1="0%" 
                  y1="0%" 
                  x2="0%" 
                  y2="100%"
                >
                  {barGradient.stops.map((stop, index) => (
                    <stop 
                      key={index} 
                      offset={`${stop.position * 100}%`} 
                      stopColor={stop.color} 
                    />
                  ))}
                </linearGradient>
              )}
              
              {/* 标签渐变 */}
              {labelGradient && (
                <linearGradient 
                  id={labelGradientId}
                  x1="0%" 
                  y1="0%" 
                  x2="100%" 
                  y2="0%"
                >
                  {labelGradient.stops.map((stop, index) => (
                    <stop 
                      key={index} 
                      offset={`${stop.position * 100}%`} 
                      stopColor={stop.color} 
                    />
                  ))}
                </linearGradient>
              )}
            </defs>
            
            {/* 网格线 */}
            {showGridLines && (
              <g className="chart-column__grid">
                {gridLines.map((y, index) => (
                  <line
                    key={index}
                    x1={chartX}
                    y1={scaleY(y)}
                    x2={chartX + chartWidth}
                    y2={scaleY(y)}
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.3}
                    strokeDasharray="2,2"
                    strokeLinecap="round"
                  />
                ))}
              </g>
            )}
            
            {/* X轴标签 */}
            {true && (
              <g className="chart-column__x-axis">
                {data.map((point, index) => {
                  const x = startX + index * totalBarSpace + barWidth / 2
                  const label = xLabels ? xLabels[index] : point.label || point.x.toString()
                  
                  return (
                    <AxisLabel
                      key={index}
                      value={label}
                      axis="x"
                      size={size}
                      theme={theme}
                      style={{
                        x,
                        y: chartY + chartHeight + 8 + 12,
                        textAnchor: 'middle'
                      }}
                    />
                  )
                })}
              </g>
            )}
            
            {/* 柱子 */}
            {data.map((point, index) => {
              const x = startX + index * totalBarSpace
              const y = scaleY(point.y)
              const height = scaleY(calculatedYRange[0]) - y
              
              return (
                <g key={point.id || index} className={`chart-column__bar chart-column__bar--${index}`}>
                  {/* 柱子矩形 */}
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(height, 2)}
                    fill={barGradient ? `url(#${barGradientId})` : '#70BCFF'}
                    fillOpacity={0.8}
                    rx={4}
                    style={{
                      cursor: onBarClick ? 'pointer' : 'default',
                      transition: animated ? 'opacity 0.2s ease' : 'none'
                    }}
                    className="chart-column__rect"
                    onClick={(e) => {
                      e.stopPropagation()
                      onBarClick?.(point, index)
                    }}
                    onMouseEnter={() => onBarHover?.(point, index)}
                    onMouseLeave={() => onBarHover?.(null, -1)}
                  />
                  
                  {/* 数据标签 */}
                  {showDataLabels && (
                    <DataPointLabel
                      value={point.y}
                      x={x + barWidth / 2}
                      y={y}
                      formatOptions={{ precision: 1 }}
                      offset={{ x: 0, y: -8 }}
                      size={size}
                      theme={theme}
                      style={{
                        fill: labelGradient ? `url(#${labelGradientId})` : '#33A0FF',
                        fillOpacity: 0.9
                      }}
                      onClick={() => onBarClick?.(point, index)}
                    />
                  )}
                </g>
              )
            })}
            
            {/* 连接各柱子顶部的基准线 (匹配 Figma 设计) */}
            {data.length > 1 && (
              <g className="chart-column__baseline">
                {data.map((point, index) => {
                  if (index === data.length - 1) return null
                  
                  const currentX = startX + index * totalBarSpace + barWidth
                  const nextX = startX + (index + 1) * totalBarSpace
                  const currentY = scaleY(point.y)
                  const nextY = scaleY(data[index + 1].y)
                  
                  return (
                    <line
                      key={`baseline-${index}`}
                      x1={currentX}
                      y1={currentY}
                      x2={nextX}
                      y2={nextY}
                      stroke="#50BCFF"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="chart-column__baseline-segment"
                    />
                  )
                })}
              </g>
            )}
          </svg>
        </div>
      </div>
    )
  }
)

ColumnChart.displayName = 'ColumnChart'

// ===========================================
// 图表工厂函数
// ===========================================

export interface ChartFactoryProps extends BaseChartProps {
  type: ChartType
  value?: number
  range?: [number, number]
  max?: number
  unit?: string
  showValue?: boolean
  showRangeLabels?: boolean
  unitLabel?: string
  // 多环形图专用属性
  segments?: MultiRingSegment[]
  labels?: MultiRingLabel[]
  showLabels?: boolean
  onSegmentClick?: (segment: MultiRingSegment, index: number) => void
  // 线形图专用属性
  series?: LineDataSeries[]
  xRange?: [number, number]
  yRange?: [number, number]
  xLabels?: string[]
  yLabels?: string[]
  showGridLines?: boolean
  showLegend?: boolean
  onPointClick?: (point: LineDataPoint, seriesIndex: number, pointIndex: number) => void
  // 柱状图专用属性
  data?: ColumnDataPoint[]
  showDataLabels?: boolean
  labelFormatter?: (value: number) => string
  onBarClick?: (point: ColumnDataPoint, index: number) => void
}

/**
 * 图表工厂函数 - 根据类型创建对应图表
 */
export const Chart = React.forwardRef<SVGSVGElement, ChartFactoryProps>(
  ({ type, ...props }, ref) => {
    switch (type) {
      case 'donut':
        return <DonutChart ref={ref} value={props.value || 0} {...props} />
      case 'bar':
        return <BarChart ref={ref} value={props.value || 0} {...props} />
      case 'multiRing':
        return <MultiRingChart ref={ref} segments={props.segments || []} {...props} />
      case 'line':
        return <LineChart ref={ref} series={props.series || []} {...props} />
      case 'column':
        return <ColumnChart ref={ref} data={props.data || []} {...props} />
      default:
        console.warn(`Chart type "${type}" not implemented`)
        return null
    }
  }
)

Chart.displayName = 'Chart'

// ===========================================
// 导出
// ===========================================

export default {
  DonutChart,
  BarChart,
  MultiRingChart,
  LineChart,
  ColumnChart,
  Chart,
  GradientDefs
}