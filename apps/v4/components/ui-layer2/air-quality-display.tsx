/**
 * Air Quality Display Component - Layer 2 Business Semantic
 * 
 * Maps air quality monitoring to Layer 1 components.
 * Handles AI intents like "Check air quality" or "CO2 levels too high".
 */

import React from 'react'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { statusToSemantic, getBusinessSemanticColor } from './business-mapping'
import { AirQualityReading, AirQualityZone, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Air Quality Display Props
// ===========================================

export interface AirQualityDisplayProps extends BaseHVACComponentProps {
  reading: AirQualityReading
  zone?: AirQualityZone
  metric?: 'overall' | 'co2' | 'humidity' | 'particulates' | 'voc'
  showTargets?: boolean
  size?: 'compact' | 'default' | 'detailed'
}

// ===========================================
// Air Quality Display Component
// ===========================================

export const AirQualityDisplay: React.FC<AirQualityDisplayProps> = ({
  reading,
  zone,
  metric = 'overall',
  showTargets = false,
  size = 'default',
  className,
  interactive = false,
  onInteraction,
  ...props
}) => {
  // Map air quality level to semantic token
  const semanticState = statusToSemantic[reading.level]
  const semanticColor = getBusinessSemanticColor(semanticState)
  
  // Size configurations
  const sizeStyles = {
    compact: {
      container: { width: '140px', height: '70px', padding: '8px' },
      title: { fontSize: '12px', fontWeight: 500 },
      value: { fontSize: '16px', fontWeight: 500 },
      label: { fontSize: '10px', fontWeight: 400 }
    },
    default: {
      container: { width: '195px', height: '97px', padding: '15px' },
      title: { fontSize: '15px', fontWeight: 500 },
      value: { fontSize: '24px', fontWeight: 500 },
      label: { fontSize: '12px', fontWeight: 400 }
    },
    detailed: {
      container: { width: '280px', height: '140px', padding: '20px' },
      title: { fontSize: '16px', fontWeight: 500 },
      value: { fontSize: '28px', fontWeight: 500 },
      label: { fontSize: '14px', fontWeight: 400 }
    }
  }
  
  const currentSize = sizeStyles[size]
  
  // Get metric value and unit
  const getMetricValue = () => {
    switch (metric) {
      case 'co2':
        return { value: reading.co2, unit: 'ppm', label: 'CO₂' }
      case 'humidity':
        return { value: reading.humidity, unit: '%', label: 'Humidity' }
      case 'particulates':
        return { value: reading.particulates, unit: 'PM2.5', label: 'Particles' }
      case 'voc':
        return { value: reading.voc, unit: 'ppb', label: 'VOC' }
      case 'overall':
      default:
        return { value: null, unit: '', label: 'Air Quality' }
    }
  }
  
  const metricData = getMetricValue()
  
  // Get level color
  const getLevelColor = () => {
    switch (reading.level) {
      case 'excellent':
        return baseDesignTokens.brandColors.green[1]
      case 'good':
        return baseDesignTokens.brandColors.green.success
      case 'moderate':
        return baseDesignTokens.brandColors.amber.primary
      case 'poor':
        return baseDesignTokens.brandColors.nebula.dark
      default:
        return baseDesignTokens.brandColors.neutral.black
    }
  }
  
  // Get level text
  const getLevelText = () => {
    return reading.level.charAt(0).toUpperCase() + reading.level.slice(1)
  }
  
  // Handle interaction
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('air_quality_detail', {
        reading,
        zone,
        metric,
        timestamp: reading.timestamp
      })
    }
  }
  
  // Check if metric exceeds targets
  const isExceedingTarget = () => {
    if (!zone?.targets) return false
    
    switch (metric) {
      case 'co2':
        return reading.co2 > zone.targets.co2Max
      case 'humidity':
        const [minHumidity, maxHumidity] = zone.targets.humidityRange
        return reading.humidity < minHumidity || reading.humidity > maxHumidity
      case 'particulates':
        return reading.particulates > zone.targets.particulatesMax
      default:
        return false
    }
  }
  
  const containerStyle: React.CSSProperties = {
    ...currentSize.container,
    backgroundColor: baseDesignTokens.standardTokens.light.background,
    borderRadius: baseDesignTokens.borderRadius.md,
    boxShadow: baseDesignTokens.shadows.md,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    border: `2px solid transparent`
  }
  
  // Apply level-specific border and shadow
  if (reading.level === 'poor') {
    containerStyle.borderColor = baseDesignTokens.brandColors.nebula.dark
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.nebula.dark}20`
  } else if (reading.level === 'moderate') {
    containerStyle.borderColor = baseDesignTokens.brandColors.amber.primary
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.amber.primary}20`
  } else if (isExceedingTarget()) {
    containerStyle.borderColor = baseDesignTokens.brandColors.amber.primary
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="air-quality-display"
      data-level={reading.level}
      data-metric={metric}
      {...props}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            ...currentSize.title,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: baseDesignTokens.standardTokens.light.foreground,
            margin: 0
          }}
        >
          {zone?.name || metricData.label}
        </div>
        
        {/* Level Indicator */}
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getLevelColor()
          }}
        />
      </div>
      
      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Metric Value or Level */}
        {metricData.value !== null ? (
          <>
            <div
              style={{
                ...currentSize.value,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                lineHeight: baseDesignTokens.typography.lineHeight.tight,
                color: getLevelColor(),
                margin: 0
              }}
            >
              {metricData.value.toFixed(metric === 'humidity' ? 0 : 1)}
            </div>
            <div
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7,
                margin: 0
              }}
            >
              {metricData.unit}
            </div>
          </>
        ) : (
          <div
            style={{
              ...currentSize.value,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              lineHeight: baseDesignTokens.typography.lineHeight.tight,
              color: getLevelColor(),
              margin: 0,
              fontSize: size === 'compact' ? '14px' : size === 'default' ? '18px' : '22px'
            }}
          >
            {getLevelText()}
          </div>
        )}
        
        {/* Target Information */}
        {showTargets && zone?.targets && (
          <div
            style={{
              fontSize: size === 'compact' ? '9px' : '11px',
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              opacity: 0.6,
              margin: 0
            }}
          >
            {metric === 'co2' && `Target: <${zone.targets.co2Max} ppm`}
            {metric === 'humidity' && `Target: ${zone.targets.humidityRange[0]}-${zone.targets.humidityRange[1]}%`}
            {metric === 'particulates' && `Target: <${zone.targets.particulatesMax} PM2.5`}
          </div>
        )}
      </div>
      
      {/* Level Text for specific metrics */}
      {metricData.value !== null && (
        <div
          style={{
            fontSize: size === 'compact' ? '10px' : '12px',
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: getLevelColor(),
            textTransform: 'capitalize',
            margin: 0
          }}
        >
          {getLevelText()}
        </div>
      )}
    </div>
  )
}

