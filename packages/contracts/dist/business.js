import { z } from 'zod';
import { UserSchema, HVACDeviceSchema, MessageSchema, SystemSettingsSchema } from './base.js';
// ============================================================================
// 业务语义规则 Schema
// ============================================================================
// 业务常量
const BANNED_USERNAMES = ['admin', 'root', 'superuser', 'administrator', 'system', 'guest'];
const RESERVED_DEVICE_NAMES = ['system', 'default', 'main', 'primary'];
const MAX_DEVICES_PER_LOCATION = 10;
// 用户注册业务规则
export const UserSignupSchema = UserSchema
    .omit({ id: true, createdAt: true, updatedAt: true })
    .refine(data => !BANNED_USERNAMES.includes(data.username.toLowerCase()), {
    message: "该用户名不可用，请选择其他用户名",
    path: ["username"],
})
    .refine(data => /[A-Z]/.test(data.password) && /[0-9]/.test(data.password), {
    message: "密码必须包含至少一个大写字母和一个数字",
    path: ["password"],
})
    .refine(data => !/(.)\1{2,}/.test(data.password), {
    message: "密码不能包含3个或以上连续相同的字符",
    path: ["password"],
});
// 用户登录Schema
export const UserLoginSchema = z.object({
    identifier: z.string().min(1, { message: "请输入用户名或邮箱" }),
    password: z.string().min(1, { message: "请输入密码" }),
    rememberMe: z.boolean().default(false),
});
// HVAC设备创建业务规则
export const HVACDeviceCreateSchema = HVACDeviceSchema
    .omit({ id: true })
    .refine(data => !RESERVED_DEVICE_NAMES.includes(data.name.toLowerCase()), {
    message: "该设备名称为系统保留名称，请选择其他名称",
    path: ["name"],
})
    .refine(data => {
    // 如果是恒温器，必须有温度设置
    if (data.type === 'thermostat' && data.temperature === undefined) {
        return false;
    }
    return true;
}, {
    message: "恒温器必须设置初始温度",
    path: ["temperature"],
})
    .refine(data => {
    // 空调和加热器在运行状态时必须有功耗数据
    if ((data.type === 'air_conditioner' || data.type === 'heater') &&
        data.status === 'online' &&
        data.powerConsumption === undefined) {
        return false;
    }
    return true;
}, {
    message: "运行中的空调或加热器必须提供功耗数据",
    path: ["powerConsumption"],
});
// HVAC设备更新Schema
export const HVACDeviceUpdateSchema = HVACDeviceSchema
    .partial()
    .refine(data => {
    // 如果更新温度，必须在合理范围内
    if (data.temperature !== undefined) {
        const isHeater = data.type === 'heater';
        const isAC = data.type === 'air_conditioner';
        if (isHeater && data.temperature < 15) {
            return false;
        }
        if (isAC && data.temperature > 30) {
            return false;
        }
    }
    return true;
}, {
    message: "温度设置超出设备正常工作范围",
    path: ["temperature"],
});
// 消息发送业务规则
export const MessageSendSchema = MessageSchema
    .omit({ id: true, timestamp: true })
    .refine(data => data.sender !== data.recipient, {
    message: "不能给自己发送消息",
    path: ["recipient"],
})
    .refine(data => {
    // 紧急消息必须是警告或错误类型
    if (data.priority === 'urgent' && !['warning', 'error'].includes(data.type)) {
        return false;
    }
    return true;
}, {
    message: "紧急消息必须是警告或错误类型",
    path: ["type"],
});
// 系统设置更新业务规则
export const SystemSettingsUpdateSchema = SystemSettingsSchema
    .partial()
    .refine(data => {
    // 如果开启调试模式，必须是管理员权限（这里简化为检查特定条件）
    if (data.debugMode === true) {
        // 实际应用中这里会检查用户权限
        return true; // 暂时允许，实际应该检查权限
    }
    return true;
}, {
    message: "开启调试模式需要管理员权限",
    path: ["debugMode"],
});
// HVAC系统运行状态验证
export const HVACSystemStateSchema = z.object({
    devices: z.array(HVACDeviceSchema),
    overallStatus: z.enum(['normal', 'warning', 'critical']),
    totalPowerConsumption: z.number().min(0),
    averageTemperature: z.number(),
    systemEfficiency: z.number().min(0).max(100),
}).refine(data => {
    // 业务规则：如果有设备离线或维护中，系统状态不能是normal
    const hasOfflineDevices = data.devices.some(device => device.status === 'offline' || device.status === 'maintenance');
    if (hasOfflineDevices && data.overallStatus === 'normal') {
        return false;
    }
    return true;
}, {
    message: "系统中有设备离线或维护中时，整体状态不能为正常",
    path: ["overallStatus"],
});
// 设备位置验证（防止同一位置设备过多）
export const DeviceLocationSchema = z.object({
    location: z.string(),
    existingDeviceCount: z.number().min(0),
}).refine(data => data.existingDeviceCount < MAX_DEVICES_PER_LOCATION, {
    message: `每个位置最多只能安装${MAX_DEVICES_PER_LOCATION}个设备`,
    path: ["location"],
});
