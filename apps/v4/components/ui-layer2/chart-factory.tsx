/**
 * Layer 2 图表工厂系统
 * 
 * 职责：
 * - 提供统一的图表创建接口
 * - 基于业务配置自动选择图表类型
 * - 业务数据到图表数据的自动转换
 * - 智能图表类型推荐
 */

import React from 'react'
import { 
  type ChartSize, 
  type Theme,
  type ChartSemantic
} from '../ui-layer1/design-tokens-simple'
import {
  EnergyReductionChart,
  PerformanceScoreChart,
  TemperatureRangeChart,
  PlantConsumptionChart,
  FlowMonitoringChart,
  PowerMonitoringChart,
  DualLineChart,
  RTEfficiencyChart
} from './hvac-charts'
import { DonutChart, BarChart, MultiRingChart, LineChart, ColumnChart } from '../ui-layer1/chart-primitives'

// ===========================================
// 业务数据类型定义
// ===========================================

export type BusinessDataType = 
  | 'energy_reduction'      // 能耗降低
  | 'performance_score'     // 性能评分
  | 'temperature_range'     // 温度范围
  | 'plant_consumption'     // 工厂消耗
  | 'flow_monitoring'       // 流量监控
  | 'power_monitoring'      // 功率监控
  | 'dual_line_monitoring'  // 双线监控
  | 'rt_efficiency'         // RT效率分布
  | 'generic_donut'         // 通用环形图
  | 'generic_bar'           // 通用条形图
  | 'generic_column'        // 通用柱状图
  | 'generic_line'          // 通用线形图
  | 'generic_multi_ring'    // 通用多环图

export interface BusinessDataPoint {
  /** 数据标识 */
  id?: string
  /** 时间戳 */
  timestamp?: Date | number
  /** 主要数值 */
  value: number
  /** 次要数值 (可选) */
  secondaryValue?: number
  /** 标签 */
  label?: string
  /** 分类 */
  category?: string
  /** 单位 */
  unit?: string
  /** 状态 */
  status?: 'optimal' | 'normal' | 'warning' | 'critical'
  /** 目标值 */
  target?: number
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 自定义属性 */
  metadata?: Record<string, any>
}

export interface BusinessDataSet {
  /** 数据类型 */
  type: BusinessDataType
  /** 数据标题 */
  title?: string
  /** 数据描述 */
  description?: string
  /** 数据点集合 */
  data: BusinessDataPoint[]
  /** 配置选项 */
  config?: BusinessChartConfig
  /** 最后更新时间 */
  lastUpdated?: Date
}

// ===========================================
// 业务图表配置
// ===========================================

export interface BusinessChartConfig {
  /** 图表语义 */
  semantic?: ChartSemantic
  /** 显示选项 */
  display?: {
    showStatus?: boolean
    showLegend?: boolean
    showLabels?: boolean
    showGrid?: boolean
    showAnimation?: boolean
  }
  /** 阈值配置 */
  thresholds?: {
    optimal?: number
    warning?: number
    critical?: number
  }
  /** 格式化选项 */
  format?: {
    precision?: number
    unit?: string
    showThousands?: boolean
  }
  /** 交互配置 */
  interaction?: {
    clickable?: boolean
    hoverable?: boolean
    zoomable?: boolean
  }
  /** 自定义样式 */
  style?: {
    colors?: string[]
    gradients?: string[]
  }
}

// ===========================================
// 预定义业务配置
// ===========================================

