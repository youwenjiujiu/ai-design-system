/**
 * Title 2 Lines Layout - Layer 1 布局组件
 * 
 * 实现 Big+Medium 或 Medium+Small 的2行文本布局
 * 基于 Figma 精确的文本位置和间距规律
 */

import React from 'react'
import { baseDesignTokens, LayoutPosition } from '../design-tokens-simple'
import { SlotContainer } from './SlotContainer'

// ===========================================
// Title 2 Lines Layout Props
// ===========================================

export interface Title2LinesLayoutProps {
  primary: string          // 第1行文本
  secondary: string        // 第2行文本
  position: LayoutPosition
  hierarchy?: 'bigMedium' | 'mediumSmall'  // 文本层级
  showTrend?: boolean
  trendDirection?: 'up' | 'down' | 'stable'
  status?: 'normal' | 'warning' | 'critical' | 'optimal'
  interactive?: boolean
  className?: string
  style?: React.CSSProperties
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Title 2 Lines Layout Component  
// ===========================================

export const Title2LinesLayout: React.FC<Title2LinesLayoutProps> = ({
  primary,
  secondary,
  position,
  hierarchy = 'bigMedium',
  showTrend = false,
  trendDirection = 'stable',
  status = 'normal',
  interactive = false,
  className,
  style,
  onInteraction,
  ...props
}) => {
  // 获取状态颜色
  const getStatusColor = () => {
    const semanticMapping = {
      normal: baseDesignTokens.standardTokens.light.success,
      warning: baseDesignTokens.standardTokens.light.warning, 
      critical: baseDesignTokens.standardTokens.light.danger,
      optimal: baseDesignTokens.standardTokens.light.primary,
    }
    return semanticMapping[status]
  }
  
  // 获取趋势图标
  const getTrendIcon = () => {
    const trendIcons = {
      up: '↗️',
      down: '↘️', 
      stable: '→'
    }
    return trendIcons[trendDirection]
  }
  
  // 根据层级配置文本样式
  const getPrimaryTextStyle = (): React.CSSProperties => {
    const baseStyle = {
      fontFamily: baseDesignTokens.typography.fontFamily.primary,
      fontWeight: baseDesignTokens.typography.fontWeight.regular,
      lineHeight: baseDesignTokens.typography.lineHeight.snug,
      margin: 0,
      padding: 0,
      width: '100%',
      textAlign: 'left' as const,
    }
    
    if (hierarchy === 'bigMedium') {
      return {
        ...baseStyle,
        fontSize: baseDesignTokens.typography.fontSize.xl,      // 40px (Big)
        lineHeight: baseDesignTokens.typography.lineHeight.tight,
        letterSpacing: baseDesignTokens.typography.letterSpacing.tight,
        color: getStatusColor(),
      }
    } else {
      return {
        ...baseStyle,
        fontSize: baseDesignTokens.typography.fontSize.md,      // 20px (Medium)
        color: getStatusColor(),
      }
    }
  }
  
  const getSecondaryTextStyle = (): React.CSSProperties => {
    const baseStyle = {
      fontFamily: baseDesignTokens.typography.fontFamily.primary,
      fontWeight: baseDesignTokens.typography.fontWeight.regular,
      lineHeight: baseDesignTokens.typography.lineHeight.snug,
      margin: 0,
      padding: 0,
      width: '100%',
      textAlign: 'left' as const,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }
    
    if (hierarchy === 'bigMedium') {
      return {
        ...baseStyle,
        fontSize: baseDesignTokens.typography.fontSize.lg,      // 24px (Medium)
        color: baseDesignTokens.standardTokens.light.foreground,
      }
    } else {
      return {
        ...baseStyle,
        fontSize: baseDesignTokens.typography.fontSize.sm,      // 15px (Small)
        color: baseDesignTokens.standardTokens.light.foreground,
        opacity: 0.7,
      }
    }
  }
  
  const primaryTextStyle = getPrimaryTextStyle()
  const secondaryTextStyle = getSecondaryTextStyle()
  
  const containerStyle: React.CSSProperties = {
    ...style,
  }
  
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('title2lines_click', {
        primary,
        secondary,
        position,
        hierarchy,
        status
      })
    }
  }
  
  return (
    <SlotContainer
      position={position}
      style={containerStyle}
      className={className}
      onInteraction={onInteraction}
      {...props}
    >
      {/* 第1行文本 */}
      <div 
        style={primaryTextStyle}
        data-text-level="primary"
        onClick={handleClick}
      >
        {primary}
      </div>
      
      {/* 第2行文本 + 趋势 */}
      <div 
        style={secondaryTextStyle}
        data-text-level="secondary"
      >
        <span>{secondary}</span>
        {showTrend && (
          <span style={{ fontSize: '12px', opacity: 0.8 }}>
            {getTrendIcon()}
          </span>
        )}
      </div>
    </SlotContainer>
  )
}

export default Title2LinesLayout