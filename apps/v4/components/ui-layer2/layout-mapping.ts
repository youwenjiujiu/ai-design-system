/**
 * HVAC 业务语义布局映射系统 - Layer 2
 * 
 * 为每个HVAC业务语义定义对应的布局规则
 * 结合 Layer 1 的布局设计令牌和 Figma 观察到的布局模式
 */

import { LayoutPosition, WidgetVariant, CardVariant } from '../ui-layer1/design-tokens-simple'

// ===========================================
// 1. 布局模式定义
// ===========================================

export type LayoutPattern = 
  | 'title1Line'          // 1行标题布局 (Medium+Small)
  | 'title2Lines'         // 2行标题布局 (Big+Medium 或 Medium+Small)
  | 'title3Lines'         // 3行标题布局 (Small+Big+Mini)
  | 'titlePlaceholder'    // 占位符标题
  | 'verticalList'        // 垂直列表
  | 'horizontalList'      // 水平列表
  | 'buttonControl'       // 按钮控制
  | 'sliderControl'       // 滑块控制
  | 'statusIndicator'     // 状态指示器
  | 'graphDisplay'        // 图表显示
  | 'alertBanner'         // 告警横幅
  | 'dataGrid'            // 数据网格
  | 'timelineFeed'        // 时间线动态
  | 'cardContainer'       // 卡片容器

export type DataDensity = 'minimal' | 'compact' | 'comfortable' | 'dense'
export type InteractionType = 'readonly' | 'interactive' | 'control' | 'navigation'
export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low'

// ===========================================
// 2. 布局配置接口
// ===========================================

export interface LayoutConfiguration {
  // 基础布局
  pattern: LayoutPattern
  position: LayoutPosition
  container: 'widget' | 'card' | 'fullWidth'
  variant?: WidgetVariant | CardVariant
  
  // 文本层级配置 (针对title类布局)
  textHierarchy?: {
    primary: 'small' | 'medium' | 'big'      // 主标题大小
    secondary: 'mini' | 'small' | 'medium'   // 次标题大小
    tertiary?: 'mini' | 'small'              // 第三行大小 (可选)
  }
  
  // 数据展示配置
  dataDensity: DataDensity
  showUnit?: boolean
  showTrend?: boolean
  showStatus?: boolean
  
  // 交互配置
  interactionType: InteractionType
  priority: PriorityLevel
  
  // 响应式配置
  responsive?: {
    mobile?: Partial<LayoutConfiguration>
    tablet?: Partial<LayoutConfiguration>
  }
}

// ===========================================
// 3. HVAC 业务语义布局映射
// ===========================================

