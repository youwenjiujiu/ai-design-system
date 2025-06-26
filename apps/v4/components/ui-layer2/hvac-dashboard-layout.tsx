/**
 * HVAC AI 仪表板布局组件
 * 
 * 基于企业级设计规范
 * 职责：
 * - 提供完整的 HVAC 监控仪表板布局
 * - 集成所有图表和控制组件
 * - 支持响应式设计和模块化配置
 * - 实现数据流和状态管理
 */

import React, { useState, useEffect } from 'react'
import { 
  EnergyReductionChart,
  PerformanceScoreChart,
  TemperatureRangeChart,
  PlantConsumptionChart,
  FlowMonitoringChart,
  PowerMonitoringChart,
  DualLineChart,
  ChartGrid
} from './hvac-charts'
import { HVACControlPanel, figmaHVACConfig, type HVACCardData } from './hvac-control-panel'
import { ChartLegend, figmaLegendConfigs } from '../ui-layer1/chart-legend'
import { 
  type Theme, 
  type ChartSize, 
  themeTokens,
  chartTypography 
} from '../ui-layer1/design-tokens-simple'

// ===========================================
// 仪表板布局接口
// ===========================================

export interface DashboardSection {
  /** 区域ID */
  id: string
  /** 区域标题 */
  title: string
  /** 区域类型 */
  type: 'chart' | 'control' | 'status' | 'overview'
  /** 网格位置 */
  gridArea: string
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认折叠状态 */
  defaultCollapsed?: boolean
}

export interface HVACDashboardLayoutProps {
  /** 主题 */
  theme?: Theme
  /** 尺寸 */
  size?: ChartSize
  /** 是否显示实时动画 */
  animated?: boolean
  /** 是否显示图例 */
  showLegends?: boolean
  /** 自定义区域配置 */
  sections?: DashboardSection[]
  /** 数据更新回调 */
  onDataUpdate?: (data: any) => void
  /** 区域点击回调 */
  onSectionClick?: (sectionId: string) => void
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

// ===========================================
// 仪表板头部组件
// ===========================================

interface DashboardHeaderProps {
  theme: Theme
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  theme, 
  title = "HVAC AI 监控系统", 
  subtitle = "实时设备监控与智能控制平台",
  actions 
}) => {
  const currentTheme = themeTokens[theme]
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 32px',
      borderBottom: `1px solid ${currentTheme.border.default}`,
      backgroundColor: currentTheme.background.primary
    }}>
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '28px',
          fontWeight: '600',
          color: currentTheme.foreground.primary,
          fontFamily: chartTypography.title.fontFamily
        }}>
          {title}
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '14px',
          color: currentTheme.foreground.muted,
          fontFamily: chartTypography.title.fontFamily
        }}>
          {subtitle}
        </p>
      </div>
      
      {actions && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {actions}
        </div>
      )}
    </div>
  )
}

// ===========================================
// 仪表板区域组件
// ===========================================

interface DashboardSectionProps {
  section: DashboardSection
  theme: Theme
  children: React.ReactNode
  onSectionClick?: (sectionId: string) => void
}

