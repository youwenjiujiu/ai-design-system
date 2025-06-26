/**
 * 图表标签系统演示页面
 * 
 * 展示所有标签组件的功能和用法示例
 * 基于 Figma 设计规范
 */

import React, { useState } from 'react'
import { 
  ValueLabel,
  RangeLabel,
  AxisLabel,
  DataPointLabel,
  Tooltip,
  formatNumber,
  formatRange,
  type NumberFormatOptions
} from '../ui-layer1/chart-labels'
import { type ChartSize, type Theme } from '../ui-layer1/design-tokens-simple'

export const ChartLabelsDemo: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark')
  const [size, setSize] = useState<ChartSize>('md')
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 200, y: 100 })

  const containerStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#0A0A0A' : '#FFFFFF',
    color: theme === 'dark' ? '#FFFFFF' : '#0A0A0A',
    minHeight: '100vh',
    padding: '24px',
    fontFamily: 'Scto Grotesk A, system-ui, sans-serif'
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: '32px',
    borderBottom: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`,
    paddingBottom: '16px'
  }

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '16px',
    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5F5',
    borderRadius: '8px'
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: '48px'
  }

  const sectionHeaderStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: theme === 'dark' ? '#FFFFFF' : '#0A0A0A'
  }

  const demoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px'
  }

  const demoItemStyle: React.CSSProperties = {
    padding: '24px',
    backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
    borderRadius: '8px',
    border: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`
  }

  const codeStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#0A0A0A' : '#F5F5F5',
    border: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}`,
    borderRadius: '4px',
    padding: '12px',
    fontFamily: 'monospace',
    fontSize: '12px',
    marginTop: '12px',
    overflow: 'auto'
  }

  // 格式化选项示例
  const formatOptions: NumberFormatOptions[] = [
    { precision: 1, unit: '°C' },
    { precision: 2, unit: '%', unitPosition: 'suffix' },
    { precision: 0, showThousands: true, unit: 'kW' },
    { precision: 1, rangeSeparator: ' ~ ' },
    { precision: 2, minThreshold: 0.1, maxThreshold: 100 }
  ]

  return (
    <div style={containerStyle}>
      {/* 页面标题 */}
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          Chart Labels Demo
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.7 }}>
          图表标签系统组件展示
        </p>
      </div>

      {/* 控制面板 */}
      <div style={controlsStyle}>
        <div>
          <label style={{ marginRight: '8px' }}>主题:</label>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as Theme)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div>
          <label style={{ marginRight: '8px' }}>尺寸:</label>
          <select 
            value={size} 
            onChange={(e) => setSize(e.target.value as ChartSize)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'dark' ? '#333' : '#fff',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px' }}>
            <input 
              type="checkbox" 
              checked={showTooltip} 
              onChange={(e) => setShowTooltip(e.target.checked)}
              style={{ marginRight: '4px' }}
            />
            显示工具提示
          </label>
        </div>
      </div>

      {/* 数值格式化演示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>数值格式化功能</h2>
        
        <div style={demoGridStyle}>
          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>基础数值格式化</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>原始值: 23.456789</div>
              <div>formatNumber(23.456789, {`{precision: 1}`}): <strong>{formatNumber(23.456789, { precision: 1 })}</strong></div>
              <div>formatNumber(23.456789, {`{precision: 2, unit: '°C'}`}): <strong>{formatNumber(23.456789, { precision: 2, unit: '°C' })}</strong></div>
              <div>formatNumber(1234.5, {`{showThousands: true}`}): <strong>{formatNumber(1234.5, { showThousands: true })}</strong></div>
            </div>
          </div>

          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>范围格式化</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>formatRange(1.12, 1.8): <strong>{formatRange(1.12, 1.8)}</strong></div>
              <div>formatRange(18, 28, {`{unit: '°C'}`}): <strong>{formatRange(18, 28, { unit: '°C' })}</strong></div>
              <div>formatRange(0.8, 1.4, {`{rangeSeparator: ' ~ '}`}): <strong>{formatRange(0.8, 1.4, { rangeSeparator: ' ~ ' })}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* 数值标签组件 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>ValueLabel 组件</h2>
        
        <div style={demoGridStyle}>
          {formatOptions.map((options, index) => (
            <div key={index} style={demoItemStyle}>
              <h3 style={{ marginTop: 0, fontSize: '16px' }}>示例 {index + 1}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <ValueLabel 
                  value={23.456} 
                  formatOptions={options}
                  size={size}
                  theme={theme}
                />
                <ValueLabel 
                  value={23.456} 
                  formatOptions={options}
                  size={size}
                  theme={theme}
                  bold
                />
              </div>
              <div style={codeStyle}>
                {`<ValueLabel value={23.456} formatOptions={${JSON.stringify(options)}} />`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 范围标签组件 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>RangeLabel 组件</h2>
        
        <div style={demoGridStyle}>
          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>温度范围</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <RangeLabel 
                min={18} 
                max={28} 
                formatOptions={{ precision: 1, unit: '°C' }}
                size={size}
                theme={theme}
              />
              <RangeLabel 
                min={18} 
                max={28} 
                formatOptions={{ precision: 1, unit: '°C' }}
                size={size}
                theme={theme}
                bold
                textAlign="left"
              />
            </div>
          </div>

          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>效率范围 (匹配 Figma SVG)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <RangeLabel 
                min={1.12} 
                max={1.8} 
                formatOptions={{ precision: 2 }}
                size={size}
                theme={theme}
              />
              <RangeLabel 
                min={0.8} 
                max={1.4} 
                formatOptions={{ precision: 1, rangeSeparator: ' ~ ' }}
                size={size}
                theme={theme}
              />
            </div>
          </div>

          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>功率范围</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <RangeLabel 
                min={1000} 
                max={5000} 
                formatOptions={{ precision: 0, showThousands: true, unit: 'W' }}
                size={size}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 坐标轴标签 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>AxisLabel 组件</h2>
        
        <div style={demoGridStyle}>
          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>X轴标签</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <AxisLabel value="0.8" axis="x" size={size} theme={theme} />
              <AxisLabel value="1.0" axis="x" size={size} theme={theme} />
              <AxisLabel value="1.2" axis="x" size={size} theme={theme} />
              <AxisLabel value="1.4" axis="x" size={size} theme={theme} />
            </div>
          </div>

          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>Y轴标签</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
              <AxisLabel value={100} axis="y" formatOptions={{ unit: '%' }} size={size} theme={theme} />
              <AxisLabel value={75} axis="y" formatOptions={{ unit: '%' }} size={size} theme={theme} />
              <AxisLabel value={50} axis="y" formatOptions={{ unit: '%' }} size={size} theme={theme} />
              <AxisLabel value={25} axis="y" formatOptions={{ unit: '%' }} size={size} theme={theme} />
              <AxisLabel value={0} axis="y" formatOptions={{ unit: '%' }} size={size} theme={theme} />
            </div>
          </div>

          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>旋转标签</h3>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', height: '60px' }}>
              <AxisLabel value="Long Label 1" axis="x" rotation={-45} size={size} theme={theme} />
              <AxisLabel value="Long Label 2" axis="x" rotation={-45} size={size} theme={theme} />
              <AxisLabel value="Long Label 3" axis="x" rotation={-45} size={size} theme={theme} />
            </div>
          </div>
        </div>
      </div>

      {/* SVG 数据点标签演示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>DataPointLabel 组件 (SVG)</h2>
        
        <div style={demoGridStyle}>
          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>基础数据点标签</h3>
            <svg width="300" height="150" style={{ border: `1px solid ${theme === 'dark' ? '#333' : '#E5E5E5'}` }}>
              <DataPointLabel 
                value={23.4} 
                x={50} 
                y={100} 
                formatOptions={{ precision: 1, unit: '°C' }}
                size={size}
                theme={theme}
              />
              <DataPointLabel 
                value={81} 
                x={150} 
                y={80} 
                formatOptions={{ precision: 0, unit: '%' }}
                size={size}
                theme={theme}
                background
              />
              <DataPointLabel 
                value={1.25} 
                x={250} 
                y={60} 
                formatOptions={{ precision: 2 }}
                size={size}
                theme={theme}
                background
                backgroundColor="#33A0FF20"
              />
              {/* 数据点圆圈 */}
              <circle cx={50} cy={100} r={4} fill="#33A0FF" />
              <circle cx={150} cy={80} r={4} fill="#67D75E" />
              <circle cx={250} cy={60} r={4} fill="#E5A156" />
            </svg>
          </div>
        </div>
      </div>

      {/* 工具提示演示 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Tooltip 组件</h2>
        
        <div style={demoGridStyle}>
          <div style={demoItemStyle}>
            <h3 style={{ marginTop: 0, fontSize: '16px' }}>交互式工具提示</h3>
            <div 
              style={{ 
                position: 'relative', 
                height: '200px', 
                backgroundColor: theme === 'dark' ? '#0A0A0A' : '#F0F0F0',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                setTooltipPosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top
                })
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: theme === 'dark' ? '#666' : '#999'
              }}>
                鼠标悬停显示工具提示
              </div>
              
              <Tooltip
                visible={showTooltip}
                x={tooltipPosition.x}
                y={tooltipPosition.y}
                title="实时数据"
                items={[
                  { label: '温度', value: 23.4, color: '#33A0FF', formatOptions: { precision: 1, unit: '°C' } },
                  { label: '湿度', value: 65, color: '#67D75E', formatOptions: { precision: 0, unit: '%' } },
                  { label: '效率', value: 1.25, color: '#E5A156', formatOptions: { precision: 2 } }
                ]}
                size={size}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 使用指南 */}
      <div style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>使用指南</h2>
        
        <div style={{
          padding: '24px',
          backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F9F9F9',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <h3 style={{ marginTop: 0 }}>图表标签系统特性</h3>
          <ul>
            <li><strong>ValueLabel</strong>: 单一数值标签，支持格式化和单位</li>
            <li><strong>RangeLabel</strong>: 数值范围标签，如 "1.12-1.8"</li>
            <li><strong>AxisLabel</strong>: 坐标轴标签，支持旋转和透明度</li>
            <li><strong>DataPointLabel</strong>: SVG数据点标签，支持背景和定位</li>
            <li><strong>Tooltip</strong>: 工具提示组件，支持多项数据展示</li>
          </ul>
          
          <h3>数值格式化功能</h3>
          <ul>
            <li>精度控制: precision 参数控制小数位数</li>
            <li>千分位分隔符: showThousands 参数</li>
            <li>单位支持: unit 和 unitPosition 参数</li>
            <li>范围分隔符: rangeSeparator 自定义</li>
            <li>阈值处理: minThreshold 和 maxThreshold</li>
          </ul>
          
          <h3>主题和尺寸</h3>
          <ul>
            <li>完整的明暗主题支持</li>
            <li>响应式尺寸系统 (sm/md/lg)</li>
            <li>基于设计令牌的一致性</li>
            <li>Scto Grotesk A 字体系统</li>
          </ul>
          
          <h3>集成方式</h3>
          <ul>
            <li>Layer 1 基础组件，可被所有图表使用</li>
            <li>TypeScript 类型安全</li>
            <li>事件回调支持</li>
            <li>自定义样式扩展</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ChartLabelsDemo