export const hvacBusinessLayoutMapping: Record<string, LayoutConfiguration> = {
  // ==================== 温度监控系统 ====================
  '冷水机房温度': {
    pattern: 'title3Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '冷却塔温度': {
    pattern: 'title3Lines',
    position: 'rightTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '空调送风温度': {
    pattern: 'title2Lines',
    position: 'leftBottom',
    container: 'widget',
    textHierarchy: { primary: 'medium', secondary: 'small' },
    dataDensity: 'compact',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  '回风温度': {
    pattern: 'title2Lines',
    position: 'rightBottom',
    container: 'widget',
    textHierarchy: { primary: 'medium', secondary: 'small' },
    dataDensity: 'compact',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  // ==================== 设备状态监控 ====================
  '冷水机状态': {
    pattern: 'title2Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'critical'
  },
  
  '水泵运行状态': {
    pattern: 'title1Line',
    position: 'rightTop',
    container: 'widget',
    textHierarchy: { primary: 'medium', secondary: 'small' },
    dataDensity: 'compact',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'high'
  },
  
  '风机运行状态': {
    pattern: 'statusIndicator',
    position: 'leftBottom',
    container: 'widget',
    dataDensity: 'minimal',
    showStatus: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  '阀门开度': {
    pattern: 'sliderControl',
    position: 'rightBottom',
    container: 'widget',
    dataDensity: 'comfortable',
    showUnit: true,
    interactionType: 'control',
    priority: 'medium'
  },
  
  // ==================== 能效监控 ====================
  '系统总功率': {
    pattern: 'title3Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '冷水机效率': {
    pattern: 'title3Lines',
    position: 'rightTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '系统COP值': {
    pattern: 'title2Lines',
    position: 'leftBottom',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  // ==================== 压力监控 ====================
  '冷水供水压力': {
    pattern: 'title3Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '冷水回水压力': {
    pattern: 'title3Lines',
    position: 'rightTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  // ==================== 流量监控 ====================
  '冷水流量': {
    pattern: 'title2Lines',
    position: 'leftBottom',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  '冷却水流量': {
    pattern: 'title2Lines',
    position: 'rightBottom',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  // ==================== 空气质量监控 ====================
  'CO2浓度': {
    pattern: 'title3Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'small', secondary: 'big', tertiary: 'mini' },
    dataDensity: 'comfortable',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'high'
  },
  
  '湿度监控': {
    pattern: 'title2Lines',
    position: 'rightTop',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  'PM2.5监控': {
    pattern: 'title2Lines',
    position: 'leftBottom',
    container: 'widget',
    textHierarchy: { primary: 'medium', secondary: 'small' },
    dataDensity: 'compact',
    showUnit: true,
    showStatus: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  // ==================== 控制操作 ====================
  '启动冷水机': {
    pattern: 'buttonControl',
    position: 'rightBottom',
    container: 'widget',
    dataDensity: 'minimal',
    interactionType: 'control',
    priority: 'critical'
  },
  
  '停止冷水机': {
    pattern: 'buttonControl',
    position: 'leftBottom',
    container: 'widget',
    dataDensity: 'minimal',
    interactionType: 'control',
    priority: 'critical'
  },
  
  '调节设定温度': {
    pattern: 'sliderControl',
    position: 'rightTop',
    container: 'widget',
    dataDensity: 'comfortable',
    showUnit: true,
    interactionType: 'control',
    priority: 'high'
  },
  
  // ==================== 告警和故障 ====================
  '高温告警': {
    pattern: 'alertBanner',
    position: 'leftTop',
    container: 'fullWidth',
    dataDensity: 'comfortable',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'critical'
  },
  
  '设备故障': {
    pattern: 'alertBanner',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'dense',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'critical'
  },
  
  '维护提醒': {
    pattern: 'statusIndicator',
    position: 'rightBottom',
    container: 'widget',
    dataDensity: 'minimal',
    showStatus: true,
    interactionType: 'navigation',
    priority: 'low'
  },
  
  // ==================== 历史数据和趋势 ====================
  '温度历史趋势': {
    pattern: 'graphDisplay',
    position: 'leftTop',
    container: 'card',
    variant: 'single',
    dataDensity: 'dense',
    showTrend: true,
    interactionType: 'interactive',
    priority: 'medium'
  },
  
  '能耗历史': {
    pattern: 'timelineFeed',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'compact',
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  // ==================== 设备列表和管理 ====================
  '设备清单': {
    pattern: 'verticalList',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'compact',
    showStatus: true,
    interactionType: 'navigation',
    priority: 'medium'
  },
  
  '运行参数': {
    pattern: 'dataGrid',
    position: 'leftTop',
    container: 'card',
    variant: 'single',
    dataDensity: 'dense',
    interactionType: 'readonly',
    priority: 'low'
  },
  
  // ==================== 天气和环境 ====================
  '室外温度': {
    pattern: 'title2Lines',
    position: 'leftTop',
    container: 'widget',
    textHierarchy: { primary: 'big', secondary: 'medium' },
    dataDensity: 'comfortable',
    showUnit: true,
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  '天气预报': {
    pattern: 'horizontalList',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'compact',
    showTrend: true,
    interactionType: 'readonly',
    priority: 'low'
  },
  
  // ==================== AI优化和预测 ====================
  'AI优化建议': {
    pattern: 'cardContainer',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'comfortable',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'high'
  },
  
  '能耗预测': {
    pattern: 'graphDisplay',
    position: 'leftTop',
    container: 'card',
    variant: 'single',
    dataDensity: 'comfortable',
    showTrend: true,
    interactionType: 'readonly',
    priority: 'medium'
  },
  
  '故障预警': {
    pattern: 'timelineFeed',
    position: 'leftTop',
    container: 'card',
    variant: 'titleList',
    dataDensity: 'compact',
    showStatus: true,
    interactionType: 'interactive',
    priority: 'high'
  }
}

// ===========================================
// 4. 布局规则引擎
// ===========================================

/**
 * 根据业务语义获取布局配置
 */
export const getBusinessLayoutConfig = (businessSemantic: string): LayoutConfiguration | null => {
  return hvacBusinessLayoutMapping[businessSemantic] || null
}

/**
 * 根据数据类型和优先级推断布局
 */
export const inferLayoutFromContext = (
  dataType: 'numeric' | 'status' | 'list' | 'control' | 'chart',
  priority: PriorityLevel,
  interactionType: InteractionType
): Partial<LayoutConfiguration> => {
  const baseConfig: Partial<LayoutConfiguration> = {
    priority,
    interactionType
  }
  
  switch (dataType) {
    case 'numeric':
      return {
        ...baseConfig,
        pattern: priority === 'critical' || priority === 'high' ? 'title3Lines' : 'title2Lines',
        position: 'leftTop',
        container: 'widget',
        dataDensity: 'comfortable'
      }
      
    case 'status':
      return {
        ...baseConfig,
        pattern: priority === 'critical' ? 'alertBanner' : 'statusIndicator',
        position: priority === 'critical' ? 'leftTop' : 'rightTop',
        container: priority === 'critical' ? 'fullWidth' : 'widget',
        dataDensity: 'compact'
      }
      
    case 'control':
      return {
        ...baseConfig,
        pattern: 'buttonControl',
        position: 'rightBottom',
        container: 'widget',
        dataDensity: 'minimal'
      }
      
    case 'list':
      return {
        ...baseConfig,
        pattern: 'verticalList',
        position: 'leftTop',
        container: 'card',
        dataDensity: 'compact'
      }
      
    case 'chart':
      return {
        ...baseConfig,
        pattern: 'graphDisplay',
        position: 'leftTop',
        container: 'card',
        dataDensity: 'dense'
      }
      
    default:
      return baseConfig
  }
}

/**
 * 生成响应式布局配置
 */
export const getResponsiveLayoutConfig = (
  baseConfig: LayoutConfiguration,
  breakpoint: 'mobile' | 'tablet' | 'desktop'
): LayoutConfiguration => {
  if (breakpoint === 'mobile') {
    // 移动端优化：单列布局，简化显示
    return {
      ...baseConfig,
      position: 'leftTop',
      dataDensity: 'compact',
      showTrend: false,
      container: baseConfig.container === 'fullWidth' ? 'fullWidth' : 'widget'
    }
  }
  
  if (breakpoint === 'tablet') {
    // 平板端优化：适中密度
    return {
      ...baseConfig,
      dataDensity: baseConfig.dataDensity === 'dense' ? 'compact' : baseConfig.dataDensity
    }
  }
  
  // 桌面端保持原始配置
  return baseConfig
}

// ===========================================
// 5. 布局验证和工具
// ===========================================

/**
 * 验证布局配置是否有效
 */
export const validateLayoutConfig = (config: LayoutConfiguration): boolean => {
  // 验证必要字段
  if (!config.pattern || !config.position || !config.container) {
    return false
  }
  
  // 验证布局模式和容器的兼容性
  if (config.pattern === 'alertBanner' && config.container !== 'fullWidth' && config.container !== 'card') {
    return false
  }
  
  if ((config.pattern === 'verticalList' || config.pattern === 'graphDisplay') && config.container === 'widget') {
    return false
  }
  
  return true
}

/**
 * 获取所有可用的业务语义
 */
export const getAvailableBusinessSemantics = (): string[] => {
  return Object.keys(hvacBusinessLayoutMapping)
}

/**
 * 按类别分组业务语义
 */
export const groupBusinessSemanticsByCategory = () => {
  const categories: Record<string, string[]> = {
    '温度监控': [],
    '设备状态': [], 
    '能效管理': [],
    '压力监控': [],
    '流量监控': [],
    '空气质量': [],
    '控制操作': [],
    '告警故障': [],
    '历史数据': [],
    '设备管理': [],
    '环境天气': [],
    'AI智能': []
  }
  
  Object.keys(hvacBusinessLayoutMapping).forEach(semantic => {
    if (semantic.includes('温度')) {
      categories['温度监控'].push(semantic)
    } else if (semantic.includes('状态') || semantic.includes('运行')) {
      categories['设备状态'].push(semantic)
    } else if (semantic.includes('功率') || semantic.includes('效率') || semantic.includes('COP')) {
      categories['能效管理'].push(semantic)
    } else if (semantic.includes('压力')) {
      categories['压力监控'].push(semantic)
    } else if (semantic.includes('流量')) {
      categories['流量监控'].push(semantic)
    } else if (semantic.includes('CO2') || semantic.includes('湿度') || semantic.includes('PM')) {
      categories['空气质量'].push(semantic)
    } else if (semantic.includes('启动') || semantic.includes('停止') || semantic.includes('调节')) {
      categories['控制操作'].push(semantic)
    } else if (semantic.includes('告警') || semantic.includes('故障') || semantic.includes('维护')) {
      categories['告警故障'].push(semantic)
    } else if (semantic.includes('历史') || semantic.includes('趋势')) {
      categories['历史数据'].push(semantic)
    } else if (semantic.includes('清单') || semantic.includes('参数')) {
      categories['设备管理'].push(semantic)
    } else if (semantic.includes('室外') || semantic.includes('天气')) {
      categories['环境天气'].push(semantic)
    } else if (semantic.includes('AI') || semantic.includes('预测') || semantic.includes('优化')) {
      categories['AI智能'].push(semantic)
    }
  })
  
  return categories
}

export default hvacBusinessLayoutMapping