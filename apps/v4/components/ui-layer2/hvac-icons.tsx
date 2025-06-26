/**
 * Layer 2 HVAC 业务语义图标组件
 * 
 * 职责：
 * - 基于 Layer 1 图标基础设施创建 HVAC 专用图标组件
 * - 提供业务语义化的图标接口
 * - 封装 HVAC 特定的样式和行为
 * - 集成业务逻辑（状态感知、交互逻辑等）
 */

import React from 'react'
import { Icon, type IconProps } from '../ui-layer1/icon-primitives'
import { getIconData } from '../ui-layer1/icon-data'
import type { IconSize, IconColor } from '../ui-layer1/design-tokens-simple'

// HVAC 业务图标属性接口
interface HVACIconProps extends Omit<IconProps, 'data'> {
  /** 是否显示状态指示器 */
  showStatus?: boolean
  /** 状态类型 */
  status?: 'normal' | 'warning' | 'error' | 'offline'
  /** 是否为活动状态 */
  active?: boolean
  /** 工具提示文本 */
  tooltip?: string
}

// 基础 HVAC 图标组件生成器
const createHVACIcon = (iconName: string, displayName: string) => {
  const HVACIconComponent = React.forwardRef<SVGSVGElement, HVACIconProps>(
    ({ 
      showStatus = false, 
      status = 'normal', 
      active = false,
      color,
      size = 'md',
      className = '',
      tooltip,
      ...props 
    }, ref) => {
      const iconData = getIconData(iconName)
      
      if (!iconData) {
        console.warn(`HVAC Icon "${iconName}" not found`)
        return null
      }

      // 状态感知的颜色映射
      const getStatusColor = (): IconColor => {
        if (color) return color
        if (!active) return 'black'
        
        switch (status) {
          case 'warning': return 'warning'
          case 'error': return 'danger'
          case 'offline': return 'black'
          case 'normal': 
          default: return 'success'
        }
      }

      const combinedClassName = [
        'hvac-icon',
        `hvac-icon--${iconName}`,
        active && 'hvac-icon--active',
        showStatus && `hvac-icon--${status}`,
        className
      ].filter(Boolean).join(' ')

      return (
        <div 
          className={`hvac-icon-wrapper ${combinedClassName}`}
          title={tooltip || displayName}
          style={{ position: 'relative', display: 'inline-flex' }}
        >
          <Icon
            ref={ref}
            data={iconData}
            size={size}
            color={getStatusColor()}
            className="hvac-icon-base"
            {...props}
          />
          
          {/* 状态指示器 */}
          {showStatus && (
            <div 
              className={`hvac-icon-status hvac-icon-status--${status}`}
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 
                  status === 'normal' ? '#67D75E' :
                  status === 'warning' ? '#FECC36' :
                  status === 'error' ? '#FF3939' :
                  '#999999',
                border: '1px solid white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            />
          )}
        </div>
      )
    }
  )

  HVACIconComponent.displayName = `HVAC${displayName}Icon`
  return HVACIconComponent
}

// ===== 设备类图标组件 =====
export const ThermometerIcon = createHVACIcon('thermometer', 'Thermometer')
export const GaugeIcon = createHVACIcon('gauge', 'Gauge')
export const FanIcon = createHVACIcon('fan', 'Fan')
export const CompressorIcon = createHVACIcon('compressor', 'Compressor')
export const HeaterIcon = createHVACIcon('heater', 'Heater')
export const CoolerIcon = createHVACIcon('cooler', 'Cooler')
export const PumpIcon = createHVACIcon('pump', 'Pump')
export const ValveIcon = createHVACIcon('valve', 'Valve')
export const FilterIcon = createHVACIcon('filter', 'Filter')
export const PipeIcon = createHVACIcon('pipe', 'Pipe')
export const MotorIcon = createHVACIcon('motor', 'Motor')
export const SensorIcon = createHVACIcon('sensor', 'Sensor')
export const ControllerIcon = createHVACIcon('controller', 'Controller')
export const ActuatorIcon = createHVACIcon('actuator', 'Actuator')
export const HeatExchangerIcon = createHVACIcon('heat-exchanger', 'HeatExchanger')

