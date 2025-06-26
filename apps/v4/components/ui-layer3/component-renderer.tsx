/**
 * Layer 3: 组件渲染器
 * 
 * 将AI生成的ComponentComposition配置渲染成真实的业务语义组件
 */

import React from 'react'
import { ComponentComposition, ComponentSpec } from './intent-types'

// 导入所有可用的业务语义组件
import { HVACChartsDemo } from '@/components/examples/hvac-charts-demo'
import { ChartAreaInteractive } from '@/registry/new-york-v4/charts/chart-area-interactive'
import { ChartBarMixed } from '@/registry/new-york-v4/charts/chart-bar-mixed'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import { Progress } from '@/registry/new-york-v4/ui/progress'
import { Alert, AlertDescription } from '@/registry/new-york-v4/ui/alert'
import { businessMappingUtils } from '../ui-layer2/business-mapping'

// ===========================================
// 组件定义 (必须在COMPONENT_REGISTRY之前)
// ===========================================

const AlertDashboard: React.FC<any> = ({ title = "Alert Management", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        🚨 {title}
      </CardTitle>
      <CardDescription>System Alerts and Fault Diagnosis</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[
          { level: 'warning', message: 'Cooling water temperature elevated', time: '2 min ago' },
          { level: 'info', message: 'Room humidity normal', time: '5 min ago' },
          { level: 'error', message: 'Pump #3 flow rate abnormal', time: '8 min ago' }
        ].map((alert, index) => (
          <Alert key={index} className={`border-l-4 ${
            alert.level === 'error' ? 'border-l-red-500' : 
            alert.level === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-500'
          }`}>
            <AlertDescription className="flex justify-between">
              <span>{alert.message}</span>
              <span className="text-xs text-muted-foreground">{alert.time}</span>
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </CardContent>
  </Card>
)

const EnergyDashboard: React.FC<any> = ({ title = "Energy Efficiency", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        ⚡ {title}
      </CardTitle>
      <CardDescription>Energy Consumption Analysis and Optimization</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">1,250</div>
          <div className="text-sm text-blue-600">kWh Daily</div>
          <div className="text-xs text-blue-500 mt-1">↘ 8% decrease</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">285</div>
          <div className="text-sm text-green-600">kWh Saved</div>
          <div className="text-xs text-green-500 mt-1">This month</div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="text-sm font-medium text-green-800 mb-2">💡 Optimization Suggestion</div>
        <div className="text-xs text-green-700">
          Reduce setpoint temperature by 0.5°C during night mode, estimated 12% energy savings
        </div>
      </div>
    </CardContent>
  </Card>
)

const ConceptExplainer: React.FC<any> = ({ concept = 'COP', ...props }) => (
  <Card className="max-w-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        📚 COP (Coefficient of Performance)
      </CardTitle>
      <CardDescription>
        Coefficient of Performance - represents the cooling capacity produced per unit of electrical energy consumed by the refrigeration system
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm font-medium text-blue-800 mb-1">Key Features:</div>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Higher COP values indicate better cooling efficiency, typically ranging from 3.0-6.0</li>
            <li>• Affected by ambient temperature, load ratio and other factors</li>
            <li>• Important metric for evaluating refrigeration equipment efficiency</li>
            <li>• Formula: COP = Cooling Capacity (kW) / Compressor Power (kW)</li>
          </ul>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">HVAC Technical Term</Badge>
          <Badge variant="outline" className="text-xs">Efficiency Metric</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
)

const TemperatureMonitorPanel: React.FC<any> = ({ title = "Temperature Monitoring", size = "md", ...props }) => (
  <Card className={size === 'lg' ? 'col-span-2' : ''}>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        🌡️ {title}
      </CardTitle>
      <CardDescription>Real-time Temperature Data Monitoring</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-700">7.2°C</div>
          <div className="text-sm text-blue-600">Supply Water Temp</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-xl font-bold text-orange-700">12.8°C</div>
          <div className="text-sm text-orange-600">Return Water Temp</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-xl font-bold text-green-700">5.6°C</div>
          <div className="text-sm text-green-600">Temperature Delta</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Temperature Stability</span>
          <span>92%</span>
        </div>
        <Progress value={92} className="h-2" />
      </div>
    </CardContent>
  </Card>
)

const StatusMonitorPanel: React.FC<any> = ({ title = "Equipment Status", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        📊 {title}
      </CardTitle>
      <CardDescription>Real-time Equipment Operating Status</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[
          { name: 'Chiller Unit', status: 'running', value: 'COP 4.2' },
          { name: 'Cooling Tower', status: 'running', value: '1450 RPM' },
          { name: 'Water Pump', status: 'warning', value: 'Low Flow Rate' }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                item.status === 'running' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span className="font-medium">{item.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const PerformanceAnalysisPanel: React.FC<any> = ({ title = "Performance Analysis", device, ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        🎯 {title} - {device || 'System'}
      </CardTitle>
      <CardDescription>Comprehensive Equipment Performance Analysis</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">4.2</div>
          <div className="text-sm text-green-600">Current COP Value</div>
          <div className="text-xs text-green-500 mt-1">↗ 5% above target</div>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">89%</div>
          <div className="text-sm text-blue-600">Operating Efficiency</div>
          <div className="text-xs text-blue-500 mt-1">↗ 8% YoY improvement</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {[
          { label: 'Efficiency Score', value: 89 },
          { label: 'Energy Optimization', value: 76 },
          { label: 'Maintenance Status', value: 92 }
        ].map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span>{metric.label}</span>
              <span>{metric.value}/100</span>
            </div>
            <Progress value={metric.value} className="h-2" />
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const EnergyConsumptionPanel: React.FC<any> = ({ title = "Energy Monitoring", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle>📈 {title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-48 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
        <div className="text-center text-blue-600">
          <div className="text-4xl mb-2">⚡</div>
          <div className="font-medium">Energy Trend Chart</div>
          <div className="text-sm">Shows 24-hour energy consumption changes</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const EquipmentStatusPanel: React.FC<any> = ({ title = "System Overview", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle>🏗️ {title}</CardTitle>
      <CardDescription>HVAC Equipment Topology and Connection Flow</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {/* 系统拓扑流程图 */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl mb-2">❄️</div>
            <div className="text-sm font-medium">Chiller Unit</div>
            <div className="text-xs text-blue-600">Main Cooling</div>
          </div>
          <div className="text-blue-400 text-2xl">→</div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl mb-2">💧</div>
            <div className="text-sm font-medium">Water Pump</div>
            <div className="text-xs text-green-600">Circulation</div>
          </div>
          <div className="text-green-400 text-2xl">→</div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl mb-2">🏗️</div>
            <div className="text-sm font-medium">Cooling Tower</div>
            <div className="text-xs text-orange-600">Heat Rejection</div>
          </div>
        </div>
        
        {/* 简洁的状态指示器 */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 bg-green-50 rounded border border-green-200">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
            <div className="text-xs text-green-700">All Systems Normal</div>
          </div>
          <div className="p-2 bg-blue-50 rounded border border-blue-200">
            <div className="text-sm font-bold text-blue-700">4.2</div>
            <div className="text-xs text-blue-600">COP Value</div>
          </div>
          <div className="p-2 bg-purple-50 rounded border border-purple-200">
            <div className="text-sm font-bold text-purple-700">3</div>
            <div className="text-xs text-purple-600">Active Units</div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const PressureMonitorPanel: React.FC<any> = ({ title = "Pressure Monitoring", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle>📊 {title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-3 gap-3">
        {['Inlet Pressure', 'Outlet Pressure', 'Pressure Diff'].map((label, index) => (
          <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-700">{2.1 + index * 0.3} MPa</div>
            <div className="text-xs text-blue-600">{label}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const FlowMonitorPanel: React.FC<any> = ({ title = "Flow Monitoring", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle>💧 {title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        {['Chilled Water Flow', 'Cooling Water Flow'].map((label, index) => (
          <div key={index} className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-700">{180 + index * 20} m³/h</div>
            <div className="text-xs text-blue-600">{label}</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
)

const WeatherMonitorPanel: React.FC<any> = ({ title = "Weather Monitoring", ...props }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        🌤️ {title}
      </CardTitle>
      <CardDescription>
        Outdoor Environmental Conditions Affecting HVAC Performance
      </CardDescription>
    </CardHeader>
    <CardContent>
      {/* List布局的天气数据 */}
      <div className="space-y-4">
        {/* 温度行 */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">🌡️</div>
            <div>
              <div className="font-medium text-blue-800">Outdoor Temperature</div>
              <div className="text-sm text-blue-600">Ambient air temperature</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-700">24.5°C</div>
            <div className="text-xs text-blue-500">↗ +0.5°C trending up</div>
          </div>
        </div>

        {/* 湿度行 */}
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-lg">💧</div>
            <div>
              <div className="font-medium text-green-800">Relative Humidity</div>
              <div className="text-sm text-green-600">Moisture content in air</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-700">65%</div>
            <div className="text-xs text-green-500">→ Stable in normal range</div>
          </div>
        </div>

        {/* 气压行 */}
        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-lg">🏗️</div>
            <div>
              <div className="font-medium text-purple-800">Atmospheric Pressure</div>
              <div className="text-sm text-purple-600">Barometric reading</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-700">101.3 kPa</div>
            <div className="text-xs text-purple-500">→ Standard pressure</div>
          </div>
        </div>

        {/* 风速行 */}
        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white text-lg">💨</div>
            <div>
              <div className="font-medium text-orange-800">Wind Speed</div>
              <div className="text-sm text-orange-600">Air circulation rate</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-700">5.2 m/s</div>
            <div className="text-xs text-orange-500">↗ Light breeze</div>
          </div>
        </div>
      </div>

      {/* HVAC影响分析 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm font-medium text-blue-800 mb-2">🎯 HVAC Performance Impact:</div>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Current conditions are optimal for HVAC efficiency</div>
          <div>• Cooling load reduced by 15% due to moderate ambient temperature</div>
          <div>• Recommended: Maintain current setpoint for energy savings</div>
        </div>
      </div>
    </CardContent>
  </Card>
)

// ===========================================
// 组件映射表
// ===========================================

const COMPONENT_REGISTRY = {
  // HVAC 业务语义组件
  'HVACChartsDemo': HVACChartsDemo,
  'TemperatureMonitor': TemperatureMonitorPanel, // HVAC内部温度监控
  'TemperatureRangeChart': ChartAreaInteractive,
  'PerformanceScoreChart': ChartBarMixed, // 使用ChartBarMixed作为性能评分图表
  'EnergyReductionChart': ChartBarMixed,  // 使用ChartBarMixed作为能耗图表
  'FlowMonitoringChart': ChartAreaInteractive, // 使用ChartAreaInteractive作为流量图表
  'DonutChart': ChartBarMixed,
  'BarChart': ChartBarMixed,
  'LineChart': ChartAreaInteractive,
  'HVACDashboardLayout': HVACChartsDemo,
  'HVACControlPanel': HVACChartsDemo,
  'AlertPanel': AlertDashboard, // 使用专门的告警面板
  'EnergyEfficiency': EnergyDashboard, // 使用专门的能效面板
  'ChartFactory': ChartBarMixed,
  'ConceptExplainer': ConceptExplainer, // 自定义概念解释组件
  
  // 增强的业务语义组件
  'TemperatureMonitor': TemperatureMonitorPanel,
  'WeatherMonitor': WeatherMonitorPanel, // 专门的天气监控组件
  'StatusMonitor': StatusMonitorPanel,
  'PerformanceAnalysis': PerformanceAnalysisPanel,
  'PlantConsumptionChart': EnergyConsumptionPanel,
  'EquipmentChart': EquipmentStatusPanel,
  'PressureChart': PressureMonitorPanel,
  'FlowChart': FlowMonitorPanel,
} as const


// ===========================================
// 组件渲染器接口
// ===========================================

export interface ComponentRendererProps {
  composition: ComponentComposition
  className?: string
  style?: React.CSSProperties
}

// ===========================================
// 单个组件渲染器
// ===========================================

const renderSingleComponent = (spec: ComponentSpec, index: number = 0): React.ReactElement | null => {
  const ComponentClass = COMPONENT_REGISTRY[spec.type as keyof typeof COMPONENT_REGISTRY]
  
  if (!ComponentClass) {
    // 尝试使用业务映射找到替代组件
    const fallbackComponent = findFallbackComponent(spec.type)
    
    if (fallbackComponent) {
      const componentProps = {
        ...spec.props,
        key: `component-${index}`,
        title: spec.title || `${spec.type} (自动适配)`,
        description: spec.description,
      }
      
      return (
        <div key={`fallback-${index}`}>
          <div className="mb-2 p-2 bg-blue-50 rounded text-xs text-blue-600">
            💡 AI适配: {spec.type} → {fallbackComponent.name}
          </div>
          {React.createElement(fallbackComponent.component, componentProps)}
        </div>
      )
    }
    
    return (
      <Card key={index} className="p-4 border-2 border-dashed border-yellow-300 bg-yellow-50">
        <div className="text-center text-yellow-700">
          <div className="text-lg font-semibold mb-2">⚠️ 组件未实现</div>
          <div className="text-sm">
            组件类型: <code className="bg-yellow-200 px-1 rounded">{spec.type}</code>
          </div>
          <div className="text-xs mt-2 text-yellow-600">
            AI已生成组件配置，但该业务语义组件尚未在注册表中实现
          </div>
          <div className="text-xs mt-2">
            <Badge variant="outline" className="text-xs">
              建议实现: {getSuggestedComponents(spec.type).join(', ')}
            </Badge>
          </div>
        </div>
      </Card>
    )
  }

  // 增强的props传递，包含业务语义信息
  const componentProps = {
    ...spec.props,
    key: `component-${index}`,
    title: spec.title,
    description: spec.description,
    // 添加业务映射信息
    businessContext: extractBusinessContext(spec),
    // 添加数据查询信息
    dataQuery: spec.dataQuery,
  }

  try {
    return React.createElement(ComponentClass, componentProps)
  } catch (error) {
    console.error(`组件 ${spec.type} 渲染失败:`, error)
    return (
      <Card key={index} className="p-4 border-2 border-dashed border-red-300 bg-red-50">
        <div className="text-center text-red-700">
          <div className="text-lg font-semibold mb-2">❌ 组件渲染失败</div>
          <div className="text-sm">
            组件类型: <code className="bg-red-200 px-1 rounded">{spec.type}</code>
          </div>
          <div className="text-xs mt-2 text-red-600">
            {error instanceof Error ? error.message : '未知错误'}
          </div>
        </div>
      </Card>
    )
  }
}

// 查找回退组件
const findFallbackComponent = (componentType: string) => {
  const fallbackMappings = {
    // 温度相关组件回退
    'TemperatureChart': { name: 'TemperatureMonitorPanel', component: TemperatureMonitorPanel },
    'TempMonitor': { name: 'TemperatureMonitorPanel', component: TemperatureMonitorPanel },
    
    // 性能相关组件回退
    'PerformanceChart': { name: 'PerformanceAnalysisPanel', component: PerformanceAnalysisPanel },
    'EfficiencyChart': { name: 'PerformanceAnalysisPanel', component: PerformanceAnalysisPanel },
    
    // 状态相关组件回退
    'StatusChart': { name: 'StatusMonitorPanel', component: StatusMonitorPanel },
    'SystemStatus': { name: 'StatusMonitorPanel', component: StatusMonitorPanel },
    
    // 能耗相关组件回退
    'EnergyChart': { name: 'EnergyDashboard', component: EnergyDashboard },
    'PowerChart': { name: 'EnergyDashboard', component: EnergyDashboard },
    
    // 告警相关组件回退
    'AlertChart': { name: 'AlertDashboard', component: AlertDashboard },
    'AlarmPanel': { name: 'AlertDashboard', component: AlertDashboard },
  }
  
  // 精确匹配
  if (fallbackMappings[componentType as keyof typeof fallbackMappings]) {
    return fallbackMappings[componentType as keyof typeof fallbackMappings]
  }
  
  // 模糊匹配
  for (const [key, value] of Object.entries(fallbackMappings)) {
    if (componentType.toLowerCase().includes(key.toLowerCase().replace('chart', '').replace('panel', ''))) {
      return value
    }
  }
  
  // 默认回退到基础图表
  if (componentType.includes('Chart')) {
    return { name: 'ChartBarMixed', component: ChartBarMixed }
  }
  
  return null
}

// 获取建议的组件实现
const getSuggestedComponents = (componentType: string): string[] => {
  const suggestions: string[] = []
  
  if (componentType.toLowerCase().includes('temperature') || componentType.toLowerCase().includes('temp')) {
    suggestions.push('TemperatureMonitorPanel')
  }
  if (componentType.toLowerCase().includes('performance') || componentType.toLowerCase().includes('efficiency')) {
    suggestions.push('PerformanceAnalysisPanel')
  }
  if (componentType.toLowerCase().includes('status') || componentType.toLowerCase().includes('monitor')) {
    suggestions.push('StatusMonitorPanel')
  }
  if (componentType.toLowerCase().includes('energy') || componentType.toLowerCase().includes('power')) {
    suggestions.push('EnergyDashboard')
  }
  if (componentType.toLowerCase().includes('alert') || componentType.toLowerCase().includes('alarm')) {
    suggestions.push('AlertDashboard')
  }
  
  if (suggestions.length === 0) {
    suggestions.push('HVACChartsDemo', 'ChartBarMixed')
  }
  
  return suggestions
}

// 提取业务上下文
const extractBusinessContext = (spec: ComponentSpec) => {
  return {
    componentType: spec.type,
    businessMapping: getBusinessMappingForComponent(spec.type),
    metrics: spec.dataQuery?.metrics || [],
    devices: spec.dataQuery?.deviceIds || [],
  }
}

// 获取组件的业务映射信息
const getBusinessMappingForComponent = (componentType: string) => {
  try {
    // 尝试从Layer 2业务映射中查找相关信息
    const mappingEntries = Object.entries(businessMappingUtils?.businessConceptToComponent || {})
    const relevantMappings = mappingEntries.filter(([concept, mapping]) => {
      return componentType.toLowerCase().includes(mapping.component) || 
             componentType.toLowerCase().includes(concept.toLowerCase())
    })
    
    return relevantMappings.length > 0 ? relevantMappings[0] : null
  } catch (error) {
    console.warn('业务映射获取失败:', error)
    return null
  }
}

// ===========================================
// 布局渲染器
// ===========================================

const renderLayout = (composition: ComponentComposition): React.ReactElement => {
  const { primaryComponent, supportingComponents = [], layout } = composition
  
  // 渲染主组件
  const primaryElement = renderSingleComponent(primaryComponent, 0)
  
  // 渲染支持组件
  const supportingElements = supportingComponents.map((spec, index) => 
    renderSingleComponent(spec, index + 1)
  )

  // 应用布局
  switch (layout.type) {
    case 'single':
      return (
        <div className="space-y-4">
          {primaryElement}
          {supportingElements.length > 0 && (
            <div className="grid gap-4">
              {supportingElements}
            </div>
          )}
        </div>
      )

    case 'grid':
      return (
        <div className={`grid gap-${layout.gap || 4} grid-cols-1 md:grid-cols-${layout.columns || 2}`}>
          {primaryElement}
          {supportingElements}
        </div>
      )

    case 'dashboard':
      return (
        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            {primaryElement}
            {supportingElements.slice(0, 2)}
          </div>
          {supportingElements.length > 2 && (
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {supportingElements.slice(2)}
            </div>
          )}
        </div>
      )

    case 'comparison':
      return (
        <div className={`grid gap-${layout.gap || 4} grid-cols-1 md:grid-cols-${layout.columns || 2}`}>
          {primaryElement}
          {supportingElements}
        </div>
      )

    default:
      return (
        <div className="space-y-4">
          {primaryElement}
          {supportingElements}
        </div>
      )
  }
}

// ===========================================
// 主渲染器组件
// ===========================================

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  composition, 
  className = '',
  style 
}) => {
  const [renderStats, setRenderStats] = React.useState({
    startTime: Date.now(),
    componentsRendered: 0,
    errors: 0,
    fallbacksUsed: 0
  })

  const [debugMode, setDebugMode] = React.useState(false)

  React.useEffect(() => {
    // 计算渲染统计
    const totalComponents = 1 + (composition.supportingComponents?.length || 0)
    setRenderStats(prev => ({
      ...prev,
      componentsRendered: totalComponents,
      renderTime: Date.now() - prev.startTime
    }))
  }, [composition])

  // 验证组件组合
  const validateComposition = () => {
    const issues: string[] = []
    
    if (!composition.primaryComponent) {
      issues.push('缺少主组件配置')
    }
    
    if (!composition.layout) {
      issues.push('缺少布局配置')
    }
    
    if (!composition.dataConfig) {
      issues.push('缺少数据配置')
    }
    
    // 检查组件类型是否在注册表中
    const allComponents = [composition.primaryComponent, ...(composition.supportingComponents || [])]
    const missingComponents = allComponents.filter(comp => 
      !COMPONENT_REGISTRY[comp.type as keyof typeof COMPONENT_REGISTRY]
    )
    
    if (missingComponents.length > 0) {
      issues.push(`${missingComponents.length} 个组件类型未注册: ${missingComponents.map(c => c.type).join(', ')}`)
    }
    
    return issues
  }

  const validationIssues = validateComposition()

  return (
    <div className={`component-renderer ${className}`} style={style}>
      {/* 调试和统计信息 */}
      {debugMode && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-700 text-sm font-medium mb-2">
            <span>🔧 调试信息</span>
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="text-xs px-2 py-1 bg-slate-200 rounded hover:bg-slate-300"
            >
              {debugMode ? '隐藏' : '显示'}
            </button>
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div>渲染时间: <code>{renderStats.renderTime || 0}ms</code></div>
            <div>组件数量: <code>{renderStats.componentsRendered}</code></div>
            <div>注册表大小: <code>{Object.keys(COMPONENT_REGISTRY).length} 个组件</code></div>
            {validationIssues.length > 0 && (
              <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="text-yellow-800 font-medium">⚠️ 验证问题:</div>
                {validationIssues.map((issue, index) => (
                  <div key={index} className="text-yellow-700 text-xs">• {issue}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 渲染配置信息 */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between text-blue-800 text-sm font-medium mb-2">
          <span>🎯 AI生成的组件配置</span>
          <Badge variant="outline" className="text-xs">
            Layer 3 → Layer 2 映射
          </Badge>
        </div>
        <div className="text-xs text-blue-600 space-y-1">
          <div>主组件: <code>{composition.primaryComponent.type}</code></div>
          <div>布局: <code>{composition.layout.type}</code> 
            {composition.layout.columns && <span> ({composition.layout.columns} 列)</span>}
          </div>
          {composition.supportingComponents && composition.supportingComponents.length > 0 && (
            <div>支持组件: <code>{composition.supportingComponents.map(c => c.type).join(', ')}</code></div>
          )}
          {composition.primaryComponent.title && (
            <div>标题: <code>{composition.primaryComponent.title}</code></div>
          )}
        </div>
      </div>

      {/* 渲染实际组件 */}
      <div className="component-content">
        {renderLayout(composition)}
      </div>

      {/* 渲染数据配置信息 */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-2">
          📊 数据配置
          <Badge variant="outline" className="text-xs">
            实时数据流
          </Badge>
        </div>
        <div className="text-xs text-green-600 space-y-1">
          <div>数据源: <code>{composition.dataConfig.source}</code></div>
          <div>刷新间隔: <code>{composition.dataConfig.refreshInterval}ms</code></div>
          {composition.dataConfig.query.deviceIds && composition.dataConfig.query.deviceIds.length > 0 && (
            <div>监控设备: <code>{composition.dataConfig.query.deviceIds.join(', ')}</code></div>
          )}
          {composition.dataConfig.query.metrics && composition.dataConfig.query.metrics.length > 0 && (
            <div>关键指标: <code>{composition.dataConfig.query.metrics.join(', ')}</code></div>
          )}
          {composition.dataConfig.query.timeRange && (
            <div>时间范围: <code>{composition.dataConfig.query.timeRange.type}</code> 
              ({composition.dataConfig.query.timeRange.granularity})
            </div>
          )}
        </div>
      </div>

      {/* 组件注册表信息 */}
      {debugMode && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-purple-800 text-sm font-medium mb-2">🗂️ 可用组件注册表</div>
          <div className="text-xs text-purple-600">
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(COMPONENT_REGISTRY).map(componentType => (
                <div key={componentType} className="p-1 bg-purple-100 rounded text-center">
                  {componentType}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===========================================
// 导出
// ===========================================

export { ComponentRenderer }
export default ComponentRenderer