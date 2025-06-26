/**
 * Layer 3: 组件组合生成器
 * 
 * 根据AI意图生成相应的UI组件组合
 */

import { 
  type IntentContext,
  type ComponentComposition,
  type ComponentSpec,
  type LayoutConfig,
  type DataConfig,
  type DataQuery,
  type UserIntent
} from './intent-types'
import { businessMappingUtils } from '../ui-layer2/business-mapping'

// ===========================================
// 组合生成规则
// ===========================================

interface CompositionRule {
  intent: UserIntent
  entityCombinations: string[]
  generator: (context: IntentContext) => ComponentComposition
  priority: number
}

export class CompositionGenerator {
  private rules: CompositionRule[]

  constructor() {
    this.rules = this.initializeRules()
  }

  /**
   * 根据意图上下文生成组件组合
   */
  generateComposition(context: IntentContext): ComponentComposition {
    // 找到匹配的规则
    const matchingRules = this.findMatchingRules(context)
    
    if (matchingRules.length === 0) {
      return this.generateDefaultComposition(context)
    }

    // 使用优先级最高的规则
    const bestRule = matchingRules.sort((a, b) => b.priority - a.priority)[0]
    
    try {
      return bestRule.generator(context)
    } catch (error) {
      console.warn('组合生成失败，使用默认组合:', error)
      return this.generateDefaultComposition(context)
    }
  }

  /**
   * 初始化组合生成规则
   */
  private initializeRules(): CompositionRule[] {
    return [
      // 温度监控专用界面 (新增 - 最高优先级)
      {
        intent: 'temperature_check',
        entityCombinations: ['metric'],  // 只需要metric实体即可
        priority: 11,
        generator: (context) => this.generateTemperatureMonitor(context)
      },

      // 显示单个设备数据
      {
        intent: 'show_data',
        entityCombinations: ['device', 'metric'],
        priority: 10,
        generator: (context) => this.generateSingleDeviceDisplay(context)
      },

      // 显示多个设备对比
      {
        intent: 'compare_metrics',
        entityCombinations: ['device', 'metric'],
        priority: 9,
        generator: (context) => this.generateComparisonDisplay(context)
      },

      // 性能分析仪表板
      {
        intent: 'analyze_performance',
        entityCombinations: ['device', 'metric'],
        priority: 8,
        generator: (context) => this.generatePerformanceDashboard(context)
      },

      // 状态监控面板
      {
        intent: 'monitor_status',
        entityCombinations: ['device', 'location'],
        priority: 8,
        generator: (context) => this.generateStatusMonitor(context)
      },

      // 设备控制界面
      {
        intent: 'control_equipment',
        entityCombinations: ['device', 'action'],
        priority: 9,
        generator: (context) => this.generateControlInterface(context)
      },

      // 故障排查界面
      {
        intent: 'troubleshoot',
        entityCombinations: ['device', 'status'],
        priority: 8,
        generator: (context) => this.generateTroubleshootInterface(context)
      },

      // 系统优化建议
      {
        intent: 'optimize_system',
        entityCombinations: ['device', 'metric'],
        priority: 7,
        generator: (context) => this.generateOptimizationInterface(context)
      },

      // 报告生成界面
      {
        intent: 'generate_report',
        entityCombinations: ['metric', 'time'],
        priority: 7,
        generator: (context) => this.generateReportInterface(context)
      },

      // 趋势预测界面
      {
        intent: 'predict_trend',
        entityCombinations: ['metric', 'time'],
        priority: 7,
        generator: (context) => this.generateTrendPrediction(context)
      },

      // 概念解释界面
      {
        intent: 'explain_concept',
        entityCombinations: ['parameter', 'metric'],
        priority: 6,
        generator: (context) => this.generateConceptExplanation(context)
      }
    ]
  }