// ===== 状态类图标组件 =====
export const RunningIcon = createHVACIcon('running', 'Running')
export const StoppedIcon = createHVACIcon('stopped', 'Stopped')
export const PausedIcon = createHVACIcon('paused', 'Paused')
export const ErrorIcon = createHVACIcon('error', 'Error')
export const WarningIcon = createHVACIcon('warning', 'Warning')
export const NormalIcon = createHVACIcon('normal', 'Normal')
export const OfflineIcon = createHVACIcon('offline', 'Offline')
export const OnlineIcon = createHVACIcon('online', 'Online')
export const ConnectedIcon = createHVACIcon('connected', 'Connected')
export const DisconnectedIcon = createHVACIcon('disconnected', 'Disconnected')
export const MaintenanceIcon = createHVACIcon('maintenance', 'Maintenance')
export const FaultIcon = createHVACIcon('fault', 'Fault')

// ===== 监控类图标组件 =====
export const DashboardIcon = createHVACIcon('dashboard', 'Dashboard')
export const ChartIcon = createHVACIcon('chart', 'Chart')
export const GraphIcon = createHVACIcon('graph', 'Graph')
export const MeterIcon = createHVACIcon('meter', 'Meter')
export const MonitorIcon = createHVACIcon('monitor', 'Monitor')
export const DisplayIcon = createHVACIcon('display', 'Display')
export const AnalyticsIcon = createHVACIcon('analytics', 'Analytics')
export const TrendUpIcon = createHVACIcon('trend-up', 'TrendUp')
export const TrendDownIcon = createHVACIcon('trend-down', 'TrendDown')
export const DataIcon = createHVACIcon('data', 'Data')
export const ReportIcon = createHVACIcon('report', 'Report')
export const LogIcon = createHVACIcon('log', 'Log')
export const HistoryIcon = createHVACIcon('history', 'History')
export const RealTimeIcon = createHVACIcon('real-time', 'RealTime')
export const TimelineIcon = createHVACIcon('timeline', 'Timeline')
export const AlertIcon = createHVACIcon('alert', 'Alert')
export const NotificationIcon = createHVACIcon('notification', 'Notification')
export const IndicatorIcon = createHVACIcon('indicator', 'Indicator')

// ===== 控制类图标组件 =====
export const PowerIcon = createHVACIcon('power', 'Power')
export const SwitchIcon = createHVACIcon('switch', 'Switch')
export const ButtonIcon = createHVACIcon('button', 'Button')
export const SliderIcon = createHVACIcon('slider', 'Slider')
export const KnobIcon = createHVACIcon('knob', 'Knob')
export const ToggleIcon = createHVACIcon('toggle', 'Toggle')
export const DialIcon = createHVACIcon('dial', 'Dial')
export const RemoteIcon = createHVACIcon('remote', 'Remote')
export const JoystickIcon = createHVACIcon('joystick', 'Joystick')
export const WheelIcon = createHVACIcon('wheel', 'Wheel')
export const TriggerIcon = createHVACIcon('trigger', 'Trigger')
export const LeverIcon = createHVACIcon('lever', 'Lever')
export const HandleIcon = createHVACIcon('handle', 'Handle')
export const RotaryIcon = createHVACIcon('rotary', 'Rotary')
export const KeypadIcon = createHVACIcon('keypad', 'Keypad')
export const InterfaceIcon = createHVACIcon('interface', 'Interface')
export const TouchscreenIcon = createHVACIcon('touchscreen', 'Touchscreen')
export const GestureIcon = createHVACIcon('gesture', 'Gesture')
export const AutomationIcon = createHVACIcon('automation', 'Automation')

