"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Progress } from "@/registry/new-york-v4/ui/progress"

// Import real chart components
import { ChartBarMixed } from "@/registry/new-york-v4/charts/chart-bar-mixed"
import { IntentParser } from "@/components/ui-layer3/intent-parser"
import { CompositionGenerator } from "@/components/ui-layer3/composition-generator"
import { ComponentRenderer } from "@/components/ui-layer3/component-renderer"
// import { HVACChartsDemo } from "@/components/examples/hvac-charts-demo" // Temporarily disabled due to design tokens error

// 简化的类型定义
interface ComponentConfig {
  type: string
  title: string
  description: string
  intent: string
  entities: Array<{ type: string; value: string }>
  confidence: number
}

// 消息类型定义
interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Concept Explanation Component
const ConceptExplainer = ({ concept = 'COP' }: { concept?: string }) => {
  return (
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
}

// Performance Analysis Component
const PerformanceAnalysis = ({ device, metric }: { device?: string; metric?: string }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🎯 {device || 'Equipment'} Performance Analysis</CardTitle>
          <CardDescription>
            {metric || 'Efficiency'} Monitoring - Real-time Data Display
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-700">4.2</div>
              <div className="text-sm text-green-600">Current COP Value</div>
              <div className="text-xs text-green-500 mt-1">↗ Good Efficiency</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">89%</div>
              <div className="text-sm text-blue-600">Operating Efficiency</div>
              <div className="text-xs text-blue-500 mt-1">↗ 8% increase from yesterday</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">1,250</div>
              <div className="text-sm text-orange-600">kWh Daily Consumption</div>
              <div className="text-xs text-orange-500 mt-1">↘ 8% decrease</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Efficiency Score</span>
                <span>89/100</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Energy Optimization</span>
                <span>76/100</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Maintenance Status</span>
                <span>92/100</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Chart Area Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Performance Trend Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
            <div className="text-center text-blue-600">
              <div className="text-4xl mb-2">📈</div>
              <div className="font-medium">COP Efficiency Trend Chart</div>
              <div className="text-sm">Shows 24-hour performance changes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Weather Monitoring Component - 使用正确的HVAC数据显示组件
const WeatherMonitor = ({ device }: { device?: string }) => {
  // 导入HVAC数据显示组件
  const { HVACDashboard } = require('@/components/ui-layer2/hvac-data-display')
  
  // 天气数据配置
  const weatherData = {
    temperature: { 
      value: 24.5, 
      target: 25, 
      range: [18, 28] as [number, number]
    },
    pressure: { 
      value: 101.3, 
      target: 101.3, 
      range: [100, 103] as [number, number]
    },
    humidity: { 
      value: 65, 
      target: 60, 
      range: [40, 70] as [number, number]
    },
    flow: { 
      value: 5.2, 
      unit: 'm/s', 
      target: 5 
    }
  }

  return (
    <div className="space-y-6">
      {/* 使用List布局的天气监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🌤️ Weather & Environmental Monitoring
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
    </div>
  )
}

// Temperature Monitoring Component (HVAC Internal)
const TemperatureMonitor = ({ device }: { device?: string }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🌡️ {device || 'System'} Temperature Monitoring</CardTitle>
          <CardDescription>
            Real-time Temperature Data - Supply/Return Water Temperature
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-700">7°C</div>
              <div className="text-sm text-blue-600">Supply Water Temp</div>
              <div className="text-xs text-blue-500 mt-1">Normal Range</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-700">12°C</div>
              <div className="text-sm text-orange-600">Return Water Temp</div>
              <div className="text-xs text-orange-500 mt-1">Normal Range</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-700">5°C</div>
              <div className="text-sm text-green-600">Temperature Delta</div>
              <div className="text-xs text-green-500 mt-1">Optimal Range</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Temperature Trend (Last 24 Hours)</div>
            <div className="h-24 bg-gradient-to-r from-blue-100 via-green-100 to-orange-100 rounded-lg border flex items-end justify-between p-2">
              {[45, 52, 48, 65, 72, 68, 55, 60, 58, 62, 67, 59].map((height, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-t w-4"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Status Monitoring Component
const StatusMonitor = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>📊 System Status Monitoring</CardTitle>
          <CardDescription>
            Real-time Equipment Operating Status Overview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Chiller Unit</span>
              </div>
              <div className="text-sm text-muted-foreground">Operating Normal</div>
              <div className="text-xs text-green-600 mt-1">Runtime: 18.5 hours</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Cooling Tower</span>
              </div>
              <div className="text-sm text-muted-foreground">Fan Normal</div>
              <div className="text-xs text-green-600 mt-1">Speed: 1450 RPM</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Water Pump</span>
              </div>
              <div className="text-sm text-muted-foreground">Minor Issue</div>
              <div className="text-xs text-yellow-600 mt-1">Low Flow Rate</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-yellow-800">System Alert</span>
            </div>
            <div className="text-sm text-yellow-700">
              Detected high cooling water temperature. Recommend checking cooling tower fan operation status.
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* System Overview Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>🏗️ System Architecture Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
            <div className="text-center text-slate-600">
              <div className="text-3xl mb-2">🏢</div>
              <div className="font-medium">HVAC System Topology</div>
              <div className="text-sm">Chiller → Water Pump → Cooling Tower</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// AI Demo 页面主组件
export default function AIDemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: 'Hello! I am your HVAC system AI assistant. I can understand your natural language commands and generate corresponding monitoring interfaces. Try typing: "Show chiller efficiency"',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [generatedComponent, setGeneratedComponent] = useState<ComponentConfig | null>(null)
  const [generatedComposition, setGeneratedComposition] = useState<any>(null)
  const [conversationHistory, setConversationHistory] = useState<any[]>([])

  // AI Intent Parsing - Updated to use real chart components
  const parseIntent = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    console.log('🔍 parseIntent 输入:', userInput, '转换后:', lowerInput)
    
    // 优先级排序：更具体的条件在前面
    if (lowerInput.includes('efficiency') || lowerInput.includes('performance') || lowerInput.includes('cop') || lowerInput.includes('chiller')) {
      return {
        intent: 'analyze_performance',
        entities: [
          { type: 'device', value: 'Chiller Unit' },
          { type: 'metric', value: 'Efficiency' }
        ],
        confidence: 0.9,
        componentType: 'PerformanceScoreChart'  // Use real chart component
      }
    }
    
    // 区分天气温度和系统温度
    if (lowerInput.includes('weather') || lowerInput.includes('outdoor') || lowerInput.includes('ambient')) {
      return {
        intent: 'show_weather_data',
        entities: [
          { type: 'device', value: 'Weather Station' },
          { type: 'metric', value: 'Weather' }
        ],
        confidence: 0.9,
        componentType: 'WeatherMonitor'  // 环境天气监控
      }
    }
    
    // 温度监控 - 根据上下文确定内部还是外部温度
    if (lowerInput.includes('temperature') || lowerInput.includes('temp')) {
      // 如果明确提到monitor temperature，显示HVAC系统内部温度（供水、回水温度）
      if (lowerInput.includes('monitor temperature')) {
        console.log('🎯 检测到 "monitor temperature" - 映射到 TemperatureMonitor (HVAC内部温度)')
        return {
          intent: 'temperature_check',
          entities: [
            { type: 'device', value: 'HVAC System' },
            { type: 'metric', value: 'Temperature' },
            { type: 'location', value: 'System' }
          ],
          confidence: 0.95,
          componentType: 'TemperatureMonitor'  // HVAC系统内部温度监控
        }
      }
      
      return {
        intent: 'show_data',
        entities: [
          { type: 'device', value: 'HVAC System' },
          { type: 'metric', value: 'Temperature' }
        ],
        confidence: 0.8,
        componentType: 'TemperatureMonitor'  // HVAC内部温度
      }
    }
    
    // 系统概览 - 简洁的拓扑图
    if (lowerInput.includes('system overview') || lowerInput.includes('view system')) {
      return {
        intent: 'show_system_overview',
        entities: [
          { type: 'device', value: 'System' },
          { type: 'metric', value: 'Topology' }
        ],
        confidence: 0.9,
        componentType: 'EquipmentChart'  // 使用简洁的设备拓扑图
      }
    }
    
    if (lowerInput.includes('status') || (lowerInput.includes('monitor') && !lowerInput.includes('temperature'))) {
      return {
        intent: 'monitor_status',
        entities: [
          { type: 'device', value: 'System' },
          { type: 'metric', value: 'Status' }
        ],
        confidence: 0.8,
        componentType: 'StatusMonitor'  // 使用状态监控而不是完整Dashboard
      }
    }
    
    if (lowerInput.includes('energy') || lowerInput.includes('consumption') || lowerInput.includes('power')) {
      return {
        intent: 'analyze_performance',
        entities: [
          { type: 'device', value: 'System' },
          { type: 'metric', value: 'Energy' }
        ],
        confidence: 0.85,
        componentType: 'EnergyReductionChart'  // Use energy chart
      }
    }
    
    if (lowerInput.includes('flow') || lowerInput.includes('flow rate')) {
      return {
        intent: 'show_data',
        entities: [
          { type: 'device', value: 'Water System' },
          { type: 'metric', value: 'Flow' }
        ],
        confidence: 0.85,
        componentType: 'FlowMonitoringChart'  // Use flow chart
      }
    }
    
    if (lowerInput.includes('what is') || lowerInput.includes('explain')) {
      return {
        intent: 'explain_concept',
        entities: [
          { type: 'parameter', value: lowerInput.includes('cop') ? 'COP' : 'Concept' }
        ],
        confidence: 0.9,
        componentType: 'ConceptExplainer'
      }
    }
    
    return {
      intent: 'show_data',
      entities: [
        { type: 'device', value: 'System' },
        { type: 'metric', value: 'Data' }
      ],
      confidence: 0.5,
      componentType: 'HVACChartsDemo'  // Default to comprehensive demo
    }
  }

  const handleSendWithInput = async (input?: string) => {
    const actualInput = input || inputValue
    if (!actualInput.trim()) return
    
    console.log('🚀 handleSend 开始处理:', actualInput)
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: actualInput,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)
    
    // 模拟AI处理延迟
    setTimeout(() => {
      try {
        console.log('🔍 AI处理开始，输入:', actualInput)
        // Layer 3: AI意图理解
        const intentParser = new IntentParser()
        const intentResult = intentParser.parseIntent(actualInput)
        console.log('Intent parsing result:', intentResult)
        
        // Layer 3: AI组合生成
        const compositionGenerator = new CompositionGenerator()
        const composition = compositionGenerator.generateComposition({
          intent: intentResult.intent,
          entities: intentResult.entities,
          confidence: intentResult.confidence,
          originalInput: actualInput
        })
        console.log('Generated composition:', composition)
        
        // 保存组合结果
        setGeneratedComposition(composition)
        
        const deviceEntity = intentResult.entities.find(e => e.type === 'device')
        const metricEntity = intentResult.entities.find(e => e.type === 'metric')
        
        // 生成组件配置（向后兼容）
        const componentConfig: ComponentConfig = {
          type: composition.primaryComponent.type,
          title: `${deviceEntity?.value || 'HVAC'} ${metricEntity?.value || 'Analysis'}`,
          description: `AI Generated: ${composition.primaryComponent.title}`,
          intent: intentResult.intent,
          entities: intentResult.entities,
          confidence: intentResult.confidence
        }
        
        // Generate AI Response
        const responses = {
          'analyze_performance': `✅ Generated ${deviceEntity?.value || 'Equipment'} performance analysis interface. Current COP value is 4.2, operating efficiency is good.`,
          'show_data': `✅ Displaying ${deviceEntity?.value || 'System'} ${metricEntity?.value || 'Data'} monitoring interface.`,
          'temperature_check': `✅ Generated HVAC internal temperature monitoring interface. Supply water: 7°C, Return water: 12°C, Temperature delta: 5°C.`,
          'show_weather_data': `✅ Generated weather monitoring interface. Current outdoor temperature is 24°C, humidity 65%, optimal conditions for HVAC efficiency.`,
          'show_system_overview': `✅ Generated system topology overview. Showing HVAC equipment layout: Chiller → Water Pump → Cooling Tower.`,
          'monitor_status': `✅ Equipment status monitoring interface generated. All systems operating normally, found 1 minor issue requiring attention.`,
          'explain_concept': `✅ Generated concept explanation. ${intentResult.entities.find(e => e.type === 'parameter')?.value || 'COP'} is an important HVAC performance metric.`,
        }
        
        const aiResponse = responses[intentResult.intent as keyof typeof responses] || 
                          `✅ Generated corresponding HVAC monitoring interface based on your command. Confidence: ${Math.round(intentResult.confidence * 100)}%`
        
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          type: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiMessage])
        setGeneratedComponent(componentConfig)
        
        // 更新对话历史
        setConversationHistory(prev => [...prev, {
          userInput: actualInput,
          intentResult,
          componentConfig,
          timestamp: new Date()
        }])
        
      } catch (error) {
        console.error('AI处理错误:', error)
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          type: 'assistant',
          content: 'Sorry, there was an issue processing your request. Please rephrase your requirements.',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsProcessing(false)
      }
    }, 1500)
    
    setInputValue('')
  }

  const handleSend = () => handleSendWithInput()

  // 渲染生成的组件 - Updated to use semantic chart renderer with real business data
  const renderGeneratedComponent = () => {
    if (!generatedComponent) return null

    const deviceEntity = generatedComponent.entities.find(e => e.type === 'device')
    const metricEntity = generatedComponent.entities.find(e => e.type === 'metric')
    const parameterEntity = generatedComponent.entities.find(e => e.type === 'parameter')
    
    console.log('🔧 renderGeneratedComponent:', {
      generatedComponentType: generatedComponent.type,
      hasGeneratedComposition: !!generatedComposition,
      generatedCompositionType: generatedComposition?.primaryComponent?.type
    })

    // 优先处理特殊组件类型，不走Layer 3架构
    
    // Special handling for temperature monitor - 最高优先级
    if (generatedComponent.type === 'TemperatureMonitor') {
      console.log('✅ 直接渲染 TemperatureMonitor 组件:', generatedComponent)
      return <TemperatureMonitor device={deviceEntity?.value} />
    }

    // Special handling for concept explainer
    if (generatedComponent.type === 'ConceptExplainer') {
      console.log('✅ 直接渲染 ConceptExplainer 组件:', generatedComponent)
      return <ConceptExplainer concept={parameterEntity?.value} />
    }

    // Special handling for weather monitor
    if (generatedComponent.type === 'WeatherMonitor') {
      console.log('✅ 直接渲染 WeatherMonitor 组件:', generatedComponent)
      return <WeatherMonitor device={deviceEntity?.value} />
    }

    // 使用正确的3层架构：Layer 3 AI → Layer 2 业务语义组件 → Layer 1 样式
    if (generatedComposition) {
      console.log('✅ 使用 ComponentRenderer 渲染组合:', generatedComposition)
      return (
        <ComponentRenderer 
          composition={generatedComposition}
          className="w-full"
        />
      )
    }
    
    // 回退显示
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">⚠️ Fallback Mode</Badge>
          AI Generated: {deviceEntity?.value} {metricEntity?.value} Analysis
        </div>
        <ChartBarMixed />
      </div>
    )
  }

  const quickActions = [
    "Show chiller efficiency",      // → PerformanceScoreChart
    "Monitor temperature",          // → TemperatureMonitor (HVAC内部温度)
    "Check water temperature",      // → TemperatureMonitor (HVAC内部温度)
    "View system overview",         // → EquipmentChart (简洁拓扑图)
    "Monitor status",              // → StatusMonitor (设备状态)
    "What is COP?"                 // → ConceptExplainer
  ]

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HVAC AI Assistant - Business Data Architecture</h1>
        <p className="text-muted-foreground">
          🏗️ Complete 3-Layer Architecture: AI Intent → Business Data Generation → Design System Rendering
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="default" className="bg-green-500">Layer 3 AI ✓</Badge>
          <Badge variant="outline">Business Data ✓</Badge>
          <Badge variant="outline">Real HVAC Metrics ✓</Badge>
          <Badge variant="outline">Semantic Mapping ✓</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Chat Interface */}
        <Card>
          <CardHeader>
            <CardTitle>🤖 AI Assistant Chat</CardTitle>
            <CardDescription>
              Input natural language → AI Intent Recognition → Real Business Data Generation → Chart Rendering
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 overflow-y-auto border rounded-lg p-4 mb-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    🧠 AI is analyzing intent and generating business components...
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your command..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSend()
                    }
                  }}
                  disabled={isProcessing}
                />
                <Button onClick={handleSend} disabled={!inputValue.trim() || isProcessing}>
                  Send
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick Commands:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        console.log('🎯 快速操作按钮点击:', action)
                        setInputValue(action)
                        // 直接使用action参数处理，避免状态延迟问题
                        handleSendWithInput(action)
                      }}
                      disabled={isProcessing}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Processing Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>📊 AI Processing Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{conversationHistory.length}</div>
                <div className="text-sm text-muted-foreground">Conversation Turns</div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{generatedComponent ? 1 : 0}</div>
                <div className="text-sm text-muted-foreground">Generated Components</div>
              </div>
            </div>
            
            {generatedComponent && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-800 mb-2">🎯 Currently Generated Component:</div>
                <div className="text-xs text-blue-600 space-y-1">
                  <div>Component Type: <code>{generatedComponent.type}</code></div>
                  <div>Recognized Intent: <code>{generatedComponent.intent}</code></div>
                  <div>Confidence: <code>{Math.round(generatedComponent.confidence * 100)}%</code></div>
                  <div>Entities: <code>{generatedComponent.entities.map(e => `${e.type}:${e.value}`).join(', ')}</code></div>
                </div>
              </div>
            )}
            
            {conversationHistory.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Processing History:</div>
                {conversationHistory.slice(-2).map((turn, index) => (
                  <div key={index} className="text-xs p-2 bg-muted rounded">
                    <div className="font-medium">"{turn.userInput}"</div>
                    <div className="text-muted-foreground">
                      → {turn.intentResult.intent} → {turn.componentConfig.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Generated Component Display */}
      {generatedComponent && (
        <Card>
          <CardHeader>
            <CardTitle>🎯 AI-Generated HVAC Business Component</CardTitle>
            <CardDescription>
              {generatedComponent.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderGeneratedComponent()}
          </CardContent>
        </Card>
      )}

      {/* Start Experience Prompt */}
      {!generatedComponent && (
        <Card>
          <CardHeader>
            <CardTitle>💡 Experience the Complete 3-Layer Architecture</CardTitle>
            <CardDescription>
              See how AI intent understanding generates real HVAC business data instead of static generic charts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-lg mb-4">🗣️ "Show chiller efficiency" → 🧠 AI Intent → 📊 Real COP Data → 🎨 Business Chart</div>
              <div className="text-sm text-muted-foreground">
                Layer 3 AI generates actual chiller efficiency data (COP values, energy consumption) - no more generic browser statistics!
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}