  /**
   * 查找匹配的规则
   */
  private findMatchingRules(context: IntentContext): CompositionRule[] {
    const entityTypes = [...new Set(context.entities.map(e => e.type))]
    
    return this.rules.filter(rule => {
      // 意图匹配
      if (rule.intent !== context.intent) return false
      
      // 实体组合匹配
      return rule.entityCombinations.every(requiredType => 
        entityTypes.includes(requiredType as any)
      )
    })
  }

  /**
   * 生成温度监控专用界面
   */
  private generateTemperatureMonitor(context: IntentContext): ComponentComposition {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    const locationEntity = context.entities.find(e => e.type === 'location')
    
    return {
      primaryComponent: {
        type: 'TemperatureMonitor',
        props: {
          theme: 'light',
          size: 'md',
          device: deviceEntity?.value || 'HVAC System',
          showInternalTemperature: true
        },
        title: `${deviceEntity?.value || 'HVAC'} 温度监控`,
        description: 'HVAC系统内部温度监控 - 供水/回水温度',
        dataQuery: this.generateDeviceQuery(deviceEntity?.value || 'HVAC System', 'temperature')
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成单个设备显示组合
   */
  private generateSingleDeviceDisplay(context: IntentContext): ComponentComposition {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    const metricEntity = context.entities.find(e => e.type === 'metric')
    
    // 根据设备和指标类型选择组件
    const componentType = this.mapDeviceMetricToComponent(
      deviceEntity?.value || '',
      metricEntity?.value || ''
    )

    const componentSpec: ComponentSpec = {
      type: componentType,
      props: {
        size: 'md',
        theme: 'light',
        animated: true,
        showStatus: true
      },
      dataQuery: this.generateDataQuery(context),
      title: this.generateTitle(context),
      description: `${deviceEntity?.value || '设备'} ${metricEntity?.value || '数据'} 监控`
    }

    return {
      primaryComponent: componentSpec,
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成对比显示组合
   */
  private generateComparisonDisplay(context: IntentContext): ComponentComposition {
    const devices = context.entities.filter(e => e.type === 'device')
    const metrics = context.entities.filter(e => e.type === 'metric')

    // 生成多个组件进行对比
    const components: ComponentSpec[] = []
    
    if (devices.length > 1) {
      // 多设备对比
      devices.forEach(device => {
        components.push({
          type: 'PerformanceScoreChart',
          props: {
            size: 'sm',
            theme: 'light',
            showComparison: true
          },
          dataQuery: this.generateDeviceQuery(device.value, metrics[0]?.value),
          title: device.value
        })
      })
    } else if (metrics.length > 1) {
      // 多指标对比
      metrics.forEach(metric => {
        components.push({
          type: this.mapMetricToComponent(metric.value),
          props: {
            size: 'sm',
            theme: 'light'
          },
          dataQuery: this.generateMetricQuery(devices[0]?.value, metric.value),
          title: metric.value
        })
      })
    }

    return {
      primaryComponent: components[0],
      supportingComponents: components.slice(1),
      layout: this.generateLayout('comparison', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成性能分析仪表板
   */
  private generatePerformanceDashboard(context: IntentContext): ComponentComposition {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    const device = deviceEntity?.value || '系统'

    const components: ComponentSpec[] = [
      {
        type: 'PerformanceAnalysis', 
        props: { size: 'md', theme: 'light', device: device },
        title: `${device} Performance Analysis`,
        dataQuery: this.generateDeviceQuery(device, 'performance')
      },
      {
        type: 'TemperatureMonitor',
        props: { size: 'md', theme: 'light' },
        title: 'Temperature Monitoring',
        dataQuery: this.generateDeviceQuery(device, 'temperature')
      },
      {
        type: 'EnergyReductionChart',
        props: { size: 'lg', theme: 'light' },
        title: 'Energy Efficiency Analysis',
        dataQuery: this.generateDeviceQuery(device, 'energy')
      }
    ]

    return {
      primaryComponent: components[0],
      supportingComponents: components.slice(1),
      layout: this.generateLayout('dashboard', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成状态监控面板
   */
  private generateStatusMonitor(context: IntentContext): ComponentComposition {
    const locationEntity = context.entities.find(e => e.type === 'location')
    const location = locationEntity?.value || '全部区域'

    return {
      primaryComponent: {
        type: 'HVACDashboardLayout',
        props: {
          theme: 'light',
          size: 'lg',
          showLegends: true
        },
        title: `${location} 状态监控`,
        dataQuery: this.generateLocationQuery(location)
      },
      layout: this.generateLayout('dashboard', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成设备控制界面
   */
  private generateControlInterface(context: IntentContext): ComponentComposition {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    const actionEntity = context.entities.find(e => e.type === 'action')
    
    return {
      primaryComponent: {
        type: 'HVACControlPanel',
        props: {
          theme: 'light',
          size: 'lg',
          showControls: true,
          device: deviceEntity?.value,
          action: actionEntity?.value
        },
        title: `${deviceEntity?.value || '设备'} 控制`,
        description: `执行 ${actionEntity?.value || '操作'}`
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成故障排查界面
   */
  private generateTroubleshootInterface(context: IntentContext): ComponentComposition {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    
    return {
      primaryComponent: {
        type: 'AlertPanel',
        props: {
          theme: 'light',
          size: 'lg',
          device: deviceEntity?.value,
          showDiagnostics: true
        },
        title: '故障诊断',
        description: `${deviceEntity?.value || '设备'} 故障排查`
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成优化建议界面
   */
  private generateOptimizationInterface(context: IntentContext): ComponentComposition {
    return {
      primaryComponent: {
        type: 'EnergyEfficiency',
        props: {
          theme: 'light',
          size: 'lg',
          showRecommendations: true
        },
        title: '系统优化建议'
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成报告界面
   */
  private generateReportInterface(context: IntentContext): ComponentComposition {
    return {
      primaryComponent: {
        type: 'ChartFactory',
        props: {
          theme: 'light',
          size: 'lg',
          reportMode: true
        },
        title: '数据报告生成'
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成趋势预测界面
   */
  private generateTrendPrediction(context: IntentContext): ComponentComposition {
    const metricEntity = context.entities.find(e => e.type === 'metric')
    
    return {
      primaryComponent: {
        type: 'LineChart',
        props: {
          theme: 'light',
          size: 'lg',
          showPrediction: true,
          predictive: true
        },
        title: `${metricEntity?.value || '指标'} 趋势预测`
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成概念解释界面
   */
  private generateConceptExplanation(context: IntentContext): ComponentComposition {
    const conceptEntity = context.entities.find(e => e.type === 'parameter' || e.type === 'metric')
    
    return {
      primaryComponent: {
        type: 'ConceptExplainer',
        props: {
          theme: 'light',
          size: 'md',
          concept: conceptEntity?.value
        },
        title: '概念解释',
        description: `关于 ${conceptEntity?.value || '概念'} 的详细说明`
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 生成默认组合
   */
  private generateDefaultComposition(context: IntentContext): ComponentComposition {
    return {
      primaryComponent: {
        type: 'HVACChartsDemo',
        props: {
          theme: 'light',
          size: 'md'
        },
        title: 'HVAC 系统概览'
      },
      layout: this.generateLayout('single', context),
      dataConfig: this.generateDataConfig(context)
    }
  }

  /**
   * 映射设备和指标到组件类型
   */
  private mapDeviceMetricToComponent(device: string, metric: string): string {
    // 使用Layer 2的业务映射
    const businessConcept = this.mapToBusinessConcept(device, metric)
    const mapping = businessMappingUtils.businessConceptToComponent[businessConcept]
    
    if (mapping) {
      return `${mapping.component.charAt(0).toUpperCase() + mapping.component.slice(1)}Chart`
    }

    // 默认映射
    if (metric.includes('温度')) return 'TemperatureRangeChart'
    if (metric.includes('效率') || metric.includes('性能')) return 'PerformanceScoreChart'
    if (metric.includes('能耗') || metric.includes('功率')) return 'EnergyReductionChart'
    if (metric.includes('流量')) return 'FlowMonitoringChart'
    
    return 'DonutChart'
  }

  /**
   * 映射指标到组件类型
   */
  private mapMetricToComponent(metric: string): string {
    if (metric.includes('温度')) return 'TemperatureRangeChart'
    if (metric.includes('压力')) return 'BarChart'
    if (metric.includes('流量')) return 'LineChart'
    if (metric.includes('效率')) return 'PerformanceScoreChart'
    
    return 'DonutChart'
  }

  /**
   * 映射到业务概念
   */
  private mapToBusinessConcept(device: string, metric: string): string {
    if (device.includes('冷水机') && metric.includes('效率')) return '冷水机组效率'
    if (device.includes('冷却塔') && metric.includes('效率')) return '冷却塔效率'
    if (device.includes('泵') && metric.includes('效率')) return '冷水泵效率'
    if (metric.includes('温度')) return '温度监控'
    if (metric.includes('压力')) return '压力监测'
    if (metric.includes('流量')) return '流量监测'
    
    return '设备状态'
  }

  /**
   * 生成布局配置
   */
  private generateLayout(type: 'single' | 'grid' | 'dashboard' | 'comparison', context: IntentContext): LayoutConfig {
    return {
      type,
      columns: type === 'comparison' ? 2 : type === 'dashboard' ? 3 : 1,
      gap: 24,
      size: 'md',
      theme: 'light'
    }
  }

  /**
   * 生成数据配置
   */
  private generateDataConfig(context: IntentContext): DataConfig {
    return {
      source: 'hvac_system',
      query: this.generateDataQuery(context),
      refreshInterval: 30000, // 30秒刷新
      caching: {
        enabled: true,
        ttl: 300, // 5分钟缓存
      }
    }
  }

  /**
   * 生成数据查询
   */
  private generateDataQuery(context: IntentContext): DataQuery {
    const deviceEntities = context.entities.filter(e => e.type === 'device')
    const metricEntities = context.entities.filter(e => e.type === 'metric')
    
    return {
      deviceIds: deviceEntities.map(e => e.value),
      metrics: metricEntities.map(e => e.value),
      timeRange: context.timeRange || {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date(),
        type: 'historical',
        granularity: 'hour'
      },
      aggregation: 'avg'
    }
  }

  /**
   * 生成设备查询
   */
  private generateDeviceQuery(device: string, metric: string): DataQuery {
    return {
      deviceIds: [device],
      metrics: [metric],
      timeRange: {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date(),
        type: 'historical',
        granularity: 'hour'
      }
    }
  }

  /**
   * 生成指标查询
   */
  private generateMetricQuery(device: string, metric: string): DataQuery {
    return this.generateDeviceQuery(device, metric)
  }

  /**
   * 生成位置查询
   */
  private generateLocationQuery(location: string): DataQuery {
    return {
      deviceIds: [], // 根据位置查询所有设备
      metrics: ['状态', '温度', '压力'],
      timeRange: {
        start: new Date(Date.now() - 60 * 60 * 1000), // 最近1小时
        end: new Date(),
        type: 'realtime',
        granularity: 'minute'
      },
      filters: { location }
    }
  }

  /**
   * 生成标题
   */
  private generateTitle(context: IntentContext): string {
    const deviceEntity = context.entities.find(e => e.type === 'device')
    const metricEntity = context.entities.find(e => e.type === 'metric')
    const locationEntity = context.entities.find(e => e.type === 'location')

    if (deviceEntity && metricEntity) {
      return `${deviceEntity.value} ${metricEntity.value}`
    }
    
    if (locationEntity) {
      return `${locationEntity.value} 监控`
    }

    return 'HVAC 系统监控'
  }
}

// ===========================================
// 导出
// ===========================================

export { CompositionGenerator }
export default CompositionGenerator