// ===== 系统类图标组件 =====
export const NetworkIcon = createHVACIcon('network', 'Network')
export const WifiIcon = createHVACIcon('wifi', 'Wifi')
export const BluetoothIcon = createHVACIcon('bluetooth', 'Bluetooth')
export const CloudIcon = createHVACIcon('cloud', 'Cloud')
export const ServerIcon = createHVACIcon('server', 'Server')
export const DatabaseIcon = createHVACIcon('database', 'Database')
export const ConnectionIcon = createHVACIcon('connection', 'Connection')
export const SyncIcon = createHVACIcon('sync', 'Sync')
export const BackupIcon = createHVACIcon('backup', 'Backup')
export const UpdateIcon = createHVACIcon('update', 'Update')
export const SecurityIcon = createHVACIcon('security', 'Security')
export const FirewallIcon = createHVACIcon('firewall', 'Firewall')
export const ProtocolIcon = createHVACIcon('protocol', 'Protocol')
export const GatewayIcon = createHVACIcon('gateway', 'Gateway')
export const BridgeIcon = createHVACIcon('bridge', 'Bridge')
export const RouterIcon = createHVACIcon('router', 'Router')
export const IntegrationIcon = createHVACIcon('integration', 'Integration')

// ===== 扩展图标组件（新增20个） =====

// 仪表盘变体
export const DialGaugeIcon = createHVACIcon('dial-gauge', 'DialGauge')
export const FuelGaugeIcon = createHVACIcon('fuel-gauge', 'FuelGauge')
export const LiquidLevelIcon = createHVACIcon('liquid-level', 'LiquidLevel')
export const PressureMeterIcon = createHVACIcon('pressure-meter', 'PressureMeter')

// 控制器变体
export const DirectionalPadIcon = createHVACIcon('directional-pad', 'DirectionalPad')
export const JoystickAdvancedIcon = createHVACIcon('joystick-advanced', 'JoystickAdvanced')
export const ThumbstickIcon = createHVACIcon('thumbstick', 'Thumbstick')
export const DirectionControlIcon = createHVACIcon('direction-control', 'DirectionControl')

// 传感器扩展
export const VisionSensorIcon = createHVACIcon('vision-sensor', 'VisionSensor')
export const ProximitySensorIcon = createHVACIcon('proximity-sensor', 'ProximitySensor')
export const MotionDetectorIcon = createHVACIcon('motion-detector', 'MotionDetector')

// 界面布局
export const GridLayoutIcon = createHVACIcon('grid-layout', 'GridLayout')
export const PanelLayoutIcon = createHVACIcon('panel-layout', 'PanelLayout')
export const ModularInterfaceIcon = createHVACIcon('modular-interface', 'ModularInterface')

// 导航系统
export const CompassIcon = createHVACIcon('compass', 'Compass')
export const NavigationArrowIcon = createHVACIcon('navigation-arrow', 'NavigationArrow')
export const PositionMarkerIcon = createHVACIcon('position-marker', 'PositionMarker')

// 天气/环境
export const WeatherStationIcon = createHVACIcon('weather-station', 'WeatherStation')
export const HumiditySensorIcon = createHVACIcon('humidity-sensor', 'HumiditySensor')
export const AirQualityIcon = createHVACIcon('air-quality', 'AirQuality')

// 高级控制
export const MultiAxisControlIcon = createHVACIcon('multi-axis-control', 'MultiAxisControl')
export const PrecisionControlIcon = createHVACIcon('precision-control', 'PrecisionControl')
export const VariableControlIcon = createHVACIcon('variable-control', 'VariableControl')

// ===== 操作控制图标组件 =====
export const PlayIcon = createHVACIcon('play', 'Play')
export const StopIcon = createHVACIcon('stop', 'Stop')
export const PauseIcon = createHVACIcon('pause', 'Pause')
export const ResetIcon = createHVACIcon('reset', 'Reset')
export const SettingsIcon = createHVACIcon('settings', 'Settings')
export const ManualIcon = createHVACIcon('manual', 'Manual')
export const EmergencyIcon = createHVACIcon('emergency', 'Emergency')

// ===== 复合图标组件（业务场景特定） =====

/**
 * 设备状态图标 - 智能状态感知
 */
export const EquipmentStatusIcon = React.forwardRef<SVGSVGElement, {
  equipmentType: 'thermometer' | 'fan' | 'compressor' | 'pump' | 'heater' | 'cooler'
  status: 'normal' | 'warning' | 'error' | 'offline'
  size?: IconSize
  showLabel?: boolean
  label?: string
}>(({ equipmentType, status, size = 'md', showLabel = false, label, ...props }, ref) => {
  const IconComponent = {
    thermometer: ThermometerIcon,
    fan: FanIcon,
    compressor: CompressorIcon,
    pump: PumpIcon,
    heater: HeaterIcon,
    cooler: CoolerIcon,
  }[equipmentType]

  return (
    <div className="hvac-equipment-status" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IconComponent
        ref={ref}
        size={size}
        status={status}
        showStatus={true}
        active={status !== 'offline'}
        {...props}
      />
      {showLabel && (
        <span className={`hvac-equipment-label hvac-equipment-label--${status}`}>
          {label || equipmentType}
        </span>
      )}
    </div>
  )
})

