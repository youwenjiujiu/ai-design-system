/**
 * Business Data Generator - Layer 3
 * 
 * Generates real HVAC business data based on AI intents
 * Replaces generic chart data with business-specific content
 */

export interface HVACDataPoint {
  timestamp: string
  value: number
  unit: string
  status?: 'normal' | 'warning' | 'error'
  metadata?: Record<string, any>
}

export interface ChillerEfficiencyData {
  cop: HVACDataPoint[]
  energyConsumption: HVACDataPoint[]
  coolingCapacity: HVACDataPoint[]
  efficiency: HVACDataPoint[]
  operatingHours: number
  totalLoad: number
}

export interface TemperatureData {
  supplyWaterTemp: HVACDataPoint[]
  returnWaterTemp: HVACDataPoint[]
  temperatureDelta: HVACDataPoint[]
  ambientTemp: HVACDataPoint[]
}

export interface SystemStatusData {
  equipmentStatus: Array<{
    id: string
    name: string
    status: 'running' | 'stopped' | 'warning' | 'error'
    value: string
    lastUpdate: string
  }>
  alerts: Array<{
    level: 'info' | 'warning' | 'error'
    message: string
    timestamp: string
    deviceId?: string
  }>
  systemHealth: {
    overall: number
    efficiency: number
    maintenance: number
    energy: number
  }
}

export interface FlowData {
  chilledWaterFlow: HVACDataPoint[]
  coolingWaterFlow: HVACDataPoint[]
  pressure: HVACDataPoint[]
  flowRate: HVACDataPoint[]
}

export interface EnergyData {
  dailyConsumption: HVACDataPoint[]
  hourlyConsumption: HVACDataPoint[]
  efficiency: HVACDataPoint[]
  costAnalysis: HVACDataPoint[]
  comparison: {
    today: number
    yesterday: number
    lastWeek: number
    trend: 'up' | 'down' | 'stable'
  }
}

// ===========================================
// Business Data Generator Class
// ===========================================

export class BusinessDataGenerator {
  private baseTimestamp = Date.now()
  
  /**
   * Generate chiller efficiency business data
   */
  generateChillerEfficiencyData(timeRange: 'hour' | 'day' | 'week' = 'day'): ChillerEfficiencyData {
    const dataPoints = this.getDataPointCount(timeRange)
    const interval = this.getInterval(timeRange)
    
    return {
      cop: this.generateTimeSeries(dataPoints, interval, {
        base: 4.2,
        variance: 0.8,
        unit: 'COP',
        trend: 'stable'
      }),
      energyConsumption: this.generateTimeSeries(dataPoints, interval, {
        base: 1250,
        variance: 200,
        unit: 'kWh',
        trend: 'decreasing'
      }),
      coolingCapacity: this.generateTimeSeries(dataPoints, interval, {
        base: 5250,
        variance: 500,
        unit: 'kW',
        trend: 'stable'
      }),
      efficiency: this.generateTimeSeries(dataPoints, interval, {
        base: 89,
        variance: 8,
        unit: '%',
        trend: 'increasing'
      }),
      operatingHours: 18.5,
      totalLoad: 85.2
    }
  }

  /**
   * Generate temperature monitoring business data
   */
  generateTemperatureData(timeRange: 'hour' | 'day' | 'week' = 'day'): TemperatureData {
    const dataPoints = this.getDataPointCount(timeRange)
    const interval = this.getInterval(timeRange)
    
    return {
      supplyWaterTemp: this.generateTimeSeries(dataPoints, interval, {
        base: 7.2,
        variance: 0.8,
        unit: '°C',
        trend: 'stable'
      }),
      returnWaterTemp: this.generateTimeSeries(dataPoints, interval, {
        base: 12.8,
        variance: 1.2,
        unit: '°C',
        trend: 'stable'
      }),
      temperatureDelta: this.generateTimeSeries(dataPoints, interval, {
        base: 5.6,
        variance: 0.5,
        unit: '°C',
        trend: 'stable'
      }),
      ambientTemp: this.generateTimeSeries(dataPoints, interval, {
        base: 28.5,
        variance: 3.0,
        unit: '°C',
        trend: 'variable'
      })
    }
  }

