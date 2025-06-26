/**
 * Layer 2 HVAC 图表业务组件
 * 
 * 基于 Figma 图表设计 (23910:4724, 23258:3904)
 * 职责：
 * - 提供业务语义化的图表组件
 * - 集成 HVAC 业务逻辑
 * - 支持主题感知和状态管理
 * - 提供完整的交互能力
 */

import React from 'react'
import { DonutChart, BarChart, MultiRingChart, LineChart, ColumnChart, type BaseChartProps, type MultiRingSegment, type MultiRingLabel, type LineDataSeries, type LineDataPoint } from '../ui-layer1/chart-primitives'
import { 
  type ChartSemantic, 
  type Theme,
  type ChartSize,
  themeTokens 
} from '../ui-layer1/design-tokens-simple'

// ===========================================
// 业务图表基础接口
// ===========================================

export interface BusinessChartProps extends Omit<BaseChartProps, 'semantic'> {
  /** 业务语义 (自动确定) */
  semantic?: ChartSemantic
  /** 数据更新时间 */
  lastUpdated?: Date
  /** 是否显示状态指示器 */
  showStatus?: boolean
  /** 状态 */
  status?: 'optimal' | 'normal' | 'warning' | 'critical'
  /** 交互回调 */
  onDataClick?: (value: number) => void
}

// ===========================================
// 能耗降低排名图表 (Energy Reduction Ranking)
// ===========================================

export interface EnergyReductionChartProps extends BusinessChartProps {
  /** 节能百分比 (0-100) */
  reductionPercentage: number
  /** 目标节能值 */
  targetPercentage?: number
  /** 当前排名 */
  ranking?: number
  /** 总参与数 */
  totalParticipants?: number
}

export const EnergyReductionChart = React.forwardRef<SVGSVGElement, EnergyReductionChartProps>(
  ({ 
    reductionPercentage,
    targetPercentage,
    ranking,
    totalParticipants,
    size = 'md',
    theme = 'light',
    showStatus = true,
    status = 'normal',
    lastUpdated,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 状态计算
    const getStatus = () => {
      if (targetPercentage) {
        if (reductionPercentage >= targetPercentage * 1.2) return 'optimal'
        if (reductionPercentage >= targetPercentage) return 'normal' 
        if (reductionPercentage >= targetPercentage * 0.8) return 'warning'
        return 'critical'
      }
      return status
    }
    
    const currentStatus = getStatus()
    
    // 单位标签构建
    const unitLabel = ranking && totalParticipants 
      ? `${ranking}/${totalParticipants}` 
      : '%'
    
    const handleClick = () => {
      onDataClick?.(reductionPercentage)
    }
    
    return (
      <div className={`hvac-energy-reduction-chart ${className}`}>
        <DonutChart
          ref={ref}
          value={reductionPercentage}
          max={100}
          semantic="energy_reduction"
          size={size}
          theme={theme}
          title="Energy Reduction Ranking"
          unitLabel={unitLabel}
          onClick={handleClick}
          {...props}
        />
        
        {/* 状态和更新时间 */}
        {(showStatus || lastUpdated) && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
            fontSize: '12px',
            color: currentTheme.foreground.muted
          }}>
            {showStatus && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 
                    currentStatus === 'optimal' ? '#67D75E' :
                    currentStatus === 'normal' ? '#33A0FF' :
                    currentStatus === 'warning' ? '#FECC36' : '#FF3939'
                }} />
                <span>
                  {currentStatus === 'optimal' ? '超额完成' :
                   currentStatus === 'normal' ? '达标' :
                   currentStatus === 'warning' ? '接近目标' : '需改进'}
                </span>
              </div>
            )}
            
            {lastUpdated && (
              <span>
                更新于 {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}
      </div>
    )
  }
)

EnergyReductionChart.displayName = 'EnergyReductionChart'

// ===========================================
// 系统性能评分图表 (System Performance Score)
// ===========================================

export interface PerformanceScoreChartProps extends BusinessChartProps {
  /** 当前评分 */
  score: number
  /** 评分范围 [min, max] */
  scoreRange?: [number, number]
  /** 基准分数 */
  benchmark?: number
  /** 历史最高分 */
  bestScore?: number
  /** 系统名称 */
  systemName?: string
}

