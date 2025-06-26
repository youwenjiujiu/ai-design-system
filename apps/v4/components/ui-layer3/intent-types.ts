/**
 * Layer 3: AI意图类型定义
 * 
 * 定义用户意图的完整类型系统
 */

// ===========================================
// 基础意图类型
// ===========================================

export type UserIntent = 
  | 'show_data'           // 显示数据
  | 'analyze_performance' // 分析性能  
  | 'compare_metrics'     // 对比指标
  | 'monitor_status'      // 监控状态
  | 'control_equipment'   // 控制设备
  | 'troubleshoot'        // 故障排查
  | 'optimize_system'     // 系统优化
  | 'generate_report'     // 生成报告
  | 'predict_trend'       // 趋势预测
  | 'explain_concept'     // 概念解释

// ===========================================
// 意图上下文
// ===========================================

export interface IntentContext {
  /** 用户原始输入 */
  userInput: string
  /** 识别的意图 */
  intent: UserIntent
  /** 置信度 0-1 */
  confidence: number
  /** 提取的实体 */
  entities: Entity[]
  /** 时间范围 */
  timeRange?: TimeRange
  /** 目标对象 */
  targets?: string[]
  /** 对话历史 */
  conversationHistory?: ConversationTurn[]
  /** 用户偏好 */
  userPreferences?: UserPreferences
}

// ===========================================
// 实体识别
// ===========================================

export interface Entity {
  /** 实体类型 */
  type: EntityType
  /** 实体值 */
  value: string
  /** 在原文中的位置 */
  start: number
  end: number
  /** 置信度 */
  confidence: number
  /** 标准化值 */
  normalizedValue?: any
}

export type EntityType =
  | 'device'          // 设备：冷水机组、风机、泵
  | 'metric'          // 指标：温度、压力、流量、效率
  | 'location'        // 位置：机房、楼层、区域
  | 'time'            // 时间：昨天、本周、3小时前
  | 'value'           // 数值：80%、25度、100L/min
  | 'action'          // 动作：启动、停止、调节
  | 'status'          // 状态：正常、故障、维护
  | 'parameter'       // 参数：设定值、阈值、范围

// ===========================================
// 时间范围
// ===========================================

export interface TimeRange {
  start: Date
  end: Date
  type: 'realtime' | 'historical' | 'future'
  granularity: 'minute' | 'hour' | 'day' | 'week' | 'month'
}

// ===========================================
// 对话管理
// ===========================================

export interface ConversationTurn {
  id: string
  timestamp: Date
  userInput: string
  aiResponse: AIResponse
  context: IntentContext
}

export interface AIResponse {
  /** 响应类型 */
  type: 'component' | 'text' | 'action' | 'clarification'
  /** 响应内容 */
  content: any
  /** 生成的组件配置 */
  componentConfig?: ComponentComposition
  /** 文本回复 */
  textResponse?: string
  /** 需要执行的动作 */
  actions?: Action[]
  /** 澄清问题 */
  clarificationQuestions?: string[]
}

// ===========================================
// 组件组合配置
// ===========================================

export interface ComponentComposition {
  /** 主要组件 */
  primaryComponent: ComponentSpec
  /** 支持组件 */
  supportingComponents?: ComponentSpec[]
  /** 布局配置 */
  layout: LayoutConfig
  /** 数据源配置 */
  dataConfig: DataConfig
  /** 交互配置 */
  interactionConfig?: InteractionConfig
}

export interface ComponentSpec {
  /** 组件类型 */
  type: string
  /** 组件属性 */
  props: Record<string, any>
  /** 数据查询 */
  dataQuery?: DataQuery
  /** 显示标题 */
  title?: string
  /** 描述信息 */
  description?: string
}

export interface LayoutConfig {
  /** 布局类型 */
  type: 'single' | 'grid' | 'dashboard' | 'comparison'
  /** 列数 */
  columns?: number
  /** 间距 */
  gap?: number
  /** 尺寸 */
  size: 'sm' | 'md' | 'lg'
  /** 主题 */
  theme: 'light' | 'dark'
}