  /**
   * Generate system status business data
   */
  generateSystemStatusData(): SystemStatusData {
    return {
      equipmentStatus: [
        {
          id: 'chiller-01',
          name: 'Chiller Unit #1',
          status: 'running',
          value: 'COP 4.2',
          lastUpdate: new Date(Date.now() - 2 * 60 * 1000).toISOString()
        },
        {
          id: 'tower-01',
          name: 'Cooling Tower #1',
          status: 'running',
          value: '1450 RPM',
          lastUpdate: new Date(Date.now() - 1 * 60 * 1000).toISOString()
        },
        {
          id: 'pump-01',
          name: 'Water Pump #1',
          status: 'warning',
          value: 'Low Flow Rate',
          lastUpdate: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        },
        {
          id: 'chiller-02',
          name: 'Chiller Unit #2',
          status: 'running',
          value: 'COP 3.8',
          lastUpdate: new Date(Date.now() - 3 * 60 * 1000).toISOString()
        }
      ],
      alerts: [
        {
          level: 'warning',
          message: 'Cooling water temperature elevated above optimal range',
          timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          deviceId: 'tower-01'
        },
        {
          level: 'info',
          message: 'Chiller efficiency optimization completed',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          deviceId: 'chiller-01'
        },
        {
          level: 'error',
          message: 'Pump #1 flow rate below minimum threshold',
          timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
          deviceId: 'pump-01'
        }
      ],
      systemHealth: {
        overall: 89,
        efficiency: 92,
        maintenance: 85,
        energy: 88
      }
    }
  }

  /**
   * Generate flow monitoring business data
   */
  generateFlowData(timeRange: 'hour' | 'day' | 'week' = 'day'): FlowData {
    const dataPoints = this.getDataPointCount(timeRange)
    const interval = this.getInterval(timeRange)
    
    return {
      chilledWaterFlow: this.generateTimeSeries(dataPoints, interval, {
        base: 180,
        variance: 25,
        unit: 'm³/h',
        trend: 'stable'
      }),
      coolingWaterFlow: this.generateTimeSeries(dataPoints, interval, {
        base: 200,
        variance: 30,
        unit: 'm³/h', 
        trend: 'stable'
      }),
      pressure: this.generateTimeSeries(dataPoints, interval, {
        base: 2.1,
        variance: 0.3,
        unit: 'MPa',
        trend: 'stable'
      }),
      flowRate: this.generateTimeSeries(dataPoints, interval, {
        base: 85,
        variance: 10,
        unit: '%',
        trend: 'stable'
      })
    }
  }

  /**
   * Generate energy consumption business data
   */
  generateEnergyData(timeRange: 'hour' | 'day' | 'week' = 'day'): EnergyData {
    const dataPoints = this.getDataPointCount(timeRange)
    const interval = this.getInterval(timeRange)
    
    return {
      dailyConsumption: this.generateTimeSeries(dataPoints, interval, {
        base: 1250,
        variance: 200,
        unit: 'kWh',
        trend: 'decreasing'
      }),
      hourlyConsumption: this.generateTimeSeries(24, 60 * 60 * 1000, {
        base: 52,
        variance: 15,
        unit: 'kWh',
        trend: 'variable'
      }),
      efficiency: this.generateTimeSeries(dataPoints, interval, {
        base: 89,
        variance: 8,
        unit: '%',
        trend: 'increasing'
      }),
      costAnalysis: this.generateTimeSeries(dataPoints, interval, {
        base: 187.5,
        variance: 30,
        unit: 'USD',
        trend: 'decreasing'
      }),
      comparison: {
        today: 1250,
        yesterday: 1356,
        lastWeek: 1425,
        trend: 'down'
      }
    }
  }

  // ===========================================
  // Private Helper Methods
  // ===========================================

  private getDataPointCount(timeRange: 'hour' | 'day' | 'week'): number {
    switch (timeRange) {
      case 'hour': return 12 // 5-minute intervals
      case 'day': return 24  // hourly intervals
      case 'week': return 7  // daily intervals
      default: return 24
    }
  }

  private getInterval(timeRange: 'hour' | 'day' | 'week'): number {
    switch (timeRange) {
      case 'hour': return 5 * 60 * 1000      // 5 minutes
      case 'day': return 60 * 60 * 1000      // 1 hour
      case 'week': return 24 * 60 * 60 * 1000 // 1 day
      default: return 60 * 60 * 1000
    }
  }

  private generateTimeSeries(
    count: number, 
    interval: number, 
    config: {
      base: number
      variance: number
      unit: string
      trend: 'increasing' | 'decreasing' | 'stable' | 'variable'
    }
  ): HVACDataPoint[] {
    const points: HVACDataPoint[] = []
    const { base, variance, unit, trend } = config
    
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(this.baseTimestamp - (count - i - 1) * interval).toISOString()
      
      // Apply trend
      let trendFactor = 0
      switch (trend) {
        case 'increasing':
          trendFactor = (i / count) * 0.1 // 10% increase over time
          break
        case 'decreasing':
          trendFactor = -(i / count) * 0.08 // 8% decrease over time
          break
        case 'variable':
          trendFactor = Math.sin(i / count * Math.PI * 2) * 0.05 // sinusoidal variation
          break
        case 'stable':
        default:
          trendFactor = (Math.random() - 0.5) * 0.02 // minimal random variation
      }
      
      // Add random variance
      const randomFactor = (Math.random() - 0.5) * 2 * (variance / base)
      
      const value = base * (1 + trendFactor + randomFactor)
      
      // Determine status based on value deviation
      let status: 'normal' | 'warning' | 'error' = 'normal'
      const deviation = Math.abs(value - base) / base
      if (deviation > 0.15) status = 'error'
      else if (deviation > 0.08) status = 'warning'
      
      points.push({
        timestamp,
        value: Math.round(value * 100) / 100,
        unit,
        status,
        metadata: {
          trend,
          baseValue: base,
          deviation: Math.round(deviation * 10000) / 100 // percentage with 2 decimals
        }
      })
    }
    