const DashboardSectionComponent: React.FC<DashboardSectionProps> = ({ 
  section, 
  theme, 
  children, 
  onSectionClick 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(section.defaultCollapsed || false)
  const currentTheme = themeTokens[theme]
  
  const handleHeaderClick = () => {
    if (section.collapsible) {
      setIsCollapsed(!isCollapsed)
    }
    onSectionClick?.(section.id)
  }
  
  return (
    <div style={{
      gridArea: section.gridArea,
      backgroundColor: currentTheme.background.elevated,
      border: `1px solid ${currentTheme.border.default}`,
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease'
    }}>
      {/* 区域头部 */}
      <div 
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${currentTheme.border.default}`,
          cursor: section.collapsible ? 'pointer' : 'default',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        onClick={handleHeaderClick}
      >
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          fontWeight: '500',
          color: currentTheme.foreground.primary,
          fontFamily: chartTypography.title.fontFamily
        }}>
          {section.title}
        </h3>
        
        {section.collapsible && (
          <div style={{
            transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease',
            color: currentTheme.foreground.muted
          }}>
            ▼
          </div>
        )}
      </div>
      
      {/* 区域内容 */}
      {!isCollapsed && (
        <div style={{
          flex: 1,
          padding: '20px',
          overflow: 'auto'
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ===========================================
// 状态卡片组件
// ===========================================

interface StatusCardProps {
  title: string
  value: string | number
  unit?: string
  status: 'optimal' | 'normal' | 'warning' | 'critical'
  theme: Theme
  trend?: 'up' | 'down' | 'stable'
  onClick?: () => void
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  title, 
  value, 
  unit, 
  status, 
  theme, 
  trend,
  onClick 
}) => {
  const currentTheme = themeTokens[theme]
  
  const getStatusColor = () => {
    switch (status) {
      case 'optimal': return '#67D75E'
      case 'normal': return '#33A0FF'
      case 'warning': return '#E1A156'
      case 'critical': return '#FF6B6B'
      default: return currentTheme.foreground.muted
    }
  }
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗'
      case 'down': return '↘'
      case 'stable': return '→'
      default: return ''
    }
  }
  
  return (
    <div 
      style={{
        padding: '16px',
        backgroundColor: currentTheme.background.secondary,
        borderRadius: '6px',
        border: `1px solid ${currentTheme.border.muted}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = currentTheme.background.elevated
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = currentTheme.background.secondary
      }}
    >
      <div style={{
        fontSize: '12px',
        color: currentTheme.foreground.muted,
        marginBottom: '4px',
        fontFamily: chartTypography.title.fontFamily
      }}>
        {title}
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
        marginBottom: '4px'
      }}>
        <span style={{
          fontSize: '20px',
          fontWeight: '600',
          color: getStatusColor(),
          fontFamily: chartTypography.title.fontFamily
        }}>
          {value}
        </span>
        {unit && (
          <span style={{
            fontSize: '12px',
            color: currentTheme.foreground.muted,
            fontFamily: chartTypography.title.fontFamily
          }}>
            {unit}
          </span>
        )}
      </div>
      
      {trend && (
        <div style={{
          fontSize: '12px',
          color: getStatusColor(),
          fontFamily: chartTypography.title.fontFamily
        }}>
          {getTrendIcon()} {status}
        </div>
      )}
    </div>
  )
}

// ===========================================
// 主仪表板布局组件
// ===========================================

