/**
 * Layer 2 HVAC 业务语义按钮组件
 * 
 * 职责：
 * - 基于 Layer 1 按钮基础设施创建 HVAC 专用按钮组件
 * - 提供业务语义化的按钮接口
 * - 封装 HVAC 特定的操作逻辑和状态
 * - 集成图标系统和状态感知
 */

import React from 'react'
import { Button, type ButtonProps } from '../ui-layer1/button-primitives'
import { 
  PowerIcon, 
  SwitchIcon,
  PlayIcon,
  StopIcon,
  PauseIcon,
  ResetIcon,
  SettingsIcon,
  AutomationIcon,
  ManualIcon,
  EmergencyIcon,
  MaintenanceIcon,
  type HVACIconProps 
} from './hvac-icons'

// HVAC 业务按钮属性接口
interface HVACButtonProps extends Omit<ButtonProps, 'children'> {
  /** 按钮文本 */
  label?: string
  /** 是否显示图标 */
  showIcon?: boolean
  /** 自定义图标 */
  icon?: React.ReactNode
  /** 操作确认提示 */
  confirmMessage?: string
  /** 操作权限级别 */
  permission?: 'operator' | 'engineer' | 'admin'
  /** 是否需要确认 */
  requireConfirm?: boolean
}

// 基础 HVAC 按钮组件生成器
const createHVACButton = (
  defaultIcon: React.ComponentType<HVACIconProps>,
  defaultLabel: string,
  defaultVariant: ButtonProps['variant'] = 'primary',
  businessAction?: string
) => {
  const HVACButtonComponent = React.forwardRef<HTMLButtonElement, HVACButtonProps>(
    ({ 
      label = defaultLabel,
      showIcon = true,
      icon,
      confirmMessage,
      permission = 'operator',
      requireConfirm = false,
      variant = defaultVariant,
      onClick,
      ...props 
    }, ref) => {
      
      const [isConfirming, setIsConfirming] = React.useState(false)
      
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (requireConfirm && !isConfirming) {
          if (confirmMessage && !window.confirm(confirmMessage)) {
            return
          }
          setIsConfirming(true)
          setTimeout(() => setIsConfirming(false), 3000) // 3秒后重置确认状态
        }
        
        // 业务操作记录
        if (businessAction) {
          console.log(`HVAC Business Action: ${businessAction}`, {
            permission,
            timestamp: new Date().toISOString(),
            user: 'current_user', // 实际应用中从用户上下文获取
          })
        }
        
        onClick?.(e)
      }

      const IconComponent = defaultIcon
      const displayIcon = icon || (showIcon ? <IconComponent size="sm" /> : null)
      
      return (
        <Button
          ref={ref}
          variant={isConfirming ? 'warning' : variant}
          startIcon={displayIcon}
          onClick={handleClick}
          className={`hvac-button hvac-button--${businessAction?.toLowerCase().replace(/\s+/g, '-')}`}
          {...props}
        >
          {isConfirming ? '确认操作' : label}
        </Button>
      )
    }
  )

  HVACButtonComponent.displayName = `HVAC${defaultLabel.replace(/\s+/g, '')}Button`
  return HVACButtonComponent
}

// ===== 设备控制类按钮 =====

export const PowerButton = createHVACButton(
  PowerIcon, 
  '电源开关', 
  'primary',
  'Power Control'
)

export const StartButton = createHVACButton(
  PlayIcon, 
  '启动设备', 
  'success',
  'Equipment Start'
)

export const StopButton = createHVACButton(
  StopIcon, 
  '停止设备', 
  'danger',
  'Equipment Stop'
)

export const PauseButton = createHVACButton(
  PauseIcon, 
  '暂停设备', 
  'warning',
  'Equipment Pause'
)

export const ResetButton = createHVACButton(
  ResetIcon, 
  '重置设备', 
  'secondary',
  'Equipment Reset'
)

// ===== 操作模式类按钮 =====

export const AutoModeButton = createHVACButton(
  AutomationIcon, 
  '自动模式', 
  'primary',
  'Auto Mode'
)

export const ManualModeButton = createHVACButton(
  ManualIcon, 
  '手动模式', 
  'secondary',
  'Manual Mode'
)

export const EmergencyButton = createHVACButton(
  EmergencyIcon, 
  '紧急停止', 
  'danger',
  'Emergency Stop'
)

// ===== 系统维护类按钮 =====

export const MaintenanceButton = createHVACButton(
  MaintenanceIcon, 
  '维护模式', 
  'warning',
  'Maintenance Mode'
)

export const SettingsButton = createHVACButton(
  SettingsIcon, 
  '系统设置', 
  'ghost',
  'System Settings'
)

// ===== 复合业务按钮组件 =====

/**
 * 设备状态切换按钮 - 智能状态感知
 */
export const EquipmentToggleButton = React.forwardRef<HTMLButtonElement, {
  equipmentId: string
  currentStatus: 'running' | 'stopped' | 'paused' | 'error'
  onToggle: (newStatus: string) => void
  size?: ButtonProps['size']
  permission?: 'operator' | 'engineer' | 'admin'
}>(({ equipmentId, currentStatus, onToggle, size = 'md', permission = 'operator', ...props }, ref) => {
  
  const getToggleAction = () => {
    switch (currentStatus) {
      case 'stopped':
      case 'paused':
        return { action: 'start', label: '启动', variant: 'success' as const, icon: PlayIcon }
      case 'running':
        return { action: 'stop', label: '停止', variant: 'danger' as const, icon: StopIcon }
      case 'error':
        return { action: 'reset', label: '重置', variant: 'warning' as const, icon: ResetIcon }
      default:
        return { action: 'stop', label: '停止', variant: 'secondary' as const, icon: StopIcon }
    }
  }

  const { action, label, variant, icon: IconComponent } = getToggleAction()
  
  const handleToggle = () => {
    onToggle(action)
  }

  const requireConfirm = action === 'stop' || action === 'reset'
  const confirmMessage = action === 'stop' 
    ? '确定要停止设备吗？' 
    : action === 'reset' 
    ? '确定要重置设备吗？这将清除当前错误状态。'
    : undefined

  return (
    <Button
      ref={ref}
      size={size}
      variant={variant}
      startIcon={<IconComponent size="sm" />}
      onClick={handleToggle}
      requireConfirm={requireConfirm}
      confirmMessage={confirmMessage}
      className={`hvac-equipment-toggle hvac-equipment-toggle--${currentStatus}`}
      {...props}
    >
      {label}
    </Button>
  )
})

