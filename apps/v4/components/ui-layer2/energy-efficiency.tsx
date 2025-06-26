/**
 * Energy Efficiency Component - Layer 2 Business Semantic
 * 
 * Maps energy monitoring and optimization to Layer 1 components.
 * Handles AI intents like "Show energy consumption" or "Optimize efficiency".
 */

import React from 'react'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { EnergyMetrics, EnergyTarget, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Energy Efficiency Props
// ===========================================

export interface EnergyEfficiencyProps extends BaseHVACComponentProps {
  metrics: EnergyMetrics
  target?: EnergyTarget
  type?: 'consumption' | 'demand' | 'efficiency' | 'cost'
  showTarget?: boolean
  showTrend?: boolean
  size?: 'compact' | 'default' | 'detailed'
}

// ===========================================
// Energy Efficiency Component
// ===========================================

export const EnergyEfficiency: React.FC<EnergyEfficiencyProps> = ({
  metrics,
  target,
  type = 'efficiency',
  showTarget = true,
  showTrend = false,
  size = 'default',
  className,
  interactive = false,
  onInteraction,
  ...props
}) => {
  // Size configurations
  const sizeStyles = {
    compact: {
      container: { width: '140px', height: '70px', padding: '8px' },
      title: { fontSize: '12px', fontWeight: 500 },
      value: { fontSize: '18px', fontWeight: 600 },
      label: { fontSize: '10px', fontWeight: 400 }
    },
    default: {
      container: { width: '195px', height: '97px', padding: '15px' },
      title: { fontSize: '15px', fontWeight: 500 },
      value: { fontSize: '28px', fontWeight: 600 },
      label: { fontSize: '12px', fontWeight: 400 }
    },
    detailed: {
      container: { width: '280px', height: '140px', padding: '20px' },
      title: { fontSize: '16px', fontWeight: 500 },
      value: { fontSize: '32px', fontWeight: 600 },
      label: { fontSize: '14px', fontWeight: 400 }
    }
  }
  
  const currentSize = sizeStyles[size]
  
  // Get metric data based on type
  const getMetricData = () => {
    switch (type) {
      case 'consumption':
        return {
          value: metrics.consumption,
          unit: 'kWh',
          label: 'Consumption',
          targetValue: target?.consumption
        }
      case 'demand':
        return {
          value: metrics.demand,
          unit: 'kW',
          label: 'Demand',
          targetValue: target?.consumption // Using consumption target as proxy
        }
      case 'cost':
        return {
          value: metrics.cost,
          unit: '$',
          label: 'Cost',
          targetValue: target?.cost
        }
      case 'efficiency':
      default:
        return {
          value: metrics.efficiency,
          unit: '%',
          label: 'Efficiency',
          targetValue: target?.efficiency
        }
    }
  }
  
  const metricData = getMetricData()
  
  // Calculate performance vs target
  const getPerformanceStatus = () => {
    if (!metricData.targetValue) return 'neutral'
    
    const ratio = metricData.value / metricData.targetValue
    
    if (type === 'efficiency') {
      // Higher is better for efficiency
      return ratio >= 1.0 ? 'excellent' : ratio >= 0.9 ? 'good' : ratio >= 0.8 ? 'moderate' : 'poor'
    } else {
      // Lower is better for consumption, demand, cost
      return ratio <= 0.8 ? 'excellent' : ratio <= 0.9 ? 'good' : ratio <= 1.1 ? 'moderate' : 'poor'
    }
  }
  
  const performanceStatus = getPerformanceStatus()
  
  // Get status color
  const getStatusColor = () => {
    switch (performanceStatus) {
      case 'excellent':
        return baseDesignTokens.brandColors.green[1]
      case 'good':
        return baseDesignTokens.brandColors.green.success
      case 'moderate':
        return baseDesignTokens.brandColors.amber.primary
      case 'poor':
        return baseDesignTokens.brandColors.nebula.dark
      default:
        return baseDesignTokens.brandColors.blue[1]
    }
  }
  
  // Format value based on type
  const formatValue = (value: number) => {
    if (type === 'cost') {
      return value.toFixed(2)
    } else if (type === 'efficiency') {
      return value.toFixed(0)
    } else {
      return value.toFixed(1)
    }
  }
  
  // Calculate trend (placeholder - in real implementation would use historical data)
  const getTrendIndicator = () => {
    if (!showTrend) return null
    // Placeholder logic
    return '→' // Stable
  }
  
  // Handle interaction
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('energy_detail', {
        metrics,
        type,
        target,
        performanceStatus,
        timestamp: metrics.timestamp
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
  
  // Apply performance-specific styling
  if (performanceStatus === 'poor') {
    containerStyle.borderColor = baseDesignTokens.brandColors.nebula.dark
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.nebula.dark}20`
  } else if (performanceStatus === 'moderate') {
    containerStyle.borderColor = baseDesignTokens.brandColors.amber.primary
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.amber.primary}20`
  } else if (performanceStatus === 'excellent') {
    containerStyle.borderColor = baseDesignTokens.brandColors.green.success
    containerStyle.boxShadow = `0 4px 6px -1px ${baseDesignTokens.brandColors.green.success}20`
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="energy-efficiency"
      data-type={type}
      data-status={performanceStatus}
      data-value={metricData.value}
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
          {metricData.label}
        </div>
        
        {/* Performance Indicator */}
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
        {/* Value Display */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span
            style={{
              ...currentSize.value,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              lineHeight: baseDesignTokens.typography.lineHeight.tight,
              color: getStatusColor(),
              margin: 0
            }}
          >
            {type === 'cost' && metricData.unit}
            {formatValue(metricData.value)}
          </span>
          
          <span
            style={{
              fontSize: size === 'compact' ? '10px' : size === 'default' ? '12px' : '14px',
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              opacity: 0.7,
              margin: 0
            }}
          >
            {type !== 'cost' && metricData.unit}
            {getTrendIndicator()}
          </span>
        </div>
        
        {/* Period Label */}
        <div
          style={{
            ...currentSize.label,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: baseDesignTokens.standardTokens.light.foreground,
            opacity: 0.6,
            margin: 0,
            textTransform: 'capitalize'
          }}
        >
          {metrics.period}
        </div>
        
        {/* Target Comparison */}
        {showTarget && metricData.targetValue && (
          <div
            style={{
              fontSize: size === 'compact' ? '9px' : '11px',
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              opacity: 0.6,
              margin: 0
            }}
          >
            Target: {formatValue(metricData.targetValue)}{type !== 'cost' && metricData.unit}
            {type === 'cost' && metricData.unit}
          </div>
        )}
      </div>
      
      {/* Performance Status */}
      <div
        style={{
          fontSize: size === 'compact' ? '10px' : '12px',
          fontFamily: baseDesignTokens.typography.fontFamily.primary,
          color: getStatusColor(),
          textTransform: 'capitalize',
          margin: 0
        }}
      >
        {performanceStatus}
      </div>
    </div>
  )
}

// ===========================================
// Energy Dashboard Component
// ===========================================

export interface EnergyDashboardProps extends BaseHVACComponentProps {
  metrics: EnergyMetrics
  target?: EnergyTarget
  layout?: 'grid' | 'row'
  gap?: string
}

export const EnergyDashboard: React.FC<EnergyDashboardProps> = ({
  metrics,
  target,
  layout = 'grid',
  gap = baseDesignTokens.spacing[4],
  className,
  onInteraction,
  ...props
}) => {
  const energyTypes: Array<'consumption' | 'demand' | 'efficiency' | 'cost'> = [
    'consumption',
    'demand',
    'efficiency',
    'cost'
  ]
  
  const containerStyle: React.CSSProperties = layout === 'grid' 
    ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap,
        padding: baseDesignTokens.spacing[4]
      }
    : {
        display: 'flex',
        flexDirection: 'row',
        gap,
        padding: baseDesignTokens.spacing[4],
        overflowX: 'auto'
      }
  
  return (
    <div
      style={containerStyle}
      className={className}
      data-component="energy-dashboard"
      {...props}
    >
      {energyTypes.map((type) => (
        <EnergyEfficiency
          key={type}
          metrics={metrics}
          target={target}
          type={type}
          showTarget
          size={layout === 'grid' ? 'default' : 'compact'}
          interactive
          onInteraction={onInteraction}
        />
      ))}
    </div>
  )
}

// ===========================================
// Energy Optimization Suggestions Component
// ===========================================

export interface EnergyOptimizationProps extends BaseHVACComponentProps {
  metrics: EnergyMetrics
  target?: EnergyTarget
  suggestions?: string[]
}

export const EnergyOptimization: React.FC<EnergyOptimizationProps> = ({
  metrics,
  target,
  suggestions = [],
  className,
  onInteraction,
  ...props
}) => {
  // Calculate potential savings
  const calculateSavings = () => {
    if (!target) return null
    
    const consumptionSavings = metrics.consumption - target.consumption
    const costSavings = metrics.cost - target.cost
    
    return {
      consumption: consumptionSavings > 0 ? consumptionSavings : 0,
      cost: costSavings > 0 ? costSavings : 0,
      percentage: target.consumption > 0 ? (consumptionSavings / target.consumption) * 100 : 0
    }
  }
  
  const savings = calculateSavings()
  
  const handleOptimizationClick = () => {
    if (onInteraction) {
      onInteraction('energy_optimize', {
        metrics,
        target,
        suggestions,
        savings
      })
    }
  }
  
  return (
    <div
      style={{
        padding: baseDesignTokens.spacing[6],
        backgroundColor: baseDesignTokens.standardTokens.light.background,
        borderRadius: baseDesignTokens.borderRadius.lg,
        border: `2px solid ${baseDesignTokens.brandColors.blue[1]}`,
        boxShadow: `0 4px 6px -1px ${baseDesignTokens.brandColors.blue[1]}20`
      }}
      className={className}
      data-component="energy-optimization"
      {...props}
    >
      <div
        style={{
          fontSize: baseDesignTokens.typography.fontSize.lg,
          fontFamily: baseDesignTokens.typography.fontFamily.primary,
          fontWeight: baseDesignTokens.typography.fontWeight.medium,
          color: baseDesignTokens.standardTokens.light.foreground,
          marginBottom: baseDesignTokens.spacing[4]
        }}
      >
        Energy Optimization Opportunities
      </div>
      
      {savings && (
        <div style={{ marginBottom: baseDesignTokens.spacing[4] }}>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.base,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.brandColors.green.success,
              fontWeight: baseDesignTokens.typography.fontWeight.medium
            }}
          >
            Potential Savings: ${savings.cost.toFixed(2)} ({savings.percentage.toFixed(1)}%)
          </div>
        </div>
      )}
      
      {suggestions.length > 0 && (
        <div style={{ marginBottom: baseDesignTokens.spacing[4] }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              style={{
                fontSize: baseDesignTokens.typography.fontSize.sm,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                marginBottom: baseDesignTokens.spacing[2],
                paddingLeft: baseDesignTokens.spacing[4],
                position: 'relative'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  color: baseDesignTokens.brandColors.blue[1]
                }}
              >
                •
              </span>
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={handleOptimizationClick}
        style={{
          padding: `${baseDesignTokens.spacing[3]} ${baseDesignTokens.spacing[6]}`,
          backgroundColor: baseDesignTokens.brandColors.blue[1],
          color: baseDesignTokens.brandColors.neutral.white,
          border: 'none',
          borderRadius: baseDesignTokens.borderRadius.md,
          fontSize: baseDesignTokens.typography.fontSize.sm,
          fontFamily: baseDesignTokens.typography.fontFamily.primary,
          fontWeight: baseDesignTokens.typography.fontWeight.medium,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        Apply Optimizations
      </button>
    </div>
  )
}

// ===========================================
// Export
// ===========================================

export default EnergyEfficiency