/**
 * System Dashboard Component - Layer 2 Business Semantic
 * 
 * Maps system overview and monitoring to Layer 1 components.
 * Handles AI intents like "Show system status", "System overview", "Monitor all".
 */

import React from 'react'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { SystemOverview, BaseHVACComponentProps } from './hvac-types'
import { TemperatureZoneGrid } from './temperature-monitor'
import { ChillerFleet } from './chiller-status'
import { AirQualityZonesGrid } from './air-quality-display'
import { EnergyDashboard } from './energy-efficiency'
import { AlertPanel } from './alert-panel'

// ===========================================
// System Status Card Props
// ===========================================

export interface SystemStatusCardProps extends BaseHVACComponentProps {
  title: string
  status: 'healthy' | 'warning' | 'critical' | 'offline'
  value?: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  description?: string
  iconKey?: string
}

// ===========================================
// System Status Card Component
// ===========================================

export const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  title,
  status,
  value,
  unit = '',
  trend,
  description,
  iconKey,
  className,
  interactive = true,
  onInteraction,
  ...props
}) => {
  // Get status color
  const getStatusColor = () => {
    switch (status) {
      case 'healthy':
        return baseDesignTokens.brandColors.green.success
      case 'warning':
        return baseDesignTokens.brandColors.amber.primary
      case 'critical':
        return baseDesignTokens.brandColors.nebula.dark
      case 'offline':
        return baseDesignTokens.brandColors.neutral.gray[500]
      default:
        return baseDesignTokens.brandColors.neutral.black
    }
  }
  
  // Get trend indicator
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return ''
    }
  }
  
  // Handle click
  const handleClick = () => {
    if (interactive && onInteraction) {
      onInteraction('system_status_detail', {
        title,
        status,
        value,
        unit,
        description
      })
    }
  }
  
  const containerStyle: React.CSSProperties = {
    width: '200px',
    height: '120px',
    padding: baseDesignTokens.spacing[4],
    backgroundColor: baseDesignTokens.standardTokens.light.background,
    borderRadius: baseDesignTokens.borderRadius.md,
    boxShadow: baseDesignTokens.shadows.md,
    border: `2px solid ${getStatusColor()}20`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: interactive ? 'pointer' : 'default',
    transition: 'all 0.2s ease'
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="system-status-card"
      data-status={status}
      {...props}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            fontSize: baseDesignTokens.typography.fontSize.sm,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            fontWeight: baseDesignTokens.typography.fontWeight.medium,
            color: baseDesignTokens.standardTokens.light.foreground,
            margin: 0
          }}
        >
          {title}
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
        {/* Value Display */}
        {value !== undefined && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xl,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                fontWeight: baseDesignTokens.typography.fontWeight.regular,
                lineHeight: baseDesignTokens.typography.lineHeight.tight,
                color: getStatusColor(),
                margin: 0
              }}
            >
              {typeof value === 'number' ? value.toFixed(1) : value}
            </span>
            
            <span
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.7
              }}
            >
              {unit} {getTrendIcon()}
            </span>
          </div>
        )}
        
        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.xs,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              opacity: 0.7,
              margin: 0
            }}
          >
            {description}
          </div>
        )}
      </div>
      
      {/* Status Text */}
      <div
        style={{
          fontSize: baseDesignTokens.typography.fontSize.xs,
          fontFamily: baseDesignTokens.typography.fontFamily.primary,
          color: getStatusColor(),
          textTransform: 'capitalize',
          fontWeight: baseDesignTokens.typography.fontWeight.medium,
          margin: 0
        }}
      >
        {status}
      </div>
    </div>
  )
}

// ===========================================
// System Dashboard Props
// ===========================================

export interface SystemDashboardProps extends BaseHVACComponentProps {
  systemData: SystemOverview
  layout?: 'grid' | 'sections'
  showAlerts?: boolean
  showEnergy?: boolean
  showEquipment?: boolean
  showAirQuality?: boolean
  compactMode?: boolean
}

// ===========================================
// System Dashboard Component
// ===========================================

