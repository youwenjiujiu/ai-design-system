/**
 * HVAC 图表组件演示页面
 * 
 * 展示所有图表组件的功能和用法示例
 * 基于 Figma 设计规范
 */

// 自动验证系统初始化
import '../validation-init'

import React, { useState, useEffect } from 'react'
import { 
  EnergyReductionChart, 
  PerformanceScoreChart, 
  TemperatureRangeChart,
  PlantConsumptionChart,
  FlowMonitoringChart,
  PowerMonitoringChart,
  DualLineChart,
  RTEfficiencyChart,
  ChartGrid 
} from '../ui-layer2/hvac-charts'
import { DonutChart, BarChart, MultiRingChart, LineChart, ColumnChart } from '../ui-layer1/chart-primitives'
import { ChartLegend, figmaLegendConfigs } from '../ui-layer1/chart-legend'
import { HVACControlPanel, figmaHVACConfig } from '../ui-layer2/hvac-control-panel'
import { HVACDashboardLayout } from '../ui-layer2/hvac-dashboard-layout'
import { ThemeTest } from './theme-test'
import ChartLabelsDemo from './chart-labels-demo'
import ChartFactoryDemo from './chart-factory-demo'
import { type ChartSize, type Theme } from '../ui-layer1/design-tokens-simple'

