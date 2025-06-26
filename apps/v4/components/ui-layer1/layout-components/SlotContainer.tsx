/**
 * Slot Container - Layer 1 布局组件
 * 
 * 实现 195x97px 的槽位容器，支持 4象限定位
 * 基于 Figma 观察到的位置和对齐规律
 */

import React from 'react'
import { baseDesignTokens, LayoutPosition, getLayoutPosition } from '../design-tokens-simple'

// ===========================================
// Slot Container Props
// ===========================================

export interface SlotContainerProps {
  children: React.ReactNode
  position: LayoutPosition
  alignContent?: 'top' | 'bottom' | 'center'
  className?: string
  style?: React.CSSProperties
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Slot Container Component
// ===========================================

export const SlotContainer: React.FC<SlotContainerProps> = ({
  children,
  position,
  alignContent,
  className,
  style,
  onInteraction,
  ...props
}) => {
  // 获取位置配置
  const positionConfig = getLayoutPosition(position)
  
  // 自动推断内容对齐方式（如果未指定）
  const inferredAlign = alignContent || (
    position.includes('Top') ? 'top' : 
    position.includes('Bottom') ? 'bottom' : 
    'center'
  )
  
  // 获取文本对齐配置
  const textAlignConfig = baseDesignTokens.layout.textAlignment.slotAlignment[
    inferredAlign === 'bottom' ? 'bottom' : 'top'
  ]
  
  const slotStyle: React.CSSProperties = {
    // 基础槽位尺寸
    width: `${baseDesignTokens.sizing.hvac.module.minWidth}px`,
    height: `${baseDesignTokens.sizing.hvac.module.minHeight}px`,
    
    // Flexbox 布局
    display: 'flex',
    flexDirection: textAlignConfig.flexDirection as 'column' | 'column-reverse',
    alignItems: textAlignConfig.vertical as 'flex-start' | 'flex-end' | 'center',
    justifyContent: positionConfig.justifyContent as 'flex-start' | 'flex-end' | 'center',
    
    // 间距
    gap: baseDesignTokens.spacing.hvac.textVerticalGap,
    padding: baseDesignTokens.spacing.hvac.componentPadding,
    
    // 定位（在 Widget 内的相对位置）
    position: 'relative',
    
    // 用户自定义样式
    ...style,
  }
  
  const handleClick = () => {
    if (onInteraction) {
      onInteraction('slot_click', { position, alignContent: inferredAlign })
    }
  }
  
  return (
    <div
      style={slotStyle}
      className={className}
      onClick={handleClick}
      data-component="slot-container"
      data-position={position}
      data-align={inferredAlign}
      {...props}
    >
      {children}
    </div>
  )
}

export default SlotContainer