export const SystemDashboard: React.FC<SystemDashboardProps> = ({
  systemData,
  layout = 'grid',
  showAlerts = true,
  showEnergy = true,
  showEquipment = true,
  showAirQuality = true,
  compactMode = false,
  className,
  onInteraction,
  ...props
}) => {
  // Calculate system health
  const getSystemHealth = () => {
    const criticalAlerts = systemData.alerts.filter(a => a.severity === 'critical' && !a.resolved).length
    const offlineEquipment = systemData.equipment.filter(e => e.status === 'offline').length
    const poorAirQuality = systemData.airQuality.filter(aq => aq.current.level === 'poor').length
    
    if (criticalAlerts > 0 || offlineEquipment > 0) return 'critical'
    if (systemData.alerts.filter(a => a.severity === 'warning' && !a.resolved).length > 0) return 'warning'
    if (poorAirQuality > 0) return 'warning'
    return 'healthy'
  }
  
  // Generate status cards
  const getStatusCards = () => {
    const cards = [
      {
        title: 'System Health',
        status: getSystemHealth(),
        description: `${systemData.equipment.filter(e => e.status === 'online').length}/${systemData.equipment.length} Equipment Online`
      },
      {
        title: 'Active Alerts',
        status: systemData.alerts.filter(a => !a.resolved).length > 0 ? 'warning' : 'healthy',
        value: systemData.alerts.filter(a => !a.resolved).length,
        description: 'Unresolved alerts'
      },
      {
        title: 'Energy Efficiency',
        status: systemData.energy.efficiency >= 80 ? 'healthy' : systemData.energy.efficiency >= 60 ? 'warning' : 'critical',
        value: systemData.energy.efficiency,
        unit: '%',
        trend: 'stable' as const
      },
      {
        title: 'AI Status',
        status: systemData.aiStatus.active ? 'healthy' : 'offline',
        value: systemData.aiStatus.confidence * 100,
        unit: '%',
        description: systemData.aiStatus.optimizing ? 'Optimizing' : systemData.aiStatus.learning ? 'Learning' : 'Monitoring'
      }
    ]
    
    return cards
  }
  
  const statusCards = getStatusCards()
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    padding: baseDesignTokens.spacing[6],
    backgroundColor: baseDesignTokens.standardTokens.light.background
  }
  
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: compactMode ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: baseDesignTokens.spacing[6],
    marginTop: baseDesignTokens.spacing[6]
  }
  
  const sectionStyle: React.CSSProperties = {
    marginBottom: baseDesignTokens.spacing[8]
  }
  
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: baseDesignTokens.typography.fontSize.lg,
    fontFamily: baseDesignTokens.typography.fontFamily.primary,
    fontWeight: baseDesignTokens.typography.fontWeight.medium,
    color: baseDesignTokens.standardTokens.light.foreground,
    marginBottom: baseDesignTokens.spacing[4],
    margin: 0
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      data-component="system-dashboard"
      data-layout={layout}
      {...props}
    >
      {/* Header */}
      <div style={{ marginBottom: baseDesignTokens.spacing[6] }}>
        <div
          style={{
            fontSize: baseDesignTokens.typography.fontSize['2xl'],
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            fontWeight: baseDesignTokens.typography.fontWeight.medium,
            color: baseDesignTokens.standardTokens.light.foreground,
            marginBottom: baseDesignTokens.spacing[2]
          }}
        >
          HVAC System Dashboard
        </div>
        
        <div
          style={{
            fontSize: baseDesignTokens.typography.fontSize.sm,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            color: baseDesignTokens.standardTokens.light.foreground,
            opacity: 0.7
          }}
        >
          Real-time system monitoring and control
        </div>
      </div>
      
      {/* Status Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: baseDesignTokens.spacing[4],
          marginBottom: baseDesignTokens.spacing[8]
        }}
      >
        {statusCards.map((card, index) => (
          <SystemStatusCard
            key={index}
            title={card.title}
            status={card.status as any}
            value={card.value}
            unit={card.unit}
            trend={card.trend}
            description={card.description}
            onInteraction={onInteraction}
          />
        ))}
      </div>
      
      {/* Main Content Sections */}
      {layout === 'sections' ? (
        <div>
          {/* Temperature Zones */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>Temperature Monitoring</h3>
            <TemperatureZoneGrid
              zones={systemData.zones}
              columns={compactMode ? 2 : 3}
              showTargets
              onInteraction={onInteraction}
            />
          </div>
          
          {/* Equipment Status */}
          {showEquipment && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Equipment Status</h3>
              <ChillerFleet
                chillers={systemData.equipment.filter(e => e.type === 'chiller') as any}
                columns={compactMode ? 2 : 3}
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Air Quality */}
          {showAirQuality && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Air Quality</h3>
              <AirQualityZonesGrid
                zones={systemData.airQuality}
                columns={compactMode ? 2 : 3}
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Energy Dashboard */}
          {showEnergy && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Energy Management</h3>
              <EnergyDashboard
                metrics={systemData.energy}
                layout="grid"
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Alerts */}
          {showAlerts && systemData.alerts.length > 0 && (
            <div style={sectionStyle}>
              <h3 style={sectionTitleStyle}>Active Alerts</h3>
              <AlertPanel
                alerts={systemData.alerts}
                type="panel"
                maxDisplay={5}
                onInteraction={onInteraction}
              />
            </div>
          )}
        </div>
      ) : (
        /* Grid Layout */
        <div style={gridStyle}>
          {/* Temperature Zones */}
          <div>
            <h3 style={sectionTitleStyle}>Temperature</h3>
            <TemperatureZoneGrid
              zones={systemData.zones}
              columns={1}
              showTargets
              onInteraction={onInteraction}
            />
          </div>
          
          {/* Equipment */}
          {showEquipment && (
            <div>
              <h3 style={sectionTitleStyle}>Equipment</h3>
              <ChillerFleet
                chillers={systemData.equipment.filter(e => e.type === 'chiller') as any}
                columns={1}
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Air Quality */}
          {showAirQuality && (
            <div>
              <h3 style={sectionTitleStyle}>Air Quality</h3>
              <AirQualityZonesGrid
                zones={systemData.airQuality}
                columns={1}
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Energy */}
          {showEnergy && (
            <div>
              <h3 style={sectionTitleStyle}>Energy</h3>
              <EnergyDashboard
                metrics={systemData.energy}
                layout="row"
                onInteraction={onInteraction}
              />
            </div>
          )}
          
          {/* Alerts */}
          {showAlerts && systemData.alerts.length > 0 && (
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={sectionTitleStyle}>Alerts</h3>
              <AlertPanel
                alerts={systemData.alerts}
                type="panel"
                maxDisplay={3}
                onInteraction={onInteraction}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===========================================
// Export
// ===========================================

export default SystemDashboard