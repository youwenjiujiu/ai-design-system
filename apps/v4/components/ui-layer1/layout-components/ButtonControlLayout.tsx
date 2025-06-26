/**
 * Button Control Layout - Layer 1 布局组件
 * 
 * 实现按钮控制布局，基于 Figma 的 195x47px 按钮规范
 * 支持不同的按钮状态和交互类型
 */

import React, { useState } from 'react'
import { baseDesignTokens, LayoutPosition } from '../design-tokens-simple'
import { SlotContainer } from './SlotContainer'

// ===========================================
// Button Control Layout Props
// ===========================================

export interface ButtonControlLayoutProps {
  label: string
  position: LayoutPosition
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  size?: 'standard' | 'small' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  className?: string
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent) => void
  onInteraction?: (action: string, data?: any) => void
}

// ===========================================
// Button Control Layout Component  
// ===========================================

export const ButtonControlLayout: React.FC<ButtonControlLayoutProps> = ({
  label,
  position,
  variant = 'primary',
  size = 'standard',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  style,
  onClick,
  onInteraction,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
  // 获取按钮变体颜色
  const getVariantColors = () => {
    const variants = {
      primary: {
        background: baseDesignTokens.standardTokens.light.primary,
        text: baseDesignTokens.standardTokens.light.background,
        border: baseDesignTokens.standardTokens.light.primary,
      },
      secondary: {
        background: baseDesignTokens.standardTokens.light.background,
        text: baseDesignTokens.standardTokens.light.foreground,
        border: baseDesignTokens.standardTokens.light.foreground,
      },
      danger: {
        background: baseDesignTokens.standardTokens.light.danger,
        text: baseDesignTokens.standardTokens.light.background,
        border: baseDesignTokens.standardTokens.light.danger,
      },
      success: {
        background: baseDesignTokens.standardTokens.light.success,
        text: baseDesignTokens.standardTokens.light.background,
        border: baseDesignTokens.standardTokens.light.success,
      }
    }
    return variants[variant]
  }
  
  // 获取按钮尺寸
  const getButtonSize = () => {
    const sizes = {
      standard: {
        width: `${baseDesignTokens.sizing.hvac.button.minWidth}px`,   // 195px (Figma)
        height: `${baseDesignTokens.sizing.hvac.button.minHeight}px`, // 47px (Figma)
        fontSize: baseDesignTokens.typography.fontSize.sm,            // 15px
        padding: '12px 16px',
      },
      small: {
        width: '120px',
        height: '32px',
        fontSize: baseDesignTokens.typography.fontSize.xs,            // 12px
        padding: '8px 12px',
      },
      large: {
        width: '240px',
        height: '56px',
        fontSize: baseDesignTokens.typography.fontSize.base,          // 16px
        padding: '16px 24px',
      }
    }
    return sizes[size]
  }
  
  const colors = getVariantColors()
  const sizing = getButtonSize()
  
  // 按钮状态样式
  const getButtonState = () => {
    if (disabled) {
      return {
        background: `${colors.background}40`,  // 40% opacity
        text: `${colors.text}60`,             // 60% opacity
        border: `${colors.border}40`,         // 40% opacity
        cursor: 'not-allowed',
        transform: 'none',
        boxShadow: 'none',
      }
    }
    
    if (isPressed) {
      return {
        background: colors.background,
        text: colors.text,
        border: colors.border,
        cursor: 'pointer',
        transform: 'translateY(1px)',
        boxShadow: baseDesignTokens.shadows.widget.active,
      }
    }
    
    if (isHovered) {
      return {
        background: `${colors.background}E6`,  // 90% opacity
        text: colors.text,
        border: colors.border,
        cursor: 'pointer',
        transform: 'translateY(-1px)',
        boxShadow: baseDesignTokens.shadows.widget.hover,
      }
    }
    
    return {
      background: colors.background,
      text: colors.text,
      border: colors.border,
      cursor: 'pointer',
      transform: 'translateY(0)',
      boxShadow: baseDesignTokens.shadows.widget.default,
    }
  }
  
  const buttonState = getButtonState()
  
  const buttonStyle: React.CSSProperties = {
    // 基础样式
    width: sizing.width,
    height: sizing.height,
    padding: sizing.padding,
    
    // 外观
    backgroundColor: buttonState.background,
    color: buttonState.text,
    border: `2px solid ${buttonState.border}`,
    borderRadius: baseDesignTokens.borderRadius.pill,  // 103px (Figma胶囊形)
    
    // 字体
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    fontSize: sizing.fontSize,
    fontWeight: baseDesignTokens.typography.fontWeight.medium,
    textAlign: 'center',
    
    // 交互
    cursor: buttonState.cursor,
    transform: buttonState.transform,
    boxShadow: buttonState.boxShadow,
    
    // 动画
    transition: `all ${baseDesignTokens.animation.duration.fast}ms ${baseDesignTokens.animation.easing.easeOut}`,
    
    // Flexbox for icon + text
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon ? '8px' : '0',
    
    // 禁用选择
    userSelect: 'none',
    outline: 'none',
    
    // 用户自定义样式
    ...style,
  }
  
  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true)
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsPressed(false)
  }
  
  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true)
    }
  }
  
  const handleMouseUp = () => {
    setIsPressed(false)
  }
  
  const handleClick = (event: React.MouseEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
      onInteraction?.('button_click', { label, variant, position })
    }
  }
  
  const renderButtonContent = () => {
    if (loading) {
      return <span>Loading...</span>  // 可以替换为加载动画
    }
    
    if (icon && iconPosition === 'left') {
      return (
        <>
          <span style={{ fontSize: '16px' }}>{icon}</span>
          <span>{label}</span>
        </>
      )
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <>
          <span>{label}</span>
          <span style={{ fontSize: '16px' }}>{icon}</span>
        </>
      )
    }
    
    return <span>{label}</span>
  }
  
  return (
    <SlotContainer
      position={position}
      className={className}
      onInteraction={onInteraction}
      {...props}
    >
      <button
        style={buttonStyle}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        data-component="button-control"
        data-variant={variant}
        data-size={size}
        data-position={position}
      >
        {renderButtonContent()}
      </button>
    </SlotContainer>
  )
}

export default ButtonControlLayout