export interface DataConfig {
  /** 数据源 */
  source: string
  /** 查询参数 */
  query: DataQuery
  /** 刷新间隔 */
  refreshInterval?: number
  /** 缓存策略 */
  caching?: CacheConfig
}

export interface DataQuery {
  /** 设备ID */
  deviceIds?: string[]
  /** 指标类型 */
  metrics?: string[]
  /** 时间范围 */
  timeRange: TimeRange
  /** 聚合方式 */
  aggregation?: 'avg' | 'max' | 'min' | 'sum' | 'count'
  /** 过滤条件 */
  filters?: Record<string, any>
}

export interface InteractionConfig {
  /** 是否可点击 */
  clickable?: boolean
  /** 悬停效果 */
  hoverable?: boolean
  /** 缩放功能 */
  zoomable?: boolean
  /** 联动配置 */
  linkage?: LinkageConfig
}

export interface LinkageConfig {
  /** 启用联动 */
  enabled: boolean
  /** 联动类型 */
  type: 'selection' | 'filter' | 'drill_down'
  /** 目标组件 */
  targets?: string[]
}

// ===========================================
// 动作定义
// ===========================================

export interface Action {
  /** 动作类型 */
  type: ActionType
  /** 目标设备 */
  target?: string
  /** 动作参数 */
  parameters?: Record<string, any>
  /** 确认要求 */
  requiresConfirmation?: boolean
  /** 预计影响 */
  expectedImpact?: string
}

export type ActionType =
  | 'start_device'      // 启动设备
  | 'stop_device'       // 停止设备
  | 'adjust_parameter'  // 调节参数
  | 'reset_alarm'       // 复位告警
  | 'schedule_maintenance' // 安排维护
  | 'export_data'       // 导出数据
  | 'generate_report'   // 生成报告

// ===========================================
// 用户偏好
// ===========================================

export interface UserPreferences {
  /** 首选主题 */
  preferredTheme: 'light' | 'dark' | 'auto'
  /** 首选语言 */
  language: 'zh' | 'en'
  /** 常用设备 */
  favoriteDevices?: string[]
  /** 关注指标 */
  favoriteMetrics?: string[]
  /** 默认时间范围 */
  defaultTimeRange?: TimeRange
  /** 通知设置 */
  notifications?: NotificationPreferences
}

export interface NotificationPreferences {
  /** 启用通知 */
  enabled: boolean
  /** 告警阈值 */
  alertThresholds?: Record<string, number>
  /** 通知渠道 */
  channels: ('email' | 'sms' | 'push')[]
}

// ===========================================
// 缓存配置
// ===========================================

export interface CacheConfig {
  /** 缓存时长(秒) */
  ttl: number
  /** 缓存键 */
  key?: string
  /** 是否启用 */
  enabled: boolean
}

// ===========================================
// 意图识别结果
// ===========================================

export interface IntentRecognitionResult {
  /** 识别的意图 */
  intent: UserIntent
  /** 置信度 */
  confidence: number
  /** 提取的实体 */
  entities: Entity[]
  /** 可能的意图列表 */
  alternativeIntents?: Array<{
    intent: UserIntent
    confidence: number
  }>
  /** 处理状态 */
  status: 'success' | 'ambiguous' | 'failed'
  /** 错误信息 */
  error?: string
}

// ===========================================
// 导出类型集合
// ===========================================

export type {
  UserIntent,
  IntentContext,
  Entity,
  EntityType,
  TimeRange,
  ConversationTurn,
  AIResponse,
  ComponentComposition,
  ComponentSpec,
  LayoutConfig,
  DataConfig,
  DataQuery,
  InteractionConfig,
  LinkageConfig,
  Action,
  ActionType,
  UserPreferences,
  NotificationPreferences,
  CacheConfig,
  IntentRecognitionResult
}