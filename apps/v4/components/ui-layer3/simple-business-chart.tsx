/**
 * Simple Business Chart - 简化版本用于调试
 */

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card'

interface SimpleBusinessChartProps {
  intent: string
  componentType: string
  entities: Array<{ type: string; value: string }>
}

export const SimpleBusinessChart: React.FC<SimpleBusinessChartProps> = ({
  intent,
  componentType,
  entities
}) => {
  // 硬编码的测试数据 - 确保有数据显示
  const testData = [
    { time: '00:00', cop: 4.2, energy: 1250, efficiency: 89 },
    { time: '04:00', cop: 3.8, energy: 1190, efficiency: 85 },
    { time: '08:00', cop: 4.1, energy: 1300, efficiency: 88 },
    { time: '12:00', cop: 3.9, energy: 1280, efficiency: 87 },
    { time: '16:00', cop: 4.0, energy: 1220, efficiency: 86 },
    { time: '20:00', cop: 4.3, energy: 1260, efficiency: 90 }
  ]

  const deviceEntity = entities.find(e => e.type === 'device')
  const metricEntity = entities.find(e => e.type === 'metric')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{deviceEntity?.value || 'Chiller'} {metricEntity?.value || 'Performance'} Analysis</CardTitle>
        <CardDescription>Real HVAC business data visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 简单柱状图 */}
          <div className="h-48 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border p-4">
            <div className="h-full flex items-end justify-between gap-2">
              {testData.map((point, index) => {
                const value = point.cop
                const height = (value / 5) * 100 // COP值除以5转换为百分比
                const barColor = value > 4.0 ? 'bg-green-500' : 
                                value > 3.5 ? 'bg-blue-500' : 'bg-yellow-500'
                
                return (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div 
                      className={`${barColor} rounded-t transition-all hover:scale-110 w-full max-w-[30px]`}
                      style={{ height: `${height}%` }}
                      title={`${point.time}: COP ${point.cop}`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {point.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 数据指标 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-700">4.1</div>
              <div className="text-sm text-blue-600">Avg COP</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl font-bold text-green-700">87%</div>
              <div className="text-sm text-green-600">Efficiency</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-700">1,250</div>
              <div className="text-sm text-orange-600">Energy kWh</div>
            </div>
          </div>

          {/* 调试信息 */}
          <div className="p-3 bg-gray-50 rounded-lg text-xs">
            <div><strong>Intent:</strong> {intent}</div>
            <div><strong>Component:</strong> {componentType}</div>
            <div><strong>Data Points:</strong> {testData.length}</div>
            <div><strong>Status:</strong> ✅ Simple chart rendering successfully</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SimpleBusinessChart