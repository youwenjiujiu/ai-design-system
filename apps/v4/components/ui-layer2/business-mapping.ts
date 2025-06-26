/**
 * HVAC Business Semantic Mapping System
 * 
 * This module provides the mapping logic between AI intents, business concepts,
 * and concrete UI components. It serves as the core translation layer.
 */

import { BusinessSemantic, businessMapping } from '../ui-layer1/design-tokens-simple'
import { AIIntentType, HVACComponent, HVACStatus, AlertSeverity, SemanticMapping } from './hvac-types'

// ===========================================
// AI Intent to Business Concept Mapping
// ===========================================

export const intentToBusinessConcept: Record<AIIntentType, string[]> = {
  temperature_check: ['温度监控', '区域温度', '温度告警'],
  equipment_status: ['设备状态', '冷水机组', '风机状态', '泵状态'],
  energy_optimization: ['能效分析', '能耗监控', '节能建议'],
  air_quality_monitor: ['空气质量', 'CO2监控', '湿度控制'],
  alert_review: ['告警管理', '故障诊断', '维护提醒'],
  system_control: ['系统控制', '参数调节', '模式切换']
}

// ===========================================
// Business Concept to Component Mapping
// ===========================================

export const businessConceptToComponent: Record<string, {
  component: HVACComponent
  variant: string
  iconKey?: string
}> = {
  // 温度相关 (完整系统概念)
  '温度监控': { component: 'temperature', variant: 'monitor', iconKey: 'thermometer' },
  '区域温度': { component: 'temperature', variant: 'zone', iconKey: 'thermometer' },
  '温度告警': { component: 'alert', variant: 'temperature', iconKey: 'alert-triangle' },
  '供水温度': { component: 'temperature', variant: 'supply_water', iconKey: 'droplets' },
  '回水温度': { component: 'temperature', variant: 'return_water', iconKey: 'droplets' },
  '冷却水温度': { component: 'temperature', variant: 'cooling_water', iconKey: 'snowflake' },
  '室外温度': { component: 'temperature', variant: 'outdoor', iconKey: 'cloud' },
  '湿球温度': { component: 'temperature', variant: 'wet_bulb', iconKey: 'droplets' },
  '露点温度': { component: 'temperature', variant: 'dew_point', iconKey: 'droplets' },
  '蒸发温度': { component: 'temperature', variant: 'evaporating', iconKey: 'thermometer' },
  '冷凝温度': { component: 'temperature', variant: 'condensing', iconKey: 'thermometer' },
  '过热度': { component: 'temperature', variant: 'superheat', iconKey: 'fire' },
  '过冷度': { component: 'temperature', variant: 'subcooling', iconKey: 'snowflake' },
  
  // 天气系统 (HVAC负荷预测关键)
  '天气预报': { component: 'temperature', variant: 'weather_forecast', iconKey: 'cloud' },
  '气象预测': { component: 'temperature', variant: 'weather_prediction', iconKey: 'cloud' },
  '负荷预测': { component: 'energy', variant: 'load_forecast', iconKey: 'trending-up' },
  
  // 设备相关 (完整设备体系)
  '设备状态': { component: 'equipment', variant: 'status', iconKey: 'settings' },
  '冷水机组': { component: 'equipment', variant: 'chiller', iconKey: 'snowflake' },
  '风机状态': { component: 'equipment', variant: 'fan', iconKey: 'fan' },
  '泵状态': { component: 'equipment', variant: 'pump', iconKey: 'droplets' },
  '冷水泵效率': { component: 'equipment', variant: 'pump_efficiency', iconKey: 'droplets' },
  '冷水机房效率': { component: 'energy', variant: 'plant_efficiency', iconKey: 'building' },
  '冷水机组效率': { component: 'equipment', variant: 'chiller_efficiency', iconKey: 'snowflake' },
  '冷却塔效率': { component: 'equipment', variant: 'tower_efficiency', iconKey: 'wind' },
  '空调机组效率': { component: 'equipment', variant: 'ahu_efficiency', iconKey: 'fan' },
  
  // 制冷系统核心设备
  '压缩机状态': { component: 'equipment', variant: 'compressor', iconKey: 'cpu' },
  '蒸发器状态': { component: 'equipment', variant: 'evaporator', iconKey: 'snowflake' },
  '冷凝器状态': { component: 'equipment', variant: 'condenser', iconKey: 'thermometer' },
  '膨胀阀状态': { component: 'equipment', variant: 'expansion_valve', iconKey: 'settings' },
  
  // 水系统设备
  '冷却水泵': { component: 'equipment', variant: 'cooling_water_pump', iconKey: 'droplets' },
  '冷冻水泵': { component: 'equipment', variant: 'chilled_water_pump', iconKey: 'droplets' },
  '补水泵': { component: 'equipment', variant: 'makeup_water_pump', iconKey: 'droplets' },
  '分水器': { component: 'equipment', variant: 'header', iconKey: 'git-branch' },
  '集水器': { component: 'equipment', variant: 'collector', iconKey: 'git-merge' },
  '定压罐': { component: 'equipment', variant: 'expansion_tank', iconKey: 'circle' },
  '水处理': { component: 'equipment', variant: 'water_treatment', iconKey: 'filter' },
  
  // 风系统设备
  '送风机': { component: 'equipment', variant: 'supply_fan', iconKey: 'wind' },
  '排风机': { component: 'equipment', variant: 'exhaust_fan', iconKey: 'wind' },
  '新风机': { component: 'equipment', variant: 'fresh_air_fan', iconKey: 'wind' },
  '风阀状态': { component: 'equipment', variant: 'damper', iconKey: 'sliders' },
  '过滤器': { component: 'equipment', variant: 'filter', iconKey: 'filter' },
  '加湿器': { component: 'equipment', variant: 'humidifier', iconKey: 'droplets' },
  '除湿机': { component: 'equipment', variant: 'dehumidifier', iconKey: 'sun' },
  
  // 控制系统设备
  'DDC控制器': { component: 'equipment', variant: 'ddc_controller', iconKey: 'cpu' },
  '传感器状态': { component: 'equipment', variant: 'sensor', iconKey: 'activity' },
  '执行器状态': { component: 'equipment', variant: 'actuator', iconKey: 'settings' },
  '变频器状态': { component: 'equipment', variant: 'vfd', iconKey: 'zap' },
  '软启动器': { component: 'equipment', variant: 'soft_starter', iconKey: 'power' },
  
  // HVAC基础监测参数 (每日必看)
  '压力监测': { component: 'equipment', variant: 'pressure_monitoring', iconKey: 'gauge' },
  '流量监测': { component: 'equipment', variant: 'flow_monitoring', iconKey: 'droplets' },
  '水质监测': { component: 'equipment', variant: 'water_quality', iconKey: 'beaker' },
  '振动监测': { component: 'equipment', variant: 'vibration_monitoring', iconKey: 'activity' },
  '噪音监测': { component: 'equipment', variant: 'noise_monitoring', iconKey: 'volume-2' },
  
  // 制冷剂系统 (制冷核心)
  '制冷剂压力': { component: 'equipment', variant: 'refrigerant_pressure', iconKey: 'gauge' },
  '制冷剂温度': { component: 'temperature', variant: 'refrigerant_temp', iconKey: 'thermometer' },
  '制冷剂泄漏': { component: 'alert', variant: 'refrigerant_leak', iconKey: 'alert-triangle' },
  '充注量': { component: 'equipment', variant: 'refrigerant_charge', iconKey: 'droplets' },
  '制冷剂类型': { component: 'equipment', variant: 'refrigerant_type', iconKey: 'droplets' },
  
  // 安全保护系统 (设备安全)
  '安全联锁': { component: 'equipment', variant: 'safety_interlock', iconKey: 'shield' },
  '紧急停机': { component: 'equipment', variant: 'emergency_stop', iconKey: 'alert-octagon' },
  '防冻保护': { component: 'equipment', variant: 'freeze_protection', iconKey: 'shield' },
  '超压保护': { component: 'equipment', variant: 'pressure_protection', iconKey: 'shield' },
  '过载保护': { component: 'equipment', variant: 'overload_protection', iconKey: 'shield' },
  
  // 工程基础 (设计施工)
  '负荷计算': { component: 'energy', variant: 'load_calculation', iconKey: 'calculator' },
  '设备选型': { component: 'equipment', variant: 'equipment_selection', iconKey: 'search' },
  '管道设计': { component: 'equipment', variant: 'piping_design', iconKey: 'git-branch' },
  '风管设计': { component: 'equipment', variant: 'ductwork_design', iconKey: 'wind' },
  '水力计算': { component: 'equipment', variant: 'hydraulic_calculation', iconKey: 'calculator' },
  '调试验收': { component: 'equipment', variant: 'commissioning', iconKey: 'check-circle' },
  
  // 运行工况 (季节运行)
  '夏季工况': { component: 'equipment', variant: 'summer_condition', iconKey: 'sun' },
  '冬季工况': { component: 'equipment', variant: 'winter_condition', iconKey: 'snowflake' },
  '过渡季': { component: 'equipment', variant: 'transition_season', iconKey: 'leaf' },
  '节假日模式': { component: 'equipment', variant: 'holiday_mode', iconKey: 'calendar' },
  '值班模式': { component: 'equipment', variant: 'duty_mode', iconKey: 'clock' },
  '启停时间': { component: 'equipment', variant: 'schedule_time', iconKey: 'clock' },
  
  // 能源相关 (完整能耗体系)
  '能效分析': { component: 'energy', variant: 'efficiency', iconKey: 'zap' },
  '能耗监控': { component: 'energy', variant: 'consumption', iconKey: 'activity' },
  '节能建议': { component: 'energy', variant: 'optimization', iconKey: 'lightbulb' },
  
  // 关键性能指标
  'COP值': { component: 'energy', variant: 'cop', iconKey: 'target' },
  'EER值': { component: 'energy', variant: 'eer', iconKey: 'target' },
  'IPLV值': { component: 'energy', variant: 'iplv', iconKey: 'target' },
  'SCOP值': { component: 'energy', variant: 'scop', iconKey: 'target' },
  'kW每吨': { component: 'energy', variant: 'kw_per_ton', iconKey: 'zap' },
  
  // 电力系统
  '电力监控': { component: 'energy', variant: 'power_monitoring', iconKey: 'zap' },
  '电压监测': { component: 'energy', variant: 'voltage', iconKey: 'zap' },
  '电流监测': { component: 'energy', variant: 'current', iconKey: 'zap' },
  '功率因数': { component: 'energy', variant: 'power_factor', iconKey: 'zap' },
  '谐波分析': { component: 'energy', variant: 'harmonics', iconKey: 'activity' },
  '负载率': { component: 'energy', variant: 'load_factor', iconKey: 'bar-chart' },
  
  // 成本分析
  '运行成本': { component: 'energy', variant: 'operating_cost', iconKey: 'dollar-sign' },
  '维护成本': { component: 'energy', variant: 'maintenance_cost', iconKey: 'dollar-sign' },
  '投资回收': { component: 'energy', variant: 'payback', iconKey: 'dollar-sign' },
  '碳排放': { component: 'energy', variant: 'carbon_emission', iconKey: 'cloud' },
  
  // 空气质量相关 (完整IAQ体系)
  '空气质量': { component: 'air_quality', variant: 'overview', iconKey: 'wind' },
  'CO2监控': { component: 'air_quality', variant: 'co2', iconKey: 'cloud' },
  '湿度控制': { component: 'air_quality', variant: 'humidity', iconKey: 'droplets' },
  
  // 室内环境参数
  '温湿度指数': { component: 'air_quality', variant: 'comfort_index', iconKey: 'thermometer' },
  'PMV指标': { component: 'air_quality', variant: 'pmv', iconKey: 'user' },
  'PPD指标': { component: 'air_quality', variant: 'ppd', iconKey: 'user' },
  '新风量': { component: 'air_quality', variant: 'fresh_air', iconKey: 'wind' },
  '换气次数': { component: 'air_quality', variant: 'air_changes', iconKey: 'rotate-cw' },
  
  // 污染物监测
  'PM2.5监测': { component: 'air_quality', variant: 'pm25', iconKey: 'cloud' },
  'PM10监测': { component: 'air_quality', variant: 'pm10', iconKey: 'cloud' },
  'VOC监测': { component: 'air_quality', variant: 'voc', iconKey: 'cloud' },
  '甲醛监测': { component: 'air_quality', variant: 'formaldehyde', iconKey: 'alert-triangle' },
  '氨气监测': { component: 'air_quality', variant: 'ammonia', iconKey: 'alert-triangle' },
  '臭氧监测': { component: 'air_quality', variant: 'ozone', iconKey: 'cloud' },
  
  // 告警相关 (完整故障管理体系)
  '告警管理': { component: 'alert', variant: 'panel', iconKey: 'bell' },
  '故障诊断': { component: 'alert', variant: 'diagnostic', iconKey: 'search' },
  '维护提醒': { component: 'alert', variant: 'maintenance', iconKey: 'wrench' },
  
  // 故障类型分类
  '高压告警': { component: 'alert', variant: 'high_pressure', iconKey: 'alert-triangle' },
  '低压告警': { component: 'alert', variant: 'low_pressure', iconKey: 'alert-triangle' },
  '高温告警': { component: 'alert', variant: 'high_temp', iconKey: 'thermometer' },
  '低温告警': { component: 'alert', variant: 'low_temp', iconKey: 'thermometer' },
  '流量异常': { component: 'alert', variant: 'flow_fault', iconKey: 'droplets' },
  '电机故障': { component: 'alert', variant: 'motor_fault', iconKey: 'zap' },
  '通信故障': { component: 'alert', variant: 'comm_fault', iconKey: 'wifi-off' },
  '传感器故障': { component: 'alert', variant: 'sensor_fault', iconKey: 'activity' },
  
  // 维护管理
  '预防性维护': { component: 'alert', variant: 'preventive_maintenance', iconKey: 'calendar' },
  '计划性维护': { component: 'alert', variant: 'planned_maintenance', iconKey: 'clock' },
  '紧急维修': { component: 'alert', variant: 'emergency_repair', iconKey: 'alert-circle' },
  '设备寿命': { component: 'alert', variant: 'equipment_life', iconKey: 'hourglass' },
  '备件管理': { component: 'alert', variant: 'spare_parts', iconKey: 'package' },
  
  // 控制相关 (完整控制策略)
  '系统控制': { component: 'equipment', variant: 'control', iconKey: 'sliders' },
  '参数调节': { component: 'equipment', variant: 'adjust', iconKey: 'settings' },
  '模式切换': { component: 'equipment', variant: 'mode', iconKey: 'toggle-left' },
  
  // 运行模式
  '制冷模式': { component: 'equipment', variant: 'cooling_mode', iconKey: 'snowflake' },
  '制热模式': { component: 'equipment', variant: 'heating_mode', iconKey: 'thermometer' },
  '通风模式': { component: 'equipment', variant: 'ventilation_mode', iconKey: 'wind' },
  '除湿模式': { component: 'equipment', variant: 'dehumid_mode', iconKey: 'sun' },
  '节能模式': { component: 'equipment', variant: 'eco_mode', iconKey: 'leaf' },
  '舒适模式': { component: 'equipment', variant: 'comfort_mode', iconKey: 'heart' },
  
  // 控制策略
  'PID控制': { component: 'equipment', variant: 'pid_control', iconKey: 'target' },
  '模糊控制': { component: 'equipment', variant: 'fuzzy_control', iconKey: 'brain' },
  '预测控制': { component: 'equipment', variant: 'predictive_control', iconKey: 'trending-up' },
  '优化控制': { component: 'equipment', variant: 'optimal_control', iconKey: 'zap' },
  '负荷预测': { component: 'equipment', variant: 'load_forecast', iconKey: 'activity' },
  '启停控制': { component: 'equipment', variant: 'start_stop', iconKey: 'power' },
  '变频调速': { component: 'equipment', variant: 'vfd_speed', iconKey: 'sliders' },
  '群控策略': { component: 'equipment', variant: 'group_control', iconKey: 'users' },
  
  // 系统操作
  '系统启动': { component: 'equipment', variant: 'system_startup', iconKey: 'play' },
  '系统停机': { component: 'equipment', variant: 'system_shutdown', iconKey: 'square' },
  '应急模式': { component: 'equipment', variant: 'emergency_mode', iconKey: 'alert-triangle' },
  '手动模式': { component: 'equipment', variant: 'manual_mode', iconKey: 'hand' },
  '自动模式': { component: 'equipment', variant: 'auto_mode', iconKey: 'cpu' },
  '远程控制': { component: 'equipment', variant: 'remote_control', iconKey: 'smartphone' },
  '就地控制': { component: 'equipment', variant: 'local_control', iconKey: 'tool' },
  
  // 高级功能 (现代HVAC必备)
  '智能诊断': { component: 'equipment', variant: 'smart_diagnosis', iconKey: 'brain' },
  '自学习算法': { component: 'equipment', variant: 'machine_learning', iconKey: 'cpu' },
  '数字孪生': { component: 'equipment', variant: 'digital_twin', iconKey: 'layers' },
  '云端监控': { component: 'equipment', variant: 'cloud_monitoring', iconKey: 'cloud' },
  '移动运维': { component: 'equipment', variant: 'mobile_ops', iconKey: 'smartphone' },
  'BIM集成': { component: 'equipment', variant: 'bim_integration', iconKey: 'box' },
  '区块链账本': { component: 'equipment', variant: 'blockchain', iconKey: 'link' }
}

