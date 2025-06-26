/**
 * Chiller Status Component - Layer 2 Business Semantic
 * 
 * Maps chiller equipment monitoring to Layer 1 components.
 * Handles AI intents like "Check chiller status" or "Chiller efficiency".
 */

import React from 'react'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { statusToSemantic, getBusinessSemanticColor } from './business-mapping'
import { ChillerData, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Chiller Status Props
// ===========================================

export interface ChillerStatusProps extends BaseHVACComponentProps {
  chiller: ChillerData
  showDetails?: boolean
  showEfficiency?: boolean
  size?: 'compact' | 'default' | 'detailed'
}

// ===========================================
// Chiller Status Component
// ===========================================

export const ChillerStatus: React.FC<ChillerStatusProps> = ({
  chiller,
  showDetails = false,
  showEfficiency = true,
  size = 'default',
  className,
  interactive = false,
  onInteraction,
  ...props
}) => {
  // Map chiller status to semantic token
  const semanticState = statusToSemantic[chiller.status]
  const semanticColor = getBusinessSemanticColor(semanticState)
  
  // Size configurations
  const sizeStyles = {
    compact: {
      container: { width: '180px', height: '80px', padding: '8px' },
      title: { fontSize: '14px', fontWeight: 500 },
      value: { fontSize: '18px', fontWeight: 400 },
      label: { fontSize: '10px', fontWeight: 400 }
    },
    default: {
      container: { width: '195px', height: '97px', padding: '15px' },
      title: { fontSize: '15px', fontWeight: 500 },
      value: { fontSize: '24px', fontWeight: 400 },
      label: { fontSize: '12px', fontWeight: 400 }
    },
    detailed: {
      container: { width: '280px', height: '160px', padding: '20px' },
      title: { fontSize: '16px', fontWeight: 500 },
      value: { fontSize: '28px', fontWeight: 400 },
      label: { fontSize: '14px', fontWeight: 400 }
    }
  }
  
  const currentSize = sizeStyles[size]
  
  // Calculate efficiency percentage
  const efficiency = chiller.efficiency || 0
  
  // Format load percentage
  const formatLoad = (load: number) => `${load.toFixed(0)}%`
  
  // Format capacity
  const formatCapacity = (capacity: number) => `${capacity} tons`
  
  // Format power consumption
  const formatPower = (power: number) => `${power.toFixed(1)} kW`
  
  // Handle interaction
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('chiller_detail', {
        chiller,
        timestamp: new Date()
      })
    }
  }
  
  // Get status color
  const getStatusColor = () => {
    switch (chiller.status) {
      case 'online':
        return baseDesignTokens.brandColors.green.success
      case 'offline':
        return baseDesignTokens.brandColors.nebula.dark
      case 'maintenance':
        return baseDesignTokens.brandColors.amber.primary
      case 'error':
        return baseDesignTokens.brandColors.nebula.dark
      default:
        return baseDesignTokens.brandColors.neutral.black
    }
  }
  
  // Get efficiency color based on percentage
  const getEfficiencyColor = (eff: number) => {
    if (eff >= 80) return baseDesignTokens.brandColors.green.success
    if (eff >= 60) return baseDesignTokens.brandColors.amber.primary
    return baseDesignTokens.brandColors.nebula.dark
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
  
  // Apply status-specific border
  if (chiller.status === 'error' || chiller.status === 'offline') {
    containerStyle.borderColor = baseDesignTokens.brandColors.nebula.dark
  } else if (chiller.status === 'maintenance') {
    containerStyle.borderColor = baseDesignTokens.brandColors.amber.primary
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="chiller-status"
      data-status={chiller.status}
      data-efficiency={efficiency}
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
          {chiller.name}
        </div>
        
        {/* Status Indicator */}
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor()
          }}
        />
      </div>
      
      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {/* Load Display */}
        <div
          style={{
            ...currentSize.value,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            lineHeight: baseDesignTokens.typography.lineHeight.tight,
            color: getStatusColor(),
            margin: 0
          }}
        >
          {formatLoad(chiller.load)}
        </div>
        
        {/* Load Label */}
        <div
          style={{
            ...currentSize.label,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: baseDesignTokens.standardTokens.light.foreground,
            opacity: 0.7,
            margin: 0
          }}
        >
          Load
        </div>
        
        {/* Efficiency Display */}
        {showEfficiency && (
          <div style={{ marginTop: '4px' }}>
            <div
              style={{
                fontSize: size === 'compact' ? '12px' : '14px',
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: getEfficiencyColor(efficiency),
                fontWeight: 500,
                margin: 0
              }}
            >
              {efficiency.toFixed(0)}% Eff.
            </div>
          </div>
        )}
      </div>
      
      {/* Detailed Information */}
      {showDetails && size === 'detailed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              Capacity:
            </span>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                fontWeight: 500
              }}
            >
              {formatCapacity(chiller.capacity)}
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              Power:
            </span>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                fontWeight: 500
              }}
            >
              {formatPower(chiller.powerConsumption)}
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              Status:
            </span>
            <span
              style={{
                ...currentSize.label,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: getStatusColor(),
                fontWeight: 500,
                textTransform: 'capitalize'
              }}
            >
              {chiller.status}
            </span>
          </div>
        </div>
      )}
      
      {/* Status Text (non-detailed view) */}
      {!showDetails && (
        <div
          style={{
            fontSize: size === 'compact' ? '10px' : '12px',
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: getStatusColor(),
            textTransform: 'capitalize',
            margin: 0
          }}
        >
          {chiller.status}
        </div>
      )}
    </div>
  )
}

