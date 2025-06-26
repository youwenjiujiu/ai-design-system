// ============================================================================
// Contracts Package - 系统的语义大脑
// ============================================================================
// 
// 这个包是整个Monorepo的"单一事实来源"(Single Source of Truth)
// 它定义了：
// 1. 基础数据验证规则
// 2. 业务语义和约束
// 3. AI意图处理Schema
// 
// 所有应用和包都应该导入并使用这里定义的Schema和类型
// ============================================================================

// 基础Schema和类型
export * from './base.js';

// 业务规则Schema和类型  
export * from './business.js';

// AI意图Schema和类型
export * from './intents.js';

// 便捷的Schema验证函数
export { z } from 'zod';

// 常用的Schema组合导出
import { 
  AppIntentSchema, 
  AIResponseSchema, 
  IntentExecutionResultSchema 
} from './intents.js';

import {
  UserSignupSchema,
  UserLoginSchema,
  HVACDeviceCreateSchema,
  HVACDeviceUpdateSchema,
  MessageSendSchema,
  SystemSettingsUpdateSchema,
  HVACSystemStateSchema
} from './business.js';

import {
  UserSchema,
  HVACDeviceSchema,
  MessageSchema,
  SystemSettingsSchema
} from './base.js';

// 导出常用Schema集合
export const Schemas = {
  // 基础Schema
  User: UserSchema,
  HVACDevice: HVACDeviceSchema,
  Message: MessageSchema,
  SystemSettings: SystemSettingsSchema,
  
  // 业务Schema
  UserSignup: UserSignupSchema,
  UserLogin: UserLoginSchema,
  HVACDeviceCreate: HVACDeviceCreateSchema,
  HVACDeviceUpdate: HVACDeviceUpdateSchema,
  MessageSend: MessageSendSchema,
  SystemSettingsUpdate: SystemSettingsUpdateSchema,
  HVACSystemState: HVACSystemStateSchema,
  
  // AI意图Schema
  AppIntent: AppIntentSchema,
  AIResponse: AIResponseSchema,
  IntentExecutionResult: IntentExecutionResultSchema,
};

// 验证函数工厂
import type { ZodSchema } from 'zod';

export const createValidator = <T extends ZodSchema>(schema: T) => {
  return {
    validate: (data: unknown) => schema.parse(data),
    safeValidate: (data: unknown) => schema.safeParse(data),
    isValid: (data: unknown) => schema.safeParse(data).success,
  };
};

// 常用验证器
export const validators = {
  user: createValidator(UserSchema),
  userSignup: createValidator(UserSignupSchema),
  userLogin: createValidator(UserLoginSchema),
  hvacDevice: createValidator(HVACDeviceSchema),
  hvacDeviceCreate: createValidator(HVACDeviceCreateSchema),
  hvacDeviceUpdate: createValidator(HVACDeviceUpdateSchema),
  message: createValidator(MessageSchema),
  messageSend: createValidator(MessageSendSchema),
  systemSettings: createValidator(SystemSettingsSchema),
  systemSettingsUpdate: createValidator(SystemSettingsUpdateSchema),
  appIntent: createValidator(AppIntentSchema),
  aiResponse: createValidator(AIResponseSchema),
  intentExecutionResult: createValidator(IntentExecutionResultSchema),
};

