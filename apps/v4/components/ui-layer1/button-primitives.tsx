/**
 * Layer 1 按钮基础组件
 * 
 * 职责：
 * - 提供无样式的按钮基础设施
 * - 集成设计令牌系统
 * - 支持所有交互状态（hover, pressed, disabled, loading）
 * - 不包含业务语义，只有视觉和交互基础
 */

import React from 'react'
import { buttonTokens } from './design-tokens-simple'

// 导出按钮相关类型
export type ButtonSize = keyof typeof buttonTokens.sizes
export type ButtonVariant = keyof typeof buttonTokens.variants
export type ButtonState = 'default' | 'hover' | 'pressed' | 'disabled' | 'loading'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 按钮变体 */
  variant?: ButtonVariant
  /** 按钮状态 */
  state?: ButtonState
  /** 是否全宽 */
  fullWidth?: boolean
  /** 是否显示加载状态 */
  loading?: boolean
  /** 左侧图标 */
  startIcon?: React.ReactNode
  /** 右侧图标 */
  endIcon?: React.ReactNode
  /** 子元素 */
  children?: React.ReactNode
}

/**
 * Layer 1 基础按钮组件
 * 基于设计令牌的无样式按钮基础设施
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    size = 'md',
    variant = 'primary',
    state = 'default',
    fullWidth = false,
    loading = false,
    startIcon,
    endIcon,
    disabled,
    className = '',
    style,
    children,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...props 
  }, ref) => {
    const [currentState, setCurrentState] = React.useState<ButtonState>(state)
    
    // 状态管理
    React.useEffect(() => {
      if (loading) {
        setCurrentState('loading')
      } else if (disabled) {
        setCurrentState('disabled')
      } else {
        setCurrentState(state)
      }
    }, [state, loading, disabled])

    // 获取设计令牌
    const sizeTokens = buttonTokens.sizes[size]
    const variantTokens = buttonTokens.variants[variant]
    const stateTokens = currentState !== 'default' ? buttonTokens.states[currentState as keyof typeof buttonTokens.states] : {}

    // 构建样式
    const buttonStyle: React.CSSProperties = {
      // 基础样式
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: 'inherit',
      fontWeight: '500',
      textDecoration: 'none',
      outline: 'none',
      border: variantTokens.border,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease-in-out',
      userSelect: 'none',
      
      // 尺寸令牌
      height: sizeTokens.height,
      padding: sizeTokens.padding,
      fontSize: sizeTokens.fontSize,
      borderRadius: sizeTokens.borderRadius,
      
      // 变体令牌
      backgroundColor: variantTokens.background,
      color: variantTokens.color,
      boxShadow: variantTokens.shadow,
      
      // 状态令牌
      opacity: stateTokens.opacity,
      transform: stateTokens.transform,
      
      // 全宽
      width: fullWidth ? '100%' : 'auto',
      
      // 自定义样式
      ...style,
    }

    // 交互处理
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading && currentState === 'default') {
        setCurrentState('hover')
      }
      onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        setCurrentState('default')
      }
      onMouseLeave?.(e)
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        setCurrentState('pressed')
      }
      onMouseDown?.(e)
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        setCurrentState('hover')
      }
      onMouseUp?.(e)
    }

    const combinedClassName = [
      'ui-button',
      `ui-button--${size}`,
      `ui-button--${variant}`,
      `ui-button--${currentState}`,
      fullWidth && 'ui-button--full-width',
      loading && 'ui-button--loading',
      className
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        style={buttonStyle}
        className={combinedClassName}
        disabled={disabled || loading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {loading && (
          <div 
            style={{ 
              width: 16, 
              height: 16, 
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
        )}
        
        {!loading && startIcon && (
          <span className="ui-button__start-icon">
            {startIcon}
          </span>
        )}
        
        {children && (
          <span className="ui-button__content">
            {children}
          </span>
        )}
        
        {!loading && endIcon && (
          <span className="ui-button__end-icon">
            {endIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

// 基础按钮组合函数
export const createButton = (defaultProps: Partial<ButtonProps>) => {
  return React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button ref={ref} {...defaultProps} {...props} />
  ))
}

export default Button