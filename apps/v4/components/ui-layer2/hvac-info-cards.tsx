/**
 * Layer 2 HVAC 信息卡片组件
 * 
 * 基于 Figma 天气预报卡片学习的设计模式
 * 职责：
 * - 紧凑型信息展示
 * - 多数据对比显示
 * - 透明度层次应用
 * - 主题感知的信息密度设计
 */

import React from 'react'
import { themeTokens, cardTokens, opacityTokens, type Theme } from '../ui-layer1/design-tokens-simple'

// 信息卡片基础属性
interface InfoCardProps {
  /** 当前主题 */
  theme?: Theme
  /** 卡片尺寸 */
  size?: 'compact' | 'standard' | 'wide'
  /** 卡片变体 */
  variant?: 'subtle' | 'elevated' | 'premium'
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

/**
 * 基础信息卡片容器
 */
export const InfoCard = React.forwardRef<HTMLDivElement, InfoCardProps>(
  ({ 
    theme = 'light',
    size = 'compact',
    variant = 'subtle',
    className = '',
    style,
    children,
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    const sizeConfig = cardTokens.sizes[size]
    const variantConfig = cardTokens.variants[variant]
    
    const cardStyle: React.CSSProperties = {
      width: sizeConfig.width,
      height: sizeConfig.height,
      padding: sizeConfig.padding,
      borderRadius: sizeConfig.borderRadius,
      
      // 主题感知背景 (应用透明度)
      backgroundColor: `${currentTheme.background.elevated}${Math.round(variantConfig.backgroundOpacity * 255).toString(16).padStart(2, '0')}`,
      
      // 边框 (应用透明度)
      border: `1px solid ${currentTheme.border.default}${Math.round(variantConfig.borderOpacity * 255).toString(16).padStart(2, '0')}`,
      
      boxShadow: variantConfig.shadow,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      transition: 'all 0.3s ease',
      
      ...style
    }
    
    return (
      <div
        ref={ref}
        style={cardStyle}
        className={`hvac-info-card hvac-info-card--${size} hvac-info-card--${variant} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

InfoCard.displayName = 'InfoCard'

/**
 * 温度范围显示组件 - 模仿 "32℃ / 26℃" 格式
 */
export const TemperatureRange = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  high: number
  low: number
  unit?: string
  precision?: number
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  high,
  low,
  unit = '℃',
  precision = 0,
  className = '',
  style,
  ...props 
}, ref) => {
  
  const currentTheme = themeTokens[theme]
  
  const rangeStyle: React.CSSProperties = {
    fontSize: '14px',
    fontFamily: 'Scto Grotesk A, system-ui, sans-serif',
    color: currentTheme.foreground.primary,
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...style
  }
  
  const separatorStyle: React.CSSProperties = {
    color: currentTheme.foreground.muted,
    opacity: opacityTokens.text.muted
  }
  
  return (
    <div
      ref={ref}
      style={rangeStyle}
      className={`hvac-temperature-range ${className}`}
      {...props}
    >
      <span className="temp-high">
        {high.toFixed(precision)}{unit}
      </span>
      <span style={separatorStyle}>/</span>
      <span className="temp-low">
        {low.toFixed(precision)}{unit}
      </span>
    </div>
  )
})

TemperatureRange.displayName = 'TemperatureRange'

/**
 * 日期标签组件 - 模仿 "May 22" 格式
 */
export const DateLabel = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  date: Date | string
  format?: 'short' | 'medium' | 'long'
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  date,
  format = 'short',
  className = '',
  style,
  ...props 
}, ref) => {
  
  const currentTheme = themeTokens[theme]
  
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    
    switch (format) {
      case 'short':
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      case 'medium':
        return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      case 'long':
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      default:
        return d.toLocaleDateString()
    }
  }
  
  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontFamily: 'Scto Grotesk A, system-ui, sans-serif',
    color: currentTheme.foreground.primary,
    fontWeight: 'normal',
    opacity: opacityTokens.text.primary,
    ...style
  }
  
  return (
    <div
      ref={ref}
      style={labelStyle}
      className={`hvac-date-label ${className}`}
      {...props}
    >
      {formatDate(date)}
    </div>
  )
})

DateLabel.displayName = 'DateLabel'

/**
 * HVAC 预测卡片 - 基于天气预报格式的 HVAC 数据预测
 */
export const HVACForecastCard = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  data: Array<{
    date: Date | string
    label?: string  // 如 "Thu", "Fri"
    temperature: { high: number, low: number }
    humidity?: { high: number, low: number }
    pressure?: number
    status?: 'optimal' | 'normal' | 'warning' | 'error'
  }>
  title?: string
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  data,
  title = 'HVAC 系统预测',
  className = '',
  style,
  ...props 
}, ref) => {
  
  const currentTheme = themeTokens[theme]
  
  const containerStyle: React.CSSProperties = {
    width: cardTokens.sizes.wide.width,
    minHeight: cardTokens.sizes.wide.height,
    padding: cardTokens.sizes.wide.padding,
    borderRadius: cardTokens.sizes.wide.borderRadius,
    
    // 微妙背景 (10% 透明度)
    backgroundColor: `${currentTheme.background.elevated}${Math.round(opacityTokens.background.subtle * 255).toString(16).padStart(2, '0')}`,
    border: `1px solid ${currentTheme.border.muted}`,
    
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    ...style
  }
  
  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: currentTheme.foreground.primary,
    marginBottom: '8px'
  }
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    flex: 1
  }
  
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0'
  }
  
  return (
    <div
      ref={ref}
      style={containerStyle}
      className={`hvac-forecast-card ${className}`}
      {...props}
    >
      {title && <h3 style={titleStyle}>{title}</h3>}
      
      <div style={gridStyle}>
        {data.slice(0, 4).map((item, index) => (
          <div key={index} style={itemStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <DateLabel 
                theme={theme} 
                date={item.date} 
                format={item.label ? 'short' : 'medium'} 
              />
              <TemperatureRange
                theme={theme}
                high={item.temperature.high}
                low={item.temperature.low}
              />
            </div>
            
            {/* 状态指示器 */}
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 
                item.status === 'optimal' ? '#67D75E' :
                item.status === 'warning' ? '#FECC36' :
                item.status === 'error' ? '#FF3939' :
                currentTheme.foreground.muted
            }} />
          </div>
        ))}
      </div>
    </div>
  )
})

HVACForecastCard.displayName = 'HVACForecastCard'

/**
 * 系统状态对比卡片 - 并排显示当前/目标值
 */
export const SystemStatusCard = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  title: string
  current: { value: number, unit: string, label?: string }
  target: { value: number, unit: string, label?: string }
  status?: 'optimal' | 'normal' | 'warning' | 'error'
  icon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}>(({ 
  theme = 'light',
  title,
  current,
  target,
  status = 'normal',
  icon,
  className = '',
  style,
  ...props 
}, ref) => {
  
  const currentTheme = themeTokens[theme]
  
  const statusColors = {
    optimal: '#67D75E',
    normal: currentTheme.foreground.primary,
    warning: '#FECC36',
    error: '#FF3939'
  }
  
  return (
    <InfoCard
      ref={ref}
      theme={theme}
      size="compact"
      variant="elevated"
      className={`hvac-status-card ${className}`}
      style={style}
      {...props}
    >
      {/* 标题和图标 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        {icon}
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: currentTheme.foreground.secondary
        }}>
          {title}
        </span>
      </div>
      
      {/* 当前值 vs 目标值 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: statusColors[status],
            fontFamily: 'Scto Grotesk A, system-ui, sans-serif'
          }}>
            {current.value}{current.unit}
          </div>
          <div style={{
            fontSize: '12px',
            color: currentTheme.foreground.muted,
            opacity: opacityTokens.text.secondary
          }}>
            {current.label || '当前'}
          </div>
        </div>
        
        <div style={{
          width: '1px',
          height: '30px',
          backgroundColor: currentTheme.border.default,
          opacity: opacityTokens.border.subtle
        }} />
        
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: currentTheme.foreground.secondary,
            fontFamily: 'Scto Grotesk A, system-ui, sans-serif'
          }}>
            {target.value}{target.unit}
          </div>
          <div style={{
            fontSize: '12px',
            color: currentTheme.foreground.muted,
            opacity: opacityTokens.text.secondary
          }}>
            {target.label || '目标'}
          </div>
        </div>
      </div>
    </InfoCard>
  )
})

SystemStatusCard.displayName = 'SystemStatusCard'

/**
 * 信息卡片网格布局
 */
export const InfoCardGrid = React.forwardRef<HTMLDivElement, {
  theme?: Theme
  columns?: number
  gap?: number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}>(({ 
  theme = 'light',
  columns = 3,
  gap = 16,
  className = '',
  style,
  children,
  ...props 
}, ref) => {
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${gap}px`,
    width: '100%',
    ...style
  }
  
  return (
    <div
      ref={ref}
      style={gridStyle}
      className={`hvac-info-grid ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

InfoCardGrid.displayName = 'InfoCardGrid'

export default {
  InfoCard,
  TemperatureRange,
  DateLabel,
  HVACForecastCard,
  SystemStatusCard,
  InfoCardGrid
}