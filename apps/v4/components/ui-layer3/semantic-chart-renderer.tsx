/**
 * Semantic Chart Renderer - Layer 3
 * 
 * Renders charts with business-specific data instead of generic data
 * Implements the correct 3-layer architecture data flow
 */

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import { Progress } from '@/registry/new-york-v4/ui/progress'
import { Alert, AlertDescription } from '@/registry/new-york-v4/ui/alert'
import { ChartBarMixed } from '@/registry/new-york-v4/charts/chart-bar-mixed'
import { ChartAreaInteractive } from '@/registry/new-york-v4/charts/chart-area-interactive'
import { chartDataMapper, type MappedChartData, chartFormatConverters } from './chart-data-mapper'

// ===========================================
// Semantic Chart Component Props
// ===========================================

export interface SemanticChartRendererProps {
  intent: string
  componentType: string
  entities: Array<{ type: string; value: string }>
  title?: string
  description?: string
  timeRange?: 'hour' | 'day' | 'week'
  size?: 'sm' | 'md' | 'lg'
  theme?: 'light' | 'dark'
  showMetadata?: boolean
  className?: string
}

// ===========================================
// Business-Aware Chart Components
// ===========================================

/**
 * Business Chart Wrapper that uses real HVAC data
 */
const BusinessChart: React.FC<{
  data: MappedChartData
  chartType: 'bar' | 'area'
  size?: 'sm' | 'md' | 'lg'
}> = ({ data, chartType, size = 'md' }) => {
  
  const chartProps = chartFormatConverters.toBusinessComponentFormat(data)
  
  // Create a modified version of the original chart with business data
  const BusinessChartBarMixed = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Business Data Visualization */}
            <div className="h-48 w-full">
              {chartType === 'bar' ? (
                <div className="h-full bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border flex items-end justify-between p-4">
                  {data.data.slice(0, 8).map((point, index) => {
                    const value = typeof point.value === 'number' ? point.value : 
                                 typeof point.cop === 'number' ? point.cop :
                                 typeof point.efficiency === 'number' ? point.efficiency : 
                                 typeof point.consumption === 'number' ? point.consumption : 50
                    
                    // Normalize value for bar height (0-100%)
                    let normalizedValue = value
                    if (value > 100) normalizedValue = (value / 10) // For large values like energy
                    if (value < 10) normalizedValue = value * 10   // For small values like COP
                    
                    const height = Math.max(15, Math.min(85, normalizedValue))
                    const barColor = value > 80 ? 'bg-green-500' : 
                                    value > 60 ? 'bg-blue-500' : 
                                    value > 40 ? 'bg-yellow-500' : 'bg-red-500'
                    
                    return (
                      <div key={index} className="flex flex-col items-center gap-1 min-w-[30px]">
                        <div 
                          className={`${barColor} rounded-t w-6 transition-all hover:scale-110`}
                          style={{ height: `${height}%` }}
                          title={`${point.time || index}: ${value.toFixed(1)}${typeof point.cop === 'number' ? ' COP' : typeof point.efficiency === 'number' ? '%' : ' kWh'}`}
                        />
                        <span className="text-xs text-muted-foreground truncate text-center w-8">
                          {typeof point.time === 'string' ? point.time.slice(0, 5) : 
                           point.equipment ? point.equipment.slice(0, 4) : 
                           `${index}`}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="h-full bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border relative p-4">
                  <svg width="100%" height="100%" viewBox="0 0 400 160" className="absolute inset-4">
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>
                    
                    {/* Generate area path with actual data */}
                    <path
                      d={generateAreaPath(data.data.slice(0, 12), 400, 160)}
                      fill="url(#areaGradient)"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                    
                    {/* Data points */}
                    {data.data.slice(0, 12).map((point, index) => {
                      const value = typeof point.value === 'number' ? point.value : 
                                   typeof point.supply === 'number' ? point.supply :
                                   typeof point.efficiency === 'number' ? point.efficiency : 50
                      const x = (index / 11) * 400
                      const y = 160 - (value > 100 ? (value / 10) : value < 10 ? value * 8 : value) * 1.2
                      
                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={Math.max(10, Math.min(150, y))}
                          r="3"
                          fill="#3b82f6"
                          className="hover:r-5 transition-all cursor-pointer"
                          title={`${point.time || index}: ${value.toFixed(1)}`}
                        />
                      )
                    })}
                  </svg>
                </div>
              )}
            </div>
            
            {/* Business Metrics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(data.config).slice(0, 4).map(([key, config], index) => {
                const sampleValue = data.data[0]?.[key] || 0
                return (
                  <div key={key} className="text-center p-2 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">{config.label}</div>
                    <div className="text-lg font-bold" style={{ color: config.color }}>
                      {typeof sampleValue === 'number' ? 
                        (sampleValue > 100 ? Math.round(sampleValue) : sampleValue.toFixed(1)) : 
                        sampleValue}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const BusinessChartAreaInteractive = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Interactive Area Chart */}
            <div className="h-48 w-full bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border relative">
              <svg width="100%" height="100%" className="absolute inset-0">
                <path
                  d={generateAreaPath(data.data, 400, 150)}
                  fill="url(#interactiveGradient)"
                  stroke="var(--chart-1)"
                  strokeWidth="2"
                />
                <defs>
                  <linearGradient id="interactiveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                
                {/* Data Points */}
                {data.data.slice(0, 8).map((point, index) => {
                  const x = (index / 7) * 400
                  const value = typeof point.value === 'number' ? point.value : 
                               typeof point.supply === 'number' ? point.supply :
                               typeof point.efficiency === 'number' ? point.efficiency : 0
                  const y = 150 - (value / 100) * 120
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="var(--chart-1)"
                      className="hover:r-6 transition-all cursor-pointer"
                      title={`${point.time || index}: ${value}`}
                    />
                  )
                })}
              </svg>
            </div>
            
            {/* Real-time Indicators */}
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(data.config).slice(0, 3).map(([key, config]) => {
                const currentValue = data.data[data.data.length - 1]?.[key] || 0
                const previousValue = data.data[data.data.length - 2]?.[key] || 0
                const trend = currentValue > previousValue ? '↗' : currentValue < previousValue ? '↘' : '→'
                const trendColor = currentValue > previousValue ? 'text-green-500' : 
                                  currentValue < previousValue ? 'text-red-500' : 'text-gray-500'
                
                return (
                  <div key={key} className="p-3 border rounded-lg">
                    <div className="text-xs text-muted-foreground">{config.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">
                        {typeof currentValue === 'number' ? 
                          (currentValue > 100 ? Math.round(currentValue) : currentValue.toFixed(1)) : 
                          currentValue}
                      </span>
                      <span className={`text-sm ${trendColor}`}>{trend}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return chartType === 'bar' ? <BusinessChartBarMixed /> : <BusinessChartAreaInteractive />
}

/**
 * Generate SVG path for area chart
 */
const generateAreaPath = (data: any[], width: number, height: number): string => {
  if (data.length === 0) return `M 0,${height} L ${width},${height} Z`
  
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * width
    const value = typeof point.value === 'number' ? point.value : 
                 typeof point.supply === 'number' ? point.supply :
                 typeof point.efficiency === 'number' ? point.efficiency : 
                 typeof point.cop === 'number' ? point.cop : 50
    
    // Normalize value for chart height
    let normalizedValue = value
    if (value > 100) normalizedValue = value / 10  // For large values like energy
    if (value < 10) normalizedValue = value * 8    // For small values like COP
    
    const y = height - Math.max(10, Math.min(height - 20, normalizedValue * 1.2))
    return { x, y }
  })
  
  // Create smooth path
  let pathData = `M 0,${height}`
  
  if (points.length > 0) {
    pathData += ` L ${points[0].x},${points[0].y}`
    
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x},${points[i].y}`
    }
  }
  
  pathData += ` L ${width},${height} Z`
  return pathData
}

// ===========================================
// Main Semantic Chart Renderer
// ===========================================

export const SemanticChartRenderer: React.FC<SemanticChartRendererProps> = ({
  intent,
  componentType,
  entities,
  title,
  description,
  timeRange = 'day',
  size = 'md',
  theme = 'light',
  showMetadata = true,
  className = ''
}) => {
  const [mappedData, setMappedData] = useState<MappedChartData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load business data when component mounts or props change
  useEffect(() => {
    loadBusinessData()
  }, [intent, componentType, entities, timeRange])

  const loadBusinessData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Use the chart data mapper to get real business data
      const data = await chartDataMapper.mapIntentToChartData(
        intent,
        componentType,
        entities,
        timeRange
      )
      
      setMappedData(data)
    } catch (err) {
      console.error('Failed to load business data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load business data')
    } finally {
      setLoading(false)
    }
  }

  // Determine chart type based on component type and data
  const getChartType = (): 'bar' | 'area' => {
    if (componentType.includes('Bar') || 
        componentType.includes('Performance') || 
        componentType.includes('Score')) {
      return 'bar'
    }
    return 'area'
  }

  // Loading state
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>🧠 AI Loading Business Data...</CardTitle>
          <CardDescription>Generating real HVAC business data for {componentType}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-48 bg-muted/20 rounded-lg animate-pulse" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-muted/20 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (error || !mappedData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>❌ Business Data Loading Failed</CardTitle>
          <CardDescription>Unable to generate business-specific chart data</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              {error || 'Unknown error occurred while loading business data'}
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <button 
              onClick={loadBusinessData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry Loading
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const deviceEntity = entities.find(e => e.type === 'device')
  const metricEntity = entities.find(e => e.type === 'metric')

  return (
    <div className={`semantic-chart-renderer space-y-4 ${className}`}>
      {/* AI Processing Indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          ✅ AI Business Data Generated
        </Badge>
        <span>
          Intent: <code>{intent}</code> → Data: <code>{mappedData.metadata.dataType}</code>
        </span>
      </div>

      {/* Business Chart Rendering */}
      <BusinessChart 
        data={mappedData}
        chartType={getChartType()}
        size={size}
      />

      {/* Metadata Display */}
      {showMetadata && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">📊 Business Data Context</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <div className="font-medium text-muted-foreground">Intent Recognition</div>
                <div>{intent}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Business Entity</div>
                <div>{deviceEntity?.value || 'System'}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Metric Type</div>
                <div>{metricEntity?.value || 'Performance'}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Data Points</div>
                <div>{mappedData.metadata.pointCount} points</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Data Source</div>
                <div>Real HVAC Business Data</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Time Range</div>
                <div>{mappedData.metadata.timeRange}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Last Update</div>
                <div>{new Date(mappedData.metadata.lastUpdate).toLocaleTimeString()}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Chart Type</div>
                <div>{getChartType()} chart</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Architecture Flow Indicator */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm font-medium text-blue-800 mb-2">
          🏗️ 3-Layer Architecture Flow Complete
        </div>
        <div className="text-xs text-blue-600 space-y-1">
          <div>1. 🧠 AI Intent Understanding: "{intent}" → Business Concept Mapping</div>
          <div>2. 📊 Business Data Generation: Real {mappedData.metadata.dataType} metrics</div>
          <div>3. 🎨 Design System Rendering: Layer 1 styling + Layer 2 validation</div>
        </div>
      </div>
    </div>
  )
}

export default SemanticChartRenderer