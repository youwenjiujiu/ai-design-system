/**
 * Alert Panel Component - Layer 2 Business Semantic
 * 
 * Maps alert management to Layer 1 components.
 * Handles AI intents like "Show alerts", "Fault diagnosis", "Maintenance reminders".
 */

import React from 'react'
import { UnstyledButton } from '../ui-layer1/button'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { alertSeverityToSemantic } from './business-mapping'
import { Alert, AlertSeverity, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Alert Panel Props
// ===========================================

export interface AlertPanelProps extends BaseHVACComponentProps {
  alerts: Alert[]
  type?: 'panel' | 'diagnostic' | 'maintenance'
  filterSeverity?: AlertSeverity[]
  maxDisplay?: number
  showTimestamp?: boolean
  allowAcknowledge?: boolean
  allowResolve?: boolean
}

// ===========================================
// Alert Item Component
// ===========================================

export interface AlertItemProps extends BaseHVACComponentProps {
  alert: Alert
  showTimestamp?: boolean
  allowAcknowledge?: boolean
  allowResolve?: boolean
  onAcknowledge?: (alertId: string) => void
  onResolve?: (alertId: string) => void
}

export const AlertItem: React.FC<AlertItemProps> = ({
  alert,
  showTimestamp = true,
  allowAcknowledge = true,
  allowResolve = true,
  onAcknowledge,
  onResolve,
  className,
  onInteraction,
  ...props
}) => {
  // Get severity color
  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'critical':
        return baseDesignTokens.brandColors.nebula.dark
      case 'error':
        return baseDesignTokens.brandColors.nebula.dark
      case 'warning':
        return baseDesignTokens.brandColors.amber.primary
      case 'info':
        return baseDesignTokens.brandColors.blue[1]
      default:
        return baseDesignTokens.brandColors.neutral.black
    }
  }
  
  // Get severity background
  const getSeverityBackground = () => {
    const color = getSeverityColor()
    return `${color}10` // 10% opacity
  }
  
  // Format timestamp
  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Handle actions
  const handleAcknowledge = () => {
    if (onAcknowledge) {
      onAcknowledge(alert.id)
    }
    if (onInteraction) {
      onInteraction('alert_acknowledge', { alert })
    }
  }
  
  const handleResolve = () => {
    if (onResolve) {
      onResolve(alert.id)
    }
    if (onInteraction) {
      onInteraction('alert_resolve', { alert })
    }
  }
  
  const handleClick = () => {
    if (onInteraction) {
      onInteraction('alert_detail', { alert })
    }
  }
  
  const containerStyle: React.CSSProperties = {
    padding: baseDesignTokens.spacing[4],
    backgroundColor: alert.acknowledged ? 
      baseDesignTokens.standardTokens.light.background :
      getSeverityBackground(),
    borderRadius: baseDesignTokens.borderRadius.sm,
    border: `2px solid ${getSeverityColor()}`,
    borderLeft: `6px solid ${getSeverityColor()}`,
    display: 'flex',
    flexDirection: 'column',
    gap: baseDesignTokens.spacing[2],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    opacity: alert.resolved ? 0.6 : 1
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      onClick={handleClick}
      data-component="alert-item"
      data-severity={alert.severity}
      data-acknowledged={alert.acknowledged}
      data-resolved={alert.resolved}
      {...props}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              fontWeight: baseDesignTokens.typography.fontWeight.medium,
              color: baseDesignTokens.standardTokens.light.foreground,
              margin: 0
            }}
          >
            {alert.title}
          </div>
          
          {showTimestamp && (
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.6,
                margin: 0
              }}
            >
              {formatTimestamp(alert.timestamp)}
            </div>
          )}
        </div>
        
        {/* Severity Badge */}
        <div
          style={{
            padding: `${baseDesignTokens.spacing[1]} ${baseDesignTokens.spacing[2]}`,
            backgroundColor: getSeverityColor(),
            color: baseDesignTokens.brandColors.neutral.white,
            borderRadius: baseDesignTokens.borderRadius.sm,
            fontSize: baseDesignTokens.typography.fontSize.xs,
            fontFamily: baseDesignTokens.typography.fontFamily.primary,
            fontWeight: baseDesignTokens.typography.fontWeight.medium,
            textTransform: 'uppercase'
          }}
        >
          {alert.severity}
        </div>
      </div>
      
      {/* Description */}
      <div
        style={{
          fontSize: baseDesignTokens.typography.fontSize.sm,
          fontFamily: baseDesignTokens.typography.fontFamily.primary,
          color: baseDesignTokens.standardTokens.light.foreground,
          lineHeight: baseDesignTokens.typography.lineHeight.normal,
          margin: 0
        }}
      >
        {alert.description}
      </div>
      
      {/* Metadata */}
      <div style={{ display: 'flex', gap: baseDesignTokens.spacing[4], fontSize: baseDesignTokens.typography.fontSize.xs }}>
        {alert.equipmentId && (
          <span style={{ color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
            Equipment: {alert.equipmentId}
          </span>
        )}
        {alert.zoneId && (
          <span style={{ color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
            Zone: {alert.zoneId}
          </span>
        )}
        <span style={{ color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
          Category: {alert.category}
        </span>
      </div>
      
      {/* Actions */}
      {(allowAcknowledge || allowResolve) && !alert.resolved && (
        <div style={{ display: 'flex', gap: baseDesignTokens.spacing[2], marginTop: baseDesignTokens.spacing[2] }}>
          {allowAcknowledge && !alert.acknowledged && (
            <UnstyledButton
              onClick={(e) => {
                e.stopPropagation()
                handleAcknowledge()
              }}
              style={{
                padding: `${baseDesignTokens.spacing[2]} ${baseDesignTokens.spacing[3]}`,
                backgroundColor: 'transparent',
                color: baseDesignTokens.brandColors.blue[1],
                border: `1px solid ${baseDesignTokens.brandColors.blue[1]}`,
                borderRadius: baseDesignTokens.borderRadius.sm,
                fontSize: baseDesignTokens.typography.fontSize.xs,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                cursor: 'pointer'
              }}
            >
              Acknowledge
            </UnstyledButton>
          )}
          
          {allowResolve && (
            <UnstyledButton
              onClick={(e) => {
                e.stopPropagation()
                handleResolve()
              }}
              style={{
                padding: `${baseDesignTokens.spacing[2]} ${baseDesignTokens.spacing[3]}`,
                backgroundColor: baseDesignTokens.brandColors.green.success,
                color: baseDesignTokens.brandColors.neutral.white,
                border: 'none',
                borderRadius: baseDesignTokens.borderRadius.sm,
                fontSize: baseDesignTokens.typography.fontSize.xs,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                cursor: 'pointer'
              }}
            >
              Resolve
            </UnstyledButton>
          )}
        </div>
      )}
      
      {/* Status Indicators */}
      {(alert.acknowledged || alert.resolved) && (
        <div style={{ display: 'flex', gap: baseDesignTokens.spacing[2], marginTop: baseDesignTokens.spacing[1] }}>
          {alert.acknowledged && (
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.brandColors.blue[1],
                fontWeight: baseDesignTokens.typography.fontWeight.medium
              }}
            >
              ✓ Acknowledged
            </div>
          )}
          {alert.resolved && (
            <div
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.brandColors.green.success,
                fontWeight: baseDesignTokens.typography.fontWeight.medium
              }}
            >
              ✓ Resolved
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ===========================================
// Alert Panel Component
// ===========================================

export const AlertPanel: React.FC<AlertPanelProps> = ({
  alerts,
  type = 'panel',
  filterSeverity,
  maxDisplay = 10,
  showTimestamp = true,
  allowAcknowledge = true,
  allowResolve = true,
  className,
  onInteraction,
  ...props
}) => {
  // Filter alerts based on criteria
  const filteredAlerts = React.useMemo(() => {
    let filtered = [...alerts]
    
    // Filter by severity if specified
    if (filterSeverity && filterSeverity.length > 0) {
      filtered = filtered.filter(alert => filterSeverity.includes(alert.severity))
    }
    
    // Filter by type
    if (type === 'maintenance') {
      filtered = filtered.filter(alert => alert.category === 'equipment' && alert.description.includes('maintenance'))
    } else if (type === 'diagnostic') {
      filtered = filtered.filter(alert => alert.severity === 'error' || alert.severity === 'critical')
    }
    
    // Sort by severity and timestamp
    filtered.sort((a, b) => {
      const severityOrder = { critical: 4, error: 3, warning: 2, info: 1 }
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity]
      if (severityDiff !== 0) return severityDiff
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
    
    // Limit display count
    return filtered.slice(0, maxDisplay)
  }, [alerts, type, filterSeverity, maxDisplay])
  
  // Get summary statistics
  const getAlertStats = () => {
    const total = alerts.length
    const unacknowledged = alerts.filter(a => !a.acknowledged).length
    const critical = alerts.filter(a => a.severity === 'critical').length
    const unresolved = alerts.filter(a => !a.resolved).length
    
    return { total, unacknowledged, critical, unresolved }
  }
  
  const stats = getAlertStats()
  
  // Handle bulk actions
  const handleAcknowledgeAll = () => {
    if (onInteraction) {
      onInteraction('alert_acknowledge_all', {
        alerts: filteredAlerts.filter(a => !a.acknowledged)
      })
    }
  }
  
  const handleClearResolved = () => {
    if (onInteraction) {
      onInteraction('alert_clear_resolved', {
        alerts: alerts.filter(a => a.resolved)
      })
    }
  }
  
  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: baseDesignTokens.standardTokens.light.background,
    borderRadius: baseDesignTokens.borderRadius.md,
    boxShadow: baseDesignTokens.shadows.lg,
    overflow: 'hidden'
  }
  
  const headerStyle: React.CSSProperties = {
    padding: baseDesignTokens.spacing[5],
    backgroundColor: baseDesignTokens.brandColors.neutral.gray[50],
    borderBottom: `1px solid ${baseDesignTokens.brandColors.neutral.gray[200]}`
  }
  
  const getTypeTitle = () => {
    switch (type) {
      case 'maintenance': return 'Maintenance Alerts'
      case 'diagnostic': return 'Fault Diagnosis'
      case 'panel':
      default: return 'Alert Management'
    }
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      data-component="alert-panel"
      data-type={type}
      {...props}
    >
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: baseDesignTokens.spacing[3] }}>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.lg,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              fontWeight: baseDesignTokens.typography.fontWeight.medium,
              color: baseDesignTokens.standardTokens.light.foreground
            }}
          >
            {getTypeTitle()}
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: baseDesignTokens.spacing[2] }}>
            {stats.unacknowledged > 0 && (
              <UnstyledButton
                onClick={handleAcknowledgeAll}
                style={{
                  padding: `${baseDesignTokens.spacing[2]} ${baseDesignTokens.spacing[3]}`,
                  backgroundColor: baseDesignTokens.brandColors.blue[1],
                  color: baseDesignTokens.brandColors.neutral.white,
                  border: 'none',
                  borderRadius: baseDesignTokens.borderRadius.sm,
                  fontSize: baseDesignTokens.typography.fontSize.xs,
                  fontFamily: baseDesignTokens.typography.fontFamily.primary,
                  cursor: 'pointer'
                }}
              >
                Ack All
              </UnstyledButton>
            )}
            
            <UnstyledButton
              onClick={handleClearResolved}
              style={{
                padding: `${baseDesignTokens.spacing[2]} ${baseDesignTokens.spacing[3]}`,
                backgroundColor: 'transparent',
                color: baseDesignTokens.brandColors.neutral.gray[600],
                border: `1px solid ${baseDesignTokens.brandColors.neutral.gray[300]}`,
                borderRadius: baseDesignTokens.borderRadius.sm,
                fontSize: baseDesignTokens.typography.fontSize.xs,
                fontFamily: baseDesignTokens.typography.fontFamily.primary,
                cursor: 'pointer'
              }}
            >
              Clear Resolved
            </UnstyledButton>
          </div>
        </div>
        
        {/* Statistics */}
        <div style={{ display: 'flex', gap: baseDesignTokens.spacing[6] }}>
          <div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.xs, color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
              Total
            </div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.base, fontWeight: baseDesignTokens.typography.fontWeight.medium, color: baseDesignTokens.standardTokens.light.foreground }}>
              {stats.total}
            </div>
          </div>
          <div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.xs, color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
              Unacknowledged
            </div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.base, fontWeight: baseDesignTokens.typography.fontWeight.medium, color: baseDesignTokens.brandColors.amber.primary }}>
              {stats.unacknowledged}
            </div>
          </div>
          <div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.xs, color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
              Critical
            </div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.base, fontWeight: baseDesignTokens.typography.fontWeight.medium, color: baseDesignTokens.brandColors.nebula.dark }}>
              {stats.critical}
            </div>
          </div>
          <div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.xs, color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
              Unresolved
            </div>
            <div style={{ fontSize: baseDesignTokens.typography.fontSize.base, fontWeight: baseDesignTokens.typography.fontWeight.medium, color: baseDesignTokens.brandColors.blue[1] }}>
              {stats.unresolved}
            </div>
          </div>
        </div>
      </div>
      
      {/* Alert List */}
      <div style={{ maxHeight: '500px', overflowY: 'auto', padding: baseDesignTokens.spacing[4] }}>
        {filteredAlerts.length === 0 ? (
          <div
            style={{
              padding: baseDesignTokens.spacing[8],
              textAlign: 'center',
              color: baseDesignTokens.standardTokens.light.foreground,
              opacity: 0.6,
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary
            }}
          >
            No alerts found
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: baseDesignTokens.spacing[3] }}>
            {filteredAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                alert={alert}
                showTimestamp={showTimestamp}
                allowAcknowledge={allowAcknowledge}
                allowResolve={allowResolve}
                onInteraction={onInteraction}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ===========================================
// Export
// ===========================================

export default AlertPanel