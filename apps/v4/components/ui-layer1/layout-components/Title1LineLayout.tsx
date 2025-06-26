/**
 * Title 1 Line Layout - Layer 1 布局组件
 * 
 * 实现 Medium+Small 的1行文本布局
 * 用于简单的标题或标签显示
 */

import React from 'react'
import { baseDesignTokens, LayoutPosition } from '../design-tokens-simple'
import { SlotContainer } from './SlotContainer'

// ===========================================
// Title 1 Line Layout Props
// ===========================================

export interface Title1LineLayoutProps {
  text: string             // 主文本
  subtitle?: string        // 可选副文本
  position: LayoutPosition
  size?: 'medium' | 'small' | 'large'
  status?: 'normal' | 'warning' | 'critical' | 'optimal'
  interactive?: boolean
  className?: string
  style?: React.CSSProperties
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Title 1 Line Layout Component  
// ===========================================

export const Title1LineLayout: React.FC<Title1LineLayoutProps> = ({
  text,
  subtitle,
  position,
  size = 'medium',
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
      normal: baseDesignTokens.standardTokens.light.foreground,
      warning: baseDesignTokens.standardTokens.light.warning, 
      critical: baseDesignTokens.standardTokens.light.danger,
      optimal: baseDesignTokens.standardTokens.light.primary,
    }
    return semanticMapping[status]
  }
  
  // 根据尺寸获取文本样式
  const getTextStyle = (): React.CSSProperties => {
    const baseStyle = {
      fontFamily: baseDesignTokens.typography.fontFamily.primary,
      fontWeight: baseDesignTokens.typography.fontWeight.medium,
      lineHeight: baseDesignTokens.typography.lineHeight.snug,
      color: getStatusColor(),
      margin: 0,
      padding: 0,
      width: '100%',
      textAlign: 'left' as const,
    }
    
    switch (size) {
      case 'large':
        return {
          ...baseStyle,
          fontSize: baseDesignTokens.typography.fontSize.lg,      // 24px
        }
      case 'medium':
        return {
          ...baseStyle,
          fontSize: baseDesignTokens.typography.fontSize.md,      // 20px
        }
      case 'small':
        return {
          ...baseStyle,
          fontSize: baseDesignTokens.typography.fontSize.sm,      // 15px
          fontWeight: baseDesignTokens.typography.fontWeight.regular,
        }
      default:
        return baseStyle
    }
  }
  
  const getSubtitleStyle = (): React.CSSProperties => {
    return {
      fontFamily: baseDesignTokens.typography.fontFamily.primary,
      fontWeight: baseDesignTokens.typography.fontWeight.regular,
      fontSize: baseDesignTokens.typography.fontSize.xs,         // 12px
      lineHeight: baseDesignTokens.typography.lineHeight.snug,
      color: baseDesignTokens.standardTokens.light.foreground,
      opacity: 0.7,
      margin: 0,
      padding: 0,
      marginTop: '2px',
      width: '100%',
      textAlign: 'left' as const,
    }
  }
  
  const textStyle = getTextStyle()
  const subtitleStyle = getSubtitleStyle()
  
  const containerStyle: React.CSSProperties = {
    ...style,
  }
  
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('title1line_click', {
        text,
        subtitle,
        position,
        size,
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
      {/* 主文本 */}
      <div 
        style={textStyle}
        data-text-level="primary"
        onClick={handleClick}
      >
        {text}
      </div>
      
      {/* 副文本（可选） */}
      {subtitle && (
        <div 
          style={subtitleStyle}
          data-text-level="subtitle"
        >
          {subtitle}
        </div>
      )}
    </SlotContainer>
  )
}

export default Title1LineLayout