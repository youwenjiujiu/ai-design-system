/**
 * Widget Container - Layer 1 布局组件
 * 
 * 实现 430x225px (或响应式) 的 2x2 网格容器
 * 基于 Figma 观察到的布局规律
 */

import React from 'react'
import { baseDesignTokens, LayoutPosition, getLayoutPosition, getResponsiveGrid } from '../design-tokens-simple'

// ===========================================
// Widget Container Props
// ===========================================

export interface WidgetContainerProps {
  children: React.ReactNode
  variant?: 'default' | 'titleOnly'
  responsive?: boolean
  className?: string
  style?: React.CSSProperties
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Widget Container Component
// ===========================================

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  children,
  variant = 'default',
  responsive = true,
  className,
  style,
  onInteraction,
  ...props
}) => {
  // 获取容器布局样式
  const containerLayout = baseDesignTokens.layout.containers.widget[variant]
  
  // 响应式样式
  const getResponsiveStyle = (): React.CSSProperties => {
    if (!responsive) return {}
    
    const mobileLayout = getResponsiveGrid('mobile')
    const tabletLayout = getResponsiveGrid('tablet')
    
    return {
      '@media (max-width: 480px)': mobileLayout,
      '@media (max-width: 768px)': tabletLayout,
    } as React.CSSProperties
  }
  
  const containerStyle: React.CSSProperties = {
    // 基础容器样式
    ...containerLayout,
    
    // HVAC 专用尺寸约束
    minWidth: `${baseDesignTokens.sizing.hvac.widget.minWidth}px`,
    minHeight: `${baseDesignTokens.sizing.hvac.widget.minHeight}px`,
    maxHeight: baseDesignTokens.sizing.hvac.widget.maxHeight,
    
    // 外观样式
    backgroundColor: baseDesignTokens.standardTokens.light.background,
    borderRadius: baseDesignTokens.borderRadius.md,
    boxShadow: baseDesignTokens.shadows.widget.default,
    border: `1px solid ${baseDesignTokens.brandColors.neutral.black}10`,
    
    // 动画过渡
    transition: `all ${baseDesignTokens.animation.duration.normal}ms ${baseDesignTokens.animation.easing.easeOut}`,
    
    // 响应式样式
    ...getResponsiveStyle(),
    
    // 用户自定义样式
    ...style,
  }
  
  // 悬停效果
  const handleMouseEnter = () => {
    if (onInteraction) {
      // 触发悬停交互
    }
  }
  
  const handleClick = () => {
    if (onInteraction) {
      onInteraction('widget_click', { variant })
    }
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      data-component="widget-container"
      data-variant={variant}
      {...props}
    >
      {children}
    </div>
  )
}

export default WidgetContainer