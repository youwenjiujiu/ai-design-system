/**
 * Layer 2: 组件组合验证系统
 * 
 * 作为Layer 2的一部分，提供组件组合的验证功能：
 * - 验证组件组合的正确性和一致性
 * - 检查设计令牌的使用是否符合规范
 * - 验证业务语义映射是否正确
 * - 提供组件组合的类型安全检查
 */

import React from 'react'
import { businessMappingUtils } from './business-mapping'
import { chartTokens, businessMapping, type ChartSemantic, type Theme, type ChartSize } from '../ui-layer1/design-tokens-simple'
import { type AIIntentType, type HVACComponent, type HVACStatus } from './hvac-types'

// ===========================================
// 验证规则类型定义
// ===========================================

export interface ValidationRule {
  id: string
  name: string
  description: string
  category: 'semantic' | 'layout' | 'interaction' | 'accessibility'
  severity: 'error' | 'warning' | 'info'
  validator: (context: ValidationContext) => ValidationResult
}

export interface ValidationContext {
  componentType: string
  semantic: ChartSemantic
  theme: Theme
  size: ChartSize
  props: Record<string, any>
  children?: React.ReactNode
  metadata?: Record<string, any>
}

export interface ValidationResult {
  passed: boolean
  message: string
  details?: string
  suggestions?: string[]
}

export interface ValidationReport {
  componentId: string
  timestamp: Date
  overallStatus: 'passed' | 'warning' | 'failed'
  results: Array<ValidationResult & { ruleId: string }>
  metrics: {
    totalRules: number
    passedRules: number
    warningRules: number
    failedRules: number
  }
}

// ===========================================
// Layer 2 核心验证规则
// ===========================================

