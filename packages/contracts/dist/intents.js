import { z } from 'zod';
import { UserSignupSchema, UserLoginSchema, HVACDeviceCreateSchema, HVACDeviceUpdateSchema, MessageSendSchema, SystemSettingsUpdateSchema } from './business.js';
// ============================================================================
// AI意图定义 Schema - 系统的"大脑"
// ============================================================================
// 用户管理意图
const CreateUserIntent = z.object({
    intent: z.literal('CREATE_USER'),
    payload: UserSignupSchema,
    metadata: z.object({
        source: z.enum(['ai', 'form', 'api']).default('ai'),
        confidence: z.number().min(0).max(1).optional(),
        timestamp: z.date().default(() => new Date()),
    }).optional(),
});
const LoginUserIntent = z.object({
    intent: z.literal('LOGIN_USER'),
    payload: UserLoginSchema,
    metadata: z.object({
        source: z.enum(['ai', 'form', 'api']).default('ai'),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
    }).optional(),
});
// HVAC设备管理意图
const CreateDeviceIntent = z.object({
    intent: z.literal('CREATE_DEVICE'),
    payload: HVACDeviceCreateSchema,
    metadata: z.object({
        installationNotes: z.string().optional(),
        installer: z.string().optional(),
    }).optional(),
});
const UpdateDeviceIntent = z.object({
    intent: z.literal('UPDATE_DEVICE'),
    payload: z.object({
        deviceId: z.string().uuid(),
        updates: HVACDeviceUpdateSchema,
    }),
    metadata: z.object({
        reason: z.string().optional(),
        operator: z.string().optional(),
    }).optional(),
});
const DeleteDeviceIntent = z.object({
    intent: z.literal('DELETE_DEVICE'),
    payload: z.object({
        deviceId: z.string().uuid(),
        confirmation: z.literal(true), // 强制确认删除
    }),
    metadata: z.object({
        reason: z.string().min(10, { message: "删除原因至少10个字符" }),
        operator: z.string().min(1, { message: "必须指定操作员" }),
    }),
});
// HVAC系统控制意图
const ControlHVACIntent = z.object({
    intent: z.literal('CONTROL_HVAC'),
    payload: z.object({
        action: z.enum(['turn_on', 'turn_off', 'set_temperature', 'set_mode', 'schedule']),
        targetDeviceId: z.string().uuid().optional(), // 可选，不指定则控制所有设备
        parameters: z.record(z.any()).optional(), // 灵活的参数对象
    }),
    metadata: z.object({
        priority: z.enum(['low', 'normal', 'high', 'emergency']).default('normal'),
        scheduledFor: z.date().optional(),
    }).optional(),
});
// 监控和查询意图
const QuerySystemIntent = z.object({
    intent: z.literal('QUERY_SYSTEM'),
    payload: z.object({
        queryType: z.enum([
            'device_status',
            'temperature_history',
            'power_consumption',
            'system_health',
            'user_activity',
            'alerts'
        ]),
        filters: z.object({
            deviceId: z.string().uuid().optional(),
            location: z.string().optional(),
            timeRange: z.object({
                start: z.date(),
                end: z.date(),
            }).optional(),
            limit: z.number().min(1).max(1000).default(50),
        }).optional(),
    }),
});
// 消息和通知意图
const SendMessageIntent = z.object({
    intent: z.literal('SEND_MESSAGE'),
    payload: MessageSendSchema,
    metadata: z.object({
        channel: z.enum(['email', 'sms', 'push', 'in_app']).default('in_app'),
        template: z.string().optional(),
    }).optional(),
});
const CreateAlertIntent = z.object({
    intent: z.literal('CREATE_ALERT'),
    payload: z.object({
        alertType: z.enum(['temperature_anomaly', 'device_offline', 'power_outage', 'maintenance_due']),
        message: z.string().min(1),
        severity: z.enum(['info', 'warning', 'error', 'critical']),
        affectedDevices: z.array(z.string().uuid()).optional(),
        autoResolve: z.boolean().default(false),
    }),
});
// 系统配置意图
const UpdateSettingsIntent = z.object({
    intent: z.literal('UPDATE_SETTINGS'),
    payload: SystemSettingsUpdateSchema,
    metadata: z.object({
        operator: z.string().min(1, { message: "必须指定操作员" }),
        approvalRequired: z.boolean().default(false),
    }).optional(),
});
// 数据分析意图
const AnalyzeDataIntent = z.object({
    intent: z.literal('ANALYZE_DATA'),
    payload: z.object({
        analysisType: z.enum([
            'energy_efficiency',
            'usage_patterns',
            'predictive_maintenance',
            'cost_optimization',
            'performance_trends'
        ]),
        parameters: z.object({
            timeFrame: z.enum(['day', 'week', 'month', 'quarter', 'year']).default('week'),
            includeForecasting: z.boolean().default(false),
            granularity: z.enum(['hourly', 'daily', 'weekly']).default('daily'),
        }).optional(),
    }),
});
// 自动化和调度意图
const CreateAutomationIntent = z.object({
    intent: z.literal('CREATE_AUTOMATION'),
    payload: z.object({
        name: z.string().min(1, { message: "自动化规则名称不能为空" }),
        description: z.string().optional(),
        trigger: z.object({
            type: z.enum(['time', 'temperature', 'occupancy', 'weather', 'manual']),
            conditions: z.record(z.any()), // 灵活的触发条件
        }),
        actions: z.array(z.object({
            deviceId: z.string().uuid(),
            action: z.string(),
            parameters: z.record(z.any()).optional(),
        })).min(1, { message: "至少需要一个执行动作" }),
        enabled: z.boolean().default(true),
    }),
});
// 组合所有意图 - 这是系统的核心Schema
export const AppIntentSchema = z.discriminatedUnion("intent", [
    // 用户管理
    CreateUserIntent,
    LoginUserIntent,
    // 设备管理
    CreateDeviceIntent,
    UpdateDeviceIntent,
    DeleteDeviceIntent,
    // 系统控制
    ControlHVACIntent,
    QuerySystemIntent,
    // 通信
    SendMessageIntent,
    CreateAlertIntent,
    // 配置
    UpdateSettingsIntent,
    // 分析
    AnalyzeDataIntent,
    // 自动化
    CreateAutomationIntent,
]);
// AI响应Schema - AI输出的标准格式
export const AIResponseSchema = z.object({
    success: z.boolean(),
    intent: AppIntentSchema.optional(),
    message: z.string().optional(),
    suggestions: z.array(z.string()).optional(),
    errors: z.array(z.object({
        field: z.string(),
        message: z.string(),
        code: z.string().optional(),
    })).optional(),
    metadata: z.object({
        processingTime: z.number().optional(),
        confidence: z.number().min(0).max(1).optional(),
        model: z.string().optional(),
    }).optional(),
});
// 意图处理结果Schema
export const IntentExecutionResultSchema = z.object({
    intentId: z.string().uuid(),
    status: z.enum(['pending', 'executing', 'completed', 'failed', 'cancelled']),
    result: z.any().optional(),
    error: z.string().optional(),
    executionTime: z.number().optional(),
    timestamp: z.date().default(() => new Date()),
});
