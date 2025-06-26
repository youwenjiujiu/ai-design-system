/**
 * Layer 1 下拉框基础组件
 * 
 * 职责：
 * - 提供无样式的下拉框基础设施
 * - 基于 Figma Dropdown 组件规范
 * - 集成设计令牌系统
 * - 支持所有交互状态和可访问性
 */

import React from 'react'
import { dropdownTokens } from './design-tokens-simple'

// 导出下拉框相关类型
export type DropdownSize = keyof typeof dropdownTokens.sizes
export type DropdownVariant = keyof typeof dropdownTokens.variants
export type DropdownState = 'default' | 'hover' | 'focus' | 'disabled' | 'error'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface DropdownProps {
  /** 下拉框尺寸 */
  size?: DropdownSize
  /** 下拉框变体 */
  variant?: DropdownVariant
  /** 下拉框状态 */
  state?: DropdownState
  /** 是否全宽 */
  fullWidth?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 占位文本 */
  placeholder?: string
  /** 选项列表 */
  options: DropdownOption[]
  /** 当前值 */
  value?: string
  /** 默认值 */
  defaultValue?: string
  /** 值变化回调 */
  onChange?: (value: string) => void
  /** 下拉图标 */
  dropdownIcon?: React.ReactNode
  /** 错误信息 */
  error?: string
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

/**
 * Layer 1 基础下拉框组件
 * 基于设计令牌的无样式下拉框基础设施
 */
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    size = 'md',
    variant = 'default',
    state = 'default',
    fullWidth = false,
    disabled = false,
    placeholder = '请选择...',
    options = [],
    value,
    defaultValue,
    onChange,
    dropdownIcon,
    error,
    className = '',
    style,
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value || defaultValue || '')
    const [currentState, setCurrentState] = React.useState<DropdownState>(state)
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    // 状态管理
    React.useEffect(() => {
      if (disabled) {
        setCurrentState('disabled')
      } else if (error) {
        setCurrentState('error')
      } else {
        setCurrentState(state)
      }
    }, [state, disabled, error])

    // 受控组件值同步
    React.useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value)
      }
    }, [value])

    // 点击外部关闭下拉框
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
          setCurrentState(disabled ? 'disabled' : error ? 'error' : 'default')
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [disabled, error])

    // 获取设计令牌
    const sizeTokens = dropdownTokens.sizes[size]
    const variantTokens = dropdownTokens.variants[variant]
    const stateTokens = currentState !== 'default' ? dropdownTokens.states[currentState as keyof typeof dropdownTokens.states] : {}

    // 查找当前选中项
    const selectedOption = options.find(option => option.value === currentValue)
    const displayText = selectedOption?.label || placeholder

    // 构建主容器样式
    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'inherit',
      ...style,
    }

    // 构建下拉框样式
    const dropdownStyle: React.CSSProperties = {
      // 基础样式
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      transition: 'all 0.2s ease-in-out',
      userSelect: 'none',
      
      // 尺寸令牌
      height: sizeTokens.height,
      padding: sizeTokens.padding,
      fontSize: sizeTokens.fontSize,
      borderRadius: sizeTokens.borderRadius,
      
      // 变体令牌
      backgroundColor: variantTokens.background,
      border: variantTokens.border,
      color: variantTokens.color,
      boxShadow: variantTokens.shadow,
      
      // 状态令牌
      opacity: stateTokens.opacity,
      borderColor: currentState === 'error' ? stateTokens.borderColor : undefined,
      outline: currentState === 'focus' ? stateTokens.outline : undefined,
    }

    // 构建下拉菜单样式
    const menuStyle: React.CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '4px',
      backgroundColor: dropdownTokens.menu.background,
      border: dropdownTokens.menu.border,
      borderRadius: dropdownTokens.menu.borderRadius,
      boxShadow: dropdownTokens.menu.shadow,
      maxHeight: dropdownTokens.menu.maxHeight,
      overflowY: 'auto',
      zIndex: dropdownTokens.menu.zIndex,
    }

    // 处理值变化
    const handleOptionSelect = (optionValue: string) => {
      if (disabled) return
      
      setCurrentValue(optionValue)
      setIsOpen(false)
      setCurrentState('default')
      onChange?.(optionValue)
    }

    // 处理下拉框点击
    const handleDropdownClick = () => {
      if (disabled) return
      
      setIsOpen(!isOpen)
      setCurrentState(isOpen ? 'default' : 'focus')
    }

    // 处理键盘导航
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return

      switch (event.key) {
        case 'Enter':
        case 'Space':
          event.preventDefault()
          setIsOpen(!isOpen)
          break
        case 'Escape':
          setIsOpen(false)
          setCurrentState('default')
          break
        case 'ArrowDown':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setCurrentState('focus')
          }
          break
        case 'ArrowUp':
          event.preventDefault()
          if (!isOpen) {
            setIsOpen(true)
            setCurrentState('focus')
          }
          break
      }
    }

    // 默认下拉图标
    const defaultDropdownIcon = (
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none"
        style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out'
        }}
      >
        <path 
          d="M4 6L8 10L12 6" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    )

    const combinedClassName = [
      'ui-dropdown',
      `ui-dropdown--${size}`,
      `ui-dropdown--${variant}`,
      `ui-dropdown--${currentState}`,
      isOpen && 'ui-dropdown--open',
      fullWidth && 'ui-dropdown--full-width',
      className
    ].filter(Boolean).join(' ')

    return (
      <div 
        ref={dropdownRef}
        style={containerStyle}
        className={combinedClassName}
      >
        {/* 下拉框主体 */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          style={dropdownStyle}
          onClick={handleDropdownClick}
          onKeyDown={handleKeyDown}
          className="ui-dropdown__trigger"
        >
          {/* 内容区域 */}
          <span 
            className="ui-dropdown__content"
            style={{ 
              flex: 1, 
              textAlign: 'left',
              color: selectedOption ? variantTokens.color : `${variantTokens.color}80`,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {selectedOption?.icon && (
              <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                {selectedOption.icon}
              </span>
            )}
            {displayText}
          </span>
          
          {/* 下拉图标 */}
          <span className="ui-dropdown__icon" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
            {dropdownIcon || defaultDropdownIcon}
          </span>
        </div>

        {/* 下拉菜单 */}
        {isOpen && (
          <div
            role="listbox"
            style={menuStyle}
            className="ui-dropdown__menu"
          >
            {options.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === currentValue}
                style={{
                  padding: dropdownTokens.option.padding,
                  fontSize: dropdownTokens.option.fontSize,
                  color: option.disabled ? `${dropdownTokens.option.color}50` : dropdownTokens.option.color,
                  backgroundColor: option.value === currentValue 
                    ? dropdownTokens.option.selectedBackground 
                    : 'transparent',
                  cursor: option.disabled ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'background-color 0.15s ease-in-out',
                }}
                className="ui-dropdown__option"
                onClick={() => !option.disabled && handleOptionSelect(option.value)}
                onMouseEnter={(e) => {
                  if (!option.disabled && option.value !== currentValue) {
                    e.currentTarget.style.backgroundColor = dropdownTokens.option.hoverBackground
                  }
                }}
                onMouseLeave={(e) => {
                  if (!option.disabled && option.value !== currentValue) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                {option.icon && (
                  <span style={{ marginRight: '8px', display: 'inline-flex', alignItems: 'center' }}>
                    {option.icon}
                  </span>
                )}
                {option.label}
              </div>
            ))}
            
            {options.length === 0 && (
              <div
                style={{
                  padding: dropdownTokens.option.padding,
                  fontSize: dropdownTokens.option.fontSize,
                  color: `${dropdownTokens.option.color}60`,
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}
                className="ui-dropdown__empty"
              >
                暂无选项
              </div>
            )}
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div
            style={{
              marginTop: '4px',
              fontSize: '12px',
              color: dropdownTokens.states.error.borderColor,
            }}
            className="ui-dropdown__error"
          >
            {error}
          </div>
        )}
      </div>
    )
  }
)

Dropdown.displayName = 'Dropdown'

// 基础下拉框组合函数
export const createDropdown = (defaultProps: Partial<DropdownProps>) => {
  return React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => (
    <Dropdown ref={ref} {...defaultProps} {...props} />
  ))
}

export default Dropdown