// ===========================================
// Status to Semantic Token Mapping
// ===========================================

export const statusToSemantic: Record<HVACStatus, BusinessSemantic> = {
  // Temperature statuses
  'normal': 'temperature_normal',
  'warning': 'temperature_warning',
  'critical': 'temperature_critical',
  'optimal': 'temperature_normal',
  
  // Equipment statuses
  'online': 'equipment_online',
  'offline': 'equipment_offline',
  'maintenance': 'equipment_maintenance',
  'error': 'equipment_offline',
  
  // Air quality levels
  'excellent': 'equipment_online',
  'good': 'equipment_online',
  'moderate': 'temperature_warning',
  'poor': 'temperature_critical'
}

// ===========================================
// Alert Severity to Semantic Token Mapping
// ===========================================

export const alertSeverityToSemantic: Record<AlertSeverity, BusinessSemantic> = {
  'info': 'equipment_online',
  'warning': 'temperature_warning',
  'error': 'temperature_critical',
  'critical': 'equipment_offline'
}

// ===========================================
// Complete Semantic Mapping Generator
// ===========================================

export const generateSemanticMapping = (
  intent: AIIntentType,
  businessConcept: string,
  status?: HVACStatus,
  severity?: AlertSeverity
): SemanticMapping => {
  const componentMapping = businessConceptToComponent[businessConcept]
  
  if (!componentMapping) {
    throw new Error(`No component mapping found for business concept: ${businessConcept}`)
  }
  
  // Determine semantic state based on status or severity
  let semanticState: BusinessSemantic = 'confirm_action' // default
  
  if (status) {
    semanticState = statusToSemantic[status] || 'confirm_action'
  } else if (severity) {
    semanticState = alertSeverityToSemantic[severity] || 'confirm_action'
  }
  
  // Determine priority based on semantic state
  const priority = semanticState.includes('critical') || semanticState.includes('offline') 
    ? 'critical'
    : semanticState.includes('warning') 
    ? 'high'
    : semanticState.includes('normal') || semanticState.includes('online')
    ? 'medium'
    : 'low'
  
  return {
    intent,
    businessConcept,
    componentType: `${componentMapping.component}_${componentMapping.variant}`,
    semanticState,
    iconKey: componentMapping.iconKey,
    priority
  }
}

