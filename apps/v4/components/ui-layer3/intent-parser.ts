/**
 * Layer 3: AI意图解析器
 * 
 * 解析用户的自然语言输入，识别意图和实体
 */

import { 
  type UserIntent, 
  type IntentContext, 
  type Entity, 
  type EntityType,
  type IntentRecognitionResult,
  type TimeRange
} from './intent-types'

// ===========================================
// 意图识别规则
// ===========================================

interface IntentPattern {
  intent: UserIntent
  patterns: string[]
  keywords: string[]
  entities: EntityType[]
  confidence: number
}

const intentPatterns: IntentPattern[] = [
  // 显示数据意图
  {
    intent: 'show_data',
    patterns: [
      '显示.*(?:温度|压力|流量|功率|效率)',
      '查看.*(?:数据|状态|信息)',
      '我想看.*(?:图表|曲线|数据)',
      'show.*(?:temperature|pressure|flow|power|efficiency)',
      'display.*(?:data|chart|graph)'
    ],
    keywords: ['显示', '查看', '看', '展示', 'show', 'display', 'view'],
    entities: ['device', 'metric', 'location', 'time'],
    confidence: 0.9
  },

  // 温度监控专用意图 (新增)
  {
    intent: 'temperature_check',
    patterns: [
      'monitor.*temperature',
      'temperature.*monitor',
      '监控.*温度',
      '温度.*监控',
      'check.*temperature.*status',
      'view.*temperature.*data',
      'show.*temperature.*reading'
    ],
    keywords: ['monitor', 'temperature', '监控', '温度', 'check', 'reading'],
    entities: ['device', 'location', 'metric'],
    confidence: 0.95
  },

  // 分析性能意图
  {
    intent: 'analyze_performance',
    patterns: [
      '分析.*(?:性能|效率|能耗)',
      '.*(?:性能|效率).*(?:怎么样|如何)',
      '评估.*(?:系统|设备).*性能',
      'analyze.*(?:performance|efficiency)',
      'how.*(?:performing|efficient)',
      '(?:show|display).*(?:chiller|制冷机).*(?:efficiency|效率)',
      '(?:chiller|制冷机).*(?:efficiency|performance|性能)',
      '(?:efficiency|效率).*(?:chiller|制冷机)',
      '.*cop.*'
    ],
    keywords: ['分析', '性能', '效率', '评估', 'analyze', 'performance', 'efficiency', 'chiller', 'cop', '制冷机'],
    entities: ['device', 'metric', 'time'],
    confidence: 0.85
  },

  // 对比指标意图
  {
    intent: 'compare_metrics',
    patterns: [
      '对比.*(?:温度|压力|流量|效率)',
      '比较.*(?:性能|数据)',
      '.*和.*(?:对比|比较)',
      'compare.*(?:temperature|pressure|efficiency)',
      '.*vs.*'
    ],
    keywords: ['对比', '比较', '差异', 'compare', 'versus', 'vs'],
    entities: ['device', 'metric', 'time'],
    confidence: 0.8
  },

  // 监控状态意图
  {
    intent: 'monitor_status',
    patterns: [
      '监控.*(?:状态|运行)',
      '.*(?:状态|运行).*(?:如何|怎样)',
      '检查.*(?:设备|系统).*状态',
      'monitor.*(?:status|condition)',
      'check.*(?:status|condition)'
    ],
    keywords: ['监控', '状态', '运行', '检查', 'monitor', 'status', 'check'],
    entities: ['device', 'location', 'status'],
    confidence: 0.9
  },

  // 控制设备意图
  {
    intent: 'control_equipment',
    patterns: [
      '(?:启动|开启|打开).*(?:设备|系统)',
      '(?:停止|关闭|停机).*(?:设备|系统)',
      '调节.*(?:温度|压力|流量)',
      '(?:start|turn on|open).*(?:device|system)',
      '(?:stop|turn off|close).*(?:device|system)'
    ],
    keywords: ['启动', '停止', '开启', '关闭', '调节', 'start', 'stop', 'turn', 'adjust'],
    entities: ['device', 'action', 'parameter', 'value'],
    confidence: 0.95
  },

  // 故障排查意图
  {
    intent: 'troubleshoot',
    patterns: [
      '.*(?:故障|问题|异常|报警)',
      '为什么.*(?:不正常|有问题)',
      '排查.*(?:故障|问题)',
      '.*(?:fault|error|alarm|problem)',
      'troubleshoot.*'
    ],
    keywords: ['故障', '问题', '异常', '报警', '排查', 'fault', 'error', 'problem', 'troubleshoot'],
    entities: ['device', 'status', 'location'],
    confidence: 0.85
  },

  // 系统优化意图
  {
    intent: 'optimize_system',
    patterns: [
      '优化.*(?:系统|设备|性能)',
      '如何.*(?:提高|改善).*(?:效率|性能)',
      '.*(?:节能|降耗).*建议',
      'optimize.*(?:system|performance)',
      'improve.*(?:efficiency|performance)'
    ],
    keywords: ['优化', '提高', '改善', '节能', '建议', 'optimize', 'improve', 'enhance'],
    entities: ['device', 'metric', 'parameter'],
    confidence: 0.8
  },

  // 生成报告意图
  {
    intent: 'generate_report',
    patterns: [
      '生成.*(?:报告|报表)',
      '导出.*(?:数据|报告)',
      '.*报告.*(?:怎么|如何)',
      'generate.*(?:report|summary)',
      'export.*(?:data|report)'
    ],
    keywords: ['生成', '报告', '报表', '导出', 'generate', 'report', 'export'],
    entities: ['metric', 'time', 'device'],
    confidence: 0.9
  },

  // 趋势预测意图
  {
    intent: 'predict_trend',
    patterns: [
      '预测.*(?:趋势|走向)',
      '.*(?:趋势|变化).*(?:如何|怎样)',
      '未来.*(?:温度|压力|效率)',
      'predict.*(?:trend|future)',
      'forecast.*'
    ],
    keywords: ['预测', '趋势', '未来', '走向', 'predict', 'forecast', 'trend'],
    entities: ['metric', 'time', 'device'],
    confidence: 0.75
  },

  // 概念解释意图
  {
    intent: 'explain_concept',
    patterns: [
      '什么是.*',
      '.*是什么(?:意思)?',
      '解释.*',
      'what is.*',
      'explain.*'
    ],
    keywords: ['什么', '解释', '含义', '意思', 'what', 'explain', 'meaning'],
    entities: ['parameter', 'metric'],
    confidence: 0.7
  }
]

