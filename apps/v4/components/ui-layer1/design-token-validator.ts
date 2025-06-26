/**
 * Design Token 验证器
 * 确保所有使用的 design token 都存在且遵循 shadcn 规范
 */

import { shadows, borderRadius, brandColors } from './design-tokens-simple'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export class DesignTokenValidator {
  
  /**
   * 验证所有 HVAC token 的完整性
   */
  validateHVACTokens(): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 验证 shadows.hvac 的所有必需属性
    const requiredShadowProperties = ['success', 'warning', 'danger', 'hover', 'subtle', 'focus', 'dropdown']
    requiredShadowProperties.forEach(prop => {
      if (!shadows.hvac?.[prop as keyof typeof shadows.hvac]) {
        errors.push(`Missing shadow token: shadows.hvac.${prop}`)
      }
    })

    // 验证 borderRadius.hvac 的所有必需属性
    const requiredBorderRadiusProperties = ['card', 'button', 'input', 'widget']
    requiredBorderRadiusProperties.forEach(prop => {
      if (!borderRadius.hvac?.[prop as keyof typeof borderRadius.hvac]) {
        errors.push(`Missing borderRadius token: borderRadius.hvac.${prop}`)
      }
    })

    // 验证 brandColors 的完整性
    if (!brandColors.neutral?.white) {
      errors.push(`Missing color token: brandColors.neutral.white`)
    }

    // 检查是否遵循 shadcn 原生值
    if (shadows.hvac?.success && shadows.hvac.success !== '0 1px 2px 0 rgb(0 0 0 / 0.05)') {
      warnings.push(`shadows.hvac.success should use shadcn shadow-sm value`)
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * 扫描代码中使用的 token 并验证存在性
   */
  validateTokenUsage(codeContent: string): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []

    // 匹配所有 token 引用模式
    const tokenPatterns = [
      /shadows\.hvac\.(\w+)/g,
      /borderRadius\.hvac\.(\w+)/g,
      /brandColors\.(\w+)\.(\w+)/g
    ]

    tokenPatterns.forEach(pattern => {
      let match
      while ((match = pattern.exec(codeContent)) !== null) {
        const tokenPath = match[0]
        
        // 验证 token 是否存在
        if (!this.tokenExists(tokenPath)) {
          errors.push(`Token not found: ${tokenPath}`)
        }
      }
    })

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }

  private tokenExists(tokenPath: string): boolean {
    try {
      const parts = tokenPath.split('.')
      let current: any = { shadows, borderRadius, brandColors }
      
      for (const part of parts) {
        current = current[part]
        if (current === undefined) {
          return false
        }
      }
      return true
    } catch {
      return false
    }
  }

  /**
   * 建议正确的 token 替代
   */
  suggestCorrection(missingToken: string): string[] {
    const suggestions: string[] = []
    
    if (missingToken.includes('shadows.hvac')) {
      suggestions.push('Use shadows.sm, shadows.md, or shadows.lg for shadcn compatibility')
      suggestions.push('Or define the missing HVAC shadow token')
    }
    
    if (missingToken.includes('borderRadius.hvac')) {
      suggestions.push('Use standard Tailwind radius: rounded-sm, rounded-md, rounded-lg')
      suggestions.push('Or define the missing HVAC borderRadius token')
    }

    return suggestions
  }
}

// 自动验证函数
export function validateDesignTokens(): void {
  const validator = new DesignTokenValidator()
  const result = validator.validateHVACTokens()
  
  if (!result.isValid) {
    console.error('❌ Design Token Validation Failed:')
    result.errors.forEach(error => console.error(`  - ${error}`))
  }
  
  if (result.warnings.length > 0) {
    console.warn('⚠️ Design Token Warnings:')
    result.warnings.forEach(warning => console.warn(`  - ${warning}`))
  }
  
  if (result.isValid && result.warnings.length === 0) {
    console.log('✅ Design Token Validation Passed')
  }
}

export const designTokenValidator = new DesignTokenValidator()