// ===========================================
// Business Context Helpers
// ===========================================

export const getBusinessSemanticColor = (semantic: BusinessSemantic): string => {
  // Get color from Layer 1 business mapping
  const standardToken = businessMapping[semantic]
  
  // This would typically resolve to actual color values
  // For now, return the token name for further processing
  return standardToken || 'primary'
}

export const getComponentVariantFromIntent = (
  intent: AIIntentType,
  context?: Record<string, any>
): { component: HVACComponent; variant: string } => {
  const concepts = intentToBusinessConcept[intent]
  
  if (!concepts || concepts.length === 0) {
    return { component: 'equipment', variant: 'default' }
  }
  
  // Use context to select the most appropriate concept
  // For now, use the first concept as default
  const primaryConcept = concepts[0]
  const mapping = businessConceptToComponent[primaryConcept]
  
  return {
    component: mapping.component,
    variant: mapping.variant
  }
}

export const getIconKeyFromMapping = (
  component: HVACComponent,
  variant: string
): string | undefined => {
  // Find the business concept that maps to this component+variant
  for (const [concept, mapping] of Object.entries(businessConceptToComponent)) {
    if (mapping.component === component && mapping.variant === variant) {
      return mapping.iconKey
    }
  }
  return undefined
}

// ===========================================
// Action/Verb Mapping (通用动作)
// ===========================================

