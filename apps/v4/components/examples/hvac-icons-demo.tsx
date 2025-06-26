/**
 * Layer 2 HVAC 图标组件使用示例
 * 
 * 展示如何使用业务语义化的 HVAC 图标组件
 */

import React, { useState } from 'react'
import {
  // 设备类图标
  ThermometerIcon,
  FanIcon,
  CompressorIcon,
  PumpIcon,
  HeaterIcon,
  CoolerIcon,
  
  // 状态类图标
  RunningIcon,
  StoppedIcon,
  WarningIcon,
  ErrorIcon,
  OnlineIcon,
  OfflineIcon,
  
  // 监控类图标
  DashboardIcon,
  ChartIcon,
  TrendUpIcon,
  TrendDownIcon,
  AnalyticsIcon,
  
  // 控制类图标
  PowerIcon,
  SwitchIcon,
  SliderIcon,
  AutomationIcon,
  
  // 系统类图标
  NetworkIcon,
  WifiIcon,
  CloudIcon,
  SecurityIcon,
  
  // 复合组件
  EquipmentStatusIcon,
  SystemConnectionIcon,
  DataTrendIcon,
  
  // 工具函数
  HVACIcons,
  getEquipmentIcon,
  getStatusIcon,
} from '../ui-layer2/hvac-icons'