export const predefinedConfigs: Record<BusinessDataType, BusinessChartConfig> = {
  energy_reduction: {
    semantic: 'energy_reduction',
    display: { showStatus: true, showLabels: true },
    thresholds: { optimal: 80, warning: 60, critical: 40 },
    format: { precision: 1, unit: '%' },
    interaction: { clickable: true, hoverable: true }
  },
  
  performance_score: {
    semantic: 'performance_score',
    display: { showStatus: true, showLabels: true },
    thresholds: { optimal: 85, warning: 70, critical: 50 },
    format: { precision: 0, unit: '' },
    interaction: { clickable: true, hoverable: true }
  },
  
  temperature_range: {
    semantic: 'temperature_range',
    display: { showStatus: true, showLabels: true },
    thresholds: { optimal: 24, warning: 26, critical: 28 },
    format: { precision: 1, unit: '°C' },
    interaction: { clickable: true, hoverable: true }
  },
  
  plant_consumption: {
    semantic: 'consumption_planning',
    display: { showStatus: false, showLabels: true, showLegend: true },
    format: { precision: 1, unit: 'kW', showThousands: true },
    interaction: { clickable: true, hoverable: true }
  },
  
  flow_monitoring: {
    semantic: 'flow_monitoring',
    display: { showGrid: true, showLabels: true, showAnimation: true },
    format: { precision: 1, unit: 'L/min' },
    interaction: { clickable: true, hoverable: true, zoomable: true }
  },
  
  power_monitoring: {
    semantic: 'power_monitoring',
    display: { showGrid: true, showLabels: true, showAnimation: true },
    format: { precision: 1, unit: 'kW', showThousands: true },
    interaction: { clickable: true, hoverable: true, zoomable: true }
  },
  
  dual_line_monitoring: {
    semantic: 'actual_energy',
    display: { showGrid: true, showLabels: true, showAnimation: true, showLegend: true },
    format: { precision: 1, unit: '' },
    interaction: { clickable: true, hoverable: true, zoomable: true }
  },
  
  rt_efficiency: {
    semantic: 'rt_efficiency_distribution',
    display: { showGrid: true, showLabels: true, showAnimation: true },
    format: { precision: 2, unit: '' },
    interaction: { clickable: true, hoverable: true }
  },
  
  generic_donut: {
    semantic: 'default',
    display: { showLabels: true, showAnimation: true },
    format: { precision: 1, unit: '%' },
    interaction: { clickable: true, hoverable: true }
  },
  
  generic_bar: {
    semantic: 'default',
    display: { showLabels: true, showGrid: true },
    format: { precision: 1, unit: '' },
    interaction: { clickable: true, hoverable: true }
  },
  
  generic_column: {
    semantic: 'default',
    display: { showLabels: true, showGrid: true, showAnimation: true },
    format: { precision: 1, unit: '' },
    interaction: { clickable: true, hoverable: true }
  },
  
  generic_line: {
    semantic: 'default',
    display: { showGrid: true, showLabels: true, showAnimation: true },
    format: { precision: 1, unit: '' },
    interaction: { clickable: true, hoverable: true, zoomable: true }
  },
  
  generic_multi_ring: {
    semantic: 'default',
    display: { showLabels: true, showLegend: true, showAnimation: true },
    format: { precision: 1, unit: '' },
    interaction: { clickable: true, hoverable: true }
  }
}

// ===========================================
// 数据适配器
// ===========================================

export class BusinessDataAdapter {
  /**
   * 验证业务数据
   */
  static validate(dataSet: BusinessDataSet): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (!dataSet.data || dataSet.data.length === 0) {
      errors.push('数据集不能为空')
    }
    
    if (dataSet.data) {
      dataSet.data.forEach((point, index) => {
        if (typeof point.value !== 'number') {
          errors.push(`数据点 ${index + 1}: value 必须是数字`)
        }
        if (point.value === null || point.value === undefined) {
          errors.push(`数据点 ${index + 1}: value 不能为空`)
        }
      })
    }
    