    return points
  }
}

// ===========================================
// Business Data Mapping Utilities
// ===========================================

export const businessDataMappings = {
  // Intent to data generator mapping
  intentToDataType: {
    'analyze_performance': 'chiller_efficiency',
    'show_data': 'temperature',
    'monitor_status': 'system_status',
    'monitor_energy': 'energy',
    'monitor_flow': 'flow'
  },

  // Component type to data type mapping
  componentToDataType: {
    'PerformanceScoreChart': 'chiller_efficiency',
    'TemperatureRangeChart': 'temperature',
    'HVACChartsDemo': 'system_status',
    'EnergyReductionChart': 'energy',
    'FlowMonitoringChart': 'flow'
  },

  // Data type to chart data format mapping
  dataTypeToChartFormat: {
    'chiller_efficiency': (data: ChillerEfficiencyData) => ({
      title: 'Chiller Efficiency Analysis',
      data: data.cop.map((point, index) => ({
        time: new Date(point.timestamp).getHours() + ':00',
        efficiency: point.value,
        energy: data.energyConsumption[index]?.value || 0,
        capacity: data.coolingCapacity[index]?.value || 0,
        fill: point.status === 'normal' ? 'var(--chart-1)' : 
              point.status === 'warning' ? 'var(--chart-2)' : 'var(--chart-3)'
      })),
      config: {
        efficiency: { label: 'COP Efficiency', color: 'var(--chart-1)' },
        energy: { label: 'Energy (kWh)', color: 'var(--chart-2)' },
        capacity: { label: 'Capacity (kW)', color: 'var(--chart-3)' }
      }
    }),

    'temperature': (data: TemperatureData) => ({
      title: 'Temperature Monitoring',
      data: data.supplyWaterTemp.map((point, index) => ({
        time: new Date(point.timestamp).getHours() + ':00',
        supply: point.value,
        return: data.returnWaterTemp[index]?.value || 0,
        delta: data.temperatureDelta[index]?.value || 0,
        ambient: data.ambientTemp[index]?.value || 0,
        fill: 'var(--chart-1)'
      })),
      config: {
        supply: { label: 'Supply Water (°C)', color: 'var(--chart-1)' },
        return: { label: 'Return Water (°C)', color: 'var(--chart-2)' },
        delta: { label: 'Temperature Delta (°C)', color: 'var(--chart-3)' },
        ambient: { label: 'Ambient Temp (°C)', color: 'var(--chart-4)' }
      }
    }),

    'energy': (data: EnergyData) => ({
      title: 'Energy Consumption Analysis',
      data: data.dailyConsumption.map((point, index) => ({
        time: new Date(point.timestamp).getHours() + ':00',
        consumption: point.value,
        efficiency: data.efficiency[index]?.value || 0,
        cost: data.costAnalysis[index]?.value || 0,
        fill: 'var(--chart-1)'
      })),
      config: {
        consumption: { label: 'Energy (kWh)', color: 'var(--chart-1)' },
        efficiency: { label: 'Efficiency (%)', color: 'var(--chart-2)' },
        cost: { label: 'Cost (USD)', color: 'var(--chart-3)' }
      }
    }),

    'flow': (data: FlowData) => ({
      title: 'Flow Rate Monitoring',
      data: data.chilledWaterFlow.map((point, index) => ({
        time: new Date(point.timestamp).getHours() + ':00',
        chilledWater: point.value,
        coolingWater: data.coolingWaterFlow[index]?.value || 0,
        pressure: data.pressure[index]?.value || 0,
        fill: 'var(--chart-1)'
      })),
      config: {
        chilledWater: { label: 'Chilled Water (m³/h)', color: 'var(--chart-1)' },
        coolingWater: { label: 'Cooling Water (m³/h)', color: 'var(--chart-2)' },
        pressure: { label: 'Pressure (MPa)', color: 'var(--chart-3)' }
      }
    })
  }
} as const

// Export singleton instance
export const businessDataGenerator = new BusinessDataGenerator()