export const HVACChartsDemo: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [size, setSize] = useState<ChartSize>('md')
  const [animated, setAnimated] = useState(true)
  const [viewMode, setViewMode] = useState<'components' | 'dashboard' | 'theme-test' | 'labels' | 'factory'>('components')
  const [realTimeData, setRealTimeData] = useState({
    energyReduction: 75,
    performanceScore: 81,
    temperature: 23.5,
    plantConsumption: [
      { type: 'ch', consumption: 120, cost: 48.6 },
      { type: 'ct', consumption: 68, cost: 18.4 },
      { type: 'chp', consumption: 95, cost: 34.2 },
      { type: 'cdp', consumption: 82, cost: 22.8 }
    ],
    flowMonitoring: [
      { time: 0, actualFlow: 35, setpoint: 35, id: '0' },
      { time: 1, actualFlow: 40, setpoint: 35, id: '1' },
      { time: 2, actualFlow: 38, setpoint: 35, id: '2' },
      { time: 3, actualFlow: 33, setpoint: 35, id: '3' },
      { time: 4, actualFlow: 36, setpoint: 35, id: '4' },
      { time: 5, actualFlow: 42, setpoint: 35, id: '5' },
      { time: 6, actualFlow: 39, setpoint: 35, id: '6' },
      { time: 7, actualFlow: 34, setpoint: 35, id: '7' },
      { time: 8, actualFlow: 37, setpoint: 35, id: '8' },
      { time: 9, actualFlow: 41, setpoint: 35, id: '9' }
    ],
    dualLineData: [
      { time: 0, primaryValue: 42, setpointValue: 40, id: '0' },
      { time: 1, primaryValue: 45, setpointValue: 40, id: '1' },
      { time: 2, primaryValue: 43, setpointValue: 40, id: '2' },
      { time: 3, primaryValue: 38, setpointValue: 40, id: '3' },
      { time: 4, primaryValue: 41, setpointValue: 40, id: '4' },
      { time: 5, primaryValue: 47, setpointValue: 40, id: '5' },
      { time: 6, primaryValue: 44, setpointValue: 40, id: '6' },
      { time: 7, primaryValue: 39, setpointValue: 40, id: '7' },
      { time: 8, primaryValue: 42, setpointValue: 40, id: '8' },
      { time: 9, primaryValue: 46, setpointValue: 40, id: '9' }
    ],
    rtEfficiencyData: [
      { x: '0.8', y: 0.8, id: '1', label: '0.8' },
      { x: '1.0', y: 1.0, id: '2', label: '1.0' },
      { x: '1.2', y: 1.2, id: '3', label: '1.2' },
      { x: '1.4', y: 1.4, id: '4', label: '1.4' },
      { x: '1.1', y: 1.1, id: '5', label: '1.1' },
      { x: '1.0', y: 1.0, id: '6', label: '1.0' }
    ],
    lastUpdated: new Date()
  })

  // 模拟实时数据更新
  useEffect(() => {
    if (!animated) return
    
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        energyReduction: Math.max(0, Math.min(100, prev.energyReduction + (Math.random() - 0.5) * 5)),
        performanceScore: Math.max(20, Math.min(100, prev.performanceScore + (Math.random() - 0.5) * 8)),
        temperature: Math.max(18, Math.min(28, prev.temperature + (Math.random() - 0.5) * 1)),
        plantConsumption: prev.plantConsumption.map(item => ({
          ...item,
          consumption: Math.max(50, Math.min(150, item.consumption + (Math.random() - 0.5) * 10)),
          cost: Math.max(10, Math.min(60, item.cost + (Math.random() - 0.5) * 4))
        })),
        flowMonitoring: prev.flowMonitoring.map((item, index) => ({
          ...item,
          actualFlow: Math.max(20, Math.min(50, item.actualFlow + (Math.random() - 0.5) * 6)),
          setpoint: 35 + Math.sin(Date.now() / 10000 + index) * 2  // 设定点缓慢变化
        })),
        dualLineData: prev.dualLineData.map((item, index) => ({
          ...item,
          primaryValue: Math.max(30, Math.min(60, item.primaryValue + (Math.random() - 0.5) * 8)),
          setpointValue: 40 + Math.sin(Date.now() / 15000 + index) * 3  // 设定点线缓慢变化
        })),
        rtEfficiencyData: prev.rtEfficiencyData.map((item) => ({
          ...item,
          y: Math.max(0.6, Math.min(1.6, item.y + (Math.random() - 0.5) * 0.2))  // RT效率数据变化
        })),
        lastUpdated: new Date()
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [animated])

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#0A0A0A' : '#FFFFFF',
    color: theme === 'dark' ? '#FFFFFF' : '#0A0A0A',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'Scto Grotesk A, system-ui, sans-serif'
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`,
    paddingBottom: '16px'
  }

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
    borderRadius: '8px'
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: '48px'
  }

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: theme === 'dark' ? '#FFFFFF' : '#0A0A0A'
  }

  // 如果是仪表板模式，直接渲染仪表板布局
  if (viewMode === 'dashboard') {
    return (
      <HVACDashboardLayout
        theme={theme}
        size={size}
        animated={animated}
        showLegends={true}
        onDataUpdate={(data) => console.log('Dashboard data updated:', data)}
        onSectionClick={(sectionId) => console.log('Section clicked:', sectionId)}
      />
    )
  }
  
  // 如果是主题测试模式，渲染主题测试组件
  if (viewMode === 'theme-test') {
    return <ThemeTest theme={theme} />
  }
  
  // 如果是标签系统模式，渲染标签演示组件
  if (viewMode === 'labels') {
    return <ChartLabelsDemo />
  }
  
  // 如果是图表工厂模式，渲染图表工厂演示组件
  if (viewMode === 'factory') {
    return <ChartFactoryDemo />
  }

  return (
    <div style={containerStyle}>
      {/* 页面标题 */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          HVAC Charts Demo
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>
          基于 Figma 设计规范的图表组件展示
        </p>
      </div>

      {/* 控制面板 */}
      <div style={controlsStyle}>
        <div>
          <label style={{ marginRight: '8px' }}>主题:</label>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as Theme)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div>
          <label style={{ marginRight: '8px' }}>尺寸:</label>
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value as ChartSize)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
        
        <div>
          <label style={{ marginRight: '8px' }}>
            <input 
              type="checkbox" 
              checked={animated} 
              onChange={(e) => setAnimated(e.target.checked)}
              style={{ marginRight: '4px' }}
            />
            实时动画
          </label>
        </div>
        
        <div>
          <label style={{ marginRight: '8px' }}>视图模式:</label>
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value as 'components' | 'dashboard' | 'theme-test' | 'labels' | 'factory')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            <option value="components">组件展示</option>
            <option value="dashboard">仪表板布局</option>
            <option value="theme-test">主题测试</option>
            <option value="labels">标签系统</option>
            <option value="factory">图表工厂</option>
          </select>
        </div>
      </div>

      {/* Layer 2 业务图表组件 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Layer 2 业务图表组件</h2>
        
        <ChartGrid theme={theme} columns={2} gap={24}>
          {/* 工厂消耗规划图表 */}
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
            showPercentages={false}
            onSegmentClick={(data, index) => console.log('Plant consumption clicked:', data)}
          />
          
          {/* 右侧图表组 */}
          <ChartGrid theme={theme} columns={1} gap={16}>
            {/* 能耗降低排名图表 */}
            <EnergyReductionChart
              reductionPercentage={realTimeData.energyReduction}
              targetPercentage={70}
              ranking={3}
              totalParticipants={12}
              size="sm"
              theme={theme}
              lastUpdated={realTimeData.lastUpdated}
              showStatus={true}
              onDataClick={(value) => console.log('Energy reduction clicked:', value)}
            />
            
            {/* 系统性能评分图表 */}
            <PerformanceScoreChart
              score={realTimeData.performanceScore}
              scoreRange={[29, 87]}
              benchmark={75}
              bestScore={95}
              systemName="HVAC Performance"
              size="sm"
              theme={theme}
              lastUpdated={realTimeData.lastUpdated}
              showStatus={true}
              onDataClick={(value) => console.log('Performance score clicked:', value)}
            />
            
            {/* 温度范围图表 */}
            <TemperatureRangeChart
              temperature={realTimeData.temperature}
              temperatureRange={[18, 28]}
              targetTemperature={22}
              unit="℃"
              zoneName="Office Zone A"
              size="sm"
              theme={theme}
              lastUpdated={realTimeData.lastUpdated}
              showStatus={true}
              onDataClick={(value) => console.log('Temperature clicked:', value)}
            />
          </ChartGrid>
        </ChartGrid>
      </div>

      {/* Figma 图例展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Figma 图例设计展示</h2>
        
        <div style={{
          padding: '24px',
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>
              能源监控图例 (基于 Figma SVG 设计)
            </h3>
            <ChartLegend 
              items={figmaLegendConfigs.energyMonitoring}
              size={size}
              theme={theme}
              gap={32}
            />
          </div>
          
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>
              流量监控图例
            </h3>
            <ChartLegend 
              items={figmaLegendConfigs.flowMonitoring}
              size={size}
              theme={theme}
              gap={32}
            />
          </div>
          
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '16px' }}>
              双线监控图例
            </h3>
            <ChartLegend 
              items={figmaLegendConfigs.dualLineMonitoring}
              size={size}
              theme={theme}
              gap={32}
            />
          </div>
        </div>
      </div>

      {/* 线形图表展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>线形图表展示</h2>
        
        <ChartGrid theme={theme} columns={2} gap={32}>
          {/* 流量监控图表 */}
          <FlowMonitoringChart
            data={realTimeData.flowMonitoring}
            unit="L/min"
            deviceName="Flow Monitoring System"
            actualFlowLabel="Actual Flow"
            setpointLabel="Current Set point"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
            onDataPointClick={(data, type) => console.log('Flow monitoring clicked:', data, type)}
          />
          
          {/* 双线图表 (最新 Figma 设计) */}
          <DualLineChart
            data={realTimeData.dualLineData}
            unit=""
            chartTitle="Energy Monitoring"
            primaryLineLabel="Actual Energy"
            setpointLineLabel="Predicted Energy"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
            onDataPointClick={(data, type) => console.log('Energy monitoring clicked:', data, type)}
          />
        </ChartGrid>
        
        {/* RT 效率分布图表 (新增 - 基于最新 Figma 设计) */}
        <div style={{ marginTop: '32px' }}>
          <RTEfficiencyChart
            data={realTimeData.rtEfficiencyData.map(item => ({
              rtValue: parseFloat(item.x),
              efficiency: item.y,
              id: item.id,
              label: item.label
            }))}
            unit=""
            subtitle="(by hour)"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
            showBaseline={true}
            onDataPointClick={(data, index) => console.log('RT efficiency clicked:', data, index)}
          />
        </div>
        
        {/* 功率监控图表 (单独一行) */}
        <div style={{ marginTop: '32px' }}>
          <PowerMonitoringChart
            data={realTimeData.flowMonitoring.map((item, index) => ({
              time: item.time,
              totalPower: item.actualFlow * 2.5,
              chillerPower: item.actualFlow * 1.8,
              pumpPower: item.actualFlow * 0.7,
              id: item.id
            }))}
            unit="kW"
            deviceName="Power Monitoring System"
            totalPowerLabel="Total Power"
            chillerPowerLabel="Chiller Power"
            pumpPowerLabel="Pump Power"
            size={size}
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
            showPowerStats={true}
            onDataPointClick={(data, type) => console.log('Power monitoring clicked:', data, type)}
          />
        </div>
      </div>

      {/* Layer 1 基础图表组件 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Layer 1 基础图表组件</h2>
        
        <ChartGrid theme={theme} columns={4} gap={24}>
          {/* 基础环形图 */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>基础环形图 (DonutChart)</h3>
            <ChartGrid theme={theme} columns={1} gap={16}>
              <DonutChart
                value={65}
                semantic="energy_efficiency"
                size="sm"
                theme={theme}
                title="能效"
                unitLabel="%"
                animated={animated}
              />
              <DonutChart
                value={realTimeData.energyReduction}
                semantic="energy_reduction"
                size="sm"
                theme={theme}
                title="节能"
                unitLabel="%"
                animated={animated}
              />
              <DonutChart
                value={78}
                semantic="performance_score"
                size="sm"
                theme={theme}
                title="外描边样式"
                unitLabel="%"
                animated={animated}
                showOuterStroke={true}
                outerStrokeOpacity={0.2}
              />
            </ChartGrid>
          </div>
          
          {/* 基础多环形图 */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>多环形图 (MultiRingChart)</h3>
            <MultiRingChart
              segments={[
                { value: 120, id: 'ch' },
                { value: 68, id: 'ct' },
                { value: 95, id: 'chp' },
                { value: 82, id: 'cdp' }
              ]}
              labels={[
                { primary: 'CH', secondary: '$48.6' },
                { primary: 'CT', secondary: '$18.4' },
                { primary: 'CHP', secondary: '$34.2' },
                { primary: 'CDP', secondary: '$22.8' }
              ]}
              semantic="consumption_planning"
              size="sm"
              theme={theme}
              title="Plant Consumption"
              showLabels={true}
              animated={animated}
              onSegmentClick={(segment, index) => console.log('Multi-ring clicked:', segment)}
            />
          </div>
          
          {/* 基础条形图 */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>基础条形图 (BarChart)</h3>
            <ChartGrid theme={theme} columns={1} gap={16}>
              <BarChart
                value={realTimeData.temperature}
                range={[16, 30]}
                semantic="temperature_range"
                size="sm"
                theme={theme}
                title="温度范围"
                unit="℃"
                showRangeLabels={true}
                showGridLines={true}
                animated={animated}
              />
              <BarChart
                value={realTimeData.performanceScore}
                range={[0, 100]}
                semantic="performance_score"
                size="sm"
                theme={theme}
                title="性能评分"
                unit=""
                showRangeLabels={true}
                showGridLines={true}
                animated={animated}
              />
            </ChartGrid>
          </div>
          
          {/* 基础柱状图 (新增 - 基于 Figma 设计) */}
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>基础柱状图 (ColumnChart)</h3>
            <ColumnChart
              data={realTimeData.rtEfficiencyData}
              semantic="rt_efficiency_distribution"
              size="sm"
              theme={theme}
              title="RT 效率分布"
              showDataLabels={true}
              showGridLines={true}
              animated={animated}
              yRange={[0, 2]}
              xLabels={['0.8', '1.0', '1.2', '1.4', '1.1', '1.0']}
              labelFormatter={(value) => value.toFixed(1)}
              onBarClick={(point, index) => console.log('Column clicked:', point, index)}
            />
          </div>
          
        </ChartGrid>
      </div>

      {/* 图表状态展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>图表状态展示</h2>
        
        <ChartGrid theme={theme} columns={4} gap={16}>
          {/* 不同状态的性能图表 */}
          <PerformanceScoreChart
            score={95}
            scoreRange={[0, 100]}
            systemName="优秀系统"
            size="sm"
            theme={theme}
            status="optimal"
            showStatus={true}
          />
          <PerformanceScoreChart
            score={75}
            scoreRange={[0, 100]}
            systemName="正常系统"
            size="sm"
            theme={theme}
            status="normal"
            showStatus={true}
          />
          <PerformanceScoreChart
            score={55}
            scoreRange={[0, 100]}
            systemName="警告系统"
            size="sm"
            theme={theme}
            status="warning"
            showStatus={true}
          />
          <PerformanceScoreChart
            score={25}
            scoreRange={[0, 100]}
            systemName="严重系统"
            size="sm"
            theme={theme}
            status="critical"
            showStatus={true}
          />
        </ChartGrid>
      </div>

      {/* 大尺寸展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>大尺寸图表展示</h2>
        
        <ChartGrid theme={theme} columns={2} gap={32}>
          <EnergyReductionChart
            reductionPercentage={realTimeData.energyReduction}
            targetPercentage={80}
            ranking={1}
            totalParticipants={24}
            size="lg"
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
          />
          
          <TemperatureRangeChart
            temperature={realTimeData.temperature}
            temperatureRange={[15, 30]}
            targetTemperature={23}
            unit="℃"
            zoneName="Main Conference Room"
            size="lg"
            theme={theme}
            lastUpdated={realTimeData.lastUpdated}
            showStatus={true}
          />
        </ChartGrid>
      </div>

      {/* HVAC 控制面板展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>HVAC 控制面板</h2>
        
        <div style={{
          padding: '24px',
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <HVACControlPanel
            cards={figmaHVACConfig}
            theme={theme}
            size={size}
            onCardClick={(card) => console.log('HVAC card clicked:', card)}
            onControlAreaClick={() => console.log('Control area clicked')}
            style={{
              border: theme === 'dark' ? '1px solid #333' : '1px solid #E5E5E5'
            }}
          />
        </div>
      </div>

      {/* 使用指南 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>组件使用指南</h2>
        
        <div style={{
          padding: '24px',
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ marginTop: 0 }}>Layer 1 基础组件</h3>
          <ul>
            <li><strong>DonutChart</strong>: 环形进度图，支持外部描边和主题适配 (Figma: 23639:5065)</li>
            <li><strong>BarChart</strong>: 条形图，适用于范围内数值、对比展示</li>
            <li><strong>LineChart</strong>: 线形图，支持多序列数据和渐变样式</li>
            <li><strong>MultiRingChart</strong>: 多环形图，适用于分类数据对比</li>
            <li><strong>ColumnChart</strong>: 柱状图，基于 Figma 设计的渐变柱状图，带连接线</li>
            <li><strong>ChartLegend</strong>: 图例组件，精确匹配 Figma 设计规范</li>
            <li><strong>图表标签系统</strong>: ValueLabel、RangeLabel、AxisLabel、DataPointLabel、Tooltip</li>
          </ul>
          
          <h3>Layer 2 业务组件</h3>
          <ul>
            <li><strong>EnergyReductionChart</strong>: 能耗降低排名，集成排名和目标对比</li>
            <li><strong>PerformanceScoreChart</strong>: 系统性能评分，支持基准和历史对比</li>
            <li><strong>TemperatureRangeChart</strong>: 温度范围图，支持舒适区间和目标温度</li>
            <li><strong>PlantConsumptionChart</strong>: 工厂消耗规划，多设备成本分析和效率排名</li>
            <li><strong>FlowMonitoringChart</strong>: 流量监控图表，实际流量与设定点对比</li>
            <li><strong>PowerMonitoringChart</strong>: 功率监控图表，多设备功率趋势分析</li>
            <li><strong>DualLineChart</strong>: 双线图表，基于最新 Figma 设计的简洁双线监控</li>
            <li><strong>RTEfficiencyChart</strong>: RT 效率分布图表，带连接线的柱状图展示效率历史</li>
            <li><strong>HVACControlPanel</strong>: HVAC 控制面板，基于 Figma 设计的设备状态和控制界面</li>
            <li><strong>ChartFactory</strong>: 智能图表工厂，根据业务数据自动生成最适合的图表</li>
            <li><strong>ChartComposer</strong>: 图表组合器，支持多图表联动和仪表板布局</li>
          </ul>
          
          <h3>企业级布局组件</h3>
          <ul>
            <li><strong>HVACDashboardLayout</strong>: 完整的 HVAC 监控仪表板布局</li>
            <li><strong>DashboardHeader</strong>: 仪表板头部导航和状态展示</li>
            <li><strong>StatusCard</strong>: 状态概览卡片，支持趋势指示</li>
            <li><strong>DashboardSection</strong>: 可折叠的区域容器组件</li>
          </ul>
          
          <h3>设计特点</h3>
          <ul>
            <li>基于 Figma 精确规范 (23910:4724, 23258:3904, 23258:3477, 23639:5065, 23901:2855)</li>
            <li>支持明暗主题自动适配</li>
            <li>业务语义自动映射颜色和渐变</li>
            <li>响应式尺寸系统 (sm/md/lg)</li>
            <li>实时状态感知和交互回调</li>
            <li>企业级仪表板布局系统</li>
            <li>模块化和可配置的区域组件</li>
            <li>完整的图表标签系统和数值格式化</li>
            <li>智能标签布局和碰撞检测</li>
            <li>图表工厂系统和智能类型推荐</li>
            <li>业务数据适配器和验证系统</li>
            <li>多图表组合和联动功能</li>
          </ul>
          
          <h3>使用模式</h3>
          <ul>
            <li><strong>组件展示模式</strong>: 展示所有单独的图表组件和功能</li>
            <li><strong>仪表板模式</strong>: 完整的企业级监控界面，集成所有组件</li>
            <li><strong>主题测试模式</strong>: 测试明暗主题切换效果</li>
            <li><strong>标签系统模式</strong>: 展示完整的图表标签和格式化功能</li>
            <li><strong>图表工厂模式</strong>: 展示智能图表生成和业务数据适配</li>
            <li><strong>响应式布局</strong>: 自动适配不同屏幕尺寸</li>
            <li><strong>实时数据流</strong>: 支持实时数据更新和状态同步</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HVACChartsDemo