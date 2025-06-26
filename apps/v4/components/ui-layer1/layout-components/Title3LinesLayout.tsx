/**
 * Title 3 Lines Layout - Layer 1 布局组件
 * 
 * 实现 Small+Big+Mini 的3行文本布局
 * 基于 Figma 精确的文本位置和间距规律
 */

import React from 'react'
import { baseDesignTokens, LayoutPosition } from '../design-tokens-simple'
import { SlotContainer } from './SlotContainer'

// ===========================================
// Title 3 Lines Layout Props
// ===========================================

export interface Title3LinesLayoutProps {
  primary: string          // 第1行：小标题 (16px)
  secondary: string        // 第2行：主数据 (40px)  
  tertiary: string         // 第3行：单位/状态 (10px)
  position: LayoutPosition
  showTrend?: boolean
  trendDirection?: 'up' | 'down' | 'stable'
  status?: 'normal' | 'warning' | 'critical' | 'optimal'
  interactive?: boolean
  className?: string
  style?: React.CSSProperties
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Title 3 Lines Layout Component  
// ===========================================

export const Title3LinesLayout: React.FC<Title3LinesLayoutProps> = ({
  primary,
  secondary,
  tertiary,
  position,
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
  
  // 基于 Figma 观察的精确文本样式
  const primaryTextStyle: React.CSSProperties = {
    fontSize: baseDesignTokens.typography.fontSize.base,      // 16px (Figma确认)
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    fontWeight: baseDesignTokens.typography.fontWeight.regular,
    lineHeight: baseDesignTokens.typography.lineHeight.snug,
    color: baseDesignTokens.standardTokens.light.foreground,
    margin: 0,
    padding: 0,
    
    // 文本位置：宽度撑满，左对齐
    width: '100%',
    textAlign: 'left',
  }
  
  const secondaryTextStyle: React.CSSProperties = {
    fontSize: baseDesignTokens.typography.fontSize.xl,        // 40px (Figma确认)
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    fontWeight: baseDesignTokens.typography.fontWeight.regular,
    lineHeight: baseDesignTokens.typography.lineHeight.tight, // 1.0
    letterSpacing: baseDesignTokens.typography.letterSpacing.tight,
    color: getStatusColor(),
    margin: 0,
    padding: 0,
    
    // 文本位置：宽度撑满，左对齐
    width: '100%',
    textAlign: 'left',
  }
  
  const tertiaryTextStyle: React.CSSProperties = {
    fontSize: baseDesignTokens.typography.fontSize.mini,      // 10px (Figma确认)
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    fontWeight: baseDesignTokens.typography.fontWeight.regular,
    lineHeight: baseDesignTokens.typography.lineHeight.snug,
    color: baseDesignTokens.standardTokens.light.foreground,
    opacity: 0.7,
    margin: 0,
    padding: 0,
    
    // 文本位置：宽度撑满，左对齐
    width: '100%',
    textAlign: 'left',
    
    // 如果有趋势，显示图标
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }
  
  const containerStyle: React.CSSProperties = {
    ...style,
  }
  
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('title3lines_click', {
        primary,
        secondary, 
        tertiary,
        position,
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
      {/* 第1行：小标题 */}
      <div 
        style={primaryTextStyle}
        data-text-level="primary"
      >
        {primary}
      </div>
      
      {/* 第2行：主数据 */}
      <div 
        style={secondaryTextStyle}
        data-text-level="secondary"
        onClick={handleClick}
      >
        {secondary}
      </div>
      
      {/* 第3行：单位/状态 + 趋势 */}
      <div 
        style={tertiaryTextStyle}
        data-text-level="tertiary"
      >
        <span>{tertiary}</span>
        {showTrend && (
          <span style={{ fontSize: '8px', opacity: 0.8 }}>
            {getTrendIcon()}
          </span>
        )}
      </div>
    </SlotContainer>
  )
}

export default Title3LinesLayout