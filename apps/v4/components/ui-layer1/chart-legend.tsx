/**
 * Chart Legend Component - 基于 Figma 设计的图例组件
 * 
 * 精确匹配 Figma 图例规范:
 * - 蓝色渐变实线 "Actual Energy"
 * - 白色虚线 "Predicted Energy"  
 * - 70% 透明度文字
 * - 正确的线条样式展示
 */

import React from 'react'
import { 
  getChartGradient, 
  chartTypography,
  type ChartSemantic,
  type ChartSize,
  type Theme
} from './design-tokens-simple'

// ===========================================
// 图例数据接口
// ===========================================

export interface LegendItem {
  /** 图例名称 */
  name: string
  /** 业务语义 */
  semantic: ChartSemantic
  /** 线条样式 (可选，覆盖语义默认样式) */
  strokeDasharray?: string
  /** 颜色 (可选，覆盖语义默认颜色) */
  color?: string
}

export interface ChartLegendProps {
  /** 图例数据 */
  items: LegendItem[]
  /** 尺寸 */
  size?: ChartSize
  /** 主题 */
  theme?: Theme
  /** 布局方向 */
  orientation?: 'horizontal' | 'vertical'
  /** 间距 */
  gap?: number
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

// ===========================================
// Figma 图例组件实现
// ===========================================

export const ChartLegend: React.FC<ChartLegendProps> = ({
  items,
  size = 'md',
  theme = 'light',
  orientation = 'horizontal',
  gap = 32,
  className = '',
  style
}) => {
  
  // 字体配置
  const fontSize = size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px'
  
  // 容器样式
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems: 'center',
    gap: `${gap}px`,
    height: '9px',  // 匹配 Figma 图例高度
    ...style
  }
  
  return (
    <div 
      className={`chart-legend chart-legend--${size} chart-legend--${theme} ${className}`}
      style={containerStyle}
    >
      {items.map((item, index) => {
        const gradient = getChartGradient('line', item.semantic)
        const gradientId = `legend-gradient-${item.semantic}-${index}`
        const isGradient = gradient && gradient.stops.length > 1
        
        // 确定线条样式
        const strokeDasharray = item.strokeDasharray || 
                               gradient?.strokeDasharray || 
                               (item.semantic === 'predicted_energy' ? '2 4' : 'none')
        
        // 确定颜色
        const strokeColor = item.color || 
                           (isGradient ? `url(#${gradientId})` : (gradient?.stops[0]?.color || '#FFFFFF'))
        
        return (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'  // Figma 中线条与文字的间距
            }}
          >
            {/* SVG 线条图例 - 精确匹配 Figma */}
            <svg width="20" height="3" style={{ display: 'block' }}>
              {/* 渐变定义 */}
              {isGradient && (
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    {gradient.stops.map((stop, stopIndex) => (
                      <stop 
                        key={stopIndex} 
                        offset={`${stop.position * 100}%`} 
                        stopColor={stop.color} 
                      />
                    ))}
                  </linearGradient>
                </defs>
              )}
              
              {/* 线条 */}
              <line
                x1="0"
                y1="1.5"
                x2="20" 
                y2="1.5"
                stroke={strokeColor}
                strokeWidth="3"
                strokeDasharray={strokeDasharray === 'none' ? undefined : strokeDasharray}
                strokeLinecap="round"
              />
            </svg>
            
            {/* 标签文本 - 匹配 Figma 样式 */}
            <span style={{ 
              color: 'white',
              fontSize: fontSize,
              fontFamily: chartTypography.title.fontFamily,
              fontWeight: '400',
              opacity: 0.7,  // 匹配 Figma 的 70% 透明度
              lineHeight: '1',
              whiteSpace: 'nowrap'
            }}>
              {item.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

ChartLegend.displayName = 'ChartLegend'

// ===========================================
// 预设图例配置 (基于 Figma 设计)
// ===========================================

export const figmaLegendConfigs = {
  // 能源监控图例 (基于 Figma SVG)
  energyMonitoring: [
    {
      name: 'Actual Energy',
      semantic: 'actual_energy' as ChartSemantic
    },
    {
      name: 'Predicted Energy', 
      semantic: 'predicted_energy' as ChartSemantic
    }
  ],
  
  // 流量监控图例
  flowMonitoring: [
    {
      name: 'Actual Flow',
      semantic: 'actual_flow' as ChartSemantic
    },
    {
      name: 'Current Set point',
      semantic: 'current_setpoint' as ChartSemantic,
      strokeDasharray: '5,5'
    }
  ],
  
  // 双线监控图例
  dualLineMonitoring: [
    {
      name: 'Primary Line',
      semantic: 'dual_line_primary' as ChartSemantic
    },
    {
      name: 'Set Point',
      semantic: 'dual_line_setpoint' as ChartSemantic,
      strokeDasharray: '5,5'
    }
  ]
} as const

export default ChartLegend