export const actionToVariant: Record<string, string> = {
  'compare': 'comparison',        // 对比视图
  'show': 'display',             // 单值显示
  'display': 'display',          // 单值显示
  'trend': 'trend',              // 趋势图
  'optimize': 'optimization',     // 优化建议
  'alert': 'alert',              // 告警视图
  'control': 'control',          // 控制操作
  'adjust': 'adjust',            // 调节操作
  'monitor': 'monitor',          // 监控视图
  'analyze': 'analysis',         // 分析视图
  'report': 'report',            // 报告视图
  'history': 'history',          // 历史数据
  'forecast': 'forecast',        // 预测分析
  
  // HVAC专业动作
  'start': 'startup',            // 启动设备
  'stop': 'shutdown',            // 停止设备
  'restart': 'restart',          // 重启设备
  'reset': 'reset',              // 复位设备
  'test': 'testing',             // 测试设备
  'calibrate': 'calibration',    // 校准设备
  'commission': 'commissioning', // 调试设备
  'maintain': 'maintenance',     // 维护设备
  'inspect': 'inspection',       // 检查设备
  'diagnose': 'diagnosis',       // 诊断故障
  'repair': 'repair',            // 维修设备
  'replace': 'replacement',      // 更换设备
  'upgrade': 'upgrade',          // 升级设备
  'schedule': 'scheduling',      // 排程计划
  'log': 'logging',              // 记录日志
  'backup': 'backup',            // 数据备份
  'restore': 'restore',          // 数据恢复
  'export': 'export',            // 导出数据
  'import': 'import',            // 导入数据
  'calculate': 'calculation',    // 计算分析
  'simulate': 'simulation',      // 仿真分析
  'validate': 'validation',      // 验证数据
  'approve': 'approval',         // 审批流程
  'configure': 'configuration',  // 配置参数
  'sync': 'synchronization',     // 同步数据
  'measure': 'measurement',      // 测量数据
  'record': 'recording',         // 记录数据
  'notify': 'notification',      // 通知告警
  'override': 'override',        // 手动干预
  'lock': 'lock',               // 锁定设备
  'unlock': 'unlock',           // 解锁设备
  'pause': 'pause',             // 暂停运行
  'resume': 'resume'            // 恢复运行
}