// ===========================================
// Chiller Fleet Overview Component
// ===========================================

export interface ChillerFleetProps extends BaseHVACComponentProps {
  chillers: ChillerData[]
  columns?: number
  gap?: string
  showEfficiency?: boolean
}

export const ChillerFleet: React.FC<ChillerFleetProps> = ({
  chillers,
  columns = 3,
  gap = baseDesignTokens.spacing[4],
  showEfficiency = true,
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
  
  // Calculate fleet statistics
  const onlineChillers = chillers.filter(c => c.status === 'online')
  const totalLoad = onlineChillers.reduce((sum, c) => sum + c.load, 0)
  const avgEfficiency = onlineChillers.length > 0 
    ? onlineChillers.reduce((sum, c) => sum + (c.efficiency || 0), 0) / onlineChillers.length
    : 0
  
  return (
    <div className={className} {...props}>
      {/* Fleet Summary */}
      <div
        style={{
          padding: baseDesignTokens.spacing[4],
          backgroundColor: baseDesignTokens.standardTokens.light.background,
          borderRadius: baseDesignTokens.borderRadius.md,
          marginBottom: baseDesignTokens.spacing[4],
          border: `1px solid ${baseDesignTokens.brandColors.neutral.gray[200]}`
        }}
      >
        <div
          style={{
            fontSize: baseDesignTokens.typography.fontSize.lg,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            fontWeight: baseDesignTokens.typography.fontWeight.medium,
            color: baseDesignTokens.standardTokens.light.foreground,
            marginBottom: '8px'
          }}
        >
          Chiller Fleet Overview
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div>
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              Online
            </div>
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.base,
                fontWeight: baseDesignTokens.typography.fontWeight.medium,
                color: baseDesignTokens.brandColors.green.success
              }}
            >
              {onlineChillers.length}/{chillers.length}
            </div>
          </div>
          
          <div>
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              Avg Efficiency
            </div>
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.base,
                fontWeight: baseDesignTokens.typography.fontWeight.medium,
                color: avgEfficiency >= 80 
                  ? baseDesignTokens.brandColors.green.success
                  : avgEfficiency >= 60
                  ? baseDesignTokens.brandColors.amber.primary
                  : baseDesignTokens.brandColors.nebula.dark
              }}
            >
              {avgEfficiency.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Individual Chillers */}
      <div 
        style={gridStyle}
        data-component="chiller-fleet"
      >
        {chillers.map((chiller) => (
          <ChillerStatus
            key={chiller.id}
            chiller={chiller}
            showEfficiency={showEfficiency}
            interactive
            onInteraction={onInteraction}
          />
        ))}
      </div>
    </div>
  )
}

// ===========================================
// Export
// ===========================================

export default ChillerStatus