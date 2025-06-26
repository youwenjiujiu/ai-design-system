/**
 * Temperature Monitor Component - Layer 2 Business Semantic
 * 
 * Maps temperature monitoring business concepts to Layer 1 components.
 * Handles AI intents like "Check temperature in Zone A" or "Temperature alerts".
 */

import React from 'react'
import { UnstyledButton } from '../ui-layer1/button'
import { baseDesignTokens, BusinessSemantic } from '../ui-layer1/design-tokens-simple'
import { statusToSemantic, getBusinessSemanticColor } from './business-mapping'
import { TemperatureReading, TemperatureZone, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Temperature Monitor Props
// ===========================================

export interface TemperatureMonitorProps extends BaseHVACComponentProps {
  reading: TemperatureReading
  zone?: TemperatureZone
  showTarget?: boolean
  showTrend?: boolean
  size?: 'compact' | 'default' | 'large'
}

// ===========================================
// Temperature Monitor Component
// ===========================================

export const TemperatureMonitor: React.FC<TemperatureMonitorProps> = ({
  reading,
  zone,
  showTarget = false,
  showTrend = false,
  size = 'default',
  className,
  interactive = false,
  onInteraction,
  ...props
}) => {
  // Map temperature status to semantic token
  const semanticState: BusinessSemantic = statusToSemantic[reading.status]
  const semanticColor = getBusinessSemanticColor(semanticState)
  
  // Get design tokens based on size
  const sizeStyles = {
    compact: {
      container: {
        width: '120px',
        height: '60px',
        padding: baseDesignTokens.spacing[2]
      },
      value: {
        fontSize: baseDesignTokens.typography.fontSize.lg,
        fontWeight: baseDesignTokens.typography.fontWeight.medium
      },
      label: {
        fontSize: baseDesignTokens.typography.fontSize.xs,
        fontWeight: baseDesignTokens.typography.fontWeight.regular
      }
    },
    default: {
      container: {
        width: '195px',
        height: '97px',
        padding: baseDesignTokens.spacing[4]
      },
      value: {
        fontSize: baseDesignTokens.typography.fontSize['2xl'],
        fontWeight: baseDesignTokens.typography.fontWeight.regular
      },
      label: {
        fontSize: baseDesignTokens.typography.fontSize.sm,
        fontWeight: baseDesignTokens.typography.fontWeight.medium
      }
    },
    large: {
      container: {
        width: '240px',
        height: '120px',
        padding: baseDesignTokens.spacing[6]
      },
      value: {
        fontSize: baseDesignTokens.typography.fontSize['3xl'],
        fontWeight: baseDesignTokens.typography.fontWeight.regular
      },
      label: {
        fontSize: baseDesignTokens.typography.fontSize.base,
        fontWeight: baseDesignTokens.typography.fontWeight.medium
      }
    }
  }
  
  const currentSize = sizeStyles[size]
  
  // Format temperature value
  const formatTemperature = (value: number, unit: string) => {
    return `${value.toFixed(1)}°${unit === 'celsius' ? 'C' : 'F'}`
  }
  
  // Calculate trend indicator
  const getTrendIndicator = () => {
    if (!showTrend) return null
    // In real implementation, this would calculate based on historical data
    return '→' // Placeholder for stable trend
  }
  
  // Handle click interaction
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('temperature_detail', {
        reading,
        zone,
        timestamp: reading.timestamp
      })
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
  
  // Apply status-specific styling
  if (reading.status === 'critical') {
    containerStyle.borderColor = baseDesignTokens.brandColors.nebula.dark
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.nebula.dark}20`
  } else if (reading.status === 'warning') {
    containerStyle.borderColor = baseDesignTokens.brandColors.amber.primary
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.amber.primary}20`
  }
  
  const valueStyle: React.CSSProperties = {
    ...currentSize.value,
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    lineHeight: baseDesignTokens.typography.lineHeight.tight,
    color: reading.status === 'normal' 
      ? baseDesignTokens.brandColors.green.success
      : reading.status === 'warning'
      ? baseDesignTokens.brandColors.amber.primary
      : reading.status === 'critical'
      ? baseDesignTokens.brandColors.nebula.dark
      : baseDesignTokens.brandColors.blue[1],
    margin: 0
  }
  
  const labelStyle: React.CSSProperties = {
    ...currentSize.label,
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    lineHeight: baseDesignTokens.typography.lineHeight.normal,
    color: baseDesignTokens.standardTokens.light.foreground,
    margin: 0,
    opacity: 0.8
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="temperature-monitor"
      data-status={reading.status}
      data-value={reading.value}
      data-unit={reading.unit}
      {...props}
    >
      {/* Status Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: reading.status === 'normal' 
            ? baseDesignTokens.brandColors.green.success
            : reading.status === 'warning'
            ? baseDesignTokens.brandColors.amber.primary
            : reading.status === 'critical'
            ? baseDesignTokens.brandColors.nebula.dark
            : baseDesignTokens.brandColors.blue[1]
        }}
      />
      
      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Zone Label */}
        {zone && (
          <div style={labelStyle}>
            {zone.name}
          </div>
        )}
        
        {/* Temperature Value */}
        <div style={valueStyle}>
          {formatTemperature(reading.value, reading.unit)}
          {getTrendIndicator()}
        </div>
        
        {/* Target Temperature */}
        {showTarget && reading.target && (
          <div 
            style={{
              ...labelStyle,
              fontSize: currentSize.label.fontSize,
              opacity: 0.6
            }}
          >
            Target: {formatTemperature(reading.target, reading.unit)}
          </div>
        )}
      </div>
      
      {/* Status Text */}
      <div 
        style={{
          ...labelStyle,
          fontSize: size === 'compact' ? '10px' : '12px',
          textTransform: 'capitalize',
          color: reading.status === 'normal' 
            ? baseDesignTokens.brandColors.green.success
            : reading.status === 'warning'
            ? baseDesignTokens.brandColors.amber.primary
            : reading.status === 'critical'
            ? baseDesignTokens.brandColors.nebula.dark
            : baseDesignTokens.brandColors.blue[1]
        }}
      >
        {reading.status}
      </div>
    </div>
  )
}

// ===========================================
// Temperature Zone Grid Component
// ===========================================

export interface TemperatureZoneGridProps extends BaseHVACComponentProps {
  zones: TemperatureZone[]
  columns?: number
  gap?: string
  showTargets?: boolean
}

export const TemperatureZoneGrid: React.FC<TemperatureZoneGridProps> = ({
  zones,
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
      data-component="temperature-zone-grid"
      {...props}
    >
      {zones.map((zone) => (
        <TemperatureMonitor
          key={zone.id}
          reading={zone.current}
          zone={zone}
          showTarget={showTargets}
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

export default TemperatureMonitor