export const extractAction = (text: string): string => {
  const lowerText = text.toLowerCase()
  
  // 按优先级匹配动作关键词
  const actionKeywords = [
    // 基础动作
    'compare', 'comparison', '对比', '比较',
    'trend', 'trending', '趋势', '变化',
    'optimize', 'optimization', '优化', '改善',
    'control', 'controlling', '控制', '调控',
    'adjust', 'adjustment', '调节', '调整',
    'monitor', 'monitoring', '监控', '监测',
    'analyze', 'analysis', '分析', '解析',
    'alert', 'warning', '告警', '报警',
    'report', 'reporting', '报告', '汇报',
    'history', 'historical', '历史', '过往',
    'forecast', 'prediction', '预测', '预报',
    'show', 'display', '显示', '查看',
    
    // HVAC专业动作关键词
    'start', 'startup', 'boot', '启动', '开机', '开启',
    'stop', 'shutdown', 'halt', '停止', '停机', '关闭',
    'restart', 'reboot', '重启', '重新启动',
    'reset', '复位', '重置',
    'test', 'testing', '测试', '检测',
    'calibrate', 'calibration', '校准', '标定',
    'commission', 'commissioning', '调试', '投运',
    'maintain', 'maintenance', '维护', '保养',
    'inspect', 'inspection', '检查', '巡检',
    'diagnose', 'diagnosis', 'diagnostic', '诊断', '故障诊断',
    'repair', 'fix', '维修', '修理',
    'replace', 'replacement', 'change', '更换', '替换',
    'upgrade', 'update', '升级', '更新',
    'schedule', 'scheduling', '排程', '计划', '定时',
    'log', 'logging', '记录', '日志',
    'backup', '备份',
    'restore', 'recovery', '恢复', '还原',
    'export', '导出', '输出',
    'import', '导入', '输入',
    'calculate', 'calculation', 'compute', '计算',
    'simulate', 'simulation', '仿真', '模拟',
    'validate', 'validation', 'verify', '验证', '校验',
    'approve', 'approval', '审批', '批准',
    'configure', 'configuration', 'setup', '配置', '设置',
    'sync', 'synchronize', 'synchronization', '同步',
    'measure', 'measurement', '测量', '计量',
    'record', 'recording', '记录', '录制',
    'notify', 'notification', '通知', '提醒',
    'override', 'manual', '手动', '干预', '覆盖',
    'lock', 'locking', '锁定', '锁住',
    'unlock', 'unlocking', '解锁', '解除',
    'pause', 'suspend', '暂停', '挂起',
    'resume', 'continue', '恢复', '继续'
  ]
  
  for (const keyword of actionKeywords) {
    if (lowerText.includes(keyword)) {
      // 映射到标准动作 - 基础动作
      if (['compare', 'comparison', '对比', '比较'].includes(keyword)) return 'compare'
      if (['trend', 'trending', '趋势', '变化'].includes(keyword)) return 'trend'
      if (['optimize', 'optimization', '优化', '改善'].includes(keyword)) return 'optimize'
      if (['control', 'controlling', '控制', '调控'].includes(keyword)) return 'control'
      if (['adjust', 'adjustment', '调节', '调整'].includes(keyword)) return 'adjust'
      if (['monitor', 'monitoring', '监控', '监测'].includes(keyword)) return 'monitor'
      if (['analyze', 'analysis', '分析', '解析'].includes(keyword)) return 'analyze'
      if (['alert', 'warning', '告警', '报警'].includes(keyword)) return 'alert'
      if (['report', 'reporting', '报告', '汇报'].includes(keyword)) return 'report'
      if (['history', 'historical', '历史', '过往'].includes(keyword)) return 'history'
      if (['forecast', 'prediction', '预测', '预报'].includes(keyword)) return 'forecast'
      if (['show', 'display', '显示', '查看'].includes(keyword)) return 'show'
      
      // 映射到标准动作 - HVAC专业动作
      if (['start', 'startup', 'boot', '启动', '开机', '开启'].includes(keyword)) return 'start'
      if (['stop', 'shutdown', 'halt', '停止', '停机', '关闭'].includes(keyword)) return 'stop'
      if (['restart', 'reboot', '重启', '重新启动'].includes(keyword)) return 'restart'
      if (['reset', '复位', '重置'].includes(keyword)) return 'reset'
      if (['test', 'testing', '测试', '检测'].includes(keyword)) return 'test'
      if (['calibrate', 'calibration', '校准', '标定'].includes(keyword)) return 'calibrate'
      if (['commission', 'commissioning', '调试', '投运'].includes(keyword)) return 'commission'
      if (['maintain', 'maintenance', '维护', '保养'].includes(keyword)) return 'maintain'
      if (['inspect', 'inspection', '检查', '巡检'].includes(keyword)) return 'inspect'
      if (['diagnose', 'diagnosis', 'diagnostic', '诊断', '故障诊断'].includes(keyword)) return 'diagnose'
      if (['repair', 'fix', '维修', '修理'].includes(keyword)) return 'repair'
      if (['replace', 'replacement', 'change', '更换', '替换'].includes(keyword)) return 'replace'
      if (['upgrade', 'update', '升级', '更新'].includes(keyword)) return 'upgrade'
      if (['schedule', 'scheduling', '排程', '计划', '定时'].includes(keyword)) return 'schedule'
      if (['log', 'logging', '记录', '日志'].includes(keyword)) return 'log'
      if (['backup', '备份'].includes(keyword)) return 'backup'
      if (['restore', 'recovery', '恢复', '还原'].includes(keyword)) return 'restore'
      if (['export', '导出', '输出'].includes(keyword)) return 'export'
      if (['import', '导入', '输入'].includes(keyword)) return 'import'
      if (['calculate', 'calculation', 'compute', '计算'].includes(keyword)) return 'calculate'
      if (['simulate', 'simulation', '仿真', '模拟'].includes(keyword)) return 'simulate'
      if (['validate', 'validation', 'verify', '验证', '校验'].includes(keyword)) return 'validate'
      if (['approve', 'approval', '审批', '批准'].includes(keyword)) return 'approve'
      if (['configure', 'configuration', 'setup', '配置', '设置'].includes(keyword)) return 'configure'
      if (['sync', 'synchronize', 'synchronization', '同步'].includes(keyword)) return 'sync'
      if (['measure', 'measurement', '测量', '计量'].includes(keyword)) return 'measure'
      if (['record', 'recording', '记录', '录制'].includes(keyword)) return 'record'
      if (['notify', 'notification', '通知', '提醒'].includes(keyword)) return 'notify'
      if (['override', 'manual', '手动', '干预', '覆盖'].includes(keyword)) return 'override'
      if (['lock', 'locking', '锁定', '锁住'].includes(keyword)) return 'lock'
      if (['unlock', 'unlocking', '解锁', '解除'].includes(keyword)) return 'unlock'
      if (['pause', 'suspend', '暂停', '挂起'].includes(keyword)) return 'pause'
      if (['resume', 'continue', '恢复', '继续'].includes(keyword)) return 'resume'
    }
  }
  
  // 默认动作
  return 'show'
}

