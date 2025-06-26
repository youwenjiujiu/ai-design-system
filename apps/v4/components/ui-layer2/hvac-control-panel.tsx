/**
 * HVAC 控制面板组件 - 基于 Figma 设计
 * 
 * 基于 Figma 设计 (23914:41784)
 * 职责：
 * - 提供 HVAC 系统控制卡片布局
 * - 支持多种设备状态展示
 * - 集成控制区域和状态指示
 * - 支持主题感知和交互
 */

import React from 'react'
import { 
  themeTokens, 
  type Theme, 
  type ChartSize,
  chartTypography
} from '../ui-layer1/design-tokens-simple'

// ===========================================
// HVAC 控制卡片接口
// ===========================================

export interface HVACCardData {
  /** 卡片ID */
  id: string
  /** 设备名称 */
  deviceName: string
  /** 主要状态文本 */
  primaryStatus: string
  /** 次要状态文本 */
  secondaryStatus?: string
  /** 状态类型 */
  statusType: 'running' | 'cooling' | 'offline' | 'control'
  /** 是否为控制卡片 */
  isControlCard?: boolean
  /** 位置 */
  position: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface HVACControlPanelProps {
  /** 卡片数据 */
  cards: HVACCardData[]
  /** 主题 */
  theme?: Theme
  /** 尺寸 */
  size?: ChartSize
  /** 控制区域宽度 */
  controlAreaWidth?: number
  /** 控制区域高度 */
  controlAreaHeight?: number
  /** 卡片点击回调 */
  onCardClick?: (card: HVACCardData) => void
  /** 控制区域点击回调 */
  onControlAreaClick?: () => void
  /** 自定义样式 */
  className?: string
  style?: React.CSSProperties
}

// ===========================================
// HVAC 控制卡片组件
// ===========================================

interface HVACCardProps {
  card: HVACCardData
  theme: Theme
  onClick?: (card: HVACCardData) => void
}

const HVACCard: React.FC<HVACCardProps> = ({ card, theme, onClick }) => {
  const currentTheme = themeTokens[theme]
  
  // 根据状态类型确定颜色
  const getStatusColor = () => {
    switch (card.statusType) {
      case 'running':
        return '#67D75E'  // 绿色 - 运行状态
      case 'cooling':
        return '#33A0FF'  // 蓝色 - 制冷状态
      case 'offline':
        return '#999999'  // 灰色 - 离线状态
      default:
        return '#FFFFFF'  // 白色 - 控制状态
    }
  }
  
  const statusColor = getStatusColor()
  
  return (
    <div
      style={{
        position: 'absolute',
        left: card.position.x,
        top: card.position.y,
        width: card.position.width,
        height: card.position.height,
        backgroundColor: '#0A0A0A',  // Figma: 黑色背景
        border: '1px solid rgba(255, 255, 255, 0.3)',  // Figma: 30% 白色边框
        borderRadius: '5px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
      onClick={() => onClick?.(card)}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.backgroundColor = '#1A1A1A'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#0A0A0A'
      }}
    >
      {/* 设备名称 */}
      <div style={{
        fontSize: '16px',
        fontWeight: '400',
        color: 'white',
        fontFamily: chartTypography.title.fontFamily,
        marginBottom: '4px'
      }}>
        {card.deviceName}
      </div>
      
      {/* 状态信息 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
        {/* 主要状态 */}
        <div style={{
          fontSize: '14px',
          fontWeight: '400',
          color: statusColor,
          fontFamily: chartTypography.title.fontFamily
        }}>
          {card.primaryStatus}
        </div>
        
        {/* 次要状态 */}
        {card.secondaryStatus && (
          <div style={{
            fontSize: '12px',
            fontWeight: '400',
            color: statusColor,
            fontFamily: chartTypography.title.fontFamily,
            opacity: 0.8
          }}>
            {card.secondaryStatus}
          </div>
        )}
      </div>
    </div>
  )
}

// ===========================================
// HVAC 控制面板主组件
// ===========================================

export const HVACControlPanel: React.FC<HVACControlPanelProps> = ({
  cards,
  theme = 'dark',
  size = 'md',
  controlAreaWidth = 274,
  controlAreaHeight = 140,
  onCardClick,
  onControlAreaClick,
  className = '',
  style
}) => {
  
  const currentTheme = themeTokens[theme]
  
  // 控制区域样式 (基于 Figma 中央矩形)
  const controlAreaStyle: React.CSSProperties = {
    position: 'absolute',
    left: 63,  // Figma: x="63"
    top: 29,   // Figma: y="29"
    width: controlAreaWidth,
    height: controlAreaHeight,
    border: '2px solid rgba(255, 255, 255, 0.3)',  // Figma: stroke-opacity="0.3"
    borderRadius: '0px',  // Figma: 无圆角
    borderStyle: 'dashed',  // Figma: stroke-dasharray="0.1 5"
    cursor: onControlAreaClick ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '14px',
    fontFamily: chartTypography.title.fontFamily,
    transition: 'all 0.2s ease'
  }
  
  // 容器样式
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: 400,   // Figma: 总宽度
    height: 195,  // Figma: 总高度
    backgroundColor: theme === 'dark' ? '#0A0A0A' : '#FFFFFF',
    ...style
  }
  
  return (
    <div 
      className={`hvac-control-panel hvac-control-panel--${theme} hvac-control-panel--${size} ${className}`}
      style={containerStyle}
    >
      {/* 中央控制区域 */}
      <div
        style={controlAreaStyle}
        onClick={onControlAreaClick}
        onMouseEnter={(e) => {
          if (onControlAreaClick) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        控制区域
      </div>
      
      {/* HVAC 设备卡片 */}
      {cards.map((card) => (
        <HVACCard
          key={card.id}
          card={card}
          theme={theme}
          onClick={onCardClick}
        />
      ))}
    </div>
  )
}

HVACControlPanel.displayName = 'HVACControlPanel'

// ===========================================
// 预设配置 (基于 Figma 设计)
// ===========================================

export const figmaHVACConfig: HVACCardData[] = [
  // 左上角 - Chiller
  {
    id: 'chiller-1',
    deviceName: 'Chiller',
    primaryStatus: 'Running',
    statusType: 'running',
    position: { x: 0, y: 0, width: 130, height: 60 }
  },
  
  // 左下角 - Terminal Equipment
  {
    id: 'terminal-1', 
    deviceName: 'Terminal Equipment',
    primaryStatus: 'Equipment Online',
    statusType: 'running',
    position: { x: 0, y: 135, width: 130, height: 60 }
  },
  
  // 右上角 - Cooling Tower
  {
    id: 'cooling-tower-1',
    deviceName: 'Cooling Tower',
    primaryStatus: 'Running',
    statusType: 'running', 
    position: { x: 270, y: 0, width: 130, height: 60 }
  },
  
  // 右下角 - AC
  {
    id: 'ac-1',
    deviceName: 'AC',
    primaryStatus: 'Running',
    statusType: 'running',
    position: { x: 270, y: 135, width: 130, height: 60 }
  },
  
  // 中央 - Control
  {
    id: 'control-1',
    deviceName: 'Control',
    primaryStatus: 'Online',
    statusType: 'control',
    isControlCard: true,
    position: { x: 175, y: 92, width: 50, height: 30 }
  }
]

export default HVACControlPanel