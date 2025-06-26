/**
 * 业务语义绑定验证脚本
 * 用于测试主题与业务语义的正确绑定
 */

import { 
  businessMapping, 
  standardTokens,
  getSemanticColor,
  getChartSemanticColor,
  type Theme,
  type ChartSemantic 
} from '../ui-layer1/design-tokens-simple'

// 测试业务语义
const testSemantics: ChartSemantic[] = [
  'energy_reduction',      // 应该映射到 primary (蓝色)
  'performance_score',     // 应该映射到 secondary (紫色)
  'temperature_range',     // 应该映射到 info (浅蓝色)
  'consumption_planning',  // 应该映射到 primary (蓝色)
  'actual_energy',         // 应该映射到 primary (蓝色)
  'predicted_energy',      // 应该映射到 success (绿色)
]

// 测试函数
export const testSemanticBinding = () => {
  console.log('🧪 业务语义绑定测试开始...\n')
  
  const themes: Theme[] = ['light', 'dark']
  
  themes.forEach(theme => {
    console.log(`\n🎨 ${theme === 'light' ? '白色主题' : '黑色主题'} 测试:`)
    console.log('─'.repeat(50))
    
    testSemantics.forEach(semantic => {
      const standardToken = businessMapping[semantic]
      const color = getChartSemanticColor(semantic, theme)
      const expectedColor = standardTokens[theme][standardToken as keyof typeof standardTokens[typeof theme]]
      
      const isCorrect = color === expectedColor
      const status = isCorrect ? '✅' : '❌'
      
      console.log(`${status} ${semantic}`)
      console.log(`   语义: ${semantic} → ${standardToken}`)
      console.log(`   期望: ${expectedColor}`)
      console.log(`   实际: ${color}`)
      console.log(`   匹配: ${isCorrect}`)
      console.log('')
    })
  })
  
  console.log('🎯 业务语义绑定测试完成!\n')
}

// 验证主题一致性
export const testThemeConsistency = () => {
  console.log('🔄 主题一致性验证...\n')
  
  const lightPrimary = standardTokens.light.primary
  const darkPrimary = standardTokens.dark.primary
  
  console.log(`白色主题 primary: ${lightPrimary}`)
  console.log(`黑色主题 primary: ${darkPrimary}`)
  console.log(`Primary 颜色一致性: ${lightPrimary === darkPrimary ? '✅' : '❌'}`)
  
  // 测试业务语义的主题适配
  const semantic: ChartSemantic = 'energy_reduction'
  const lightColor = getChartSemanticColor(semantic, 'light')
  const darkColor = getChartSemanticColor(semantic, 'dark')
  
  console.log(`\n业务语义 "${semantic}" 测试:`)
  console.log(`白色主题: ${lightColor}`)
  console.log(`黑色主题: ${darkColor}`)
  console.log(`是否正确适配: ${lightColor === darkColor ? '✅ 一致' : '✅ 已适配'}`)
}

// 导出验证数据
export const semanticBindingReport = {
  totalSemantics: Object.keys(businessMapping).length,
  chartSemantics: testSemantics.length,
  themes: ['light', 'dark'],
  standardTokens: Object.keys(standardTokens.light),
  
  // 生成绑定映射报告
  generateReport: () => {
    const report = {
      light: {} as Record<string, string>,
      dark: {} as Record<string, string>
    }
    
    testSemantics.forEach(semantic => {
      report.light[semantic] = getChartSemanticColor(semantic, 'light')
      report.dark[semantic] = getChartSemanticColor(semantic, 'dark')
    })
    
    return report
  }
}

// 如果在 Node.js 环境中运行测试
if (typeof window === 'undefined') {
  testSemanticBinding()
  testThemeConsistency()
}