// ===========================================
// 实体识别规则
// ===========================================

interface EntityPattern {
  type: EntityType
  patterns: string[]
  normalizer?: (value: string) => any
}

const entityPatterns: EntityPattern[] = [
  // 设备实体
  {
    type: 'device',
    patterns: [
      '冷水机组?', '制冷机', 'chiller',
      '冷却塔', 'cooling tower',
      '风机', '送风机', '排风机', 'fan',
      '水泵', '冷冻水泵', '冷却水泵', 'pump',
      '空调', '空调机组', 'ahu', 'air handler',
      '压缩机', 'compressor',
      '冷凝器', 'condenser',
      '蒸发器', 'evaporator'
    ]
  },

  // 指标实体
  {
    type: 'metric',
    patterns: [
      '温度', 'temperature', '℃', '°C',
      '压力', 'pressure', 'kPa', 'bar',
      '流量', 'flow', 'L/min', 'm³/h',
      '功率', 'power', 'kW', 'MW',
      '效率', 'efficiency', 'COP', 'EER',
      '能耗', 'energy consumption',
      '湿度', 'humidity', '%RH'
    ]
  },

  // 位置实体
  {
    type: 'location',
    patterns: [
      '机房', 'machine room',
      '冷冻站', 'chiller plant',
      '屋顶', 'rooftop',
      '地下室', 'basement',
      '\\d+楼', 'floor \\d+',
      '东区', '西区', '南区', '北区',
      'zone [A-Z]', '区域[A-Z]'
    ]
  },

  // 时间实体
  {
    type: 'time',
    patterns: [
      '今天', 'today',
      '昨天', 'yesterday',
      '本周', 'this week',
      '上周', 'last week',
      '本月', 'this month',
      '\\d+小时前', '\\d+ hours? ago',
      '\\d+天前', '\\d+ days? ago',
      '最近\\d+小时', 'recent \\d+ hours?'
    ],
    normalizer: (value: string) => parseTimeExpression(value)
  },

  // 数值实体
  {
    type: 'value',
    patterns: [
      '\\d+(?:\\.\\d+)?(?:%|℃|°C|kPa|bar|L/min|kW)',
      '\\d+(?:\\.\\d+)?度',
      '\\d+(?:\\.\\d+)?percent'
    ],
    normalizer: (value: string) => parseNumericValue(value)
  },

  // 动作实体
  {
    type: 'action',
    patterns: [
      '启动', '开启', '打开', 'start', 'turn on', 'open',
      '停止', '关闭', '停机', 'stop', 'turn off', 'close',
      '调节', '设置', '调整', 'adjust', 'set', 'tune',
      '重启', 'restart', 'reboot',
      '复位', 'reset'
    ]
  },

  // 状态实体
  {
    type: 'status',
    patterns: [
      '正常', '运行', 'normal', 'running', 'operational',
      '故障', '异常', 'fault', 'error', 'abnormal',
      '停机', '离线', 'offline', 'stopped',
      '维护', 'maintenance',
      '报警', '告警', 'alarm', 'alert'
    ]
  },

  // 参数实体
  {
    type: 'parameter',
    patterns: [
      '设定值', '目标值', 'setpoint', 'target',
      '阈值', '上限', '下限', 'threshold', 'limit',
      '频率', 'frequency',
      '转速', '速度', 'speed', 'rpm'
    ]
  }
]

