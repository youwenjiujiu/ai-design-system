/**
 * 自动验证系统 - Layer 2
 * 
 * 通过React开发者工具和全局监听自动触发验证
 * 无需手动添加装饰器或Hook
 */

import React from 'react'
import { ComponentCompositionValidator, type ValidationContext } from './component-validation'

// ===========================================
// 全局验证监听器
// ===========================================

class AutoValidationSystem {
  private static instance: AutoValidationSystem
  private validator: ComponentCompositionValidator
  private isEnabled: boolean = false
  private observer: MutationObserver | null = null
  private validatedComponents = new Set<string>()

  private constructor() {
    this.validator = new ComponentCompositionValidator()
  }

  static getInstance(): AutoValidationSystem {
    if (!AutoValidationSystem.instance) {
      AutoValidationSystem.instance = new AutoValidationSystem()
    }
    return AutoValidationSystem.instance
  }

  /**
   * 启动自动验证系统
   */
  start() {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
      return
    }

    this.isEnabled = true
    this.setupReactDevToolsHook()
    this.setupDOMObserver()
    this.setupComponentTracking()
    
    console.log('🔍 Layer 2 自动验证系统已启动')
  }

  /**
   * 停止自动验证系统
   */
  stop() {
    this.isEnabled = false
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    console.log('⏹️ Layer 2 自动验证系统已停止')
  }

  /**
   * 设置React DevTools钩子
   */
  private setupReactDevToolsHook() {
    // 监听React组件渲染
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
      
      // 监听fiber节点创建
      const originalOnCommitFiberRoot = hook.onCommitFiberRoot
      hook.onCommitFiberRoot = (id: any, root: any, ...args: any[]) => {
        if (originalOnCommitFiberRoot) {
          originalOnCommitFiberRoot.call(hook, id, root, ...args)
        }
        
        // 在commit阶段验证组件
        this.validateFiberTree(root.current)
      }
    }
  }

  /**
   * 设置DOM观察器
   */
  private setupDOMObserver() {
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.validateDOMNode(node as Element)
          }
        })
      })
    })

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-testid', 'class', 'data-theme', 'data-size']
    })
  }

  /**
   * 设置组件追踪
   */
  private setupComponentTracking() {
    // 劫持React.createElement来追踪组件创建
    const originalCreateElement = React.createElement
    
    React.createElement = function(type: any, props: any, ...children: any[]) {
      const element = originalCreateElement.call(this, type, props, ...children)
      
      // 如果是我们关心的组件，进行验证
      if (AutoValidationSystem.getInstance().shouldValidateComponent(type, props)) {
        setTimeout(() => {
          AutoValidationSystem.getInstance().validateReactElement(type, props, children)
        }, 0)
      }
      
      return element
    }
  }

  /**
   * 验证Fiber树
   */
  private validateFiberTree(fiber: any) {
    if (!this.isEnabled || !fiber) return

    try {
      // 检查是否是我们关心的组件
      if (this.shouldValidateFiber(fiber)) {
        this.validateFiberNode(fiber)
      }

      // 递归检查子节点
      let child = fiber.child
      while (child) {
        this.validateFiberTree(child)
        child = child.sibling
      }
    } catch (error) {
      console.warn('Fiber验证错误:', error)
    }
  }

  /**
   * 验证DOM节点
   */
  private validateDOMNode(node: Element) {
    if (!this.isEnabled) return

    // 检查是否是图表组件
    const classList = Array.from(node.classList)
    const isChartComponent = classList.some(cls => 
      cls.includes('chart') || 
      cls.includes('hvac') ||
      cls.includes('donut') ||
      cls.includes('bar') ||
      cls.includes('line')
    )

    if (isChartComponent) {
      this.validateDOMElement(node)
    }
  }

  /**
   * 判断是否应该验证组件
   */
  private shouldValidateComponent(type: any, props: any): boolean {
    if (!type) return false

    const componentName = type.displayName || type.name || ''
    
    // 验证我们的HVAC和图表组件
    const targetComponents = [
      'DonutChart', 'BarChart', 'LineChart', 'ColumnChart', 'MultiRingChart',
      'EnergyReductionChart', 'PerformanceScoreChart', 'TemperatureRangeChart',
      'PlantConsumptionChart', 'FlowMonitoringChart', 'PowerMonitoringChart',
      'DualLineChart', 'RTEfficiencyChart', 'ChartFactory', 'ChartComposer',
      'HVACDashboardLayout', 'HVACControlPanel'
    ]

    return targetComponents.some(target => componentName.includes(target))
  }

  /**
   * 判断是否应该验证Fiber节点
   */
  private shouldValidateFiber(fiber: any): boolean {
    return fiber.type && this.shouldValidateComponent(fiber.type, fiber.memoizedProps)
  }

  /**
   * 验证React元素
   */
  private validateReactElement(type: any, props: any, children: any[]) {
    if (!this.isEnabled) return

    const componentName = type.displayName || type.name || 'Unknown'
    const componentKey = `${componentName}-${JSON.stringify(props)}`

    // 避免重复验证相同的组件实例
    if (this.validatedComponents.has(componentKey)) {
      return
    }

    const context: ValidationContext = {
      componentType: componentName,
      semantic: props?.semantic || 'default',
      theme: props?.theme || 'light',
      size: props?.size || 'md',
      props: props || {},
      children: children.length > 0 ? children : undefined
    }

    const report = this.validator.validateComposition(context)

    // 输出验证结果
    if (report.overallStatus === 'failed') {
      console.group(`🚨 [自动验证] ${componentName} 验证失败`)
      report.results.filter(r => !r.passed).forEach(result => {
        console.error(`❌ ${result.message}`)
        if (result.details) console.error(`   详情: ${result.details}`)
        if (result.suggestions) {
          console.error(`   建议: ${result.suggestions.join(', ')}`)
        }
      })
      console.groupEnd()
    } else if (report.overallStatus === 'warning') {
      console.group(`⚠️ [自动验证] ${componentName} 有警告`)
      report.results.filter(r => !r.passed).forEach(result => {
        console.warn(`⚠️ ${result.message}`)
        if (result.suggestions) {
          console.warn(`   建议: ${result.suggestions.join(', ')}`)
        }
      })
      console.groupEnd()
    } else {
      console.log(`✅ [自动验证] ${componentName} 验证通过`)
    }

    // 记录已验证的组件
    this.validatedComponents.add(componentKey)

    // 定期清理缓存
    if (this.validatedComponents.size > 100) {
      this.validatedComponents.clear()
    }
  }

  /**
   * 验证Fiber节点
   */
  private validateFiberNode(fiber: any) {
    if (!fiber.type || !fiber.memoizedProps) return

    this.validateReactElement(fiber.type, fiber.memoizedProps, [])
  }

  /**
   * 验证DOM元素
   */
  private validateDOMElement(element: Element) {
    const theme = element.getAttribute('data-theme') || 
                 (element.classList.contains('dark') ? 'dark' : 'light')
    const size = element.getAttribute('data-size') || 'md'
    
    // 基于DOM属性进行基础验证
    const context: ValidationContext = {
      componentType: 'DOMElement',
      semantic: 'default',
      theme: theme as any,
      size: size as any,
      props: {
        className: element.className,
        style: (element as HTMLElement).style
      }
    }

    // 只做基础的DOM验证
    if (theme !== 'light' && theme !== 'dark') {
      console.warn(`🔍 [DOM验证] 无效主题: ${theme}`, element)
    }

    if (!['sm', 'md', 'lg'].includes(size)) {
      console.warn(`🔍 [DOM验证] 无效尺寸: ${size}`, element)
    }
  }
}

