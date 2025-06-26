/**
 * Contracts Integration for V4 App
 * 
 * 这个文件演示了如何在现有应用中集成contracts包
 * 提供了类型安全的数据验证和AI意图处理功能
 */

import { 
  AppIntentSchema, 
  AIResponseSchema,
  validators,
  type AppIntent,
  type AIResponse,
  type HVACDeviceCreateInput,
  type UserSignupInput,
  type MessageSendInput
} from 'contracts';

// ============================================================================
// AI意图处理器 - 连接AI输出和系统执行
// ============================================================================

export class IntentProcessor {
  /**
   * 处理AI输出的JSON，验证并执行相应的意图
   */
  static async processAIOutput(aiOutput: unknown): Promise<AIResponse> {
    try {
      // 第一步：验证AI输出格式
      const intentResult = validators.appIntent.safeValidate(aiOutput);
      
      if (!intentResult.success) {
        return {
          success: false,
          message: "AI输出格式无效",
          errors: intentResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        };
      }

      const intent = intentResult.data;
      
      // 第二步：根据意图类型执行相应操作
      const result = await this.executeIntent(intent);
      
      return {
        success: true,
        intent,
        message: `成功执行意图: ${intent.intent}`,
        metadata: {
          processingTime: Date.now(), // 简化的处理时间
          confidence: intent.metadata?.confidence,
        },
        ...result,
      };
      
    } catch (error) {
      return {
        success: false,
        message: `意图处理失败: ${error instanceof Error ? error.message : '未知错误'}`,
        errors: [{
          field: 'system',
          message: error instanceof Error ? error.message : '系统错误',
        }],
      };
    }
  }

  /**
   * 执行具体的意图操作
   */
  private static async executeIntent(intent: AppIntent): Promise<Partial<AIResponse>> {
    switch (intent.intent) {
      case 'CREATE_USER':
        return this.handleCreateUser(intent.payload);
      
      case 'CREATE_DEVICE':
        return this.handleCreateDevice(intent.payload);
      
      case 'CONTROL_HVAC':
        return this.handleControlHVAC(intent.payload);
      
      case 'QUERY_SYSTEM':
        return this.handleQuerySystem(intent.payload);
      
      case 'SEND_MESSAGE':
        return this.handleSendMessage(intent.payload);
      
      default:
        throw new Error(`未支持的意图类型: ${(intent as any).intent}`);
    }
  }

  private static async handleCreateUser(payload: UserSignupInput) {
    // 这里集成实际的用户创建逻辑
    console.log('创建用户:', payload);
    return {
      message: `用户 ${payload.username} 创建成功`,
      suggestions: ['设置用户头像', '配置通知偏好', '添加设备权限'],
    };
  }

  private static async handleCreateDevice(payload: HVACDeviceCreateInput) {
    // 这里集成实际的设备创建逻辑
    console.log('创建设备:', payload);
    return {
      message: `设备 ${payload.name} 在 ${payload.location} 创建成功`,
      suggestions: ['配置设备参数', '设置监控规则', '添加自动化'],
    };
  }

  private static async handleControlHVAC(payload: any) {
    console.log('控制HVAC:', payload);
    return {
      message: `HVAC控制指令已执行: ${payload.action}`,
    };
  }

  private static async handleQuerySystem(payload: any) {
    console.log('查询系统:', payload);
    // 这里返回模拟数据，实际应该查询真实数据
    return {
      message: `系统查询完成: ${payload.queryType}`,
      suggestions: ['查看详细报告', '导出数据', '设置监控警报'],
    };
  }

  private static async handleSendMessage(payload: MessageSendInput) {
    console.log('发送消息:', payload);
    return {
      message: `消息已发送给 ${payload.recipient}`,
    };
  }
}

// ============================================================================
// 表单验证助手 - 为UI组件提供验证功能
// ============================================================================

export class FormValidator {
  /**
   * 验证用户注册表单
   */
  static validateUserSignup(data: unknown) {
    return validators.userSignup.safeValidate(data);
  }

  /**
   * 验证设备创建表单
   */
  static validateDeviceCreate(data: unknown) {
    return validators.hvacDeviceCreate.safeValidate(data);
  }

  /**
   * 验证消息发送表单
   */
  static validateMessageSend(data: unknown) {
    return validators.messageSend.safeValidate(data);
  }

  /**
   * 通用验证方法
   */
  static validate<T>(data: unknown, validator: typeof validators[keyof typeof validators]) {
    const result = validator.safeValidate(data);
    return {
      isValid: result.success,
      errors: result.success ? [] : result.error.errors,
      data: result.success ? result.data : null,
    };
  }
}

// ============================================================================
// Hook 助手 - React Hook 集成
// ============================================================================

import { useState, useCallback } from 'react';

export function useIntentProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<AIResponse | null>(null);

  const processIntent = useCallback(async (aiOutput: unknown) => {
    setIsProcessing(true);
    try {
      const result = await IntentProcessor.processAIOutput(aiOutput);
      setLastResult(result);
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    processIntent,
    isProcessing,
    lastResult,
  };
}

export function useFormValidation<T>(validator: (data: unknown) => any) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validate = useCallback((data: T) => {
    const result = validator(data);
    
    if (result.success) {
      setErrors({});
      setIsValid(true);
      return result.data;
    } else {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err: any) => {
        const field = err.path.join('.');
        errorMap[field] = err.message;
      });
      setErrors(errorMap);
      setIsValid(false);
      return null;
    }
  }, [validator]);

  return {
    validate,
    errors,
    isValid,
    clearErrors: () => setErrors({}),
  };
}