EquipmentToggleButton.displayName = 'EquipmentToggleButton'

/**
 * 系统模式切换按钮组
 */
export const SystemModeToggle = React.forwardRef<HTMLDivElement, {
  currentMode: 'auto' | 'manual' | 'maintenance'
  onModeChange: (mode: string) => void
  disabled?: boolean
}>(({ currentMode, onModeChange, disabled = false, ...props }, ref) => {
  
  const modes = [
    { key: 'auto', label: '自动', variant: 'primary' as const, icon: AutomationIcon },
    { key: 'manual', label: '手动', variant: 'secondary' as const, icon: ManualIcon },
    { key: 'maintenance', label: '维护', variant: 'warning' as const, icon: MaintenanceIcon },
  ]

  return (
    <div 
      ref={ref}
      className="hvac-mode-toggle"
      style={{ display: 'flex', gap: '8px' }}
      {...props}
    >
      {modes.map(({ key, label, variant, icon: IconComponent }) => (
        <Button
          key={key}
          size="sm"
          variant={currentMode === key ? variant : 'ghost'}
          startIcon={<IconComponent size="sm" />}
          onClick={() => onModeChange(key)}
          disabled={disabled}
          className={`hvac-mode-button hvac-mode-button--${key}`}
        >
          {label}
        </Button>
      ))}
    </div>
  )
})

SystemModeToggle.displayName = 'SystemModeToggle'

/**
 * 批量设备操作按钮
 */
export const BatchOperationButton = React.forwardRef<HTMLButtonElement, {
  operation: 'start_all' | 'stop_all' | 'reset_all'
  equipmentCount: number
  onExecute: () => void
  size?: ButtonProps['size']
}>(({ operation, equipmentCount, onExecute, size = 'md', ...props }, ref) => {
  
  const operationConfig = {
    start_all: {
      label: `启动全部 (${equipmentCount})`,
      variant: 'success' as const,
      icon: PlayIcon,
      confirm: `确定要启动全部 ${equipmentCount} 台设备吗？`
    },
    stop_all: {
      label: `停止全部 (${equipmentCount})`,
      variant: 'danger' as const,
      icon: StopIcon,
      confirm: `确定要停止全部 ${equipmentCount} 台设备吗？`
    },
    reset_all: {
      label: `重置全部 (${equipmentCount})`,
      variant: 'warning' as const,
      icon: ResetIcon,
      confirm: `确定要重置全部 ${equipmentCount} 台设备吗？这将清除所有错误状态。`
    }
  }

  const config = operationConfig[operation]
  const IconComponent = config.icon

  const handleExecute = () => {
    if (window.confirm(config.confirm)) {
      onExecute()
    }
  }

  return (
    <Button
      ref={ref}
      size={size}
      variant={config.variant}
      startIcon={<IconComponent size="sm" />}
      onClick={handleExecute}
      className={`hvac-batch-operation hvac-batch-operation--${operation}`}
      {...props}
    >
      {config.label}
    </Button>
  )
})

BatchOperationButton.displayName = 'BatchOperationButton'

// ===== 按钮组映射 =====
export const HVACButtons = {
  // 设备控制
  control: {
    power: PowerButton,
    start: StartButton,
    stop: StopButton,
    pause: PauseButton,
    reset: ResetButton,
  },
  
  // 操作模式
  mode: {
    auto: AutoModeButton,
    manual: ManualModeButton,
    emergency: EmergencyButton,
  },
  
  // 系统维护
  system: {
    maintenance: MaintenanceButton,
    settings: SettingsButton,
  },
  
  // 复合组件
  composite: {
    equipmentToggle: EquipmentToggleButton,
    systemModeToggle: SystemModeToggle,
    batchOperation: BatchOperationButton,
  }
}

// ===== 业务语义映射函数 =====

/**
 * 根据设备状态获取推荐操作按钮
 */
export function getRecommendedAction(equipmentStatus: string, equipmentType: string) {
  const actionMap: Record<string, { button: React.ComponentType<any>, priority: 'high' | 'medium' | 'low' }> = {
    'stopped': { button: StartButton, priority: 'high' },
    'running': { button: StopButton, priority: 'medium' },
    'error': { button: ResetButton, priority: 'high' },
    'paused': { button: StartButton, priority: 'medium' },
    'maintenance': { button: MaintenanceButton, priority: 'low' },
  }
  
  return actionMap[equipmentStatus] || { button: SettingsButton, priority: 'low' }
}

/**
 * 根据用户权限过滤可用按钮
 */
export function filterButtonsByPermission(
  permission: 'operator' | 'engineer' | 'admin'
): string[] {
  const permissionMap = {
    operator: ['start', 'stop', 'pause'],
    engineer: ['start', 'stop', 'pause', 'reset', 'auto', 'manual', 'settings'],
    admin: ['start', 'stop', 'pause', 'reset', 'auto', 'manual', 'emergency', 'maintenance', 'settings']
  }
  
  return permissionMap[permission] || []
}

export default HVACButtons