    return { valid: errors.length === 0, errors }
  }
  
  /**
   * 清洗和标准化数据
   */
  static normalize(dataSet: BusinessDataSet): BusinessDataSet {
    const normalizedData = dataSet.data
      .filter(point => point.value !== null && point.value !== undefined)
      .map((point, index) => ({
        ...point,
        id: point.id || `point-${index}`,
        timestamp: point.timestamp || Date.now(),
        label: point.label || `Point ${index + 1}`
      }))
    
    return {
      ...dataSet,
      data: normalizedData,
      lastUpdated: dataSet.lastUpdated || new Date()
    }
  }
  
  /**
   * 计算统计信息
   */
  static getStatistics(dataSet: BusinessDataSet) {
    const values = dataSet.data.map(p => p.value)
    
    return {
      count: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      sum: values.reduce((sum, val) => sum + val, 0)
    }
  }
  
  /**
   * 推荐图表类型
   */
  static recommendChartType(dataSet: BusinessDataSet): BusinessDataType {
    const { data, type } = dataSet
    const stats = this.getStatistics(dataSet)
    
    // 如果已明确指定类型，直接返回
    if (type && type !== 'generic_donut') {
      return type
    }
    
    // 基于数据特征智能推荐
    if (data.length === 1) {
      // 单数据点，推荐环形图或条形图
      if (data[0].max && data[0].min) {
        return 'generic_bar' // 有范围的单值
      }
      return 'generic_donut' // 百分比或单值
    }
    
    if (data.length <= 6) {
      // 少量数据点，推荐柱状图或多环图
      if (data.every(p => p.category)) {
        return 'generic_multi_ring' // 有分类的多值
      }
      return 'generic_column' // 柱状图
    }
    
    if (data.length > 6) {
      // 大量数据点，推荐线形图
      if (data.every(p => p.timestamp)) {
        return 'generic_line' // 时间序列数据
      }
      return 'generic_column' // 非时间序列
    }
    
    return 'generic_donut' // 默认推荐
  }
}

// ===========================================
// 图表工厂组件
// ===========================================

export interface ChartFactoryProps {
  /** 业务数据集 */
  dataSet: BusinessDataSet
  /** 图表尺寸 */
  size?: ChartSize
  /** 主题 */
  theme?: Theme
  /** 强制图表类型 (覆盖自动推荐) */
  forceType?: BusinessDataType
  /** 自定义配置 (覆盖预定义配置) */
  customConfig?: Partial<BusinessChartConfig>
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
  /** 事件回调 */
  onDataClick?: (dataPoint: BusinessDataPoint, index: number) => void
  onChartReady?: (chartType: BusinessDataType) => void
}