EquipmentStatusIcon.displayName = 'EquipmentStatusIcon'

/**
 * 系统连接状态图标
 */
export const SystemConnectionIcon = React.forwardRef<SVGSVGElement, {
  connectionType: 'wifi' | 'bluetooth' | 'network' | 'cloud'
  connected: boolean
  signalStrength?: 'weak' | 'medium' | 'strong'
  size?: IconSize
}>(({ connectionType, connected, signalStrength = 'strong', size = 'md', ...props }, ref) => {
  const IconComponent = {
    wifi: WifiIcon,
    bluetooth: BluetoothIcon,
    network: NetworkIcon,
    cloud: CloudIcon,
  }[connectionType]

  return (
    <IconComponent
      ref={ref}
      size={size}
      status={connected ? 'normal' : 'offline'}
      active={connected}
      showStatus={true}
      className={`hvac-connection hvac-connection--${signalStrength}`}
      {...props}
    />
  )
})

SystemConnectionIcon.displayName = 'SystemConnectionIcon'

/**
 * 数据趋势图标
 */
export const DataTrendIcon = React.forwardRef<SVGSVGElement, {
  trend: 'up' | 'down' | 'stable'
  dataType?: 'temperature' | 'energy' | 'efficiency' | 'general'
  size?: IconSize
}>(({ trend, dataType = 'general', size = 'md', ...props }, ref) => {
  const IconComponent = trend === 'up' ? TrendUpIcon : trend === 'down' ? TrendDownIcon : DataIcon
  
  const getColorByTrend = () => {
    if (dataType === 'energy' || dataType === 'efficiency') {
      return trend === 'down' ? 'success' : trend === 'up' ? 'warning' : 'primary'
    }
    return trend === 'up' ? 'success' : trend === 'down' ? 'danger' : 'primary'
  }

  return (
    <IconComponent
      ref={ref}
      size={size}
      color={getColorByTrend()}
      className={`hvac-trend hvac-trend--${trend} hvac-trend--${dataType}`}
      {...props}
    />
  )
})

DataTrendIcon.displayName = 'DataTrendIcon'