export const HVACDashboardLayout: React.FC<HVACDashboardLayoutProps> = ({
  theme = 'dark',
  size = 'md',
  animated = true,
  showLegends = true,
  sections,
  onDataUpdate,
  onSectionClick,
  className = '',
  style
}) => {
  const currentTheme = themeTokens[theme]
  const [realTimeData, setRealTimeData] = useState({
    energyReduction: 76,
    performanceScore: 83,
    temperature: 22.8,
    plantConsumption: [
      { type: 'ch', consumption: 125, cost: 50.2 },
      { type: 'ct', consumption: 72, cost: 19.8 },
      { type: 'chp', consumption: 98, cost: 36.5 },
      { type: 'cdp', consumption: 85, cost: 24.1 }
    ],
    flowMonitoring: [
      { time: 0, actualFlow: 38, setpoint: 35, id: '0' },
      { time: 1, actualFlow: 42, setpoint: 35, id: '1' },
      { time: 2, actualFlow: 36, setpoint: 35, id: '2' },
      { time: 3, actualFlow: 39, setpoint: 35, id: '3' },
      { time: 4, actualFlow: 41, setpoint: 35, id: '4' },
      { time: 5, actualFlow: 37, setpoint: 35, id: '5' }
    ],
    dualLineData: [
      { time: 0, primaryValue: 45, setpointValue: 42, id: '0' },
      { time: 1, primaryValue: 48, setpointValue: 42, id: '1' },
      { time: 2, primaryValue: 46, setpointValue: 42, id: '2' },
      { time: 3, primaryValue: 41, setpointValue: 42, id: '3' },
      { time: 4, primaryValue: 44, setpointValue: 42, id: '4' },
      { time: 5, primaryValue: 49, setpointValue: 42, id: '5' }
    ],
    systemStatus: {
      totalDevices: 8,
      onlineDevices: 7,
      alerts: 2,
      efficiency: 87
    },
    lastUpdated: new Date()
  })

  // 模拟实时数据更新
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = {
          ...prev,
          energyReduction: Math.max(60, Math.min(95, prev.energyReduction + (Math.random() - 0.5) * 4)),
          performanceScore: Math.max(70, Math.min(100, prev.performanceScore + (Math.random() - 0.5) * 6)),
          temperature: Math.max(20, Math.min(26, prev.temperature + (Math.random() - 0.5) * 0.8)),
          plantConsumption: prev.plantConsumption.map(item => ({
            ...item,
            consumption: Math.max(60, Math.min(140, item.consumption + (Math.random() - 0.5) * 8)),
            cost: Math.max(15, Math.min(55, item.cost + (Math.random() - 0.5) * 3))
          })),
          flowMonitoring: prev.flowMonitoring.map((item, index) => ({
            ...item,
            actualFlow: Math.max(25, Math.min(50, item.actualFlow + (Math.random() - 0.5) * 5)),
            setpoint: 35 + Math.sin(Date.now() / 12000 + index) * 2
          })),
          dualLineData: prev.dualLineData.map((item, index) => ({
            ...item,
            primaryValue: Math.max(35, Math.min(55, item.primaryValue + (Math.random() - 0.5) * 6)),
            setpointValue: 42 + Math.sin(Date.now() / 18000 + index) * 3
          })),
          systemStatus: {
            ...prev.systemStatus,
            onlineDevices: Math.random() > 0.1 ? 7 : 6,
            alerts: Math.random() > 0.8 ? 3 : Math.random() > 0.3 ? 2 : 1,
            efficiency: Math.max(75, Math.min(95, prev.systemStatus.efficiency + (Math.random() - 0.5) * 3))
          },
          lastUpdated: new Date()
        }
        
        onDataUpdate?.(newData)
        return newData
      })
    }, 4000)
    
    return () => clearInterval(interval)
  }, [animated, onDataUpdate])

  // 默认区域配置
  const defaultSections: DashboardSection[] = [
    { id: 'overview', title: '系统概览', type: 'overview', gridArea: 'overview' },
    { id: 'plant-consumption', title: '设备消耗分析', type: 'chart', gridArea: 'consumption' },
    { id: 'energy-performance', title: '能效监控', type: 'chart', gridArea: 'energy' },
    { id: 'flow-monitoring', title: '流量监控', type: 'chart', gridArea: 'flow' },
    { id: 'power-monitoring', title: '功率监控', type: 'chart', gridArea: 'power' },
    { id: 'hvac-control', title: 'HVAC 控制', type: 'control', gridArea: 'control' },
    { id: 'status-cards', title: '状态概览', type: 'status', gridArea: 'status' }
  ]
  
  const activeSections = sections || defaultSections

  // 响应式网格布局
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateAreas: `
      "overview overview status"
      "consumption energy control"
      "flow power control"
    `,
    gridTemplateColumns: '1fr 1fr 400px',
    gridTemplateRows: 'auto 1fr 1fr',
    gap: '24px',
    padding: '24px 32px',
    minHeight: 'calc(100vh - 120px)',
    backgroundColor: currentTheme.background.primary
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: currentTheme.background.primary,
    minHeight: '100vh',
    fontFamily: chartTypography.title.fontFamily,
    ...style
  }

  // 控制面板操作
  const headerActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{
        padding: '6px 12px',
        backgroundColor: currentTheme.background.secondary,
        borderRadius: '4px',
        fontSize: '12px',
        color: '#67D75E'  // 统一使用绿色表示在线状态
      }}>
        ● 系统在线
      </div>
      
      <div style={{
        fontSize: '12px',
        color: currentTheme.foreground.muted
      }}>
        最后更新: {realTimeData.lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  )

  return (
    <div className={`hvac-dashboard-layout ${className}`} style={containerStyle}>
      {/* 仪表板头部 */}
      <DashboardHeader 
        theme={theme} 
        actions={headerActions}
      />

      {/* 主要内容区域 */}
      <div style={gridStyle}>
        {/* 系统概览 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'overview')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            <StatusCard
              title="能效评分"
              value={realTimeData.systemStatus.efficiency}
              unit="%"
              status="optimal"
              theme={theme}
              trend="up"
            />
            <StatusCard
              title="在线设备"
              value={`${realTimeData.systemStatus.onlineDevices}/${realTimeData.systemStatus.totalDevices}`}
              status={realTimeData.systemStatus.onlineDevices >= 7 ? "optimal" : "warning"}
              theme={theme}
              trend="stable"
            />
            <StatusCard
              title="当前温度"
              value={realTimeData.temperature.toFixed(1)}
              unit="°C"
              status="normal"
              theme={theme}
              trend="stable"
            />
            <StatusCard
              title="告警数量"
              value={realTimeData.systemStatus.alerts}
              status={realTimeData.systemStatus.alerts <= 1 ? "optimal" : "warning"}
              theme={theme}
              trend={realTimeData.systemStatus.alerts > 2 ? "up" : "stable"}
            />
          </div>
        </DashboardSectionComponent>

        {/* 设备消耗分析 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'plant-consumption')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <PlantConsumptionChart
            data={realTimeData.plantConsumption.map(item => ({
              ...item,
              unit: 'kW',
              currency: '$'
            }))}
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showCostLabels={true}
            onSegmentClick={(data) => console.log('Plant consumption clicked:', data)}
          />
        </DashboardSectionComponent>

        {/* 能效监控 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'energy-performance')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <EnergyReductionChart
              reductionPercentage={realTimeData.energyReduction}
              targetPercentage={75}
              ranking={2}
              totalParticipants={15}
              size="sm"
              theme={theme}
              lastUpdated={realTimeData.lastUpdated}
            />
            <PerformanceScoreChart
              score={realTimeData.performanceScore}
              scoreRange={[60, 100]}
              benchmark={80}
              systemName="HVAC System"
              size="sm"
              theme={theme}
              lastUpdated={realTimeData.lastUpdated}
            />
          </div>
        </DashboardSectionComponent>

        {/* 流量监控 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'flow-monitoring')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <FlowMonitoringChart
            data={realTimeData.flowMonitoring}
            unit="L/min"
            deviceName="主流量系统"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            onDataPointClick={(data, type) => console.log('Flow clicked:', data, type)}
          />
        </DashboardSectionComponent>

        {/* 功率监控 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'power-monitoring')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <DualLineChart
            data={realTimeData.dualLineData}
            unit="kW"
            chartTitle="能耗监控"
            primaryLineLabel="实际能耗"
            setpointLineLabel="预测能耗"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            onDataPointClick={(data, type) => console.log('Energy clicked:', data, type)}
          />
        </DashboardSectionComponent>

        {/* HVAC 控制面板 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'hvac-control')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <HVACControlPanel
              cards={figmaHVACConfig}
              theme={theme}
              size={size}
              onCardClick={(card) => console.log('HVAC card clicked:', card)}
              onControlAreaClick={() => console.log('Control area clicked')}
            />
          </div>
        </DashboardSectionComponent>

        {/* 状态概览 */}
        <DashboardSectionComponent
          section={activeSections.find(s => s.id === 'status-cards')!}
          theme={theme}
          onSectionClick={onSectionClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {showLegends && (
              <>
                <div>
                  <h4 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '14px',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                  }}>
                    能源监控图例
                  </h4>
                  <ChartLegend 
                    items={figmaLegendConfigs.energyMonitoring}
                    size="sm"
                    theme={theme}
                    orientation="vertical"
                    gap={16}
                  />
                </div>
                
                <div>
                  <h4 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '14px',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                  }}>
                    流量监控图例
                  </h4>
                  <ChartLegend 
                    items={figmaLegendConfigs.flowMonitoring}
                    size="sm"
                    theme={theme}
                    orientation="vertical"
                    gap={16}
                  />
                </div>
              </>
            )}
          </div>
        </DashboardSectionComponent>
      </div>
    </div>
  )
}

HVACDashboardLayout.displayName = 'HVACDashboardLayout'

export default HVACDashboardLayout