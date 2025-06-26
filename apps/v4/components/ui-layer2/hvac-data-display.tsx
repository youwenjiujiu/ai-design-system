/**
 * Layer 2 HVAC 数据显示组件
 * 
 * 基于 Figma weather 页面学习的温度仪表盘设计
 * 职责：
 * - 数值显示组件（温度、压力、湿度等）
 * - 可视化仪表盘
 * - 状态指示器
 * - 主题感知的数据展示
 */

import React from 'react'
import { themeTokens, type Theme } from '../ui-layer1/design-tokens-simple'
import { 
  ThermometerIcon, 
  GaugeIcon, 
  HumiditySensorIcon,
  PressureMeterIcon,
  type HVACIconProps 
} from './hvac-icons'

// 数据显示组件属性
interface DataDisplayProps {
  /** 当前主题 */
  theme?: Theme
  /** 数值 */
  value: number
  /** 单位 */
  unit: string
  /** 标签 */
  label?: string
  /** 数据类型 */
  type?: 'temperature' | 'pressure' | 'humidity' | 'flow' | 'power'
  /** 显示精度 */
  precision?: number
  /** 尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 状态 */
  status?: 'normal' | 'warning' | 'error' | 'optimal'
  /** 目标值（用于显示偏差） */
  target?: number
  /** 范围值（用于显示是否在正常范围内） */
  range?: [number, number]
  /** 是否显示趋势 */
  showTrend?: boolean
  /** 趋势方向 */
  trend?: 'up' | 'down' | 'stable'
  /** 点击回调 */
  onClick?: () => void
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

/**
 * 温度显示组件 - 基于 Figma 设计
 */
export const TemperatureDisplay = React.forwardRef<HTMLDivElement, DataDisplayProps>(
  ({ 
    theme = 'light',
    value,
    unit = '℃',
    label = '温度',
    precision = 1,
    size = 'md',
    status = 'normal',
    target,
    range,
    showTrend = false,
    trend = 'stable',
    onClick,
    className = '',
    style,
    ...props 
  }, ref) => {
    
    // 尺寸配置
    const sizeConfig = {
      sm: { cardSize: 120, fontSize: 20, iconSize: 'sm' as const, padding: 12 },
      md: { cardSize: 195, fontSize: 32, iconSize: 'md' as const, padding: 16 },
      lg: { cardSize: 260, fontSize: 48, iconSize: 'lg' as const, padding: 20 },
    }
    
    const config = sizeConfig[size]
    const currentTheme = themeTokens[theme]
    
    // 状态颜色映射
    const statusColors = {
      normal: currentTheme.foreground.primary,
      optimal: '#67D75E',
      warning: '#FECC36', 
      error: '#FF3939'
    }
    
    // 格式化数值
    const formattedValue = value.toFixed(precision)
    
    // 判断是否在正常范围内
    const isInRange = range ? (value >= range[0] && value <= range[1]) : true
    const deviation = target ? Math.abs(value - target) : 0
    
    // 卡片样式
    const cardStyle: React.CSSProperties = {
      width: config.cardSize,
      height: config.cardSize,
      background: `linear-gradient(135deg, ${currentTheme.background.elevated}, ${currentTheme.background.secondary})`,
      borderRadius: '16px',
      padding: config.padding,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      border: `1px solid ${currentTheme.border.muted}`,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      ...style
    }
    
    // 数值显示样式
    const valueStyle: React.CSSProperties = {
      fontSize: config.fontSize,
      fontWeight: 'bold',
      fontFamily: 'Scto Grotesk A, system-ui, sans-serif',
      color: statusColors[status],
      lineHeight: 1,
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
    
    // 单位样式
    const unitStyle: React.CSSProperties = {
      fontSize: config.fontSize * 0.5,
      fontWeight: 'normal',
      color: currentTheme.foreground.secondary,
      marginLeft: '2px'
    }
    
    // 标签样式
    const labelStyle: React.CSSProperties = {
      fontSize: '14px',
      color: currentTheme.foreground.secondary,
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
    
    // 趋势指示器
    const getTrendIcon = () => {
      if (!showTrend) return null
      
      const trendIcons = {
        up: '↗',
        down: '↘', 
        stable: '→'
      }
      
      const trendColors = {
        up: '#67D75E',
        down: '#FF3939',
        stable: currentTheme.foreground.muted
      }
      
      return (
        <span style={{ 
          color: trendColors[trend], 
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          {trendIcons[trend]}
        </span>
      )
    }
    
    return (
      <div
        ref={ref}
        style={cardStyle}
        className={`hvac-temperature-display hvac-temperature-display--${size} hvac-temperature-display--${status} ${className}`}
        onClick={onClick}
        {...props}
      >
        {/* 标签和图标 */}
        <div style={labelStyle}>
          <ThermometerIcon size={config.iconSize} color={status === 'normal' ? 'primary' : status} />
          <span>{label}</span>
          {getTrendIcon()}
        </div>
        
        {/* 主要数值显示 */}
        <div style={valueStyle}>
          <span>{formattedValue}</span>
          <span style={unitStyle}>{unit}</span>
        </div>
        
        {/* 状态信息 */}
        <div style={{ 
          fontSize: '12px', 
          color: currentTheme.foreground.muted,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {target && (
            <span>目标: {target}{unit}</span>
          )}
          {range && (
            <span style={{ 
              color: isInRange ? '#67D75E' : '#FF3939',
              fontWeight: '500'
            }}>
              {isInRange ? '正常' : '超限'}
            </span>
          )}
        </div>
        
        {/* 可视化仪表（简化版） */}
        {range && (
          <div style={{
            position: 'absolute',
            bottom: config.padding,
            right: config.padding,
            width: '40px',
            height: '4px',
            backgroundColor: currentTheme.border.muted,
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(Math.max((value - range[0]) / (range[1] - range[0]) * 100, 0), 100)}%`,
              height: '100%',
              backgroundColor: isInRange ? '#67D75E' : '#FF3939',
              borderRadius: '2px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        )}
      </div>
    )
  }
)

TemperatureDisplay.displayName = 'TemperatureDisplay'

/**
 * 压力显示组件
 */
export const PressureDisplay = React.forwardRef<HTMLDivElement, DataDisplayProps>(
  (props, ref) => (
    <TemperatureDisplay
      ref={ref}
      {...props}
      unit={props.unit || 'kPa'}
      label={props.label || '压力'}
    />
  )
)

PressureDisplay.displayName = 'PressureDisplay'

/**
 * 湿度显示组件
 */
export const HumidityDisplay = React.forwardRef<HTMLDivElement, DataDisplayProps>(
  (props, ref) => (
    <TemperatureDisplay
      ref={ref}
      {...props}
      unit={props.unit || '%'}
      label={props.label || '湿度'}
      precision={0}
    />
  )
)

HumidityDisplay.displayName = 'HumidityDisplay'

/**
 * 数据网格布局组件
 */
export const DataGrid = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  data: Array<{
    type: 'temperature' | 'pressure' | 'humidity' | 'flow' | 'power'
    value: number
    unit: string
    label: string
    status?: 'normal' | 'warning' | 'error' | 'optimal'
    target?: number
    range?: [number, number]
    trend?: 'up' | 'down' | 'stable'
  }>
  columns?: number
  gap?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  data,
  columns = 3,
  gap = 16,
  size = 'md',
  className = '',
  style,
  ...props 
}, ref) => {
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    padding: '16px',
    ...style
  }
  
  const getDisplayComponent = (type: string) => {
    switch (type) {
      case 'temperature':
        return TemperatureDisplay
      case 'pressure':
        return PressureDisplay
      case 'humidity':
        return HumidityDisplay
      default:
        return TemperatureDisplay
    }
  }
  
  return (
    <div
      ref={ref}
      style={gridStyle}
      className={`hvac-data-grid ${className}`}
      {...props}
    >
      {data.map((item, index) => {
        const DisplayComponent = getDisplayComponent(item.type)
        return (
          <DisplayComponent
            key={`${item.type}-${index}`}
            theme={theme}
            size={size}
            showTrend={true}
            {...item}
          />
        )
      })}
    </div>
  )
})

DataGrid.displayName = 'DataGrid'

/**
 * 组合仪表盘组件
 */
export const HVACDashboard = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  title?: string
  data: {
    temperature: { value: number, target?: number, range?: [number, number] }
    pressure: { value: number, target?: number, range?: [number, number] }
    humidity: { value: number, target?: number, range?: [number, number] }
    flow?: { value: number, unit?: string, target?: number }
    power?: { value: number, unit?: string, target?: number }
  }
  onItemClick?: (type: string) => void
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  title = 'HVAC 系统监控',
  data,
  onItemClick,
  className = '',
  style,
  ...props 
}, ref) => {
  
  const currentTheme = themeTokens[theme]
  
  const dashboardStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background.primary,
    borderRadius: '12px',
    padding: '24px',
    border: `1px solid ${currentTheme.border.default}`,
    ...style
  }
  
  const titleStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: currentTheme.foreground.primary,
    marginBottom: '24px',
    borderBottom: `1px solid ${currentTheme.border.muted}`,
    paddingBottom: '12px'
  }
  
  const gridData = [
    { 
      type: 'temperature' as const, 
      ...data.temperature, 
      unit: '℃', 
      label: '环境温度',
      trend: 'stable' as const
    },
    { 
      type: 'pressure' as const, 
      ...data.pressure, 
      unit: 'kPa', 
      label: '系统压力',
      trend: 'up' as const
    },
    { 
      type: 'humidity' as const, 
      ...data.humidity, 
      unit: '%', 
      label: '相对湿度',
      trend: 'down' as const
    },
  ]
  
  // 添加可选数据
  if (data.flow) {
    gridData.push({
      type: 'flow' as const,
      ...data.flow,
      unit: data.flow.unit || 'L/min',
      label: '流量',
      trend: 'stable' as const
    })
  }
  
  if (data.power) {
    gridData.push({
      type: 'power' as const,
      ...data.power,
      unit: data.power.unit || 'kW',
      label: '功率',
      trend: 'up' as const
    })
  }
  
  return (
    <div
      ref={ref}
      style={dashboardStyle}
      className={`hvac-dashboard ${className}`}
      {...props}
    >
      {title && <h2 style={titleStyle}>{title}</h2>}
      
      <DataGrid
        theme={theme}
        data={gridData}
        columns={3}
        size="md"
      />
    </div>
  )
})

HVACDashboard.displayName = 'HVACDashboard'

export default {
  TemperatureDisplay,
  PressureDisplay, 
  HumidityDisplay,
  DataGrid,
  HVACDashboard
}