// ===========================================
// Air Quality Multi-Metric Component
// ===========================================

export interface AirQualityMultiMetricProps extends BaseHVACComponentProps {
  zone: AirQualityZone
  columns?: number
  gap?: string
  showTargets?: boolean
}

export const AirQualityMultiMetric: React.FC<AirQualityMultiMetricProps> = ({
  zone,
  columns = 2,
  gap = baseDesignTokens.spacing[3],
  showTargets = true,
  className,
  onInteraction,
  ...props
}) => {
  const metrics: Array<'overall' | 'co2' | 'humidity' | 'particulates'> = [
    'overall',
    'co2',
    'humidity',
    'particulates'
  ]
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    padding: baseDesignTokens.spacing[4]
  }
  
  return (
    <div
      style={gridStyle}
      className={className}
      data-component="air-quality-multi-metric"
      {...props}
    >
      {metrics.map((metric) => (
        <AirQualityDisplay
          key={metric}
          reading={zone.current}
          zone={zone}
          metric={metric}
          showTargets={showTargets}
          size="compact"
          interactive
          onInteraction={onInteraction}
        />
      ))}
    </div>
  )
}

// ===========================================
// Air Quality Zones Grid Component
// ===========================================

export interface AirQualityZonesGridProps extends BaseHVACComponentProps {
  zones: AirQualityZone[]
  metric?: 'overall' | 'co2' | 'humidity' | 'particulates'
  columns?: number
  gap?: string
  showTargets?: boolean
}

export const AirQualityZonesGrid: React.FC<AirQualityZonesGridProps> = ({
  zones,
  metric = 'overall',
  columns = 3,
  gap = baseDesignTokens.spacing[4],
  showTargets = true,
  className,
  onInteraction,
  ...props
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    padding: baseDesignTokens.spacing[4]
  }
  
  return (
    <div 
      style={gridStyle}
      className={className}
      data-component="air-quality-zones-grid"
      {...props}
    >
      {zones.map((zone) => (
        <AirQualityDisplay
          key={zone.id}
          reading={zone.current}
          zone={zone}
          metric={metric}
          showTargets={showTargets}
          interactive
          onInteraction={onInteraction}
        />
      ))}
    </div>
  )
}

// ===========================================
// Export
// ===========================================

export default AirQualityDisplay