/**
 * Layer 3: AI 助手界面
 * 
 * HVAC AI助手的主要交互界面
 */

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { IntentParser } from './intent-parser'
import { CompositionGenerator } from './composition-generator'
import { 
  type IntentContext, 
  type ComponentComposition,
  type ConversationTurn,
  type AIResponse
} from './intent-types'

// ===========================================
// AI助手组件属性
// ===========================================

export interface AIAssistantProps {
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  style?: React.CSSProperties
  onComponentGenerated?: (composition: ComponentComposition) => void
  onConversationUpdate?: (conversation: ConversationTurn[]) => void
}

// ===========================================
// 消息类型
// ===========================================

interface Message {
  id: string
  type: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  componentComposition?: ComponentComposition
  context?: IntentContext
}

// ===========================================
// AI助手主组件
// ===========================================

export const AIAssistant: React.FC<AIAssistantProps> = ({
  theme = 'light',
  size = 'md',
  className = '',
  style,
  onComponentGenerated,
  onConversationUpdate
}) => {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: '您好！我是您的HVAC系统AI助手。我可以帮您监控设备状态、分析性能数据、控制设备操作等。请告诉我您需要什么帮助？',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversation, setConversation] = useState<ConversationTurn[]>([])

  // 引用
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // AI处理器
  const intentParser = useRef(new IntentParser())
  const compositionGenerator = useRef(new CompositionGenerator())

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 处理用户输入
  const handleUserInput = useCallback(async (input: string) => {
    if (!input.trim() || isProcessing) return

    setIsProcessing(true)
    setInputValue('')

    // 添加用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // 解析用户意图
      const recognitionResult = intentParser.current.parseIntent(input)
      
      // 生成意图上下文
      const context = intentParser.current.generateContext(
        input,
        recognitionResult,
        conversation
      )

      // 生成AI响应
      const aiResponse = await generateAIResponse(context)
      
      // 添加AI响应消息
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: aiResponse.textResponse || '已为您生成相应的界面',
        timestamp: new Date(),
        componentComposition: aiResponse.componentConfig,
        context
      }

      setMessages(prev => [...prev, assistantMessage])

      // 更新对话历史
      const newTurn: ConversationTurn = {
        id: `turn-${Date.now()}`,
        timestamp: new Date(),
        userInput: input,
        aiResponse,
        context
      }

      const updatedConversation = [...conversation, newTurn]
      setConversation(updatedConversation)

      // 通知父组件
      if (aiResponse.componentConfig) {
        onComponentGenerated?.(aiResponse.componentConfig)
      }
      onConversationUpdate?.(updatedConversation)

    } catch (error) {
      console.error('AI处理错误:', error)
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: '抱歉，处理您的请求时出现了问题。请重新描述您的需求。',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, conversation, onComponentGenerated, onConversationUpdate])

  // 生成AI响应
  const generateAIResponse = async (context: IntentContext): Promise<AIResponse> => {
    const { intent, confidence, entities } = context

    // 如果置信度太低，询问澄清
    if (confidence < 0.5) {
      return {
        type: 'clarification',
        textResponse: '我不太确定您的需求。您是想要查看数据、分析性能，还是控制设备？请详细描述一下。',
        clarificationQuestions: [
          '您想查看哪个设备的数据？',
          '您关心哪个具体指标？',
          '需要什么时间范围的数据？'
        ]
      }
    }

    // 生成组件组合
    const componentConfig = compositionGenerator.current.generateComposition(context)
    
    // 生成文本响应
    const textResponse = generateTextResponse(intent, entities, componentConfig)

    return {
      type: 'component',
      textResponse,
      componentConfig
    }
  }

  // 处理键盘事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleUserInput(inputValue)
    }
  }

  // 样式配置
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: size === 'sm' ? '400px' : size === 'md' ? '600px' : '800px',
    width: '100%',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    border: `1px solid ${theme === 'dark' ? '#333' : '#e5e5e5'}`,
    borderRadius: '12px',
    overflow: 'hidden',
    fontFamily: 'Scto Grotesk A, system-ui, sans-serif',
    ...style
  }

  const headerStyle: React.CSSProperties = {
    padding: '16px 20px',
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f9fa',
    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#e5e5e5'}`,
    fontSize: '16px',
    fontWeight: '600',
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a'
  }

  const messagesStyle: React.CSSProperties = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }

  const inputAreaStyle: React.CSSProperties = {
    padding: '16px 20px',
    borderTop: `1px solid ${theme === 'dark' ? '#333' : '#e5e5e5'}`,
    backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f9fa'
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${theme === 'dark' ? '#444' : '#ddd'}`,
    borderRadius: '8px',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
    fontSize: '14px',
    outline: 'none',
    resize: 'none'
  }

  return (
    <div className={`ai-assistant ${className}`} style={containerStyle}>
      {/* 头部 */}
      <div style={headerStyle}>
        🤖 HVAC AI 助手
      </div>

      {/* 消息区域 */}
      <div style={messagesStyle}>
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            theme={theme}
          />
        ))}
        
        {isProcessing && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0',
            borderRadius: '12px',
            alignSelf: 'flex-start',
            maxWidth: '80%'
          }}>
            <TypingIndicator theme={theme} />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div style={inputAreaStyle}>
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的问题... (例如: 显示冷水机组效率)"
            style={inputStyle}
            disabled={isProcessing}
          />
          
          <button
            onClick={() => handleUserInput(inputValue)}
            disabled={!inputValue.trim() || isProcessing}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#888' : '#666',
              cursor: inputValue.trim() && !isProcessing ? 'pointer' : 'not-allowed',
              fontSize: '16px'
            }}
          >
            ➤
          </button>
        </div>
        
        {/* 快捷操作按钮 */}
        <div style={{ 
          marginTop: '12px', 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap' 
        }}>
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => handleUserInput(action.text)}
              disabled={isProcessing}
              style={{
                padding: '6px 12px',
                fontSize: '12px',
                backgroundColor: theme === 'dark' ? '#444' : '#e9ecef',
                color: theme === 'dark' ? '#ccc' : '#495057',
                border: 'none',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ===========================================
// 消息气泡组件
// ===========================================

interface MessageBubbleProps {
  message: Message
  theme: 'light' | 'dark'
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, theme }) => {
  const isUser = message.type === 'user'
  
  const bubbleStyle: React.CSSProperties = {
    padding: '12px 16px',
    borderRadius: '12px',
    maxWidth: '80%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser 
      ? (theme === 'dark' ? '#007acc' : '#007acc')
      : (theme === 'dark' ? '#333' : '#f0f0f0'),
    color: isUser 
      ? '#ffffff'
      : (theme === 'dark' ? '#ffffff' : '#1a1a1a'),
    fontSize: '14px',
    lineHeight: '1.4'
  }

  const timeStyle: React.CSSProperties = {
    fontSize: '11px',
    opacity: 0.7,
    marginTop: '4px',
    textAlign: isUser ? 'right' : 'left'
  }

  return (
    <div style={{ alignSelf: isUser ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
      <div style={bubbleStyle}>
        {message.content}
        {message.componentComposition && (
          <div style={{ 
            marginTop: '8px', 
            padding: '8px', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            💡 已生成 {message.componentComposition.primaryComponent.type} 组件
          </div>
        )}
      </div>
      <div style={timeStyle}>
        {message.timestamp.toLocaleTimeString()}
      </div>
    </div>
  )
}

// ===========================================
// 输入指示器组件
// ===========================================

const TypingIndicator: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ color: theme === 'dark' ? '#ccc' : '#666' }}>AI正在思考</span>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#ccc' : '#666',
              animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ===========================================
// 快捷操作定义
// ===========================================

const quickActions = [
  { id: 'status', label: '查看系统状态', text: '显示系统整体状态' },
  { id: 'efficiency', label: '能效分析', text: '分析系统能效表现' },
  { id: 'temperature', label: '温度监控', text: '显示当前温度数据' },
  { id: 'chiller', label: '冷水机组', text: '查看冷水机组状态' },
  { id: 'comparison', label: '设备对比', text: '对比各设备性能' }
]

// ===========================================
// 辅助函数
// ===========================================

function generateTextResponse(
  intent: string,
  entities: any[],
  componentConfig: ComponentComposition
): string {
  const deviceEntity = entities.find(e => e.type === 'device')
  const metricEntity = entities.find(e => e.type === 'metric')
  
  switch (intent) {
    case 'show_data':
      return `已为您显示 ${deviceEntity?.value || '系统'} 的 ${metricEntity?.value || '数据'} 监控界面。`
    
    case 'analyze_performance':
      return `正在分析 ${deviceEntity?.value || '系统'} 的性能表现，为您生成详细的分析报告。`
    
    case 'compare_metrics':
      return `已为您生成设备对比界面，可以清楚地看到各项指标的差异。`
    
    case 'monitor_status':
      return `系统状态监控界面已就绪，您可以实时查看设备运行状态。`
    
    case 'control_equipment':
      return `设备控制界面已准备好，请在界面上执行相应的操作。`
    
    case 'troubleshoot':
      return `故障诊断界面已生成，包含详细的故障信息和解决建议。`
    
    default:
      return `已为您生成相应的 ${componentConfig.primaryComponent.type} 界面。`
  }
}

// ===========================================
// 导出
// ===========================================

export { AIAssistant }
export default AIAssistant