// ===========================================
// 自动启动系统
// ===========================================

// 在模块加载时自动启动
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // 等待React加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      AutoValidationSystem.getInstance().start()
    })
  } else {
    AutoValidationSystem.getInstance().start()
  }

  // 提供全局控制接口
  (window as any).__HVAC_VALIDATION__ = {
    start: () => AutoValidationSystem.getInstance().start(),
    stop: () => AutoValidationSystem.getInstance().stop(),
    validator: AutoValidationSystem.getInstance()
  }
}

// ===========================================
// React 错误边界集成
// ===========================================

interface ValidationErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ValidationErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ValidationErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ValidationErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 验证相关的错误特殊处理
    if (error.message.includes('验证') || error.message.includes('validation')) {
      console.group('🚨 [验证系统] 组件验证错误')
      console.error('错误:', error)
      console.error('错误信息:', errorInfo)
      console.groupEnd()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '16px', 
          border: '2px solid red', 
          borderRadius: '4px',
          backgroundColor: '#ffeaea'
        }}>
          <h3>⚠️ 组件验证错误</h3>
          <p>组件验证过程中发生错误，请检查控制台输出。</p>
          <details>
            <summary>错误详情</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

// ===========================================
// 导出
// ===========================================

export { AutoValidationSystem }
export default AutoValidationSystem

// 类型声明扩展
declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any
    __HVAC_VALIDATION__?: {
      start: () => void
      stop: () => void
      validator: AutoValidationSystem
    }
  }
}