// ===========================================
// Enhanced Component Mapping with Actions
// ===========================================

export const getComponentWithAction = (
  businessConcept: string, 
  action: string = 'show'
): { component: HVACComponent; variant: string; iconKey?: string } => {
  const baseMapping = businessConceptToComponent[businessConcept]
  
  if (!baseMapping) {
    throw new Error(`No component mapping found for business concept: ${businessConcept}`)
  }
  
  const actionVariant = actionToVariant[action] || 'display'
  
  // 组合 concept + action 生成完整的 variant
  const fullVariant = action === 'show' 
    ? baseMapping.variant  // 默认显示不加后缀
    : `${baseMapping.variant}_${actionVariant}`
  
  // 根据动作调整图标
  const getActionIcon = (action: string, defaultIcon?: string): string | undefined => {
    switch (action) {
      case 'compare': return 'bar-chart'
      case 'trend': return 'trending-up'
      case 'optimize': return 'zap'
      case 'control': return 'sliders'
      case 'adjust': return 'settings'
      case 'monitor': return 'eye'
      case 'analyze': return 'search'
      case 'alert': return 'alert-triangle'
      case 'report': return 'file-text'
      case 'history': return 'clock'
      case 'forecast': return 'activity'
      default: return defaultIcon
    }
  }
  
  return {
    component: baseMapping.component,
    variant: fullVariant,
    iconKey: getActionIcon(action, baseMapping.iconKey)
  }
}

// ===========================================
// Natural Language Processing Helpers
// ===========================================

