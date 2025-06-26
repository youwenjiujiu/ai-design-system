/**
 * Layer 2 HVAC 按钮组件使用示例
 * 
 * 展示如何使用业务语义化的 HVAC 按钮组件
 */

import React, { useState } from 'react'
import {
  // 设备控制按钮
  PowerButton,
  StartButton,
  StopButton,
  PauseButton,
  ResetButton,
  
  // 操作模式按钮
  AutoModeButton,
  ManualModeButton,
  EmergencyButton,
  
  // 系统维护按钮
  MaintenanceButton,
  SettingsButton,
  
  // 复合组件
  EquipmentToggleButton,
  SystemModeToggle,
  BatchOperationButton,
  
  // 工具函数
  HVACButtons,
  getRecommendedAction,
  filterButtonsByPermission,
} from '../ui-layer2/hvac-buttons'

export default function HVACButtonsDemo() {
  const [selectedTab, setSelectedTab] = useState('basic')
  const [equipmentStatus, setEquipmentStatus] = useState<'running' | 'stopped' | 'paused' | 'error'>('stopped')
  const [systemMode, setSystemMode] = useState<'auto' | 'manual' | 'maintenance'>('auto')
  const [userPermission, setUserPermission] = useState<'operator' | 'engineer' | 'admin'>('operator')

  const tabs = [
    { id: 'basic', label: '基础按钮' },
    { id: 'modes', label: '操作模式' },
    { id: 'composite', label: '复合组件' },
    { id: 'permissions', label: '权限控制' },
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
        HVAC 按钮组件系统演示
      </h1>
      <p style={{ 
        color: '#666', 
        marginBottom: '32px',
        fontSize: '16px'
      }}>
        Layer 2 业务语义化按钮组件 - 基于 Layer 1 按钮基础设施 + Figma 设计规范
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

      {/* 基础按钮 */}
      {selectedTab === 'basic' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>基础设备控制按钮</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>标准 HVAC 设备操作按钮，基于 Figma 按钮组件规范</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 设备控制按钮组 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>设备控制</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <PowerButton size="md" />
                <StartButton size="md" />
                <StopButton size="md" />
                <PauseButton size="md" />
                <ResetButton size="md" />
              </div>
            </div>

            {/* 按钮尺寸变体 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>按钮尺寸 (基于 Design Tokens)</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <StartButton size="sm" label="小尺寸" />
                <StartButton size="md" label="标准尺寸" />
                <StartButton size="lg" label="大尺寸" />
              </div>
            </div>

            {/* 按钮变体样式 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>按钮变体样式</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <PowerButton variant="primary" label="主要" />
                <PowerButton variant="secondary" label="次要" />
                <PowerButton variant="success" label="成功" />
                <PowerButton variant="warning" label="警告" />
                <PowerButton variant="danger" label="危险" />
                <PowerButton variant="ghost" label="幽灵" />
              </div>
            </div>

            {/* 按钮状态 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>按钮状态</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <StartButton label="正常" />
                <StartButton loading label="加载中" />
                <StartButton disabled label="禁用" />
                <StartButton fullWidth label="全宽按钮" style={{ maxWidth: '200px' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 操作模式 */}
      {selectedTab === 'modes' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>操作模式按钮</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>HVAC 系统运行模式和安全控制</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 模式控制按钮 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>运行模式</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <AutoModeButton />
                <ManualModeButton />
                <MaintenanceButton />
              </div>
            </div>

            {/* 安全控制 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>安全控制</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <EmergencyButton 
                  requireConfirm={true}
                  confirmMessage="确定要执行紧急停止吗？这将立即停止所有设备。"
                />
                <SettingsButton />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 复合组件 */}
      {selectedTab === 'composite' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>复合按钮组件</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>业务场景特定的智能按钮组件</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 设备状态切换 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>智能设备控制</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                当前设备状态: <strong>{equipmentStatus}</strong> - 按钮会根据设备状态自动调整
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <EquipmentToggleButton
                  equipmentId="chiller-001"
                  currentStatus={equipmentStatus}
                  onToggle={(action) => {
                    console.log(`设备操作: ${action}`)
                    if (action === 'start') setEquipmentStatus('running')
                    if (action === 'stop') setEquipmentStatus('stopped')
                    if (action === 'reset') setEquipmentStatus('stopped')
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setEquipmentStatus('stopped')}
                    style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    设为停止
                  </button>
                  <button 
                    onClick={() => setEquipmentStatus('running')}
                    style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    设为运行
                  </button>
                  <button 
                    onClick={() => setEquipmentStatus('error')}
                    style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    设为错误
                  </button>
                </div>
              </div>
            </div>

            {/* 系统模式切换 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>系统模式切换</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                当前模式: <strong>{systemMode}</strong>
              </p>
              <SystemModeToggle
                currentMode={systemMode}
                onModeChange={(mode) => {
                  console.log(`模式切换到: ${mode}`)
                  setSystemMode(mode as any)
                }}
              />
            </div>

            {/* 批量操作 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>批量设备操作</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <BatchOperationButton
                  operation="start_all"
                  equipmentCount={8}
                  onExecute={() => console.log('批量启动设备')}
                />
                <BatchOperationButton
                  operation="stop_all"
                  equipmentCount={8}
                  onExecute={() => console.log('批量停止设备')}
                />
                <BatchOperationButton
                  operation="reset_all"
                  equipmentCount={3}
                  onExecute={() => console.log('批量重置设备')}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 权限控制 */}
      {selectedTab === 'permissions' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>权限控制系统</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>基于用户权限级别的按钮可见性控制</p>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
              当前用户权限:
            </label>
            <select 
              value={userPermission} 
              onChange={(e) => setUserPermission(e.target.value as any)}
              style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
            >
              <option value="operator">操作员 (Operator)</option>
              <option value="engineer">工程师 (Engineer)</option>
              <option value="admin">管理员 (Admin)</option>
            </select>
          </div>

          <div style={{ 
            padding: '24px', 
            border: '1px solid #e5e5e5', 
            borderRadius: '8px',
            background: '#fff'
          }}>
            <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>
              可用操作 ({filterButtonsByPermission(userPermission).length} 个)
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {filterButtonsByPermission(userPermission).includes('start') && 
                <StartButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('stop') && 
                <StopButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('pause') && 
                <PauseButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('reset') && 
                <ResetButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('auto') && 
                <AutoModeButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('manual') && 
                <ManualModeButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('emergency') && 
                <EmergencyButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('maintenance') && 
                <MaintenanceButton permission={userPermission} />}
              {filterButtonsByPermission(userPermission).includes('settings') && 
                <SettingsButton permission={userPermission} />}
            </div>
            
            <div style={{ marginTop: '16px', padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
              <h4 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#333' }}>权限说明:</h4>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', color: '#666' }}>
                <li><strong>操作员:</strong> 只能执行基础设备启停操作</li>
                <li><strong>工程师:</strong> 可以执行设备控制、模式切换和系统设置</li>
                <li><strong>管理员:</strong> 拥有所有权限，包括紧急控制和维护模式</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 交互示例 */}
      {selectedTab === 'interactive' && (
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>交互式按钮示例</h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>展示按钮的状态感知、确认提示和业务逻辑集成</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* 智能推荐操作 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>智能操作推荐</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                系统根据当前设备状态自动推荐最佳操作
              </p>
              
              {['stopped', 'running', 'error', 'paused'].map(status => {
                const { button: RecommendedButton, priority } = getRecommendedAction(status, 'chiller')
                return (
                  <div key={status} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    marginBottom: '12px',
                    padding: '12px',
                    background: priority === 'high' ? '#fff5f5' : priority === 'medium' ? '#fefce8' : '#f0f9ff',
                    borderRadius: '6px',
                    border: `1px solid ${priority === 'high' ? '#fecaca' : priority === 'medium' ? '#fef3c7' : '#bae6fd'}`
                  }}>
                    <span style={{ 
                      fontSize: '14px', 
                      minWidth: '80px',
                      fontWeight: '500'
                    }}>
                      {status}:
                    </span>
                    <RecommendedButton size="sm" />
                    <span style={{ 
                      fontSize: '12px', 
                      color: priority === 'high' ? '#dc2626' : priority === 'medium' ? '#d97706' : '#2563eb',
                      fontWeight: '500'
                    }}>
                      {priority} 优先级
                    </span>
                  </div>
                )
              })}
            </div>

            {/* 操作确认 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>操作确认机制</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                危险操作需要用户确认，点击查看确认提示
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <StopButton 
                  requireConfirm={true}
                  confirmMessage="确定要停止设备吗？设备停止后需要重新启动。"
                  label="停止 (需确认)"
                />
                <EmergencyButton 
                  requireConfirm={true}
                  confirmMessage="⚠️ 紧急停止将立即切断所有设备电源！\n这可能造成数据丢失，确定继续吗？"
                  label="紧急停止 (需确认)"
                />
                <ResetButton 
                  requireConfirm={true}
                  confirmMessage="重置设备将清除当前状态和缓存数据，确定继续吗？"
                  label="重置 (需确认)"
                />
              </div>
            </div>

            {/* 操作日志 */}
            <div style={{ 
              padding: '24px', 
              border: '1px solid #e5e5e5', 
              borderRadius: '8px',
              background: '#fff'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '16px', color: '#333' }}>操作日志记录</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                所有按钮操作都会记录到控制台（打开开发者工具查看）
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <StartButton 
                  onClick={() => console.log('用户执行启动操作', { user: 'admin', timestamp: new Date() })}
                  label="启动 (查看日志)"
                />
                <SettingsButton 
                  onClick={() => console.log('用户打开设置', { user: 'admin', timestamp: new Date() })}
                  label="设置 (查看日志)"
                />
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
        <h3 style={{ fontSize: '16px', marginBottom: '12px', color: '#333' }}>系统架构说明</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', lineHeight: '1.6' }}>
          <li><strong>Layer 1:</strong> 基于 Figma 设计规范的按钮基础设施 + Design Tokens</li>
          <li><strong>Layer 2:</strong> HVAC 业务语义按钮组件，集成图标系统和状态逻辑</li>
          <li><strong>Design Tokens:</strong> 统一的尺寸、颜色、状态和交互规范</li>
          <li><strong>业务语义:</strong> 权限控制、操作确认、智能推荐和日志记录</li>
          <li><strong>状态感知:</strong> 按钮根据设备状态和用户权限自动调整</li>
        </ul>
      </div>
    </div>
  )
}