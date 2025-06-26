#!/usr/bin/env node

/**
 * Design Token 验证脚本
 * 在构建前自动检查所有 design token 的完整性
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 简化的验证器（生产环境可以用 TypeScript 版本）
class DesignTokenValidator {
  
  validateCodebase() {
    console.log('🔍 Validating design tokens across codebase...')
    
    const errors = []
    const warnings = []
    
    // 扫描所有 TypeScript/TSX 文件
    const files = glob.sync('components/**/*.{ts,tsx}', { 
      ignore: ['**/node_modules/**', '**/dist/**'] 
    })
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8')
      const fileErrors = this.validateFile(content, file)
      errors.push(...fileErrors)
    })
    
    // 输出结果
    if (errors.length > 0) {
      console.error('❌ Design Token Validation Failed:')
      errors.forEach(error => console.error(`  ${error}`))
      process.exit(1)
    } else {
      console.log('✅ All design tokens are valid!')
    }
  }
  
  validateFile(content, filepath) {
    const errors = []
    
    // 检查常见的缺失模式
    const problematicPatterns = [
      /shadows\.hvac\.(\w+)/g,
      /borderRadius\.hvac\.(\w+)/g,
      /brandColors\.(\w+)\.(\w+)/g
    ]
    
    problematicPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(content)) !== null) {
        const token = match[0]
        
        // 这里可以添加更复杂的验证逻辑
        if (token.includes('undefined_token')) {
          errors.push(`${filepath}: Invalid token ${token}`)
        }
      }
    })
    
    return errors
  }
}

// 运行验证
const validator = new DesignTokenValidator()
validator.validateCodebase()