export const extractBusinessConceptFromText = (text: string): string[] => {
  const concepts: string[] = []
  const lowerText = text.toLowerCase()
  
  // HVAC 专业术语映射 - 完整术语优先
  const keywordToConcept: Record<string, string> = {
    // 完整的专业术语（优先匹配）
    'chpl efficiency': '冷水机房效率',
    'chilled water plant efficiency': '冷水机房效率',
    'cwp efficiency': '冷水泵效率', 
    'chilled water pump efficiency': '冷水泵效率',
    'chiller efficiency': '冷水机组效率',
    'cooling tower efficiency': '冷却塔效率',
    'ahu efficiency': '空调机组效率',
    
    // 温度系统术语
    'supply water temperature': '供水温度',
    'return water temperature': '回水温度',
    'cooling water temperature': '冷却水温度',
    'outdoor temperature': '室外温度',
    'wet bulb temperature': '湿球温度',
    'dew point temperature': '露点温度',
    'evaporating temperature': '蒸发温度',
    'condensing temperature': '冷凝温度',
    'superheat': '过热度',
    'subcooling': '过冷度',
    
    // 制冷系统术语
    'compressor status': '压缩机状态',
    'evaporator status': '蒸发器状态',
    'condenser status': '冷凝器状态',
    'expansion valve': '膨胀阀状态',
    
    // 水系统术语
    'cooling water pump': '冷却水泵',
    'chilled water pump': '冷冻水泵',
    'makeup water pump': '补水泵',
    'header': '分水器',
    'collector': '集水器',
    'expansion tank': '定压罐',
    'water treatment': '水处理',
    
    // 风系统术语
    'supply fan': '送风机',
    'exhaust fan': '排风机',
    'fresh air fan': '新风机',
    'damper': '风阀状态',
    'filter': '过滤器',
    'humidifier': '加湿器',
    'dehumidifier': '除湿机',
    
    // 控制系统术语
    'ddc controller': 'DDC控制器',
    'sensor status': '传感器状态',
    'actuator status': '执行器状态',
    'vfd status': '变频器状态',
    'soft starter': '软启动器',
    
    // 性能指标术语
    'cop value': 'COP值',
    'eer value': 'EER值',
    'iplv value': 'IPLV值',
    'scop value': 'SCOP值',
    'kw per ton': 'kW每吨',
    'coefficient of performance': 'COP值',
    'energy efficiency ratio': 'EER值',
    
    // 电力系统术语
    'power monitoring': '电力监控',
    'voltage monitoring': '电压监测',
    'current monitoring': '电流监测',
    'power factor': '功率因数',
    'harmonics analysis': '谐波分析',
    'load factor': '负载率',
    
    // 成本分析术语
    'operating cost': '运行成本',
    'maintenance cost': '维护成本',
    'payback analysis': '投资回收',
    'carbon emission': '碳排放',
    
    // 室内环境术语
    'comfort index': '温湿度指数',
    'pmv index': 'PMV指标',
    'ppd index': 'PPD指标',
    'fresh air volume': '新风量',
    'air changes per hour': '换气次数',
    
    // 污染物监测术语
    'pm2.5 monitoring': 'PM2.5监测',
    'pm10 monitoring': 'PM10监测',
    'voc monitoring': 'VOC监测',
    'formaldehyde monitoring': '甲醛监测',
    'ammonia monitoring': '氨气监测',
    'ozone monitoring': '臭氧监测',
    
    // 故障类型术语
    'high pressure alarm': '高压告警',
    'low pressure alarm': '低压告警',
    'high temperature alarm': '高温告警',
    'low temperature alarm': '低温告警',
    'flow fault': '流量异常',
    'motor fault': '电机故障',
    'communication fault': '通信故障',
    'sensor fault': '传感器故障',
    
    // 维护管理术语
    'preventive maintenance': '预防性维护',
    'planned maintenance': '计划性维护',
    'emergency repair': '紧急维修',
    'equipment life': '设备寿命',
    'spare parts management': '备件管理',
    
    // 运行模式术语
    'cooling mode': '制冷模式',
    'heating mode': '制热模式',
    'ventilation mode': '通风模式',
    'dehumidification mode': '除湿模式',
    'energy saving mode': '节能模式',
    'comfort mode': '舒适模式',
    
    // 控制策略术语
    'pid control': 'PID控制',
    'fuzzy control': '模糊控制',
    'predictive control': '预测控制',
    'optimal control': '优化控制',
    'load forecast': '负荷预测',
    'start stop control': '启停控制',
    'vfd speed control': '变频调速',
    'group control': '群控策略',
    
    // 系统操作术语
    'system startup': '系统启动',
    'system shutdown': '系统停机',
    'emergency mode': '应急模式',
    'manual mode': '手动模式',
    'automatic mode': '自动模式',
    'remote control': '远程控制',
    'local control': '就地控制',
    
    // 高级功能术语
    'smart diagnosis': '智能诊断',
    'machine learning': '自学习算法',
    'digital twin': '数字孪生',
    'cloud monitoring': '云端监控',
    'mobile operation': '移动运维',
    'bim integration': 'BIM集成',
    'blockchain ledger': '区块链账本',
    
    // 天气系统术语 (HVAC关键)
    'weather forecast': '天气预报',
    'weather prediction': '气象预测',
    'load forecast': '负荷预测',
    'weather data': '天气预报',
    'meteorological forecast': '气象预测',
    
    // HVAC基础监测术语
    'pressure monitoring': '压力监测',
    'flow monitoring': '流量监测',
    'water quality monitoring': '水质监测',
    'vibration monitoring': '振动监测',
    'noise monitoring': '噪音监测',
    'pressure reading': '压力监测',
    'flow rate': '流量监测',
    'water quality': '水质监测',
    'vibration analysis': '振动监测',
    'noise level': '噪音监测',
    
    // 制冷剂系统术语
    'refrigerant pressure': '制冷剂压力',
    'refrigerant temperature': '制冷剂温度',
    'refrigerant leak': '制冷剂泄漏',
    'refrigerant charge': '充注量',
    'refrigerant type': '制冷剂类型',
    'freon pressure': '制冷剂压力',
    'coolant temperature': '制冷剂温度',
    'gas leak': '制冷剂泄漏',
    'charge level': '充注量',
    
    // 安全保护术语
    'safety interlock': '安全联锁',
    'emergency stop': '紧急停机',
    'freeze protection': '防冻保护',
    'pressure protection': '超压保护',
    'overload protection': '过载保护',
    'safety system': '安全联锁',
    'emergency shutdown': '紧急停机',
    'anti freeze': '防冻保护',
    'overpressure protection': '超压保护',
    'motor protection': '过载保护',
    
    // 工程基础术语
    'load calculation': '负荷计算',
    'equipment selection': '设备选型',
    'piping design': '管道设计',
    'ductwork design': '风管设计',
    'hydraulic calculation': '水力计算',
    'commissioning': '调试验收',
    'load analysis': '负荷计算',
    'equipment sizing': '设备选型',
    'pipe design': '管道设计',
    'duct design': '风管设计',
    'hydraulic analysis': '水力计算',
    'system commissioning': '调试验收',
    
    // 运行工况术语
    'summer condition': '夏季工况',
    'winter condition': '冬季工况',
    'transition season': '过渡季',
    'holiday mode': '节假日模式',
    'duty mode': '值班模式',
    'schedule time': '启停时间',
    'summer operation': '夏季工况',
    'winter operation': '冬季工况',
    'spring autumn': '过渡季',
    'holiday schedule': '节假日模式',
    'standby mode': '值班模式',
    'operating schedule': '启停时间',
    
    // 基础术语（次要匹配）
    '温度监控': '温度监控',
    'temperature monitoring': '温度监控',
    '冷水机组': '冷水机组',
    'chiller status': '冷水机组',
    '设备状态': '设备状态',
    'equipment status': '设备状态',
    '空气质量': '空气质量',
    'air quality': '空气质量',
    '告警管理': '告警管理',
    'alert management': '告警管理'
  }
  
  for (const [keyword, concept] of Object.entries(keywordToConcept)) {
    if (lowerText.includes(keyword)) {
      concepts.push(concept)
    }
  }
  
  return concepts
}

