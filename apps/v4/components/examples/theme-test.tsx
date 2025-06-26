/**
 * 主题测试组件
 * 用于验证明暗主题切换效果和白色主题的 SVG 设计实现
 */

import React from 'react'
import { 
  themeTokens, 
  chartGradients, 
  standardTokens,
  businessMapping,
  getSemanticColor,
  getChartSemanticColor,
  type Theme,
  type ChartSemantic 
} from '../ui-layer1/design-tokens-simple'

interface ThemeTestProps {
  theme: Theme
}

export const ThemeTest: React.FC<ThemeTestProps> = ({ theme }) => {
  const currentTheme = themeTokens[theme]
  const backgroundGradient = chartGradients.themeSpecific[theme].backgroundGradient
  
  return (
    <div style={{
      padding: '24px',
      backgroundColor: currentTheme.background.primary,
      minHeight: '100vh',
      fontFamily: 'Scto Grotesk A, system-ui, sans-serif'
    }}>
      <h1 style={{
        color: currentTheme.foreground.primary,
        marginBottom: '32px'
      }}>
        {theme === 'light' ? '白色主题测试' : '黑色主题测试'}
      </h1>
      
      {/* 主题令牌展示 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* 背景色测试 */}
        <div style={{
          backgroundColor: currentTheme.background.elevated,
          border: `1px solid ${currentTheme.border.default}`,
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ color: currentTheme.foreground.primary, margin: '0 0 16px 0' }}>
            背景色系统
          </h3>
          <div style={{
            backgroundColor: currentTheme.background.primary,
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            主背景: {currentTheme.background.primary}
          </div>
          <div style={{
            backgroundColor: currentTheme.background.secondary,
            padding: '12px',
            marginBottom: '8px',
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            次要背景: {currentTheme.background.secondary}
          </div>
          <div style={{
            backgroundColor: currentTheme.background.elevated,
            padding: '12px',
            border: `1px solid ${currentTheme.border.muted}`,
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            浮层背景: {currentTheme.background.elevated}
          </div>
        </div>
        
        {/* 文字色测试 */}
        <div style={{
          backgroundColor: currentTheme.background.elevated,
          border: `1px solid ${currentTheme.border.default}`,
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h3 style={{ color: currentTheme.foreground.primary, margin: '0 0 16px 0' }}>
            文字色系统
          </h3>
          <div style={{
            color: currentTheme.foreground.primary,
            padding: '8px 0',
            borderBottom: `1px solid ${currentTheme.border.muted}`
          }}>
            主要文本 - {currentTheme.foreground.primary}
          </div>
          <div style={{
            color: currentTheme.foreground.secondary,
            padding: '8px 0',
            borderBottom: `1px solid ${currentTheme.border.muted}`
          }}>
            次要文本 - {currentTheme.foreground.secondary}
          </div>
          <div style={{
            color: currentTheme.foreground.muted,
            padding: '8px 0'
          }}>
            静默文本 - {currentTheme.foreground.muted}
          </div>
        </div>
      </div>
      
      {/* SVG 白色主题渐变测试 */}
      {theme === 'light' && (
        <div style={{
          backgroundColor: currentTheme.background.elevated,
          border: `1px solid ${currentTheme.border.default}`,
          borderRadius: '10px',  // SVG: rx="10"
          padding: '20px',
          marginBottom: '32px'
        }}>
          <h3 style={{ color: currentTheme.foreground.primary, margin: '0 0 16px 0' }}>
            白色主题 SVG 渐变效果
          </h3>
          
          {/* 模拟 SVG 背景渐变 */}
          <div style={{
            width: '195px',
            height: '195px',
            borderRadius: '10px',
            background: `
              radial-gradient(
                circle at center,
                #FFC4B2 0%,
                #CED0FF 51%,
                #7DC7FF 100%
              )
            `,
            opacity: 0.05,  // SVG: fill-opacity="0.05"
            position: 'relative',
            margin: '20px auto'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              color: currentTheme.foreground.primary,
              fontSize: '14px',
              fontWeight: '500'
            }}>
              SVG 渐变背景效果
            </div>
          </div>
          
          {/* 发光线条效果 */}
          <div style={{
            width: '195px',
            height: '3px',
            margin: '20px auto',
            background: `linear-gradient(to right, #FFF7B7 0%, white 100%)`,
            borderRadius: '2px',
            filter: 'blur(1px)',
            opacity: 0.8
          }} />
          
          <p style={{
            color: currentTheme.foreground.secondary,
            textAlign: 'center',
            fontSize: '12px',
            margin: '16px 0 0 0'
          }}>
            基于 SVG 设计的白色主题效果 (23800:5911)
          </p>
        </div>
      )}
      
      {/* 边框和分割线测试 */}
      <div style={{
        backgroundColor: currentTheme.background.elevated,
        border: `1px solid ${currentTheme.border.default}`,
        borderRadius: '8px',
        padding: '20px'
      }}>
        <h3 style={{ color: currentTheme.foreground.primary, margin: '0 0 16px 0' }}>
          边框系统测试
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            padding: '12px',
            border: `1px solid ${currentTheme.border.default}`,
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            默认边框
          </div>
          
          <div style={{
            padding: '12px',
            border: `1px solid ${currentTheme.border.muted}`,
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            静默边框
          </div>
          
          <div style={{
            padding: '12px',
            border: `2px solid ${currentTheme.border.accent}`,
            borderRadius: '4px',
            color: currentTheme.foreground.primary
          }}>
            强调边框
          </div>
        </div>
      </div>
      
      {/* 业务语义绑定测试 */}
      <div style={{
        backgroundColor: currentTheme.background.elevated,
        border: `1px solid ${currentTheme.border.default}`,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '32px'
      }}>
        <h3 style={{ color: currentTheme.foreground.primary, margin: '0 0 16px 0' }}>
          业务语义绑定测试
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {/* 图表语义测试 */}
          {Object.entries({
            'energy_reduction': '能耗降低',
            'performance_score': '性能评分', 
            'temperature_range': '温度范围',
            'consumption_planning': '消耗规划',
            'actual_energy': '实际能耗',
            'predicted_energy': '预测能耗'
          }).map(([semantic, label]) => {
            const color = getChartSemanticColor(semantic as ChartSemantic, theme)
            const standardToken = businessMapping[semantic as keyof typeof businessMapping]
            
            return (
              <div key={semantic} style={{
                padding: '12px',
                border: `2px solid ${color}`,
                borderRadius: '6px',
                backgroundColor: `${color}10`, // 10% 透明度背景
                color: currentTheme.foreground.primary
              }}>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '12px', color: currentTheme.foreground.muted }}>
                  {semantic} → {standardToken}
                </div>
                <div style={{ 
                  fontSize: '10px', 
                  color: color,
                  fontFamily: 'monospace',
                  marginTop: '4px'
                }}>
                  {color}
                </div>
              </div>
            )
          })}
        </div>
        
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: currentTheme.background.secondary,
          borderRadius: '4px',
          color: currentTheme.foreground.secondary,
          fontSize: '12px'
        }}>
          💡 提示: 不同主题下相同的业务语义会自动映射到适合该主题的颜色，确保最佳的视觉对比度。
        </div>
      </div>

      {/* 主题对比信息 */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        backgroundColor: currentTheme.background.secondary,
        borderRadius: '8px',
        border: `1px solid ${currentTheme.border.muted}`
      }}>
        <h4 style={{
          color: currentTheme.foreground.primary,
          margin: '0 0 12px 0'
        }}>
          当前主题信息
        </h4>
        <ul style={{
          color: currentTheme.foreground.secondary,
          margin: 0,
          paddingLeft: '20px'
        }}>
          <li>主题模式: {theme === 'light' ? '白色主题' : '黑色主题'}</li>
          <li>设计基准: {theme === 'light' ? 'SVG 23800:5911' : '现有黑色主题'}</li>
          <li>背景系统: {theme === 'light' ? '淡蓝色基调 (rgba(45, 62, 127, 0.05))' : '纯黑基调'}</li>
          <li>文字对比: {theme === 'light' ? '黑色文字，高对比度' : '白色文字，柔和过渡'}</li>
          <li>语义映射: {Object.keys(businessMapping).length} 个业务语义已绑定</li>
        </ul>
      </div>
    </div>
  )
}

export default ThemeTest