export const ChartFactory: React.FC<ChartFactoryProps> = ({
  dataSet,
  size = 'md',
  theme = 'light',
  forceType,
  customConfig = {},
  className = '',
  style,
  onDataClick,
  onChartReady
}) => {
  // 数据验证和清洗
  const validation = BusinessDataAdapter.validate(dataSet)
  if (!validation.valid) {
    return (
      <div className="chart-factory-error" style={{ 
        padding: '16px', 
        color: 'red', 
        border: '1px solid red', 
        borderRadius: '4px' 
      }}>
        <strong>数据错误:</strong>
        <ul>
          {validation.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )
  }
  
  const normalizedDataSet = BusinessDataAdapter.normalize(dataSet)
  
  // 确定图表类型
  const chartType = forceType || BusinessDataAdapter.recommendChartType(normalizedDataSet)
  
  // 合并配置
  const baseConfig = predefinedConfigs[chartType] || predefinedConfigs.generic_donut
  const finalConfig: BusinessChartConfig = {
    ...baseConfig,
    ...customConfig,
    display: { ...baseConfig.display, ...customConfig.display },
    format: { ...baseConfig.format, ...customConfig.format },
    interaction: { ...baseConfig.interaction, ...customConfig.interaction }
  }
  
  // 通知图表就绪
  React.useEffect(() => {
    onChartReady?.(chartType)
  }, [chartType, onChartReady])
  
  // 通用属性
  const commonProps = {
    size,
    theme,
    className,
    style,
    lastUpdated: normalizedDataSet.lastUpdated,
    showStatus: finalConfig.display?.showStatus,
    onDataClick: (value: number) => {
      const dataPoint = normalizedDataSet.data.find(p => p.value === value)
      if (dataPoint) {
        const index = normalizedDataSet.data.indexOf(dataPoint)
        onDataClick?.(dataPoint, index)
      }
    }
  }
  
  // 根据图表类型渲染对应组件
  switch (chartType) {
    case 'energy_reduction': {
      const data = normalizedDataSet.data[0]
      return (
        <EnergyReductionChart
          reductionPercentage={data.value}
          targetPercentage={data.target}
          ranking={data.metadata?.ranking}
          totalParticipants={data.metadata?.totalParticipants}
          {...commonProps}
        />
      )
    }
    
    case 'performance_score': {
      const data = normalizedDataSet.data[0]
      return (
        <PerformanceScoreChart
          score={data.value}
          scoreRange={[data.min || 0, data.max || 100]}
          benchmark={data.target}
          bestScore={data.metadata?.bestScore}
          systemName={normalizedDataSet.title || 'System Performance'}
          {...commonProps}
        />
      )
    }
    
    case 'temperature_range': {
      const data = normalizedDataSet.data[0]
      return (
        <TemperatureRangeChart
          temperature={data.value}
          temperatureRange={[data.min || 18, data.max || 28]}
          targetTemperature={data.target}
          unit={finalConfig.format?.unit || '°C'}
          zoneName={normalizedDataSet.title || 'Temperature Zone'}
          {...commonProps}
        />
      )
    }
    
    case 'plant_consumption': {
      const consumptionData = normalizedDataSet.data.map(point => ({
        type: point.category || point.label || 'device',
        consumption: point.value,
        cost: point.secondaryValue || point.value * 0.5,
        unit: finalConfig.format?.unit || 'kW',
        currency: '$'
      }))
      
      return (
        <PlantConsumptionChart
          data={consumptionData}
          showCostLabels={true}
          showPercentages={false}
          onSegmentClick={(data, index) => {
            const dataPoint = normalizedDataSet.data[index]
            if (dataPoint) {
              onDataClick?.(dataPoint, index)
            }
          }}
          {...commonProps}
        />
      )
    }
    
    case 'flow_monitoring': {
      const flowData = normalizedDataSet.data.map((point, index) => ({
        time: index,
        actualFlow: point.value,
        setpoint: point.secondaryValue || point.target || point.value,
        id: point.id || `flow-${index}`
      }))
      
      return (
        <FlowMonitoringChart
          data={flowData}
          unit={finalConfig.format?.unit || 'L/min'}
          deviceName={normalizedDataSet.title || 'Flow Monitor'}
          actualFlowLabel="Actual Flow"
          setpointLabel="Setpoint"
          onDataPointClick={(data, type) => {
            const index = flowData.findIndex(d => d.id === data.id)
            if (index >= 0) {
              onDataClick?.(normalizedDataSet.data[index], index)
            }
          }}
          {...commonProps}
        />
      )
    }
    
    case 'rt_efficiency': {
      const efficiencyData = normalizedDataSet.data.map((point, index) => ({
        rtValue: point.secondaryValue || index * 0.2 + 0.8,
        efficiency: point.value,
        id: point.id,
        label: point.label
      }))
      
      return (
        <RTEfficiencyChart
          data={efficiencyData}
          unit={finalConfig.format?.unit || ''}
          subtitle="(Business Data)"
          onDataPointClick={(data, index) => {
            onDataClick?.(normalizedDataSet.data[index], index)
          }}
          {...commonProps}
        />
      )
    }
    
    case 'generic_donut': {
      const data = normalizedDataSet.data[0]
      return (
        <DonutChart
          value={data.value}
          max={data.max || 100}
          semantic={finalConfig.semantic || 'default'}
          title={normalizedDataSet.title}
          unitLabel={finalConfig.format?.unit || '%'}
          animated={finalConfig.display?.showAnimation}
          {...commonProps}
        />
      )
    }
    
    case 'generic_bar': {
      const data = normalizedDataSet.data[0]
      return (
        <BarChart
          value={data.value}
          range={[data.min || 0, data.max || 100]}
          semantic={finalConfig.semantic || 'default'}
          title={normalizedDataSet.title}
          unit={finalConfig.format?.unit || ''}
          showRangeLabels={finalConfig.display?.showLabels}
          showGridLines={finalConfig.display?.showGrid}
          animated={finalConfig.display?.showAnimation}
          {...commonProps}
        />
      )
    }
    
    case 'generic_column': {
      const columnData = normalizedDataSet.data.map((point, index) => ({
        x: point.label || index,
        y: point.value,
        id: point.id || `col-${index}`,
        label: point.label
      }))
      
      return (
        <ColumnChart
          data={columnData}
          semantic={finalConfig.semantic || 'default'}
          title={normalizedDataSet.title}
          showGridLines={finalConfig.display?.showGrid}
          showDataLabels={finalConfig.display?.showLabels}
          animated={finalConfig.display?.showAnimation}
          onBarClick={(point, index) => {
            onDataClick?.(normalizedDataSet.data[index], index)
          }}
          {...commonProps}
        />
      )
    }
    
    default: {
      return (
        <div className="chart-factory-unknown" style={{ 
          padding: '16px', 
          color: 'orange', 
          border: '1px solid orange', 
          borderRadius: '4px' 
        }}>
          未知的图表类型: {chartType}
        </div>
      )
    }
  }
}

// ===========================================
// 图表组合器
// ===========================================

export interface ChartComposerProps {
  /** 多个数据集 */
  dataSets: BusinessDataSet[]
  /** 布局模式 */
  layout?: 'grid' | 'row' | 'column' | 'dashboard'
  /** 网格列数 */
  columns?: number
  /** 间距 */
  gap?: number
  /** 公共配置 */
  commonConfig?: {
    size?: ChartSize
    theme?: Theme
    showTitles?: boolean
  }
  /** 联动配置 */
  linkage?: {
    enabled?: boolean
    syncSelection?: boolean
    syncZoom?: boolean
  }
  /** 事件回调 */
  onDataClick?: (dataPoint: BusinessDataPoint, dataSetIndex: number, pointIndex: number) => void
  onSelectionChange?: (selectedPoints: Array<{ dataSetIndex: number; pointIndex: number }>) => void
}

export const ChartComposer: React.FC<ChartComposerProps> = ({
  dataSets,
  layout = 'grid',
  columns = 2,
  gap = 24,
  commonConfig = {},
  linkage = {},
  onDataClick,
  onSelectionChange
}) => {
  const [selectedPoints, setSelectedPoints] = React.useState<Array<{ dataSetIndex: number; pointIndex: number }>>([])
  
  const handleDataClick = (dataPoint: BusinessDataPoint, pointIndex: number, dataSetIndex: number) => {
    onDataClick?.(dataPoint, dataSetIndex, pointIndex)
    
    if (linkage.syncSelection) {
      const newSelection = [{ dataSetIndex, pointIndex }]
      setSelectedPoints(newSelection)
      onSelectionChange?.(newSelection)
    }
  }
  
  const containerStyle: React.CSSProperties = {
    display: layout === 'row' ? 'flex' : layout === 'column' ? 'flex' : 'grid',
    flexDirection: layout === 'column' ? 'column' : 'row',
    gridTemplateColumns: layout === 'grid' ? `repeat(${columns}, 1fr)` : undefined,
    gap: `${gap}px`,
    width: '100%'
  }
  
  if (layout === 'dashboard') {
    containerStyle.display = 'grid'
    containerStyle.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
    containerStyle.gridAutoRows = 'min-content'
  }
  
  return (
    <div style={containerStyle} className="chart-composer">
      {dataSets.map((dataSet, index) => (
        <div key={index} className="chart-composer__item">
          {commonConfig.showTitles && dataSet.title && (
            <h3 style={{ 
              marginTop: 0, 
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '500'
            }}>
              {dataSet.title}
            </h3>
          )}
          <ChartFactory
            dataSet={dataSet}
            size={commonConfig.size}
            theme={commonConfig.theme}
            onDataClick={(dataPoint, pointIndex) => handleDataClick(dataPoint, pointIndex, index)}
            onChartReady={(chartType) => {
              console.log(`Chart ${index + 1} ready: ${chartType}`)
            }}
          />
        </div>
      ))}
    </div>
  )
}

// ===========================================
// 导出
// ===========================================

export {
  BusinessDataAdapter,
  predefinedConfigs
}

export default ChartFactory