// ===== 图标组映射 =====
export const HVACIcons = {
  // 设备类
  equipment: {
    thermometer: ThermometerIcon,
    gauge: GaugeIcon,
    fan: FanIcon,
    compressor: CompressorIcon,
    heater: HeaterIcon,
    cooler: CoolerIcon,
    pump: PumpIcon,
    valve: ValveIcon,
    filter: FilterIcon,
    pipe: PipeIcon,
    motor: MotorIcon,
    sensor: SensorIcon,
    controller: ControllerIcon,
    actuator: ActuatorIcon,
    heatExchanger: HeatExchangerIcon,
    visionSensor: VisionSensorIcon,
    proximitySensor: ProximitySensorIcon,
    motionDetector: MotionDetectorIcon,
  },
  
  // 状态类
  status: {
    running: RunningIcon,
    stopped: StoppedIcon,
    paused: PausedIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    normal: NormalIcon,
    offline: OfflineIcon,
    online: OnlineIcon,
    connected: ConnectedIcon,
    disconnected: DisconnectedIcon,
    maintenance: MaintenanceIcon,
    fault: FaultIcon,
  },
  
  // 监控类
  monitoring: {
    dashboard: DashboardIcon,
    chart: ChartIcon,
    graph: GraphIcon,
    meter: MeterIcon,
    monitor: MonitorIcon,
    display: DisplayIcon,
    analytics: AnalyticsIcon,
    trendUp: TrendUpIcon,
    trendDown: TrendDownIcon,
    data: DataIcon,
    report: ReportIcon,
    log: LogIcon,
    history: HistoryIcon,
    realTime: RealTimeIcon,
    timeline: TimelineIcon,
    alert: AlertIcon,
    notification: NotificationIcon,
    indicator: IndicatorIcon,
    dialGauge: DialGaugeIcon,
    fuelGauge: FuelGaugeIcon,
    liquidLevel: LiquidLevelIcon,
    pressureMeter: PressureMeterIcon,
  },
  
  // 控制类
  controls: {
    power: PowerIcon,
    switch: SwitchIcon,
    button: ButtonIcon,
    slider: SliderIcon,
    knob: KnobIcon,
    toggle: ToggleIcon,
    dial: DialIcon,
    remote: RemoteIcon,
    joystick: JoystickIcon,
    wheel: WheelIcon,
    trigger: TriggerIcon,
    lever: LeverIcon,
    handle: HandleIcon,
    rotary: RotaryIcon,
    keypad: KeypadIcon,
    interface: InterfaceIcon,
    touchscreen: TouchscreenIcon,
    gesture: GestureIcon,
    automation: AutomationIcon,
    directionalPad: DirectionalPadIcon,
    joystickAdvanced: JoystickAdvancedIcon,
    thumbstick: ThumbstickIcon,
    directionControl: DirectionControlIcon,
    multiAxisControl: MultiAxisControlIcon,
    precisionControl: PrecisionControlIcon,
    variableControl: VariableControlIcon,
  },
  
  // 系统类
  systems: {
    network: NetworkIcon,
    wifi: WifiIcon,
    bluetooth: BluetoothIcon,
    cloud: CloudIcon,
    server: ServerIcon,
    database: DatabaseIcon,
    connection: ConnectionIcon,
    sync: SyncIcon,
    backup: BackupIcon,
    update: UpdateIcon,
    security: SecurityIcon,
    firewall: FirewallIcon,
    protocol: ProtocolIcon,
    gateway: GatewayIcon,
    bridge: BridgeIcon,
    router: RouterIcon,
    integration: IntegrationIcon,
    compass: CompassIcon,
    navigationArrow: NavigationArrowIcon,
    positionMarker: PositionMarkerIcon,
    weatherStation: WeatherStationIcon,
    humiditySensor: HumiditySensorIcon,
    airQuality: AirQualityIcon,
  },
  
  // 界面类
  interface: {
    gridLayout: GridLayoutIcon,
    panelLayout: PanelLayoutIcon,
    modularInterface: ModularInterfaceIcon,
  },
  
  // 复合组件
  composite: {
    equipmentStatus: EquipmentStatusIcon,
    systemConnection: SystemConnectionIcon,
    dataTrend: DataTrendIcon,
  }
}

// ===== 工具函数 =====

/**
 * 根据设备类型获取对应图标组件
 */
export function getEquipmentIcon(equipmentType: string) {
  const iconMap: Record<string, React.ComponentType<any>> = {
    'temperature_sensor': ThermometerIcon,
    'pressure_gauge': GaugeIcon,
    'exhaust_fan': FanIcon,
    'air_compressor': CompressorIcon,
    'electric_heater': HeaterIcon,
    'cooling_unit': CoolerIcon,
    'water_pump': PumpIcon,
    'control_valve': ValveIcon,
    'air_filter': FilterIcon,
    'piping_system': PipeIcon,
    'motor_drive': MotorIcon,
    'iot_sensor': SensorIcon,
    'plc_controller': ControllerIcon,
    'servo_actuator': ActuatorIcon,
    'heat_exchanger': HeatExchangerIcon,
  }
  
  return iconMap[equipmentType] || SensorIcon
}

/**
 * 根据系统状态获取状态图标
 */
export function getStatusIcon(status: string) {
  const statusMap: Record<string, React.ComponentType<any>> = {
    'running': RunningIcon,
    'stopped': StoppedIcon,
    'paused': PausedIcon,
    'error': ErrorIcon,
    'warning': WarningIcon,
    'normal': NormalIcon,
    'offline': OfflineIcon,
    'online': OnlineIcon,
    'connected': ConnectedIcon,
    'disconnected': DisconnectedIcon,
    'maintenance': MaintenanceIcon,
    'fault': FaultIcon,
  }
  
  return statusMap[status] || NormalIcon
}

export default HVACIcons