export const mapAIResponseToComponents = (
  intent: AIIntentType,
  responseText: string,
  context?: Record<string, any>
): SemanticMapping[] => {
  // Extract business concepts and actions from AI response
  const extractedConcepts = extractBusinessConceptFromText(responseText)
  const extractedAction = extractAction(responseText)
  
  // Get predefined concepts for this intent type
  const predefinedConcepts = intentToBusinessConcept[intent] || []
  
  // Combine and deduplicate concepts
  const allConcepts = [...new Set([...extractedConcepts, ...predefinedConcepts])]
  
  // Generate semantic mappings for each concept with action
  return allConcepts.map(concept => {
    const componentMapping = getComponentWithAction(concept, extractedAction)
    
    return generateSemanticMapping(
      intent, 
      concept, 
      context?.status, 
      context?.severity,
      extractedAction,
      componentMapping
    )
  })
}

// Enhanced semantic mapping generator with action support
export const generateSemanticMappingWithAction = (
  intent: AIIntentType,
  businessConcept: string,
  action: string = 'show',
  status?: HVACStatus,
  severity?: AlertSeverity
): SemanticMapping => {
  const componentMapping = getComponentWithAction(businessConcept, action)
  
  // Determine semantic state based on status or severity
  let semanticState: BusinessSemantic = 'confirm_action' // default
  
  if (status) {
    semanticState = statusToSemantic[status] || 'confirm_action'
  } else if (severity) {
    semanticState = alertSeverityToSemantic[severity] || 'confirm_action'
  }
  
  // Determine priority based on semantic state and action
  const getPriority = (semantic: BusinessSemantic, action: string) => {
    if (semantic.includes('critical') || semantic.includes('offline')) return 'critical'
    if (semantic.includes('warning') || action === 'alert') return 'high'
    if (action === 'optimize' || action === 'control') return 'high'
    if (semantic.includes('normal') || semantic.includes('online')) return 'medium'
    return 'low'
  }
  
  return {
    intent,
    businessConcept,
    componentType: componentMapping.variant,
    semanticState,
    iconKey: componentMapping.iconKey,
    priority: getPriority(semanticState, action)
  }
}

// ===========================================
// Export all mapping utilities
// ===========================================

export const businessMappingUtils = {
  generateSemanticMapping,
  generateSemanticMappingWithAction,
  getBusinessSemanticColor,
  getComponentVariantFromIntent,
  getComponentWithAction,
  getIconKeyFromMapping,
  extractBusinessConceptFromText,
  extractAction,
  mapAIResponseToComponents,
  intentToBusinessConcept,
  businessConceptToComponent,
  actionToVariant,
  statusToSemantic,
  alertSeverityToSemantic
} as const