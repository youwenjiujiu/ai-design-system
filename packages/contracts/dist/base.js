import { z } from 'zod';
// ============================================================================
// 基础数据验证 Schema
// ============================================================================
// 用户相关Schema
export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    username: z.string()
        .min(3, { message: "用户名至少3个字符" })
        .max(20, { message: "用户名不能超过20个字符" })
        .regex(/^[a-zA-Z0-9_-]+$/, { message: "用户名只能包含字母、数字、下划线和连字符" }),
    email: z.string()
        .email({ message: "请输入有效的邮箱地址" }),
    password: z.string()
        .min(8, { message: "密码长度不能少于8位" })
        .max(128, { message: "密码长度不能超过128位" }),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});
// HVAC设备相关Schema
export const HVACDeviceSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, { message: "设备名称不能为空" }),
    type: z.enum(['air_conditioner', 'heater', 'ventilator', 'thermostat'], {
        errorMap: () => ({ message: "无效的设备类型" })
    }),
    location: z.string().min(1, { message: "设备位置不能为空" }),
    status: z.enum(['online', 'offline', 'maintenance'], {
        errorMap: () => ({ message: "无效的设备状态" })
    }),
    temperature: z.number()
        .min(-50, { message: "温度不能低于-50°C" })
        .max(80, { message: "温度不能高于80°C" })
        .optional(),
    humidity: z.number()
        .min(0, { message: "湿度不能低于0%" })
        .max(100, { message: "湿度不能高于100%" })
        .optional(),
    powerConsumption: z.number()
        .min(0, { message: "功耗不能为负数" })
        .optional(),
});
// 消息/通知Schema
export const MessageSchema = z.object({
    id: z.string().uuid().optional(),
    content: z.string()
        .min(1, { message: "消息内容不能为空" })
        .max(1000, { message: "消息内容不能超过1000字符" }),
    sender: z.string().min(1, { message: "发送者不能为空" }),
    recipient: z.string().min(1, { message: "接收者不能为空" }),
    timestamp: z.date().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent'], {
        errorMap: () => ({ message: "无效的优先级" })
    }).default('medium'),
    type: z.enum(['info', 'warning', 'error', 'success'], {
        errorMap: () => ({ message: "无效的消息类型" })
    }).default('info'),
});
// 系统设置Schema
export const SystemSettingsSchema = z.object({
    theme: z.enum(['light', 'dark', 'auto'], {
        errorMap: () => ({ message: "无效的主题设置" })
    }).default('auto'),
    language: z.enum(['zh-CN', 'en-US'], {
        errorMap: () => ({ message: "不支持的语言" })
    }).default('zh-CN'),
    notifications: z.object({
        email: z.boolean().default(true),
        push: z.boolean().default(true),
        sms: z.boolean().default(false),
    }).default({}),
    autoSave: z.boolean().default(true),
    debugMode: z.boolean().default(false),
});
