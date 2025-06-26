/**
 * HVAC Business Domain Types
 * 
 * These types represent the core business concepts in HVAC systems,
 * providing type-safe interfaces for AI intent mapping.
 */

import { BusinessSemantic } from '../ui-layer1/design-tokens-simple'

// ===========================================
// Temperature System Types
// ===========================================

export type TemperatureStatus = 'normal' | 'warning' | 'critical' | 'optimal'
export type TemperatureUnit = 'celsius' | 'fahrenheit'

export interface TemperatureReading {
  value: number
  unit: TemperatureUnit
  status: TemperatureStatus
  target?: number
  timestamp: Date
}

export interface TemperatureZone {
  id: string
  name: string
  current: TemperatureReading
  setpoint: number
  mode: 'heating' | 'cooling' | 'auto' | 'off'
}

// ===========================================
// Equipment System Types
// ===========================================

export type EquipmentStatus = 'online' | 'offline' | 'maintenance' | 'error'
export type EquipmentType = 'chiller' | 'boiler' | 'ahu' | 'fan' | 'pump' | 'damper'

export interface Equipment {
  id: string
  name: string
  type: EquipmentType
  status: EquipmentStatus
  efficiency?: number
  runtime: number // hours
  lastMaintenance?: Date
  nextMaintenance?: Date
}

export interface ChillerData extends Equipment {
  type: 'chiller'
  capacity: number // tons
  load: number // percentage
  powerConsumption: number // kW
  waterFlow: number // GPM
  temperature: {
    inlet: number
    outlet: number
  }
}

// ===========================================
// Air Quality Types
// ===========================================

export type AirQualityLevel = 'excellent' | 'good' | 'moderate' | 'poor'

export interface AirQualityReading {
  level: AirQualityLevel
  co2: number // ppm
  humidity: number // percentage
  particulates: number // PM2.5
  voc: number // ppb
  timestamp: Date
}

export interface AirQualityZone {
  id: string
  name: string
  current: AirQualityReading
  targets: {
    co2Max: number
    humidityRange: [number, number]
    particulatesMax: number
  }
}

// ===========================================
// Energy System Types
// ===========================================

export interface EnergyMetrics {
  consumption: number // kWh
  demand: number // kW
  efficiency: number // percentage
  cost: number // dollars
  period: 'hourly' | 'daily' | 'monthly'
  timestamp: Date
}

export interface EnergyTarget {
  consumption: number
  efficiency: number
  cost: number
}

// ===========================================
// Alert and Notification Types
// ===========================================

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'
export type AlertCategory = 'temperature' | 'equipment' | 'energy' | 'air_quality' | 'security'

export interface Alert {
  id: string
  category: AlertCategory
  severity: AlertSeverity
  title: string
  description: string
  equipmentId?: string
  zoneId?: string
  timestamp: Date
  acknowledged: boolean
  resolved: boolean
}

// ===========================================
// AI Intent Types
// ===========================================

export type AIIntentType = 
  | 'temperature_check'
  | 'equipment_status'
  | 'energy_optimization'
  | 'air_quality_monitor'
  | 'alert_review'
  | 'system_control'

export interface AIIntent {
  type: AIIntentType
  confidence: number
  entities: Record<string, any>
  response: string
  actions?: string[]
}

// ===========================================
// Business Semantic Mapping Types
// ===========================================

export interface SemanticMapping {
  intent: AIIntentType
  businessConcept: string
  componentType: string
  semanticState: BusinessSemantic
  iconKey?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

// ===========================================
// System Dashboard Types
// ===========================================

export interface SystemOverview {
  zones: TemperatureZone[]
  equipment: Equipment[]
  airQuality: AirQualityZone[]
  energy: EnergyMetrics
  alerts: Alert[]
  aiStatus: {
    active: boolean
    learning: boolean
    optimizing: boolean
    confidence: number
  }
}

// ===========================================
// Component Props Base Types
// ===========================================

export interface BaseHVACComponentProps {
  className?: string
  variant?: 'default' | 'compact' | 'detailed'
  theme?: 'light' | 'dark'
  interactive?: boolean
  onInteraction?: (action: string, data?: any) => void
}

export interface StatusComponentProps extends BaseHVACComponentProps {
  status: EquipmentStatus | TemperatureStatus | AirQualityLevel
  label: string
  value?: string | number
  unit?: string
  timestamp?: Date
}

export interface DataDisplayProps extends BaseHVACComponentProps {
  value: number
  unit: string
  label: string
  status?: string
  target?: number
  range?: [number, number]
  trend?: 'up' | 'down' | 'stable'
}

// ===========================================
// Button and Control Types
// ===========================================

export type ButtonAction = 
  | 'start' | 'stop' | 'pause' | 'reset' 
  | 'power_on' | 'power_off'
  | 'auto_mode' | 'manual_mode' | 'maintenance_mode'
  | 'emergency_stop' | 'settings'

export type UserPermission = 'operator' | 'engineer' | 'admin'

export interface ButtonOperation {
  action: ButtonAction
  equipmentId?: string
  userId: string
  permission: UserPermission
  timestamp: Date
  confirmed?: boolean
  result?: 'success' | 'failed' | 'pending'
}

export interface SmartButtonRecommendation {
  action: ButtonAction
  priority: 'low' | 'medium' | 'high' | 'critical'
  reason: string
  conditions: string[]
  estimatedResult?: string
}

// ===========================================
// AI Intent to Button Mapping
// ===========================================

export interface AIButtonMapping {
  intent: AIIntentType
  recommendedActions: ButtonAction[]
  requiredPermission: UserPermission
  confirmationRequired: boolean
  businessContext: string
}

export const aiButtonMappings: AIButtonMapping[] = [
  {
    intent: 'temperature_check',
    recommendedActions: ['settings'],
    requiredPermission: 'operator',
    confirmationRequired: false,
    businessContext: '温度查看和基础调节'
  },
  {
    intent: 'equipment_status',
    recommendedActions: ['start', 'stop', 'reset'],
    requiredPermission: 'engineer',
    confirmationRequired: true,
    businessContext: '设备状态管理和故障处理'
  },
  {
    intent: 'energy_optimization',
    recommendedActions: ['auto_mode', 'settings'],
    requiredPermission: 'engineer',
    confirmationRequired: false,
    businessContext: '能源优化和自动化控制'
  },
  {
    intent: 'system_control',
    recommendedActions: ['emergency_stop', 'maintenance_mode'],
    requiredPermission: 'admin',
    confirmationRequired: true,
    businessContext: '系统级控制和安全操作'
  }
]

// ===========================================
// Export utility types
// ===========================================

export type HVACStatus = EquipmentStatus | TemperatureStatus | AirQualityLevel
export type HVACDataType = TemperatureReading | AirQualityReading | EnergyMetrics
export type HVACComponent = 'temperature' | 'equipment' | 'air_quality' | 'energy' | 'alert' | 'button'