export const PerformanceScoreChart = React.forwardRef<SVGSVGElement, PerformanceScoreChartProps>(
  ({ 
    score,
    scoreRange = [0, 100],
    benchmark,
    bestScore,
    systemName = 'System Performance',
    size = 'md',
    theme = 'light',
    showStatus = true,
    status = 'normal',
    lastUpdated,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    const [minScore, maxScore] = scoreRange
    
    // 状态计算
    const getStatus = () => {
      const percentage = (score - minScore) / (maxScore - minScore)
      if (percentage >= 0.9) return 'optimal'
      if (percentage >= 0.7) return 'normal'
      if (percentage >= 0.5) return 'warning'
      return 'critical'
    }
    
    const currentStatus = getStatus()
    
    const handleClick = () => {
      onDataClick?.(score)
    }
    
    return (
      <div className={`hvac-performance-score-chart ${className}`}>
        <BarChart
          ref={ref}
          value={score}
          range={scoreRange}
          semantic="performance_score"
          size={size}
          theme={theme}
          title={systemName}
          unit=""
          showRangeLabels={true}
          showGridLines={true}
          onClick={handleClick}
          {...props}
        />
        
        {/* 扩展信息 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '12px',
          color: currentTheme.foreground.muted
        }}>
          {/* 基准对比 */}
          {benchmark && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>基准分数</span>
              <span style={{ 
                color: score >= benchmark ? '#67D75E' : '#FF3939',
                fontWeight: '500'
              }}>
                {benchmark} ({score >= benchmark ? '+' : ''}{score - benchmark})
              </span>
            </div>
          )}
          
          {/* 历史最高 */}
          {bestScore && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>历史最高</span>
              <span style={{ color: score >= bestScore ? '#67D75E' : currentTheme.foreground.secondary }}>
                {bestScore}
              </span>
            </div>
          )}
          
          {/* 状态和更新时间 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '6px',
            borderTop: `1px solid ${currentTheme.border.muted}`
          }}>
            {showStatus && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 
                    currentStatus === 'optimal' ? '#67D75E' :
                    currentStatus === 'normal' ? '#33A0FF' :
                    currentStatus === 'warning' ? '#FECC36' : '#FF3939'
                }} />
                <span>
                  {currentStatus === 'optimal' ? '优秀' :
                   currentStatus === 'normal' ? '良好' :
                   currentStatus === 'warning' ? '一般' : '需优化'}
                </span>
              </div>
            )}
            
            {lastUpdated && (
              <span>
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

PerformanceScoreChart.displayName = 'PerformanceScoreChart'

// ===========================================
// 温度范围图表 (Temperature Range Chart)
// ===========================================

export interface TemperatureRangeChartProps extends BusinessChartProps {
  /** 当前温度 */
  temperature: number
  /** 温度范围 [min, max] */
  temperatureRange: [number, number]
  /** 目标温度 */
  targetTemperature?: number
  /** 温度单位 */
  unit?: '℃' | '℉'
  /** 区域名称 */
  zoneName?: string
}

export const TemperatureRangeChart = React.forwardRef<SVGSVGElement, TemperatureRangeChartProps>(
  ({ 
    temperature,
    temperatureRange,
    targetTemperature,
    unit = '℃',
    zoneName = 'Temperature Range',
    size = 'md',
    theme = 'light',
    showStatus = true,
    status = 'normal',
    lastUpdated,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    const [minTemp, maxTemp] = temperatureRange
    
    // 状态计算
    const getStatus = () => {
      const range = maxTemp - minTemp
      const comfort = range * 0.2  // 20% 舒适区间
      
      if (targetTemperature) {
        const deviation = Math.abs(temperature - targetTemperature)
        if (deviation <= comfort * 0.5) return 'optimal'
        if (deviation <= comfort) return 'normal'
        if (deviation <= comfort * 2) return 'warning'
        return 'critical'
      }
      
      // 基于范围判断
      if (temperature < minTemp || temperature > maxTemp) return 'critical'
      if (temperature >= minTemp + comfort && temperature <= maxTemp - comfort) return 'optimal'
      return 'normal'
    }
    
    const currentStatus = getStatus()
    
    const handleClick = () => {
      onDataClick?.(temperature)
    }
    
    return (
      <div className={`hvac-temperature-range-chart ${className}`}>
        <BarChart
          ref={ref}
          value={temperature}
          range={temperatureRange}
          semantic="temperature_range"
          size={size}
          theme={theme}
          title={zoneName}
          unit={unit}
          showRangeLabels={true}
          showGridLines={true}
          onClick={handleClick}
          {...props}
        />
        
        {/* 温度详情 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '12px',
          color: currentTheme.foreground.muted
        }}>
          {/* 目标温度 */}
          {targetTemperature && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>目标温度</span>
              <span style={{ 
                color: Math.abs(temperature - targetTemperature) <= 2 ? '#67D75E' : '#FECC36',
                fontWeight: '500'
              }}>
                {targetTemperature}{unit}
              </span>
            </div>
          )}
          
          {/* 舒适范围 */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>舒适范围</span>
            <span>
              {minTemp + Math.round((maxTemp - minTemp) * 0.2)}{unit} - {maxTemp - Math.round((maxTemp - minTemp) * 0.2)}{unit}
            </span>
          </div>
          
          {/* 状态和更新时间 */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '6px',
            borderTop: `1px solid ${currentTheme.border.muted}`
          }}>
            {showStatus && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 
                    currentStatus === 'optimal' ? '#67D75E' :
                    currentStatus === 'normal' ? '#33A0FF' :
                    currentStatus === 'warning' ? '#FECC36' : '#FF3939'
                }} />
                <span>
                  {currentStatus === 'optimal' ? '舒适' :
                   currentStatus === 'normal' ? '正常' :
                   currentStatus === 'warning' ? '偏离' : '超限'}
                </span>
              </div>
            )}
            
            {lastUpdated && (
              <span>
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

TemperatureRangeChart.displayName = 'TemperatureRangeChart'

// ===========================================
// 图表网格布局
// ===========================================

export interface ChartGridProps {
  /** 主题 */
  theme?: Theme
  /** 列数 */
  columns?: number
  /** 间距 */
  gap?: number
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export const ChartGrid = React.forwardRef<HTMLDivElement, ChartGridProps>(
  ({ 
    theme = 'light',
    columns = 3,
    gap = 24,
    className = '',
    style,
    children,
    ...props 
  }, ref) => {
    
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: `${gap}px`,
      width: '100%',
      ...style
    }
    
    return (
      <div
        ref={ref}
        style={gridStyle}
        className={`hvac-chart-grid hvac-chart-grid--${theme} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ChartGrid.displayName = 'ChartGrid'

// ===========================================
// 工厂消耗规划图表 (Plant Consumption Planning)
// ===========================================

export interface ConsumptionData {
  /** 设备类型标识 */
  type: string
  /** 消耗值 */
  consumption: number
  /** 成本 */
  cost: number
  /** 单位 */
  unit?: string
  /** 货币符号 */
  currency?: string
}

export interface PlantConsumptionChartProps extends BusinessChartProps {
  /** 消耗数据 */
  data: ConsumptionData[]
  /** 总消耗 */
  totalConsumption?: number
  /** 总成本 */
  totalCost?: number
  /** 显示成本标签 */
  showCostLabels?: boolean
  /** 显示百分比 */
  showPercentages?: boolean
  /** 分段点击回调 */
  onSegmentClick?: (data: ConsumptionData, index: number) => void
}

export const PlantConsumptionChart = React.forwardRef<SVGSVGElement, PlantConsumptionChartProps>(
  ({ 
    data,
    totalConsumption,
    totalCost,
    showCostLabels = true,
    showPercentages = false,
    size = 'md',
    theme = 'light',
    showStatus = false,
    lastUpdated,
    onSegmentClick,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 计算总值
    const calculatedTotalConsumption = totalConsumption || data.reduce((sum, item) => sum + item.consumption, 0)
    const calculatedTotalCost = totalCost || data.reduce((sum, item) => sum + item.cost, 0)
    
    // 准备分段数据
    const segments: MultiRingSegment[] = data.map((item, index) => ({
      value: item.consumption,
      percentage: item.consumption / calculatedTotalConsumption,
      id: item.type
    }))
    
    // 准备标签数据
    const labels: MultiRingLabel[] = data.map((item, index) => {
      const percentage = ((item.consumption / calculatedTotalConsumption) * 100).toFixed(1)
      
      return {
        primary: item.type.toUpperCase(),
        secondary: showCostLabels 
          ? `${item.currency || '$'}${item.cost}${showPercentages ? ` (${percentage}%)` : ''}`
          : showPercentages 
            ? `${percentage}%`
            : `${item.consumption}${item.unit || ''}`
      }
    })
    
    // 处理分段点击
    const handleSegmentClick = (segment: MultiRingSegment, index: number) => {
      const consumptionData = data[index]
      onSegmentClick?.(consumptionData, index)
      onDataClick?.(segment.value)
    }
    
    return (
      <div className={`hvac-plant-consumption-chart ${className}`}>
        <MultiRingChart
          ref={ref}
          segments={segments}
          labels={labels}
          semantic="consumption_planning"
          size={size}
          theme={theme}
          title="Plant Consumption Planning"
          showLabels={true}
          showBackgroundRing={true}
          animated={true}
          onSegmentClick={handleSegmentClick}
          {...props}
        />
        
        {/* 总计信息 */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: currentTheme.background.elevated,
          borderRadius: '8px',
          border: `1px solid ${currentTheme.border.muted}`,
          fontSize: '14px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: currentTheme.foreground.muted }}>总消耗</span>
            <span style={{ 
              color: currentTheme.foreground.primary,
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {calculatedTotalConsumption.toFixed(1)} {data[0]?.unit || 'kW'}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right' }}>
            <span style={{ color: currentTheme.foreground.muted }}>总成本</span>
            <span style={{ 
              color: currentTheme.foreground.primary,
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {data[0]?.currency || '$'}{calculatedTotalCost.toFixed(1)}
            </span>
          </div>
          
          {lastUpdated && (
            <div style={{ 
              fontSize: '12px',
              color: currentTheme.foreground.muted,
              textAlign: 'right'
            }}>
              <div>最后更新</div>
              <div>{lastUpdated.toLocaleTimeString()}</div>
            </div>
          )}
        </div>
        
        {/* 设备效率排名 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <h4 style={{
            margin: 0,
            fontSize: '14px',
            fontWeight: '600',
            color: currentTheme.foreground.primary
          }}>
            消耗效率排名
          </h4>
          
          {data
            .map((item, index) => ({ ...item, originalIndex: index }))
            .sort((a, b) => (a.cost / a.consumption) - (b.cost / b.consumption))
            .map((item, rankIndex) => {
              const efficiency = (item.cost / item.consumption).toFixed(2)
              const percentage = ((item.consumption / calculatedTotalConsumption) * 100).toFixed(1)
              
              return (
                <div
                  key={item.type}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: currentTheme.background.secondary,
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: onSegmentClick ? 'pointer' : 'default'
                  }}
                  onClick={() => onSegmentClick?.(item, item.originalIndex)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      display: 'inline-block',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: ['#33A0FF', '#70BCFF', '#8BECFF', '#8DFEF8'][item.originalIndex]
                    }} />
                    <span style={{ fontWeight: '500' }}>{item.type.toUpperCase()}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span style={{ color: currentTheme.foreground.muted }}>
                      {percentage}%
                    </span>
                    <span style={{ 
                      color: rankIndex === 0 ? '#67D75E' : currentTheme.foreground.secondary,
                      fontWeight: '500'
                    }}>
                      {efficiency} {item.currency || '$'}/kW
                    </span>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
)

PlantConsumptionChart.displayName = 'PlantConsumptionChart'

// ===========================================
// 流量监控图表 (Flow Monitoring Chart)
// ===========================================

export interface FlowData {
  /** 时间点 (可以是时间戳或序号) */
  time: number
  /** 实际流量值 */
  actualFlow: number
  /** 设定点流量值 */
  setpoint: number
  /** 数据点标识 */
  id?: string
}

export interface FlowMonitoringChartProps extends BusinessChartProps {
  /** 流量数据 */
  data: FlowData[]
  /** 流量单位 */
  unit?: string
  /** X轴标签 (时间标签) */
  timeLabels?: string[]
  /** Y轴范围 [min, max] */
  flowRange?: [number, number]
  /** 实际流量线名称 */
  actualFlowLabel?: string
  /** 设定点线名称 */
  setpointLabel?: string
  /** 监控设备名称 */
  deviceName?: string
  /** 数据点点击回调 */
  onDataPointClick?: (data: FlowData, dataType: 'actual' | 'setpoint') => void
}

export const FlowMonitoringChart = React.forwardRef<SVGSVGElement, FlowMonitoringChartProps>(
  ({ 
    data,
    unit = 'L/min',
    timeLabels,
    flowRange,
    actualFlowLabel = 'Actual Flow',
    setpointLabel = 'Current Set point',
    deviceName = 'Flow Monitoring',
    size = 'md',
    theme = 'light',
    showStatus = false,
    lastUpdated,
    onDataPointClick,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 准备线形图数据系列
    const series: LineDataSeries[] = [
      // 实际流量线 - 蓝色到青色渐变，实线
      {
        name: actualFlowLabel,
        semantic: 'actual_flow',
        data: data.map(item => ({
          x: item.time,
          y: item.actualFlow,
          id: `actual-${item.id || item.time}`
        })),
        showPoints: true
      },
      // 设定点线 - 绿色渐变，虚线
      {
        name: setpointLabel,
        semantic: 'current_setpoint',
        data: data.map(item => ({
          x: item.time,
          y: item.setpoint,
          id: `setpoint-${item.id || item.time}`
        })),
        showPoints: false  // 设定点线通常不显示数据点
      }
    ]
    
    // 计算流量范围
    const allFlowValues = data.flatMap(item => [item.actualFlow, item.setpoint])
    const calculatedFlowRange = flowRange || [
      Math.min(...allFlowValues),
      Math.max(...allFlowValues)
    ]
    
    // 处理数据点点击
    const handlePointClick = (point: LineDataPoint, seriesIndex: number, pointIndex: number) => {
      const flowData = data[pointIndex]
      const dataType = seriesIndex === 0 ? 'actual' : 'setpoint'
      onDataPointClick?.(flowData, dataType)
      onDataClick?.(point.y)
    }
    
    // 状态计算 (基于实际流量与设定点的偏差)
    const getStatus = () => {
      if (data.length === 0) return 'normal'
      
      const latestData = data[data.length - 1]
      const deviation = Math.abs(latestData.actualFlow - latestData.setpoint)
      const relativeDeviation = deviation / latestData.setpoint
      
      if (relativeDeviation <= 0.05) return 'optimal'      // 5% 以内偏差
      if (relativeDeviation <= 0.15) return 'normal'       // 15% 以内偏差
      if (relativeDeviation <= 0.25) return 'warning'      // 25% 以内偏差
      return 'critical'
    }
    
    const currentStatus = getStatus()
    
    return (
      <div className={`hvac-flow-monitoring-chart ${className}`}>
        <LineChart
          ref={ref}
          series={series}
          xRange={[Math.min(...data.map(d => d.time)), Math.max(...data.map(d => d.time))]}
          yRange={calculatedFlowRange}
          xLabels={timeLabels}
          yLabels={calculatedFlowRange.map((val, index, arr) => 
            index === 0 || index === arr.length - 1 ? `${val.toFixed(1)}${unit}` : ''
          )}
          size={size}
          theme={theme}
          title={deviceName}
          showGridLines={true}
          showLegend={true}
          legendPosition="top"
          animated={true}
          onPointClick={handlePointClick}
          {...props}
        />
        
        {/* 流量统计信息 */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: currentTheme.background.elevated,
          borderRadius: '8px',
          border: `1px solid ${currentTheme.border.muted}`,
          fontSize: '14px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: currentTheme.foreground.muted }}>当前流量</span>
            <span style={{ 
              color: currentTheme.foreground.primary,
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {data.length > 0 ? `${data[data.length - 1].actualFlow.toFixed(1)} ${unit}` : `-- ${unit}`}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
            <span style={{ color: currentTheme.foreground.muted }}>设定点</span>
            <span style={{ 
              color: currentTheme.foreground.primary,
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {data.length > 0 ? `${data[data.length - 1].setpoint.toFixed(1)} ${unit}` : `-- ${unit}`}
            </span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'right' }}>
            <span style={{ color: currentTheme.foreground.muted }}>偏差</span>
            <span style={{ 
              color: data.length > 0 && Math.abs(data[data.length - 1].actualFlow - data[data.length - 1].setpoint) > data[data.length - 1].setpoint * 0.1
                ? '#FF3939' : '#67D75E',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              {data.length > 0 ? 
                `${(((data[data.length - 1].actualFlow - data[data.length - 1].setpoint) / data[data.length - 1].setpoint) * 100).toFixed(1)}%`
                : '--%'
              }
            </span>
          </div>
          
          {lastUpdated && (
            <div style={{ 
              fontSize: '12px',
              color: currentTheme.foreground.muted,
              textAlign: 'right'
            }}>
              <div>最后更新</div>
              <div>{lastUpdated.toLocaleTimeString()}</div>
            </div>
          )}
        </div>
        
        {/* 状态指示器 */}
        {showStatus && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px',
            fontSize: '12px',
            color: currentTheme.foreground.muted
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 
                  currentStatus === 'optimal' ? '#67D75E' :
                  currentStatus === 'normal' ? '#33A0FF' :
                  currentStatus === 'warning' ? '#FECC36' : '#FF3939'
              }} />
              <span>
                {currentStatus === 'optimal' ? '流量稳定' :
                 currentStatus === 'normal' ? '正常运行' :
                 currentStatus === 'warning' ? '偏差较大' : '需要调整'}
              </span>
            </div>
            
            <span>
              数据点: {data.length}
            </span>
          </div>
        )}
      </div>
    )
  }
)

FlowMonitoringChart.displayName = 'FlowMonitoringChart'

// ===========================================
// 功率监控图表 (Power Monitoring Chart)
// ===========================================

export interface PowerData {
  /** 时间点 (可以是时间戳或序号) */
  time: number
  /** 总功率值 */
  totalPower: number
  /** 冷却器功率值 */
  chillerPower: number
  /** 泵功率值 */
  pumpPower: number
  /** 数据点标识 */
  id?: string
}

export interface PowerMonitoringChartProps extends BusinessChartProps {
  /** 功率数据 */
  data: PowerData[]
  /** 功率单位 */
  unit?: string
  /** X轴标签 (时间标签) */
  timeLabels?: string[]
  /** Y轴范围 [min, max] */
  powerRange?: [number, number]
  /** 总功率线名称 */
  totalPowerLabel?: string
  /** 冷却器功率线名称 */
  chillerPowerLabel?: string
  /** 泵功率线名称 */
  pumpPowerLabel?: string
  /** 监控设备名称 */
  deviceName?: string
  /** 显示功率统计 */
  showPowerStats?: boolean
  /** 数据点点击回调 */
  onDataPointClick?: (data: PowerData, powerType: 'total' | 'chiller' | 'pump') => void
}

export const PowerMonitoringChart = React.forwardRef<SVGSVGElement, PowerMonitoringChartProps>(
  ({ 
    data,
    unit = 'kW',
    timeLabels,
    powerRange,
    totalPowerLabel = 'Total Power',
    chillerPowerLabel = 'Chiller Power',
    pumpPowerLabel = 'Pump Power',
    deviceName = 'Power Monitoring',
    size = 'md',
    theme = 'light',
    showStatus = false,
    showPowerStats = true,
    lastUpdated,
    onDataPointClick,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 准备线形图数据系列 (基于 Figma 颜色顺序)
    const series: LineDataSeries[] = [
      // 总功率线 - 紫色渐变
      {
        name: totalPowerLabel,
        semantic: 'total_power',
        data: data.map(item => ({
          x: item.time,
          y: item.totalPower,
          id: `total-${item.id || item.time}`
        })),
        showPoints: true
      },
      // 冷却器功率线 - 绿色渐变
      {
        name: chillerPowerLabel,
        semantic: 'chiller_power',
        data: data.map(item => ({
          x: item.time,
          y: item.chillerPower,
          id: `chiller-${item.id || item.time}`
        })),
        showPoints: true
      },
      // 泵功率线 - 蓝色渐变
      {
        name: pumpPowerLabel,
        semantic: 'pump_power',
        data: data.map(item => ({
          x: item.time,
          y: item.pumpPower,
          id: `pump-${item.id || item.time}`
        })),
        showPoints: true
      }
    ]
    
    // 计算功率范围
    const allPowerValues = data.flatMap(item => [item.totalPower, item.chillerPower, item.pumpPower])
    const calculatedPowerRange = powerRange || [
      Math.min(...allPowerValues),
      Math.max(...allPowerValues)
    ]
    
    // 处理数据点点击
    const handlePointClick = (point: LineDataPoint, seriesIndex: number, pointIndex: number) => {
      const powerData = data[pointIndex]
      const powerType = seriesIndex === 0 ? 'total' : seriesIndex === 1 ? 'chiller' : 'pump'
      onDataPointClick?.(powerData, powerType)
      onDataClick?.(point.y)
    }
    
    // 状态计算 (基于总功率的变化率)
    const getStatus = () => {
      if (data.length < 2) return 'normal'
      
      const latestData = data[data.length - 1]
      const previousData = data[data.length - 2]
      const changeRate = Math.abs(latestData.totalPower - previousData.totalPower) / previousData.totalPower
      
      if (changeRate <= 0.05) return 'optimal'      // 5% 以内变化
      if (changeRate <= 0.15) return 'normal'       // 15% 以内变化
      if (changeRate <= 0.25) return 'warning'      // 25% 以内变化
      return 'critical'
    }
    
    const currentStatus = getStatus()
    
    // 计算当前功率分布
    const latestData = data.length > 0 ? data[data.length - 1] : null
    const powerDistribution = latestData ? {
      chillerPercentage: (latestData.chillerPower / latestData.totalPower * 100).toFixed(1),
      pumpPercentage: (latestData.pumpPower / latestData.totalPower * 100).toFixed(1),
      otherPercentage: ((latestData.totalPower - latestData.chillerPower - latestData.pumpPower) / latestData.totalPower * 100).toFixed(1)
    } : null
    
    return (
      <div className={`hvac-power-monitoring-chart ${className}`}>
        <LineChart
          ref={ref}
          series={series}
          xRange={data.length > 0 ? [Math.min(...data.map(d => d.time)), Math.max(...data.map(d => d.time))] : [0, 10]}
          yRange={calculatedPowerRange}
          xLabels={timeLabels}
          yLabels={calculatedPowerRange.map((val, index, arr) => 
            index === 0 || index === arr.length - 1 ? `${val.toFixed(1)}${unit}` : ''
          )}
          size={size}
          theme={theme}
          title={deviceName}
          showGridLines={true}
          showLegend={true}
          legendPosition="top"
          animated={true}
          onPointClick={handlePointClick}
          {...props}
        />
        
        {/* 功率统计信息 */}
        {showPowerStats && (
          <div style={{
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}>
            {/* 总功率 */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: currentTheme.background.elevated,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.muted}`,
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: currentTheme.foreground.muted }}>总功率</span>
                <span style={{ 
                  color: '#8A5BFF',  // 紫色
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {latestData ? `${latestData.totalPower.toFixed(1)} ${unit}` : `-- ${unit}`}
                </span>
              </div>
            </div>
            
            {/* 冷却器功率 */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: currentTheme.background.elevated,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.muted}`,
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: currentTheme.foreground.muted }}>冷却器功率</span>
                <span style={{ 
                  color: '#44FF37',  // 绿色
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {latestData ? `${latestData.chillerPower.toFixed(1)} ${unit}` : `-- ${unit}`}
                </span>
                {powerDistribution && (
                  <span style={{ fontSize: '12px', color: currentTheme.foreground.muted }}>
                    {powerDistribution.chillerPercentage}%
                  </span>
                )}
              </div>
            </div>
            
            {/* 泵功率 */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: currentTheme.background.elevated,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.muted}`,
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: currentTheme.foreground.muted }}>泵功率</span>
                <span style={{ 
                  color: '#33A0FF',  // 蓝色
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {latestData ? `${latestData.pumpPower.toFixed(1)} ${unit}` : `-- ${unit}`}
                </span>
                {powerDistribution && (
                  <span style={{ fontSize: '12px', color: currentTheme.foreground.muted }}>
                    {powerDistribution.pumpPercentage}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* 状态和更新信息 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: currentTheme.background.secondary,
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          {showStatus && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 
                  currentStatus === 'optimal' ? '#67D75E' :
                  currentStatus === 'normal' ? '#33A0FF' :
                  currentStatus === 'warning' ? '#FECC36' : '#FF3939'
              }} />
              <span style={{ color: currentTheme.foreground.muted }}>
                {currentStatus === 'optimal' ? '功率稳定' :
                 currentStatus === 'normal' ? '正常运行' :
                 currentStatus === 'warning' ? '功率波动' : '异常变化'}
              </span>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: currentTheme.foreground.muted
          }}>
            <span>数据点: {data.length}</span>
            
            {lastUpdated && (
              <span>
                更新于 {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

PowerMonitoringChart.displayName = 'PowerMonitoringChart'

// ===========================================
// 双线图表 (Dual Line Chart) - 最新 Figma 设计
// ===========================================

export interface DualLineData {
  /** 时间点 (可以是时间戳或序号) */
  time: number
  /** 主线数值 (蓝色渐变实线) */
  primaryValue: number
  /** 设定点数值 (白色虚线) */
  setpointValue: number
  /** 数据点标识 */
  id?: string
}

export interface DualLineChartProps extends BusinessChartProps {
  /** 双线数据 */
  data: DualLineData[]
  /** 数值单位 */
  unit?: string
  /** X轴标签 (时间标签) */
  timeLabels?: string[]
  /** Y轴范围 [min, max] */
  valueRange?: [number, number]
  /** 主线名称 */
  primaryLineLabel?: string
  /** 设定点线名称 */
  setpointLineLabel?: string
  /** 图表标题 */
  chartTitle?: string
  /** 数据点点击回调 */
  onDataPointClick?: (data: DualLineData, lineType: 'primary' | 'setpoint') => void
}

export const DualLineChart = React.forwardRef<SVGSVGElement, DualLineChartProps>(
  ({ 
    data,
    unit = '',
    timeLabels,
    valueRange,
    primaryLineLabel = 'Primary Line',
    setpointLineLabel = 'Set Point',
    chartTitle = 'Dual Line Chart',
    size = 'md',
    theme = 'light',
    showStatus = false,
    lastUpdated,
    onDataPointClick,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 准备线形图数据系列 (基于最新 Figma 设计)
    const series: LineDataSeries[] = [
      // 主线 - 蓝色到青色渐变，实线 (匹配 Figma "Actual Energy")
      {
        name: primaryLineLabel,
        semantic: 'actual_energy',
        data: data.map(item => ({
          x: item.time,
          y: item.primaryValue,
          id: `primary-${item.id || item.time}`
        })),
        showPoints: true,
        strokeDasharray: undefined  // 实线
      },
      // 设定点线 - 白色虚线 (匹配 Figma "Predicted Energy")
      {
        name: setpointLineLabel,
        semantic: 'predicted_energy',
        data: data.map(item => ({
          x: item.time,
          y: item.setpointValue,
          id: `setpoint-${item.id || item.time}`
        })),
        showPoints: false,
        strokeDasharray: '2,4'  // 匹配 Figma 虚线样式
      }
    ]
    
    // 计算数值范围
    const allValues = data.flatMap(d => [d.primaryValue, d.setpointValue])
    const calculatedValueRange: [number, number] = valueRange || [
      Math.min(...allValues) * 0.9,
      Math.max(...allValues) * 1.1
    ]
    
    // 点击处理
    const handlePointClick = (point: LineDataPoint, seriesIndex: number) => {
      const matchingData = data.find(d => d.time === point.x)
      if (matchingData && onDataPointClick) {
        const lineType = seriesIndex === 0 ? 'primary' : 'setpoint'
        onDataPointClick(matchingData, lineType)
      }
      onDataClick?.(point.y)
    }
    
    // 获取最新数据
    const latestData = data.length > 0 ? data[data.length - 1] : null
    
    return (
      <div className={`hvac-dual-line-chart ${className}`}>
        <LineChart
          ref={ref}
          series={series}
          xRange={data.length > 0 ? [Math.min(...data.map(d => d.time)), Math.max(...data.map(d => d.time))] : [0, 10]}
          yRange={calculatedValueRange}
          xLabels={timeLabels}
          yLabels={calculatedValueRange.map((val, index, arr) => 
            index === 0 || index === arr.length - 1 ? `${val.toFixed(1)}${unit}` : ''
          )}
          size={size}
          theme={theme}
          title={chartTitle}
          showGridLines={true}
          showLegend={true}
          legendPosition="top"
          animated={true}
          onPointClick={handlePointClick}
          {...props}
        />
        
        {/* 数值展示 */}
        {latestData && (
          <div style={{
            marginTop: '16px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            {/* 主线当前值 */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: currentTheme.background.elevated,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.muted}`,
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: currentTheme.foreground.muted }}>{primaryLineLabel}</span>
                <span style={{ 
                  color: '#33A0FF',  // 蓝色
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {`${latestData.primaryValue.toFixed(1)} ${unit}`}
                </span>
              </div>
            </div>
            
            {/* 设定点当前值 */}
            <div style={{
              padding: '12px 16px',
              backgroundColor: currentTheme.background.elevated,
              borderRadius: '8px',
              border: `1px solid ${currentTheme.border.muted}`,
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: currentTheme.foreground.muted }}>{setpointLineLabel}</span>
                <span style={{ 
                  color: '#67D75E',  // 绿色
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  {`${latestData.setpointValue.toFixed(1)} ${unit}`}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* 状态和更新信息 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: currentTheme.background.secondary,
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          {showStatus && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#33A0FF'
              }} />
              <span style={{ color: currentTheme.foreground.muted }}>
                双线监控
              </span>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: currentTheme.foreground.muted
          }}>
            <span>数据点: {data.length}</span>
            
            {lastUpdated && (
              <span>
                更新于 {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

DualLineChart.displayName = 'DualLineChart'

// ===========================================
// RT 效率分布图表 (RT Efficiency Distribution Chart)
// ===========================================

export interface RTEfficiencyData {
  /** 时间点或 RT 值 */
  rtValue: number
  /** 效率值 */
  efficiency: number
  /** 数据点标识 */
  id?: string
  /** 自定义标签 */
  label?: string
}

export interface RTEfficiencyChartProps extends BusinessChartProps {
  /** RT 效率数据 */
  data: RTEfficiencyData[]
  /** 效率单位 */
  unit?: string
  /** 图表副标题 */
  subtitle?: string
  /** X轴标签 (RT 值标签) */
  rtLabels?: string[]
  /** Y轴范围 [min, max] */
  efficiencyRange?: [number, number]
  /** 显示基准线 */
  showBaseline?: boolean
  /** 数据点点击回调 */
  onDataPointClick?: (data: RTEfficiencyData, index: number) => void
}

export const RTEfficiencyChart = React.forwardRef<SVGSVGElement, RTEfficiencyChartProps>(
  ({ 
    data,
    unit = '',
    subtitle = '(by hour)',
    rtLabels,
    efficiencyRange,
    showBaseline = true,
    size = 'md',
    theme = 'light',
    showStatus = false,
    lastUpdated,
    onDataPointClick,
    onDataClick,
    className = '',
    ...props 
  }, ref) => {
    
    const currentTheme = themeTokens[theme]
    
    // 准备柱状图数据
    const columnData = data.map(item => ({
      x: item.rtValue,
      y: item.efficiency,
      id: item.id || item.rtValue.toString(),
      label: item.label || item.rtValue.toString()
    }))
    
    // 计算效率范围
    const calculatedEfficiencyRange: [number, number] = efficiencyRange || [
      0,
      Math.max(...data.map(d => d.efficiency)) * 1.2
    ]
    
    // 点击处理
    const handleBarClick = (point: any, index: number) => {
      const matchingData = data[index]
      if (matchingData && onDataPointClick) {
        onDataPointClick(matchingData, index)
      }
      onDataClick?.(point.y)
    }
    
    // 获取最新数据统计
    const avgEfficiency = data.length > 0 ? 
      (data.reduce((sum, d) => sum + d.efficiency, 0) / data.length) : 0
    const maxEfficiency = data.length > 0 ? 
      Math.max(...data.map(d => d.efficiency)) : 0
    const minEfficiency = data.length > 0 ? 
      Math.min(...data.map(d => d.efficiency)) : 0
    
    return (
      <div className={`hvac-rt-efficiency-chart ${className}`}>
        <ColumnChart
          ref={ref}
          data={columnData}
          xLabels={rtLabels || data.map(d => d.rtValue.toString())}
          yRange={calculatedEfficiencyRange}
          semantic="rt_efficiency_distribution"
          size={size}
          theme={theme}
          title={`RT Efficiency Distribution History ${subtitle}`}
          showGridLines={true}
          showDataLabels={true}
          labelFormatter={(value) => value.toFixed(1)}
          animated={true}
          onBarClick={handleBarClick}
          {...props}
        />
        
        {/* 效率统计信息 */}
        <div style={{
          marginTop: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px'
        }}>
          {/* 平均效率 */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: currentTheme.background.elevated,
            borderRadius: '8px',
            border: `1px solid ${currentTheme.border.muted}`,
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: currentTheme.foreground.muted }}>平均效率</span>
              <span style={{ 
                color: '#33A0FF',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                {avgEfficiency.toFixed(2)} {unit}
              </span>
            </div>
          </div>
          
          {/* 最高效率 */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: currentTheme.background.elevated,
            borderRadius: '8px',
            border: `1px solid ${currentTheme.border.muted}`,
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: currentTheme.foreground.muted }}>最高效率</span>
              <span style={{ 
                color: '#67D75E',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                {maxEfficiency.toFixed(2)} {unit}
              </span>
            </div>
          </div>
          
          {/* 最低效率 */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: currentTheme.background.elevated,
            borderRadius: '8px',
            border: `1px solid ${currentTheme.border.muted}`,
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: currentTheme.foreground.muted }}>最低效率</span>
              <span style={{ 
                color: '#E5A156',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                {minEfficiency.toFixed(2)} {unit}
              </span>
            </div>
          </div>
        </div>
        
        {/* 状态和更新信息 */}
        <div style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: currentTheme.background.secondary,
          borderRadius: '6px',
          fontSize: '12px'
        }}>
          {showStatus && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#33A0FF'
              }} />
              <span style={{ color: currentTheme.foreground.muted }}>
                RT 效率监控
              </span>
            </div>
          )}
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: currentTheme.foreground.muted
          }}>
            <span>数据点: {data.length}</span>
            
            {lastUpdated && (
              <span>
                更新于 {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
)

RTEfficiencyChart.displayName = 'RTEfficiencyChart'

// ===========================================
// 导出
// ===========================================

export {
  EnergyReductionChart,
  PerformanceScoreChart,
  TemperatureRangeChart,
  PlantConsumptionChart,
  FlowMonitoringChart,
  PowerMonitoringChart,
  DualLineChart,
  RTEfficiencyChart,
  ChartGrid
}

export default {
  EnergyReductionChart,
  PerformanceScoreChart,
  TemperatureRangeChart,
  PlantConsumptionChart,
  FlowMonitoringChart,
  PowerMonitoringChart,
  DualLineChart,
  ChartGrid
}