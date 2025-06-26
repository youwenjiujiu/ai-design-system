/**
 * 图表工厂系统演示页面
 * 
 * 展示图表工厂、数据适配器和图表组合器的功能
 */

import React, { useState } from 'react'
import { 
  ChartFactory,
  ChartComposer,
  BusinessDataAdapter,
  predefinedConfigs,
  type BusinessDataSet,
  type BusinessDataType,
  type BusinessDataPoint,
  type BusinessChartConfig
} from '../ui-layer2/chart-factory'
import { type ChartSize, type Theme } from '../ui-layer1/design-tokens-simple'

export const ChartFactoryDemo: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [size, setSize] = useState<ChartSize>('md')
  const [selectedDataType, setSelectedDataType] = useState<BusinessDataType>('energy_reduction')
  const [autoRecommend, setAutoRecommend] = useState(true)

  // 示例业务数据集
  const sampleDataSets: Record<BusinessDataType, BusinessDataSet> = {
    energy_reduction: {
      type: 'energy_reduction',
      title: '节能减排效果',
      description: '当前系统的节能减排百分比',
      data: [{
        id: 'energy-1',
        value: 75.5,
        target: 70,
        metadata: { ranking: 3, totalParticipants: 12 }
      }]
    },
    
    performance_score: {
      type: 'performance_score',
      title: '系统性能评分',
      description: 'HVAC系统综合性能评估',
      data: [{
        id: 'perf-1',
        value: 81,
        min: 29,
        max: 87,
        target: 75,
        metadata: { bestScore: 95 }
      }]
    },
    
    temperature_range: {
      type: 'temperature_range',
      title: '办公区温度监控',
      description: '实时温度与舒适范围对比',
      data: [{
        id: 'temp-1',
        value: 23.5,
        min: 18,
        max: 28,
        target: 22,
        unit: '°C'
      }]
    },
    
    plant_consumption: {
      type: 'plant_consumption',
      title: '设备功耗分析',
      description: '各设备能耗占比和成本分析',
      data: [
        { id: 'ch', value: 120, secondaryValue: 48.6, category: 'CH', label: '冷水机组' },
        { id: 'ct', value: 68, secondaryValue: 18.4, category: 'CT', label: '冷却塔' },
        { id: 'chp', value: 95, secondaryValue: 34.2, category: 'CHP', label: '热泵' },
        { id: 'cdp', value: 82, secondaryValue: 22.8, category: 'CDP', label: '循环泵' }
      ]
    },
    
    flow_monitoring: {
      type: 'flow_monitoring',
      title: '流量监控趋势',
      description: '实际流量与设定值的实时对比',
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `flow-${i}`,
        value: 35 + Math.sin(i * 0.5) * 5 + Math.random() * 3,
        secondaryValue: 35 + Math.sin(i * 0.3) * 2,
        timestamp: Date.now() - (9 - i) * 60000,
        label: `${i}min`
      }))
    },
    
    rt_efficiency: {
      type: 'rt_efficiency',
      title: 'RT效率分布',
      description: '设备效率历史分布情况',
      data: [
        { id: 'rt1', value: 0.8, secondaryValue: 0.8, label: '0.8' },
        { id: 'rt2', value: 1.0, secondaryValue: 1.0, label: '1.0' },
        { id: 'rt3', value: 1.2, secondaryValue: 1.2, label: '1.2' },
        { id: 'rt4', value: 1.4, secondaryValue: 1.4, label: '1.4' },
        { id: 'rt5', value: 1.1, secondaryValue: 1.1, label: '1.1' },
        { id: 'rt6', value: 1.0, secondaryValue: 1.0, label: '1.0' }
      ]
    },
    
    generic_donut: {
      type: 'generic_donut',
      title: '通用环形图',
      description: '百分比数据展示',
      data: [{ id: 'donut-1', value: 65, max: 100 }]
    },
    
    generic_column: {
      type: 'generic_column',
      title: '通用柱状图',
      description: '多数据点对比',
      data: [
        { id: 'col1', value: 23, label: 'Q1' },
        { id: 'col2', value: 45, label: 'Q2' },
        { id: 'col3', value: 67, label: 'Q3' },
        { id: 'col4', value: 34, label: 'Q4' }
      ]
    },
    
    generic_bar: {
      type: 'generic_bar',
      title: '通用条形图',
      description: '范围内数值展示',
      data: [{ id: 'bar-1', value: 75, min: 0, max: 100 }]
    },
    
    generic_line: {
      type: 'generic_line',
      title: '通用线形图',
      description: '趋势数据展示',
      data: Array.from({ length: 8 }, (_, i) => ({
        id: `line-${i}`,
        value: 50 + Math.sin(i * 0.8) * 20 + Math.random() * 10,
        timestamp: Date.now() - (7 - i) * 3600000,
        label: `Day ${i + 1}`
      }))
    },
    
    generic_multi_ring: {
      type: 'generic_multi_ring',
      title: '通用多环图',
      description: '分类数据对比',
      data: [
        { id: 'ring1', value: 40, category: 'A', label: '类别A' },
        { id: 'ring2', value: 30, category: 'B', label: '类别B' },
        { id: 'ring3', value: 20, category: 'C', label: '类别C' },
        { id: 'ring4', value: 10, category: 'D', label: '类别D' }
      ]
    },
    
    power_monitoring: {
      type: 'power_monitoring',
      title: '功率监控',
      description: '设备功率趋势监控',
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `power-${i}`,
        value: 100 + Math.sin(i * 0.6) * 30 + Math.random() * 20,
        secondaryValue: 80 + Math.sin(i * 0.4) * 20,
        timestamp: Date.now() - (9 - i) * 60000,
        label: `${i}min`
      }))
    },
    
    dual_line_monitoring: {
      type: 'dual_line_monitoring',
      title: '双线监控',
      description: '实际值与预测值对比',
      data: Array.from({ length: 10 }, (_, i) => ({
        id: `dual-${i}`,
        value: 42 + Math.sin(i * 0.5) * 8 + Math.random() * 5,
        secondaryValue: 40 + Math.sin(i * 0.3) * 3,
        timestamp: Date.now() - (9 - i) * 60000,
        label: `${i}min`
      }))
    }
  }

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
    borderRadius: '8px',
    flexWrap: 'wrap'
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

  const demoItemStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`,
    marginBottom: '24px'
  }

  const codeStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#0A0A0A' : '#F5F5F5',
    border: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`,
    borderRadius: '4px',
    padding: '12px',
    fontFamily: 'monospace',
    fontSize: '12px',
    marginTop: '12px',
    overflow: 'auto'
  }

  // 获取当前选择的数据集
  const currentDataSet = sampleDataSets[selectedDataType]
  
  // 数据验证和统计
  const validation = BusinessDataAdapter.validate(currentDataSet)
  const stats = validation.valid ? BusinessDataAdapter.getStatistics(currentDataSet) : null
  const recommendedType = validation.valid ? BusinessDataAdapter.recommendChartType(currentDataSet) : null

  // 组合图表演示数据
  const dashboardDataSets = [
    sampleDataSets.energy_reduction,
    sampleDataSets.performance_score,
    sampleDataSets.temperature_range,
    sampleDataSets.plant_consumption
  ]

  return (
    <div style={containerStyle}>
      {/* 页面标题 */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Chart Factory Demo
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>
          图表工厂系统 - 智能图表生成和业务数据适配
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
          <label style={{ marginRight: '8px' }}>数据类型:</label>
          <select 
            value={selectedDataType} 
            onChange={(e) => setSelectedDataType(e.target.value as BusinessDataType)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            {Object.keys(sampleDataSets).map(type => (
              <option key={type} value={type}>
                {sampleDataSets[type as BusinessDataType].title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px' }}>
            <input 
              type="checkbox" 
              checked={autoRecommend} 
              onChange={(e) => setAutoRecommend(e.target.checked)}
              style={{ marginRight: '4px' }}
            />
            智能推荐
          </label>
        </div>
      </div>

      {/* 数据验证和统计 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>数据验证和统计</h2>
        
        <div style={demoItemStyle}>
          <h3 style={{ marginTop: 0, fontSize: '16px' }}>当前数据集: {currentDataSet.title}</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <strong>描述:</strong> {currentDataSet.description}
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <strong>数据验证:</strong> 
            <span style={{ color: validation.valid ? '#67D75E' : '#E53E3E', marginLeft: '8px' }}>
              {validation.valid ? '✓ 有效' : '✗ 无效'}
            </span>
            {!validation.valid && (
              <ul style={{ color: '#E53E3E', marginTop: '8px' }}>
                {validation.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          
          {stats && (
            <div style={{ marginBottom: '16px' }}>
              <strong>统计信息:</strong>
              <div style={{ marginLeft: '16px', marginTop: '8px' }}>
                <div>数据点数量: {stats.count}</div>
                <div>最小值: {stats.min.toFixed(2)}</div>
                <div>最大值: {stats.max.toFixed(2)}</div>
                <div>平均值: {stats.avg.toFixed(2)}</div>
                <div>总计: {stats.sum.toFixed(2)}</div>
              </div>
            </div>
          )}
          
          {recommendedType && (
            <div style={{ marginBottom: '16px' }}>
              <strong>推荐图表类型:</strong> 
              <span style={{ color: '#33A0FF', marginLeft: '8px' }}>
                {recommendedType}
              </span>
              {recommendedType !== selectedDataType && (
                <span style={{ color: '#E5A156', marginLeft: '8px' }}>
                  (与当前选择不同)
                </span>
              )}
            </div>
          )}
          
          <div style={codeStyle}>
            <pre>{JSON.stringify(currentDataSet, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* 图表工厂演示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>ChartFactory 组件演示</h2>
        
        <div style={demoItemStyle}>
          <h3 style={{ marginTop: 0, fontSize: '16px' }}>
            智能图表生成 {autoRecommend && recommendedType && `(推荐: ${recommendedType})`}
          </h3>
          
          <div style={{ marginBottom: '24px' }}>
            <ChartFactory
              dataSet={currentDataSet}
              size={size}
              theme={theme}
              forceType={autoRecommend ? undefined : selectedDataType}
              onDataClick={(dataPoint, index) => {
                console.log('数据点点击:', dataPoint, '索引:', index)
                alert(`点击了数据点: ${dataPoint.label || dataPoint.id} = ${dataPoint.value}`)
              }}
              onChartReady={(chartType) => {
                console.log('图表就绪:', chartType)
              }}
            />
          </div>
          
          <div style={codeStyle}>
            {`<ChartFactory
  dataSet={${JSON.stringify(currentDataSet, null, 2)}}
  size="${size}"
  theme="${theme}"
  ${autoRecommend ? '' : `forceType="${selectedDataType}"`}
  onDataClick={(dataPoint, index) => console.log(dataPoint, index)}
/>`}
          </div>
        </div>
      </div>

      {/* 预定义配置展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>预定义业务配置</h2>
        
        <div style={demoItemStyle}>
          <h3 style={{ marginTop: 0, fontSize: '16px' }}>
            {selectedDataType} 配置
          </h3>
          
          <div style={codeStyle}>
            <pre>{JSON.stringify(predefinedConfigs[selectedDataType], null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* 图表组合器演示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>ChartComposer 组件演示</h2>
        
        <div style={demoItemStyle}>
          <h3 style={{ marginTop: 0, fontSize: '16px' }}>仪表板布局组合</h3>
          
          <ChartComposer
            dataSets={dashboardDataSets}
            layout="dashboard"
            commonConfig={{
              size,
              theme,
              showTitles: true
            }}
            linkage={{
              enabled: true,
              syncSelection: true
            }}
            onDataClick={(dataPoint, dataSetIndex, pointIndex) => {
              console.log('组合图表数据点点击:', { dataPoint, dataSetIndex, pointIndex })
            }}
            onSelectionChange={(selectedPoints) => {
              console.log('选择变化:', selectedPoints)
            }}
          />
          
          <div style={codeStyle}>
            {`<ChartComposer
  dataSets={[energyData, performanceData, temperatureData, consumptionData]}
  layout="dashboard"
  commonConfig={{ size: "${size}", theme: "${theme}", showTitles: true }}
  linkage={{ enabled: true, syncSelection: true }}
  onDataClick={(dataPoint, dataSetIndex, pointIndex) => console.log(...)}
/>`}
          </div>
        </div>
      </div>

      {/* 所有图表类型展示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>所有图表类型展示</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {Object.entries(sampleDataSets).map(([type, dataSet]) => (
            <div key={type} style={demoItemStyle}>
              <h4 style={{ marginTop: 0, fontSize: '14px', color: '#33A0FF' }}>
                {type}
              </h4>
              <ChartFactory
                dataSet={dataSet}
                size="sm"
                theme={theme}
                onDataClick={(dataPoint) => {
                  console.log(`${type} 点击:`, dataPoint)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 使用指南 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>使用指南</h2>
        
        <div style={{
          padding: '24px',
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ marginTop: 0 }}>图表工厂系统特性</h3>
          <ul>
            <li><strong>ChartFactory</strong>: 智能图表生成，根据数据自动推荐最适合的图表类型</li>
            <li><strong>BusinessDataAdapter</strong>: 数据验证、清洗和统计分析工具</li>
            <li><strong>ChartComposer</strong>: 多图表组合布局，支持联动和同步</li>
            <li><strong>预定义配置</strong>: 针对 HVAC 业务场景优化的图表配置</li>
          </ul>
          
          <h3>智能推荐算法</h3>
          <ul>
            <li>单数据点 + 范围 → 条形图</li>
            <li>单数据点 + 百分比 → 环形图</li>
            <li>少量数据点 (≤6) + 分类 → 多环图</li>
            <li>少量数据点 (≤6) → 柱状图</li>
            <li>大量数据点 ({'>'}6) + 时间序列 → 线形图</li>
            <li>大量数据点 ({'>'}6) → 柱状图</li>
          </ul>
          
          <h3>业务数据格式</h3>
          <ul>
            <li>标准化的 BusinessDataPoint 接口</li>
            <li>支持主值、次值、目标值、范围等</li>
            <li>自动数据验证和错误提示</li>
            <li>元数据支持扩展业务逻辑</li>
          </ul>
          
          <h3>集成方式</h3>
          <ul>
            <li>配置驱动: 通过 BusinessDataSet 配置图表</li>
            <li>类型安全: 完整的 TypeScript 类型定义</li>
            <li>事件系统: 统一的数据点击和状态回调</li>
            <li>主题感知: 自动适配明暗主题</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChartFactoryDemo