/**
 * Chart Data Mapper - Layer 3
 * 
 * Maps business HVAC data to chart component data formats
 * Ensures proper data flow from AI intent to chart visualization
 */

import { 
  BusinessDataGenerator, 
  businessDataMappings, 
  type ChillerEfficiencyData,
  type TemperatureData,
  type SystemStatusData,
  type FlowData,
  type EnergyData 
} from './business-data-generator'

// ===========================================
// Chart Data Interfaces
// ===========================================

export interface ChartDataPoint {
  [key: string]: string | number
}

export interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export interface MappedChartData {
  title: string
  description: string
  data: ChartDataPoint[]
  config: ChartConfig
  metadata: {
    dataType: string
    lastUpdate: string
    pointCount: number
    timeRange: string
  }
}

// ===========================================
// Chart Data Mapper Class
// ===========================================

export class ChartDataMapper {
  private dataGenerator: BusinessDataGenerator

  constructor() {
    this.dataGenerator = new BusinessDataGenerator()
  }

  /**
   * Map AI intent to chart data
   */
  async mapIntentToChartData(
    intent: string,
    componentType: string,
    entities: Array<{ type: string; value: string }>,
    timeRange: 'hour' | 'day' | 'week' = 'day'
  ): Promise<MappedChartData> {
    
    // Determine data type from intent or component
    const dataType = this.determineDataType(intent, componentType, entities)
    
    // Generate business data
    const businessData = await this.generateBusinessData(dataType, timeRange)
    
    // Map to chart format
    return this.mapBusinessDataToChart(businessData, dataType, entities)
  }

  /**
   * Determine what type of business data to generate
   */
  private determineDataType(
    intent: string, 
    componentType: string, 
    entities: Array<{ type: string; value: string }>
  ): string {
    
    // Check intent mapping first
    const intentMapping = businessDataMappings.intentToDataType[intent as keyof typeof businessDataMappings.intentToDataType]
    if (intentMapping) return intentMapping

    // Check component mapping
    const componentMapping = businessDataMappings.componentToDataType[componentType as keyof typeof businessDataMappings.componentToDataType]
    if (componentMapping) return componentMapping

    // Check entities for hints
    const metricEntity = entities.find(e => e.type === 'metric')
    if (metricEntity) {
      const metric = metricEntity.value.toLowerCase()
      if (metric.includes('efficiency') || metric.includes('performance') || metric.includes('cop')) {
        return 'chiller_efficiency'
      }
      if (metric.includes('temperature') || metric.includes('temp')) {
        return 'temperature'
      }
      if (metric.includes('energy') || metric.includes('power') || metric.includes('consumption')) {
        return 'energy'
      }
      if (metric.includes('flow') || metric.includes('pressure')) {
        return 'flow'
      }
      if (metric.includes('status') || metric.includes('monitor')) {
        return 'system_status'
      }
    }

    // Default fallback
    return 'system_status'
  }

  /**
   * Generate business data based on type
   */
  private async generateBusinessData(
    dataType: string, 
    timeRange: 'hour' | 'day' | 'week'
  ): Promise<ChillerEfficiencyData | TemperatureData | SystemStatusData | FlowData | EnergyData> {
    
    switch (dataType) {
      case 'chiller_efficiency':
        return this.dataGenerator.generateChillerEfficiencyData(timeRange)
      
      case 'temperature':
        return this.dataGenerator.generateTemperatureData(timeRange)
      
      case 'system_status':
        return this.dataGenerator.generateSystemStatusData()
      
      case 'flow':
        return this.dataGenerator.generateFlowData(timeRange)
      
      case 'energy':
        return this.dataGenerator.generateEnergyData(timeRange)
      
      default:
        return this.dataGenerator.generateSystemStatusData()
    }
  }