// ===========================================
// 意图解析器类
// ===========================================

export class IntentParser {
  private patterns: IntentPattern[]
  private entityPatterns: EntityPattern[]

  constructor() {
    this.patterns = intentPatterns
    this.entityPatterns = entityPatterns
  }

  /**
   * 解析用户输入，识别意图和实体
   */
  parseIntent(userInput: string): IntentRecognitionResult {
    try {
      // 预处理输入
      const normalizedInput = this.normalizeInput(userInput)

      // 识别意图
      const intentResults = this.recognizeIntent(normalizedInput)
      
      // 提取实体
      const entities = this.extractEntities(normalizedInput)

      // 选择最佳意图
      const bestIntent = this.selectBestIntent(intentResults, entities)

      if (!bestIntent) {
        return {
          intent: 'show_data', // 默认意图
          confidence: 0.1,
          entities,
          status: 'failed',
          error: '无法识别用户意图'
        }
      }

      return {
        intent: bestIntent.intent,
        confidence: bestIntent.confidence,
        entities,
        alternativeIntents: intentResults.slice(1, 3), // 返回前2个备选意图
        status: bestIntent.confidence > 0.5 ? 'success' : 'ambiguous'
      }

    } catch (error) {
      return {
        intent: 'show_data',
        confidence: 0,
        entities: [],
        status: 'failed',
        error: error instanceof Error ? error.message : '解析失败'
      }
    }
  }

  /**
   * 生成完整的意图上下文
   */
  generateContext(
    userInput: string, 
    recognitionResult: IntentRecognitionResult,
    conversationHistory: any[] = []
  ): IntentContext {
    return {
      userInput,
      intent: recognitionResult.intent,
      confidence: recognitionResult.confidence,
      entities: recognitionResult.entities,
      timeRange: this.extractTimeRange(recognitionResult.entities),
      targets: this.extractTargets(recognitionResult.entities),
      conversationHistory
    }
  }

