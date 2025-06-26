/**
 * Equipment Control Component - Layer 2 Business Semantic
 * 
 * Maps equipment control operations to Layer 1 components.
 * Handles AI intents like "Control chiller", "Adjust pump speed", "Switch mode".
 */

import React from 'react'
import { UnstyledButton } from '../ui-layer1/button'
import { baseDesignTokens } from '../ui-layer1/design-tokens-simple'
import { Equipment, BaseHVACComponentProps } from './hvac-types'

// ===========================================
// Equipment Control Props
// ===========================================

export interface EquipmentControlProps extends BaseHVACComponentProps {
  equipment: Equipment
  controlType?: 'status' | 'adjust' | 'mode'
  currentValue?: number
  targetValue?: number
  unit?: string
  range?: [number, number]
  step?: number
  modes?: string[]
  currentMode?: string
}

// ===========================================
// Equipment Control Component
// ===========================================

export const EquipmentControl: React.FC<EquipmentControlProps> = ({
  equipment,
  controlType = 'status',
  currentValue,
  targetValue,
  unit = '',
  range = [0, 100],
  step = 1,
  modes = [],
  currentMode,
  className,
  interactive = true,
  onInteraction,
  ...props
}) => {
  const [localValue, setLocalValue] = React.useState(targetValue || currentValue || 0)
  const [localMode, setLocalMode] = React.useState(currentMode || modes[0] || 'auto')
  
  // Get equipment status color
  const getStatusColor = () => {
    switch (equipment.status) {
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
  
  // Handle value change
  const handleValueChange = (newValue: number) => {
    setLocalValue(newValue)
    if (onInteraction) {
      onInteraction('equipment_adjust', {
        equipment,
        parameter: controlType,
        oldValue: currentValue,
        newValue,
        unit
      })
    }
  }
  
  // Handle mode change
  const handleModeChange = (newMode: string) => {
    setLocalMode(newMode)
    if (onInteraction) {
      onInteraction('equipment_mode_switch', {
        equipment,
        oldMode: currentMode,
        newMode
      })
    }
  }
  
  // Handle start/stop
  const handleStartStop = () => {
    const newStatus = equipment.status === 'online' ? 'offline' : 'online'
    if (onInteraction) {
      onInteraction('equipment_control', {
        equipment,
        action: newStatus === 'online' ? 'start' : 'stop',
        oldStatus: equipment.status,
        newStatus
      })
    }
  }
  
  const containerStyle: React.CSSProperties = {
    width: '280px',
    minHeight: '140px',
    padding: baseDesignTokens.spacing[5],
    backgroundColor: baseDesignTokens.standardTokens.light.background,
    borderRadius: baseDesignTokens.borderRadius.md,
    boxShadow: baseDesignTokens.shadows.md,
    display: 'flex',
    flexDirection: 'column',
    gap: baseDesignTokens.spacing[4],
    border: `2px solid ${getStatusColor()}20`
  }
  
  return (
    <div
      style={containerStyle}
      className={className}
      data-component="equipment-control"
      data-equipment-id={equipment.id}
      data-control-type={controlType}
      {...props}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.base,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              fontWeight: baseDesignTokens.typography.fontWeight.medium,
              color: baseDesignTokens.standardTokens.light.foreground,
              margin: 0
            }}
          >
            {equipment.name}
          </div>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.xs,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: getStatusColor(),
              textTransform: 'capitalize',
              margin: 0
            }}
          >
            {equipment.status}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: getStatusColor()
          }}
        />
      </div>
      
      {/* Control Interface */}
      {controlType === 'status' && (
        <div style={{ display: 'flex', gap: baseDesignTokens.spacing[3] }}>
          <UnstyledButton
            onClick={handleStartStop}
            style={{
              flex: 1,
              padding: `${baseDesignTokens.spacing[3]} ${baseDesignTokens.spacing[4]}`,
              backgroundColor: equipment.status === 'online' 
                ? baseDesignTokens.brandColors.nebula.dark
                : baseDesignTokens.brandColors.green.success,
              color: baseDesignTokens.brandColors.neutral.white,
              border: 'none',
              borderRadius: baseDesignTokens.borderRadius.sm,
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              fontWeight: baseDesignTokens.typography.fontWeight.medium,
              cursor: interactive ? 'pointer' : 'not-allowed',
              opacity: interactive ? 1 : 0.6
            }}
            disabled={!interactive}
          >
            {equipment.status === 'online' ? 'Stop' : 'Start'}
          </UnstyledButton>
          
          <UnstyledButton
            onClick={() => onInteraction?.('equipment_maintenance', { equipment })}
            style={{
              padding: `${baseDesignTokens.spacing[3]} ${baseDesignTokens.spacing[4]}`,
              backgroundColor: 'transparent',
              color: baseDesignTokens.brandColors.amber.primary,
              border: `1px solid ${baseDesignTokens.brandColors.amber.primary}`,
              borderRadius: baseDesignTokens.borderRadius.sm,
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              cursor: interactive ? 'pointer' : 'not-allowed',
              opacity: interactive ? 1 : 0.6
            }}
            disabled={!interactive}
          >
            Maintenance
          </UnstyledButton>
        </div>
      )}
      
      {controlType === 'adjust' && currentValue !== undefined && (
        <div>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              marginBottom: baseDesignTokens.spacing[2]
            }}
          >
            Value: {localValue}{unit}
          </div>
          
          <input
            type="range"
            min={range[0]}
            max={range[1]}
            step={step}
            value={localValue}
            onChange={(e) => handleValueChange(Number(e.target.value))}
            disabled={!interactive || equipment.status !== 'online'}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: `linear-gradient(to right, ${getStatusColor()} 0%, ${getStatusColor()} ${((localValue - range[0]) / (range[1] - range[0])) * 100}%, ${baseDesignTokens.brandColors.neutral.gray[200]} ${((localValue - range[0]) / (range[1] - range[0])) * 100}%, ${baseDesignTokens.brandColors.neutral.gray[200]} 100%)`,
              outline: 'none',
              cursor: interactive && equipment.status === 'online' ? 'pointer' : 'not-allowed'
            }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: baseDesignTokens.spacing[1] }}>
            <span
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.6
              }}
            >
              {range[0]}{unit}
            </span>
            <span
              style={{
                fontSize: baseDesignTokens.typography.fontSize.xs,
                color: baseDesignTokens.standardTokens.light.foreground,
                opacity: 0.6
              }}
            >
              {range[1]}{unit}
            </span>
          </div>
        </div>
      )}
      
      {controlType === 'mode' && modes.length > 0 && (
        <div>
          <div
            style={{
              fontSize: baseDesignTokens.typography.fontSize.sm,
              fontFamily: baseDesignTokens.typography.fontFamily.primary,
              color: baseDesignTokens.standardTokens.light.foreground,
              marginBottom: baseDesignTokens.spacing[2]
            }}
          >
            Mode: {localMode}
          </div>
          
          <div style={{ display: 'flex', gap: baseDesignTokens.spacing[2], flexWrap: 'wrap' }}>
            {modes.map((mode) => (
              <UnstyledButton
                key={mode}
                onClick={() => handleModeChange(mode)}
                style={{
                  padding: `${baseDesignTokens.spacing[2]} ${baseDesignTokens.spacing[3]}`,
                  backgroundColor: localMode === mode 
                    ? getStatusColor()
                    : 'transparent',
                  color: localMode === mode 
                    ? baseDesignTokens.brandColors.neutral.white
                    : getStatusColor(),
                  border: `1px solid ${getStatusColor()}`,
                  borderRadius: baseDesignTokens.borderRadius.sm,
                  fontSize: baseDesignTokens.typography.fontSize.xs,
                  fontFamily: baseDesignTokens.typography.fontFamily.primary,
                  textTransform: 'capitalize',
                  cursor: interactive && equipment.status === 'online' ? 'pointer' : 'not-allowed',
                  opacity: interactive && equipment.status === 'online' ? 1 : 0.6
                }}
                disabled={!interactive || equipment.status !== 'online'}
              >
                {mode}
              </UnstyledButton>
            ))}
          </div>
        </div>
      )}
      
      {/* Equipment Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: baseDesignTokens.typography.fontSize.xs }}>
        <span style={{ color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
          Runtime: {equipment.runtime}h
        </span>
        <span style={{ color: baseDesignTokens.standardTokens.light.foreground, opacity: 0.6 }}>
          Type: {equipment.type}
        </span>
      </div>
    </div>
  )
}

// ===========================================
// Equipment Control Panel Component
// ===========================================

export interface EquipmentControlPanelProps extends BaseHVACComponentProps {
  equipmentList: Equipment[]
  layout?: 'grid' | 'list'
  columns?: number
  gap?: string
}

export const EquipmentControlPanel: React.FC<EquipmentControlPanelProps> = ({
  equipmentList,
  layout = 'grid',
  columns = 2,
  gap = baseDesignTokens.spacing[4],
  className,
  onInteraction,
  ...props
}) => {
  const containerStyle: React.CSSProperties = layout === 'grid'
    ? {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        padding: baseDesignTokens.spacing[4]
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        gap,
        padding: baseDesignTokens.spacing[4]
      }
  
  return (
    <div
      style={containerStyle}
      className={className}
      data-component="equipment-control-panel"
      {...props}
    >
      {equipmentList.map((equipment) => (
        <EquipmentControl
          key={equipment.id}
          equipment={equipment}
          controlType="status"
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

export default EquipmentControl