export default function HVACIconsDemo() {
  const [selectedTab, setSelectedTab] = useState('equipment')
  const [equipmentStatus, setEquipmentStatus] = useState<'normal' | 'warning' | 'error' | 'offline'>('normal')
  const [isConnected, setIsConnected] = useState(true)
  const [trendDirection, setTrendDirection] = useState<'up' | 'down' | 'stable'>('up')

  const tabs = [
    { id: 'equipment', label: '设备图标' },
    { id: 'status', label: '状态图标' },
    { id: 'monitoring', label: '监控图标' },
    { id: 'controls', label: '控制图标' },
    { id: 'systems', label: '系统图标' },
    { id: 'composite', label: '复合组件' },
    { id: 'interactive', label: '交互示例' },
  ]

  return (
    <div style={{ 
      padding: '24px', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '28px', 
        fontWeight: 'bold', 
        marginBottom: '8px',
        color: '#1a1a1a'
      }}>
        HVAC 图标组件系统演示
      </h1>
      <p style={{ 
        color: '#666', 
        marginBottom: '32px',
        fontSize: '16px'
      }}>
        Layer 2 业务语义化图标组件 - 基于 Layer 1 图标基础设施构建
      </p>

      {/* 标签页导航 */}
      <div style={{ 
        borderBottom: '1px solid #e5e5e5', 
        marginBottom: '32px' 
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                padding: '12px 20px',
                border: 'none',
                background: selectedTab === tab.id ? '#f8f9fa' : 'transparent',
                borderBottom: selectedTab === tab.id ? '2px solid #0066cc' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                color: selectedTab === tab.id ? '#0066cc' : '#666',
                fontWeight: selectedTab === tab.id ? '500' : 'normal',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 设备图标 */}
      {selectedTab === 'equipment' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>设备类图标</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>HVAC 核心设备的图标组件</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              { icon: ThermometerIcon, name: '温度计', desc: '温度传感器' },
              { icon: FanIcon, name: '风扇', desc: '通风设备' },
              { icon: CompressorIcon, name: '压缩机', desc: '制冷压缩机' },
              { icon: PumpIcon, name: '水泵', desc: '循环水泵' },
              { icon: HeaterIcon, name: '加热器', desc: '电加热器' },
              { icon: CoolerIcon, name: '冷却器', desc: '冷却设备' },
            ].map(item => (
              <div key={item.name} style={{ 
                padding: '16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <item.icon size="lg" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '8px 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 状态图标 */}
      {selectedTab === 'status' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>状态类图标</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>系统运行状态指示图标</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              { icon: RunningIcon, name: '运行中', desc: '设备正常运行', color: 'success' },
              { icon: StoppedIcon, name: '已停止', desc: '设备已停止', color: 'danger' },
              { icon: WarningIcon, name: '警告', desc: '需要注意', color: 'warning' },
              { icon: ErrorIcon, name: '错误', desc: '设备故障', color: 'danger' },
              { icon: OnlineIcon, name: '在线', desc: '设备在线', color: 'success' },
              { icon: OfflineIcon, name: '离线', desc: '设备离线', color: 'black' },
            ].map(item => (
              <div key={item.name} style={{ 
                padding: '16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <item.icon size="lg" color={item.color as any} style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '8px 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 监控图标 */}
      {selectedTab === 'monitoring' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>监控类图标</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>数据监控和可视化图标</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              { icon: DashboardIcon, name: '仪表盘', desc: '系统概览' },
              { icon: ChartIcon, name: '图表', desc: '数据图表' },
              { icon: TrendUpIcon, name: '上升趋势', desc: '数据上升', color: 'success' },
              { icon: TrendDownIcon, name: '下降趋势', desc: '数据下降', color: 'danger' },
              { icon: AnalyticsIcon, name: '分析', desc: '数据分析' },
            ].map(item => (
              <div key={item.name} style={{ 
                padding: '16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <item.icon size="lg" color={item.color as any} style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '8px 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 控制图标 */}
      {selectedTab === 'controls' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>控制类图标</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>交互控制操作图标</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              { icon: PowerIcon, name: '电源', desc: '开关控制' },
              { icon: SwitchIcon, name: '开关', desc: '切换状态' },
              { icon: SliderIcon, name: '滑块', desc: '数值调节' },
              { icon: AutomationIcon, name: '自动化', desc: '自动控制' },
            ].map(item => (
              <div key={item.name} style={{ 
                padding: '16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <item.icon size="lg" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '8px 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 系统图标 */}
      {selectedTab === 'systems' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>系统类图标</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>网络通信和系统集成图标</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {[
              { icon: NetworkIcon, name: '网络', desc: '网络连接' },
              { icon: WifiIcon, name: 'WiFi', desc: '无线网络' },
              { icon: CloudIcon, name: '云端', desc: '云服务' },
              { icon: SecurityIcon, name: '安全', desc: '系统安全' },
            ].map(item => (
              <div key={item.name} style={{ 
                padding: '16px', 
                border: '1px solid #e5e5e5', 
                borderRadius: '8px',
                textAlign: 'center',
                background: '#fff'
              }}>
                <item.icon size="lg" style={{ marginBottom: '8px' }} />
                <h3 style={{ fontSize: '14px', fontWeight: '500', margin: '8px 0 4px' }}>{item.name}</h3>
                <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 复合组件 */}
      {selectedTab === 'composite' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>复合图标组件</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>业务场景特定的复合图标组件</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 设备状态组件 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>设备状态图标</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <EquipmentStatusIcon 
                  equipmentType="thermometer" 
                  status="normal" 
                  showLabel={true}
                  label="温度传感器"
                />
                <EquipmentStatusIcon 
                  equipmentType="fan" 
                  status="warning" 
                  showLabel={true}
                  label="排风扇"
                />
                <EquipmentStatusIcon 
                  equipmentType="compressor" 
                  status="error" 
                  showLabel={true}
                  label="压缩机"
                />
                <EquipmentStatusIcon 
                  equipmentType="pump" 
                  status="offline" 
                  showLabel={true}
                  label="循环泵"
                />
              </div>
            </div>

            {/* 系统连接组件 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>系统连接状态</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <SystemConnectionIcon 
                  connectionType="wifi" 
                  connected={true} 
                  signalStrength="strong"
                />
                <SystemConnectionIcon 
                  connectionType="bluetooth" 
                  connected={true} 
                  signalStrength="medium"
                />
                <SystemConnectionIcon 
                  connectionType="network" 
                  connected={false} 
                />
                <SystemConnectionIcon 
                  connectionType="cloud" 
                  connected={true} 
                  signalStrength="strong"
                />
              </div>
            </div>

            {/* 数据趋势组件 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>数据趋势指示</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <DataTrendIcon trend="up" dataType="temperature" />
                <DataTrendIcon trend="down" dataType="energy" />
                <DataTrendIcon trend="stable" dataType="efficiency" />
                <DataTrendIcon trend="up" dataType="general" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交互示例 */}
      {selectedTab === 'interactive' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>交互式示例</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>展示图标的状态感知和交互特性</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 设备状态控制 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>设备状态控制</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ marginRight: '12px' }}>设备状态:</label>
                <select 
                  value={equipmentStatus} 
                  onChange={(e) => setEquipmentStatus(e.target.value as any)}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="normal">正常</option>
                  <option value="warning">警告</option>
                  <option value="error">错误</option>
                  <option value="offline">离线</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <EquipmentStatusIcon 
                  equipmentType="thermometer" 
                  status={equipmentStatus}
                  showLabel={true}
                  label="温度传感器"
                />
                <EquipmentStatusIcon 
                  equipmentType="fan" 
                  status={equipmentStatus}
                  showLabel={true}
                  label="排风扇"
                />
                <EquipmentStatusIcon 
                  equipmentType="compressor" 
                  status={equipmentStatus}
                  showLabel={true}
                  label="压缩机"
                />
              </div>
            </div>

            {/* 连接状态控制 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>连接状态控制</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ marginRight: '12px' }}>
                  <input 
                    type="checkbox" 
                    checked={isConnected}
                    onChange={(e) => setIsConnected(e.target.checked)}
                    style={{ marginRight: '8px' }}
                  />
                  连接状态
                </label>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <SystemConnectionIcon 
                  connectionType="wifi" 
                  connected={isConnected} 
                />
                <SystemConnectionIcon 
                  connectionType="bluetooth" 
                  connected={isConnected} 
                />
                <SystemConnectionIcon 
                  connectionType="network" 
                  connected={isConnected} 
                />
              </div>
            </div>

            {/* 趋势方向控制 */}
            <div style={{ 
              padding: '20px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>数据趋势控制</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ marginRight: '12px' }}>趋势方向:</label>
                <select 
                  value={trendDirection} 
                  onChange={(e) => setTrendDirection(e.target.value as any)}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="up">上升</option>
                  <option value="down">下降</option>
                  <option value="stable">稳定</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <DataTrendIcon trend={trendDirection} dataType="temperature" />
                <DataTrendIcon trend={trendDirection} dataType="energy" />
                <DataTrendIcon trend={trendDirection} dataType="efficiency" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div style={{ 
        marginTop: '48px', 
        padding: '20px', 
        background: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#333' }}>使用说明</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', lineHeight: '1.6' }}>
          <li>Layer 2 图标组件基于 Layer 1 的图标基础设施构建</li>
          <li>提供业务语义化的接口，支持状态感知和交互逻辑</li>
          <li>复合组件封装常见的业务场景，简化使用</li>
          <li>支持多种尺寸（sm/md/lg）和颜色变体</li>
          <li>集成状态指示器和工具提示功能</li>
        </ul>
      </div>
    </div>
  )
}