  /**
   * 预处理用户输入
   */
  private normalizeInput(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[，。！？；：]/g, ',') // 统一标点符号
      .replace(/\s+/g, ' ') // 合并空格
  }

  /**
   * 识别意图
   */
  private recognizeIntent(input: string): Array<{ intent: UserIntent; confidence: number }> {
    const results: Array<{ intent: UserIntent; confidence: number }> = []

    for (const pattern of this.patterns) {
      let score = 0
      let matches = 0

      // 检查正则模式
      for (const regex of pattern.patterns) {
        if (new RegExp(regex, 'i').test(input)) {
          score += 0.4
          matches++
        }
      }

      // 检查关键词
      for (const keyword of pattern.keywords) {
        if (input.includes(keyword)) {
          score += 0.3
          matches++
        }
      }

      // 计算最终置信度
      if (matches > 0) {
        const confidence = Math.min(score * pattern.confidence, 1.0)
        results.push({ intent: pattern.intent, confidence })
      }
    }

    // 按置信度排序
    return results.sort((a, b) => b.confidence - a.confidence)
  }

  /**
   * 提取实体
   */
  private extractEntities(input: string): Entity[] {
    const entities: Entity[] = []

    for (const entityPattern of this.entityPatterns) {
      for (const pattern of entityPattern.patterns) {
        const regex = new RegExp(pattern, 'gi')
        let match

        while ((match = regex.exec(input)) !== null) {
          const value = match[0]
          const normalizedValue = entityPattern.normalizer 
            ? entityPattern.normalizer(value)
            : value

          entities.push({
            type: entityPattern.type,
            value,
            start: match.index,
            end: match.index + value.length,
            confidence: 0.8,
            normalizedValue
          })
        }
      }
    }

    // 去重和排序
    return this.deduplicateEntities(entities)
  }

  /**
   * 选择最佳意图
   */
  private selectBestIntent(
    intentResults: Array<{ intent: UserIntent; confidence: number }>,
    entities: Entity[]
  ): { intent: UserIntent; confidence: number } | null {
    if (intentResults.length === 0) return null

    // 根据实体类型调整意图置信度
    const adjustedResults = intentResults.map(result => {
      let adjustedConfidence = result.confidence

      // 如果有控制相关的动作实体，提高控制意图的置信度
      if (result.intent === 'control_equipment') {
        const hasActionEntity = entities.some(e => e.type === 'action')
        if (hasActionEntity) adjustedConfidence += 0.2
      }

      // 如果有时间实体，提高显示数据意图的置信度
      if (result.intent === 'show_data') {
        const hasTimeEntity = entities.some(e => e.type === 'time')
        if (hasTimeEntity) adjustedConfidence += 0.1
      }

      return { ...result, confidence: Math.min(adjustedConfidence, 1.0) }
    })

    // 返回调整后的最高置信度意图
    return adjustedResults.sort((a, b) => b.confidence - a.confidence)[0]
  }

  /**
   * 提取时间范围
   */
  private extractTimeRange(entities: Entity[]): TimeRange | undefined {
    const timeEntity = entities.find(e => e.type === 'time')
    if (!timeEntity?.normalizedValue) return undefined

    return timeEntity.normalizedValue as TimeRange
  }

  /**
   * 提取目标对象
   */
  private extractTargets(entities: Entity[]): string[] {
    return entities
      .filter(e => e.type === 'device' || e.type === 'location')
      .map(e => e.value)
  }

  /**
   * 去重实体
   */
  private deduplicateEntities(entities: Entity[]): Entity[] {
    const unique = new Map<string, Entity>()

    for (const entity of entities) {
      const key = `${entity.type}-${entity.start}-${entity.end}`
      if (!unique.has(key) || entity.confidence > unique.get(key)!.confidence) {
        unique.set(key, entity)
      }
    }

    return Array.from(unique.values()).sort((a, b) => a.start - b.start)
  }
}

// ===========================================
// 辅助函数
// ===========================================

/**
 * 解析时间表达式
 */
function parseTimeExpression(timeStr: string): TimeRange {
  const now = new Date()
  let start: Date, end: Date

  if (timeStr.includes('今天') || timeStr.includes('today')) {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  } else if (timeStr.includes('昨天') || timeStr.includes('yesterday')) {
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    start = new Date(end.getTime() - 24 * 60 * 60 * 1000)
  } else if (timeStr.includes('本周') || timeStr.includes('this week')) {
    const dayOfWeek = now.getDay()
    start = new Date(now.getTime() - dayOfWeek * 24 * 60 * 60 * 1000)
    end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000)
  } else {
    // 默认为最近24小时
    end = now
    start = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  }

  return {
    start,
    end,
    type: 'historical',
    granularity: 'hour'
  }
}

/**
 * 解析数值
 */
function parseNumericValue(valueStr: string): { value: number; unit?: string } {
  const match = valueStr.match(/(\d+(?:\.\d+)?)\s*([^\d\s]*)?/)
  if (!match) return { value: 0 }

  return {
    value: parseFloat(match[1]),
    unit: match[2] || undefined
  }
}

// ===========================================
// 导出
// ===========================================

export { IntentParser }
export default IntentParser