export const layer2ValidationRules: ValidationRule[] = [
  // 组合语义验证
  {
    id: 'composition-semantic-consistency',
    name: '组合语义一致性',
    description: '检查组件组合是否符合业务语义',
    category: 'semantic',
    severity: 'error',
    validator: (context) => {
      const { componentType, semantic } = context
      
      // 检查是否在业务映射中有对应的语义
      const isValidSemantic = Object.keys(businessMapping).includes(semantic)
      
      if (!isValidSemantic) {
        return {
          passed: false,
          message: `组合语义 "${semantic}" 未在业务映射中定义`,
          details: `组件类型: ${componentType}`,
          suggestions: [
            '检查 business-mapping.ts 中的语义定义',
            '确保组合语义与业务意图匹配'
          ]
        }
      }
      
      return {
        passed: true,
        message: '组合语义一致性验证通过'
      }
    }
  },
  
  // 设计令牌一致性验证
  {
    id: 'design-token-consistency',
    name: '设计令牌一致性',
    description: '验证组合中设计令牌使用的一致性',
    category: 'semantic',
    severity: 'warning',
    validator: (context) => {
      const { semantic, theme, size, props } = context
      
      // 检查尺寸令牌
      const sizeTokens = chartTokens.sizes[size]
      if (!sizeTokens) {
        return {
          passed: false,
          message: `尺寸令牌 "${size}" 在设计系统中不存在`,
          suggestions: ['使用标准尺寸: sm, md, lg']
        }
      }
      
      // 检查主题一致性
      if (props.children && React.Children.count(props.children) > 0) {
        // 如果有子组件，检查主题传递
        let hasInconsistentTheme = false
        React.Children.forEach(props.children, (child) => {
          if (React.isValidElement(child) && child.props.theme && child.props.theme !== theme) {
            hasInconsistentTheme = true
          }
        })
        
        if (hasInconsistentTheme) {
          return {
            passed: false,
            message: '组合中存在主题不一致的子组件',
            suggestions: ['确保所有子组件使用相同的主题']
          }
        }
      }
      
      return {
        passed: true,
        message: '设计令牌一致性验证通过'
      }
    }
  },
  
  // 组合布局验证
  {
    id: 'composition-layout-constraints',
    name: '组合布局约束',
    description: '验证组件组合的布局是否合理',
    category: 'layout',
    severity: 'warning',
    validator: (context) => {
      const { componentType, size, props } = context
      
      // 检查网格布局的合理性
      if (componentType.includes('Grid') || props.columns) {
        const columns = props.columns || 1
        if (columns > 4 && size === 'sm') {
          return {
            passed: false,
            message: '小尺寸组件不适合使用过多列的网格布局',
            suggestions: ['减少列数或使用更大的尺寸']
          }
        }
        
        if (columns > 6) {
          return {
            passed: false,
            message: '网格列数过多可能影响可读性',
            suggestions: ['考虑使用更少的列或分页显示']
          }
        }
      }
      
      // 检查组合深度
      if (props.children) {
        const childrenDepth = getComponentDepth(props.children)
        if (childrenDepth > 5) {
          return {
            passed: false,
            message: '组件嵌套层级过深',
            details: `当前层级: ${childrenDepth}`,
            suggestions: ['简化组件结构，减少嵌套层级']
          }
        }
      }
      
      return {
        passed: true,
        message: '组合布局约束验证通过'
      }
    }
  },
  
  // 交互一致性验证
  {
    id: 'interaction-consistency',
    name: '交互一致性',
    description: '验证组合中交互行为的一致性',
    category: 'interaction',
    severity: 'info',
    validator: (context) => {
      const { props } = context
      const warnings: string[] = []
      
      // 检查事件处理器命名一致性
      const eventHandlers = Object.keys(props).filter(key => key.startsWith('on'))
      const inconsistentHandlers = eventHandlers.filter(handler => {
        // 检查是否遵循标准命名规范
        return !handler.match(/^on[A-Z][a-zA-Z]*$/)
      })
      
      if (inconsistentHandlers.length > 0) {
        warnings.push(`事件处理器命名不规范: ${inconsistentHandlers.join(', ')}`)
      }
      
      // 检查是否提供了必要的交互反馈
      if (props.onClick && !props.onHover && !props.onFocus && !props.onMouseEnter && !props.onMouseLeave) {
        warnings.push('提供了点击交互但缺少悬停或焦点反馈 (推荐添加 onHover, onFocus, onMouseEnter, onMouseLeave)')
      }
      
      // 检查图表组件的交互一致性
      const isChartComponent = context.componentType.toLowerCase().includes('chart')
      if (isChartComponent) {
        if (!props.onDataClick && !props.onClick) {
          warnings.push('图表组件建议提供数据交互回调 (onDataClick 或 onClick)')
        }
        if (!props.onDataHover && !props.onHover && !props.onMouseEnter) {
          warnings.push('图表组件建议提供悬停反馈 (onDataHover, onHover, 或 onMouseEnter)')
        }
      }
      
      if (warnings.length > 0) {
        return {
          passed: false,
          message: '交互一致性检查发现问题',
          details: warnings.join('; '),
          suggestions: [
            '遵循标准的事件处理器命名规范',
            '提供完整的交互反馈机制'
          ]
        }
      }
      
      return {
        passed: true,
        message: '交互一致性验证通过'
      }
    }
  },
  
  // 可访问性基础验证
  {
    id: 'accessibility-basics',
    name: '可访问性基础',
    description: '检查组合的基本可访问性要求',
    category: 'accessibility',
    severity: 'warning',
    validator: (context) => {
      const { props } = context
      const issues: string[] = []
      
      // 检查是否有合适的标签
      if (!props['aria-label'] && !props['aria-labelledby'] && !props.title && !props['aria-describedby']) {
        issues.push('缺少可访问性标签 (推荐添加 aria-label, aria-labelledby, title, 或 aria-describedby)')
      }
      
      // 检查键盘导航支持
      if (props.onClick && !props.onKeyDown && !props.tabIndex && props.tabIndex !== 0) {
        issues.push('可点击元素缺少键盘访问支持 (推荐添加 tabIndex 和 onKeyDown)')
      }
      
      // 图表组件特殊检查
      const isChartComponent = context.componentType.toLowerCase().includes('chart')
      if (isChartComponent) {
        if (!props.role && !props['aria-label']) {
          issues.push('图表组件建议添加 role="img" 和描述性的 aria-label')
        }
        if (!props['aria-describedby'] && !props['aria-description']) {
          issues.push('图表组件建议添加数据描述 (aria-describedby 或 aria-description)')
        }
      }
      
      // 检查颜色对比度（基础检查）
      if (props.style?.color && props.style?.backgroundColor) {
        // 这里可以添加颜色对比度计算逻辑
        // 为简化，只做基本检查
        if (props.style.color === props.style.backgroundColor) {
          issues.push('前景色与背景色相同，影响可读性')
        }
      }
      
      if (issues.length > 0) {
        return {
          passed: false,
          message: '可访问性检查发现问题',
          details: issues.join('; '),
          suggestions: [
            '添加适当的 aria-label 或 title 属性',
            '为交互元素添加键盘支持',
            '检查颜色对比度是否符合 WCAG 标准'
          ]
        }
      }
      
      return {
        passed: true,
        message: '可访问性基础验证通过'
      }
    }
  }
]