  /**
   * Map business data to chart format
   */
  private mapBusinessDataToChart(
    businessData: any,
    dataType: string,
    entities: Array<{ type: string; value: string }>
  ): MappedChartData {
    
    const deviceEntity = entities.find(e => e.type === 'device')
    const metricEntity = entities.find(e => e.type === 'metric')
    
    switch (dataType) {
      case 'chiller_efficiency':
        return this.mapChillerEfficiencyData(businessData, deviceEntity, metricEntity)
      
      case 'temperature':
        return this.mapTemperatureData(businessData, deviceEntity, metricEntity)
      
      case 'energy':
        return this.mapEnergyData(businessData, deviceEntity, metricEntity)
      
      case 'flow':
        return this.mapFlowData(businessData, deviceEntity, metricEntity)
      
      case 'system_status':
        return this.mapSystemStatusData(businessData, deviceEntity, metricEntity)
      
      default:
        return this.mapDefaultData(businessData, deviceEntity, metricEntity)
    }
  }

  // ===========================================
  // Specific Data Mappers
  // ===========================================

  private mapChillerEfficiencyData(
    data: ChillerEfficiencyData,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    return {
      title: `${deviceEntity?.value || 'Chiller'} Efficiency Analysis`,
      description: `COP performance and energy efficiency metrics`,
      data: data.cop.map((point, index) => ({
        time: new Date(point.timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        cop: point.value,
        energy: data.energyConsumption[index]?.value || 0,
        efficiency: data.efficiency[index]?.value || 0,
        capacity: Math.round(data.coolingCapacity[index]?.value || 0),
        fill: point.status === 'normal' ? 'var(--chart-1)' : 
              point.status === 'warning' ? 'var(--chart-2)' : 'var(--chart-3)'
      })),
      config: {
        cop: { label: 'COP Value', color: 'var(--chart-1)' },
        energy: { label: 'Energy (kWh)', color: 'var(--chart-2)' },
        efficiency: { label: 'Efficiency (%)', color: 'var(--chart-3)' },
        capacity: { label: 'Capacity (kW)', color: 'var(--chart-4)' }
      },
      metadata: {
        dataType: 'chiller_efficiency',
        lastUpdate: new Date().toISOString(),
        pointCount: data.cop.length,
        timeRange: 'last 24 hours'
      }
    }
  }

  private mapTemperatureData(
    data: TemperatureData,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    return {
      title: `${deviceEntity?.value || 'HVAC System'} Temperature Monitoring`,
      description: `Water temperature and thermal differential analysis`,
      data: data.supplyWaterTemp.map((point, index) => ({
        time: new Date(point.timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
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
      },
      metadata: {
        dataType: 'temperature',
        lastUpdate: new Date().toISOString(),
        pointCount: data.supplyWaterTemp.length,
        timeRange: 'last 24 hours'
      }
    }
  }

  private mapEnergyData(
    data: EnergyData,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    return {
      title: `${deviceEntity?.value || 'System'} Energy Consumption`,
      description: `Power usage and efficiency optimization metrics`,
      data: data.dailyConsumption.map((point, index) => ({
        time: new Date(point.timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        consumption: point.value,
        efficiency: data.efficiency[index]?.value || 0,
        cost: data.costAnalysis[index]?.value || 0,
        hourly: data.hourlyConsumption[index]?.value || 0,
        fill: point.status === 'normal' ? 'var(--chart-1)' : 
              point.status === 'warning' ? 'var(--chart-2)' : 'var(--chart-3)'
      })),
      config: {
        consumption: { label: 'Energy (kWh)', color: 'var(--chart-1)' },
        efficiency: { label: 'Efficiency (%)', color: 'var(--chart-2)' },
        cost: { label: 'Cost (USD)', color: 'var(--chart-3)' },
        hourly: { label: 'Hourly (kWh)', color: 'var(--chart-4)' }
      },
      metadata: {
        dataType: 'energy',
        lastUpdate: new Date().toISOString(),
        pointCount: data.dailyConsumption.length,
        timeRange: 'last 24 hours'
      }
    }
  }

  private mapFlowData(
    data: FlowData,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    return {
      title: `${deviceEntity?.value || 'Water System'} Flow Monitoring`,
      description: `Water flow rates and pressure analysis`,
      data: data.chilledWaterFlow.map((point, index) => ({
        time: new Date(point.timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        chilledWater: point.value,
        coolingWater: data.coolingWaterFlow[index]?.value || 0,
        pressure: data.pressure[index]?.value || 0,
        flowRate: data.flowRate[index]?.value || 0,
        fill: 'var(--chart-1)'
      })),
      config: {
        chilledWater: { label: 'Chilled Water (m³/h)', color: 'var(--chart-1)' },
        coolingWater: { label: 'Cooling Water (m³/h)', color: 'var(--chart-2)' },
        pressure: { label: 'Pressure (MPa)', color: 'var(--chart-3)' },
        flowRate: { label: 'Flow Rate (%)', color: 'var(--chart-4)' }
      },
      metadata: {
        dataType: 'flow',
        lastUpdate: new Date().toISOString(),
        pointCount: data.chilledWaterFlow.length,
        timeRange: 'last 24 hours'
      }
    }
  }

  private mapSystemStatusData(
    data: SystemStatusData,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    // Convert system status to chart-compatible format
    const chartData = data.equipmentStatus.map((equipment, index) => ({
      equipment: equipment.name,
      status: equipment.status === 'running' ? 100 : 
              equipment.status === 'warning' ? 70 : 
              equipment.status === 'error' ? 30 : 0,
      uptime: 85 + Math.random() * 10, // simulated uptime
      efficiency: data.systemHealth.efficiency - (index * 2),
      fill: equipment.status === 'running' ? 'var(--chart-1)' : 
            equipment.status === 'warning' ? 'var(--chart-2)' : 'var(--chart-3)'
    }))

    return {
      title: `${deviceEntity?.value || 'HVAC System'} Status Overview`,
      description: `Equipment operational status and health metrics`,
      data: chartData,
      config: {
        status: { label: 'Status (%)', color: 'var(--chart-1)' },
        uptime: { label: 'Uptime (%)', color: 'var(--chart-2)' },
        efficiency: { label: 'Efficiency (%)', color: 'var(--chart-3)' }
      },
      metadata: {
        dataType: 'system_status',
        lastUpdate: new Date().toISOString(),
        pointCount: chartData.length,
        timeRange: 'current status'
      }
    }
  }

  private mapDefaultData(
    data: any,
    deviceEntity?: { type: string; value: string },
    metricEntity?: { type: string; value: string }
  ): MappedChartData {
    return {
      title: `${deviceEntity?.value || 'HVAC'} ${metricEntity?.value || 'Monitoring'}`,
      description: `Real-time HVAC system monitoring dashboard`,
      data: [
        { category: 'Efficiency', value: 89, fill: 'var(--chart-1)' },
        { category: 'Energy', value: 76, fill: 'var(--chart-2)' },
        { category: 'Performance', value: 92, fill: 'var(--chart-3)' },
        { category: 'Maintenance', value: 85, fill: 'var(--chart-4)' }
      ],
      config: {
        value: { label: 'Performance (%)', color: 'var(--chart-1)' }
      },
      metadata: {
        dataType: 'default',
        lastUpdate: new Date().toISOString(),
        pointCount: 4,
        timeRange: 'current'
      }
    }
  }
}

// ===========================================
// Data Format Conversion Utilities
// ===========================================

export const chartFormatConverters = {
  /**
   * Convert to Recharts BarChart format
   */
  toBarChartFormat: (mappedData: MappedChartData) => ({
    data: mappedData.data,
    config: mappedData.config,
    title: mappedData.title,
    description: mappedData.description
  }),

  /**
   * Convert to Recharts AreaChart format
   */
  toAreaChartFormat: (mappedData: MappedChartData) => ({
    data: mappedData.data,
    config: mappedData.config,
    title: mappedData.title,
    description: mappedData.description
  }),

  /**
   * Convert to business component props format
   */
  toBusinessComponentFormat: (mappedData: MappedChartData) => ({
    title: mappedData.title,
    description: mappedData.description,
    data: mappedData.data,
    config: mappedData.config,
    metadata: mappedData.metadata,
    businessData: true // flag to indicate this is real business data
  })
}

// Export singleton instance
export const chartDataMapper = new ChartDataMapper()