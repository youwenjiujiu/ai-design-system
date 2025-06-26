/**
 * Layer 3: AI 意图理解层
 * 
 * 职责：
 * - 解析用户的自然语言输入
 * - 理解用户意图和上下文
 * - 将意图映射到具体的组件组合
 * - 生成动态的UI组合
 * - 提供智能推荐和建议
 * 
 * 架构：
 * Intent Recognition → Context Analysis → Component Generation → UI Composition
 */

// 核心AI意图处理
export * from './intent-parser'
export * from './intent-types'

// 组件组合生成
export * from './composition-generator'

// 自然语言处理
export * from './nlp-processor'

// 对话管理
export * from './conversation-manager'

// AI助手界面
export * from './ai-assistant'