// ===========================================
// 辅助函数
// ===========================================

function getComponentDepth(children: React.ReactNode, currentDepth = 1): number {
  let maxDepth = currentDepth
  
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props.children) {
      const childDepth = getComponentDepth(child.props.children, currentDepth + 1)
      maxDepth = Math.max(maxDepth, childDepth)
    }
  })
  
  return maxDepth
}

// ===========================================
// Layer 2 组件验证器
// ===========================================

export class ComponentCompositionValidator {
  private rules: ValidationRule[]
  
  constructor(customRules: ValidationRule[] = []) {
    this.rules = [...layer2ValidationRules, ...customRules]
  }
  
  /**
   * 验证组件组合
   */
  validateComposition(context: ValidationContext): ValidationReport {
    const results = this.rules.map(rule => {
      try {
        const result = rule.validator(context)
        return {
          ...result,
          ruleId: rule.id
        }
      } catch (error) {
        return {
          passed: false,
          message: `验证规则 "${rule.name}" 执行失败`,
          details: error instanceof Error ? error.message : String(error),
          ruleId: rule.id
        }
      }
    })
    
    // 计算指标
    const passedRules = results.filter(r => r.passed).length
    const failedRules = results.filter(r => !r.passed).length
    const warningRules = results.filter(r => {
      const rule = this.rules.find(rule => rule.id === r.ruleId)
      return !r.passed && rule?.severity === 'warning'
    }).length
    
    // 确定整体状态
    const hasErrors = results.some(r => {
      const rule = this.rules.find(rule => rule.id === r.ruleId)
      return !r.passed && rule?.severity === 'error'
    })
    
    const hasWarnings = results.some(r => {
      const rule = this.rules.find(rule => rule.id === r.ruleId)
      return !r.passed && rule?.severity === 'warning'
    })
    
    const overallStatus = hasErrors ? 'failed' : hasWarnings ? 'warning' : 'passed'
    
    return {
      componentId: `${context.componentType}-${Date.now()}`,
      timestamp: new Date(),
      overallStatus,
      results,
      metrics: {
        totalRules: this.rules.length,
        passedRules,
        warningRules,
        failedRules
      }
    }
  }
}

// ===========================================
// 验证装饰器 (Layer 2)
// ===========================================

/**
 * Layer 2 组合验证装饰器
 */
export function withCompositionValidation<P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>,
  validationRules?: ValidationRule[]
) {
  const validator = new ComponentCompositionValidator(validationRules)
  
  return React.forwardRef<any, P>((props, ref) => {
    const context: ValidationContext = {
      componentType: WrappedComponent.displayName || WrappedComponent.name || 'Unknown',
      semantic: (props as any).semantic || 'default',
      theme: (props as any).theme || 'light',
      size: (props as any).size || 'md',
      props: props as Record<string, any>,
      children: (props as any).children
    }
    
    // 在开发模式下执行验证
    if (process.env.NODE_ENV === 'development') {
      const report = validator.validateComposition(context)
      
      // 输出验证结果到控制台
      if (report.overallStatus === 'failed') {
        console.error(`[Layer 2 组合验证] ${context.componentType} 验证失败:`, report)
      } else if (report.overallStatus === 'warning') {
        console.warn(`[Layer 2 组合验证] ${context.componentType} 有警告:`, report)
      }
    }
    
    return <WrappedComponent {...props} ref={ref} />
  })
}

/**
 * Layer 2 实时验证Hook
 */
export function useCompositionValidation(
  componentType: string,
  props: Record<string, any>,
  customRules?: ValidationRule[]
): ValidationReport | null {
  const [report, setReport] = React.useState<ValidationReport | null>(null)
  
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const validator = new ComponentCompositionValidator(customRules)
      const context: ValidationContext = {
        componentType,
        semantic: props.semantic || 'default',
        theme: props.theme || 'light',
        size: props.size || 'md',
        props,
        children: props.children
      }
      
      const validationReport = validator.validateComposition(context)
      setReport(validationReport)
    }
  }, [componentType, props, customRules])
  
  return report
}

// ===========================================
// 导出
// ===========================================

export {
  ComponentCompositionValidator,
  layer2ValidationRules
}

export type {
  ValidationRule,
  ValidationContext, 
  ValidationResult,
  ValidationReport
}