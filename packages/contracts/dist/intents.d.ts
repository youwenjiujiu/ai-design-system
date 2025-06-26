import { z } from 'zod';
declare const CreateUserIntent: z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_USER">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        username: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
    }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
        confidence: z.ZodOptional<z.ZodNumber>;
        timestamp: z.ZodDefault<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        source: "ai" | "form" | "api";
        confidence?: number | undefined;
    }, {
        timestamp?: Date | undefined;
        source?: "ai" | "form" | "api" | undefined;
        confidence?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_USER";
    payload: {
        username: string;
        email: string;
        password: string;
    };
    metadata?: {
        timestamp: Date;
        source: "ai" | "form" | "api";
        confidence?: number | undefined;
    } | undefined;
}, {
    intent: "CREATE_USER";
    payload: {
        username: string;
        email: string;
        password: string;
    };
    metadata?: {
        timestamp?: Date | undefined;
        source?: "ai" | "form" | "api" | undefined;
        confidence?: number | undefined;
    } | undefined;
}>;
declare const LoginUserIntent: z.ZodObject<{
    intent: z.ZodLiteral<"LOGIN_USER">;
    payload: z.ZodObject<{
        identifier: z.ZodString;
        password: z.ZodString;
        rememberMe: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        password: string;
        identifier: string;
        rememberMe: boolean;
    }, {
        password: string;
        identifier: string;
        rememberMe?: boolean | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
        ipAddress: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: "ai" | "form" | "api";
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    }, {
        source?: "ai" | "form" | "api" | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "LOGIN_USER";
    payload: {
        password: string;
        identifier: string;
        rememberMe: boolean;
    };
    metadata?: {
        source: "ai" | "form" | "api";
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
}, {
    intent: "LOGIN_USER";
    payload: {
        password: string;
        identifier: string;
        rememberMe?: boolean | undefined;
    };
    metadata?: {
        source?: "ai" | "form" | "api" | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
}>;
declare const CreateDeviceIntent: z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_DEVICE">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        type: z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
        location: z.ZodString;
        status: z.ZodEnum<["online", "offline", "maintenance"]>;
        temperature: z.ZodOptional<z.ZodNumber>;
        humidity: z.ZodOptional<z.ZodNumber>;
        powerConsumption: z.ZodOptional<z.ZodNumber>;
    }, "id">, "strip", z.ZodTypeAny, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        installationNotes: z.ZodOptional<z.ZodString>;
        installer: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    }, {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_DEVICE";
    payload: {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    };
    metadata?: {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    } | undefined;
}, {
    intent: "CREATE_DEVICE";
    payload: {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    };
    metadata?: {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    } | undefined;
}>;
declare const UpdateDeviceIntent: z.ZodObject<{
    intent: z.ZodLiteral<"UPDATE_DEVICE">;
    payload: z.ZodObject<{
        deviceId: z.ZodString;
        updates: z.ZodEffects<z.ZodObject<{
            id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
            location: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["online", "offline", "maintenance"]>>;
            temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            humidity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            powerConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    }, {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        reason: z.ZodOptional<z.ZodString>;
        operator: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason?: string | undefined;
        operator?: string | undefined;
    }, {
        reason?: string | undefined;
        operator?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "UPDATE_DEVICE";
    payload: {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    };
    metadata?: {
        reason?: string | undefined;
        operator?: string | undefined;
    } | undefined;
}, {
    intent: "UPDATE_DEVICE";
    payload: {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    };
    metadata?: {
        reason?: string | undefined;
        operator?: string | undefined;
    } | undefined;
}>;
declare const DeleteDeviceIntent: z.ZodObject<{
    intent: z.ZodLiteral<"DELETE_DEVICE">;
    payload: z.ZodObject<{
        deviceId: z.ZodString;
        confirmation: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        deviceId: string;
        confirmation: true;
    }, {
        deviceId: string;
        confirmation: true;
    }>;
    metadata: z.ZodObject<{
        reason: z.ZodString;
        operator: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        operator: string;
    }, {
        reason: string;
        operator: string;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "DELETE_DEVICE";
    payload: {
        deviceId: string;
        confirmation: true;
    };
    metadata: {
        reason: string;
        operator: string;
    };
}, {
    intent: "DELETE_DEVICE";
    payload: {
        deviceId: string;
        confirmation: true;
    };
    metadata: {
        reason: string;
        operator: string;
    };
}>;
declare const ControlHVACIntent: z.ZodObject<{
    intent: z.ZodLiteral<"CONTROL_HVAC">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["turn_on", "turn_off", "set_temperature", "set_mode", "schedule"]>;
        targetDeviceId: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    }, {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "emergency"]>>;
        scheduledFor: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        priority: "low" | "high" | "normal" | "emergency";
        scheduledFor?: Date | undefined;
    }, {
        priority?: "low" | "high" | "normal" | "emergency" | undefined;
        scheduledFor?: Date | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CONTROL_HVAC";
    payload: {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    };
    metadata?: {
        priority: "low" | "high" | "normal" | "emergency";
        scheduledFor?: Date | undefined;
    } | undefined;
}, {
    intent: "CONTROL_HVAC";
    payload: {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    };
    metadata?: {
        priority?: "low" | "high" | "normal" | "emergency" | undefined;
        scheduledFor?: Date | undefined;
    } | undefined;
}>;
declare const QuerySystemIntent: z.ZodObject<{
    intent: z.ZodLiteral<"QUERY_SYSTEM">;
    payload: z.ZodObject<{
        queryType: z.ZodEnum<["device_status", "temperature_history", "power_consumption", "system_health", "user_activity", "alerts"]>;
        filters: z.ZodOptional<z.ZodObject<{
            deviceId: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            timeRange: z.ZodOptional<z.ZodObject<{
                start: z.ZodDate;
                end: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                start: Date;
                end: Date;
            }, {
                start: Date;
                end: Date;
            }>>;
            limit: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        }, {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        } | undefined;
    }, {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "QUERY_SYSTEM";
    payload: {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        } | undefined;
    };
}, {
    intent: "QUERY_SYSTEM";
    payload: {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        } | undefined;
    };
}>;
declare const SendMessageIntent: z.ZodObject<{
    intent: z.ZodLiteral<"SEND_MESSAGE">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
        sender: z.ZodString;
        recipient: z.ZodString;
        timestamp: z.ZodOptional<z.ZodDate>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
        type: z.ZodDefault<z.ZodEnum<["info", "warning", "error", "success"]>>;
    }, "id" | "timestamp">, "strip", z.ZodTypeAny, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        channel: z.ZodDefault<z.ZodEnum<["email", "sms", "push", "in_app"]>>;
        template: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        channel: "email" | "push" | "sms" | "in_app";
        template?: string | undefined;
    }, {
        channel?: "email" | "push" | "sms" | "in_app" | undefined;
        template?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "SEND_MESSAGE";
    payload: {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    };
    metadata?: {
        channel: "email" | "push" | "sms" | "in_app";
        template?: string | undefined;
    } | undefined;
}, {
    intent: "SEND_MESSAGE";
    payload: {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    };
    metadata?: {
        channel?: "email" | "push" | "sms" | "in_app" | undefined;
        template?: string | undefined;
    } | undefined;
}>;
declare const CreateAlertIntent: z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_ALERT">;
    payload: z.ZodObject<{
        alertType: z.ZodEnum<["temperature_anomaly", "device_offline", "power_outage", "maintenance_due"]>;
        message: z.ZodString;
        severity: z.ZodEnum<["info", "warning", "error", "critical"]>;
        affectedDevices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        autoResolve: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        autoResolve: boolean;
        affectedDevices?: string[] | undefined;
    }, {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        affectedDevices?: string[] | undefined;
        autoResolve?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_ALERT";
    payload: {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        autoResolve: boolean;
        affectedDevices?: string[] | undefined;
    };
}, {
    intent: "CREATE_ALERT";
    payload: {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        affectedDevices?: string[] | undefined;
        autoResolve?: boolean | undefined;
    };
}>;
declare const UpdateSettingsIntent: z.ZodObject<{
    intent: z.ZodLiteral<"UPDATE_SETTINGS">;
    payload: z.ZodEffects<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodEnum<["zh-CN", "en-US"]>>>;
        notifications: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            push: z.ZodDefault<z.ZodBoolean>;
            sms: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
        }, {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        }>>>;
        autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        debugMode: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }>, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        operator: z.ZodString;
        approvalRequired: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        operator: string;
        approvalRequired: boolean;
    }, {
        operator: string;
        approvalRequired?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "UPDATE_SETTINGS";
    payload: {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    };
    metadata?: {
        operator: string;
        approvalRequired: boolean;
    } | undefined;
}, {
    intent: "UPDATE_SETTINGS";
    payload: {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    };
    metadata?: {
        operator: string;
        approvalRequired?: boolean | undefined;
    } | undefined;
}>;
declare const AnalyzeDataIntent: z.ZodObject<{
    intent: z.ZodLiteral<"ANALYZE_DATA">;
    payload: z.ZodObject<{
        analysisType: z.ZodEnum<["energy_efficiency", "usage_patterns", "predictive_maintenance", "cost_optimization", "performance_trends"]>;
        parameters: z.ZodOptional<z.ZodObject<{
            timeFrame: z.ZodDefault<z.ZodEnum<["day", "week", "month", "quarter", "year"]>>;
            includeForecasting: z.ZodDefault<z.ZodBoolean>;
            granularity: z.ZodDefault<z.ZodEnum<["hourly", "daily", "weekly"]>>;
        }, "strip", z.ZodTypeAny, {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        }, {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        } | undefined;
    }, {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "ANALYZE_DATA";
    payload: {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        } | undefined;
    };
}, {
    intent: "ANALYZE_DATA";
    payload: {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        } | undefined;
    };
}>;
declare const CreateAutomationIntent: z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_AUTOMATION">;
    payload: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        trigger: z.ZodObject<{
            type: z.ZodEnum<["time", "temperature", "occupancy", "weather", "manual"]>;
            conditions: z.ZodRecord<z.ZodString, z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        }, {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            deviceId: z.ZodString;
            action: z.ZodString;
            parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }, {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }>, "many">;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        enabled: boolean;
        description?: string | undefined;
    }, {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        description?: string | undefined;
        enabled?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_AUTOMATION";
    payload: {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        enabled: boolean;
        description?: string | undefined;
    };
}, {
    intent: "CREATE_AUTOMATION";
    payload: {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        description?: string | undefined;
        enabled?: boolean | undefined;
    };
}>;
export declare const AppIntentSchema: z.ZodDiscriminatedUnion<"intent", [z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_USER">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        username: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        createdAt: z.ZodOptional<z.ZodDate>;
        updatedAt: z.ZodOptional<z.ZodDate>;
    }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>, {
        username: string;
        email: string;
        password: string;
    }, {
        username: string;
        email: string;
        password: string;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
        confidence: z.ZodOptional<z.ZodNumber>;
        timestamp: z.ZodDefault<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        timestamp: Date;
        source: "ai" | "form" | "api";
        confidence?: number | undefined;
    }, {
        timestamp?: Date | undefined;
        source?: "ai" | "form" | "api" | undefined;
        confidence?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_USER";
    payload: {
        username: string;
        email: string;
        password: string;
    };
    metadata?: {
        timestamp: Date;
        source: "ai" | "form" | "api";
        confidence?: number | undefined;
    } | undefined;
}, {
    intent: "CREATE_USER";
    payload: {
        username: string;
        email: string;
        password: string;
    };
    metadata?: {
        timestamp?: Date | undefined;
        source?: "ai" | "form" | "api" | undefined;
        confidence?: number | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"LOGIN_USER">;
    payload: z.ZodObject<{
        identifier: z.ZodString;
        password: z.ZodString;
        rememberMe: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        password: string;
        identifier: string;
        rememberMe: boolean;
    }, {
        password: string;
        identifier: string;
        rememberMe?: boolean | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
        ipAddress: z.ZodOptional<z.ZodString>;
        userAgent: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        source: "ai" | "form" | "api";
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    }, {
        source?: "ai" | "form" | "api" | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "LOGIN_USER";
    payload: {
        password: string;
        identifier: string;
        rememberMe: boolean;
    };
    metadata?: {
        source: "ai" | "form" | "api";
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
}, {
    intent: "LOGIN_USER";
    payload: {
        password: string;
        identifier: string;
        rememberMe?: boolean | undefined;
    };
    metadata?: {
        source?: "ai" | "form" | "api" | undefined;
        ipAddress?: string | undefined;
        userAgent?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_DEVICE">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        type: z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
        location: z.ZodString;
        status: z.ZodEnum<["online", "offline", "maintenance"]>;
        temperature: z.ZodOptional<z.ZodNumber>;
        humidity: z.ZodOptional<z.ZodNumber>;
        powerConsumption: z.ZodOptional<z.ZodNumber>;
    }, "id">, "strip", z.ZodTypeAny, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        installationNotes: z.ZodOptional<z.ZodString>;
        installer: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    }, {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_DEVICE";
    payload: {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    };
    metadata?: {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    } | undefined;
}, {
    intent: "CREATE_DEVICE";
    payload: {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    };
    metadata?: {
        installationNotes?: string | undefined;
        installer?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"UPDATE_DEVICE">;
    payload: z.ZodObject<{
        deviceId: z.ZodString;
        updates: z.ZodEffects<z.ZodObject<{
            id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            name: z.ZodOptional<z.ZodString>;
            type: z.ZodOptional<z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
            location: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["online", "offline", "maintenance"]>>;
            temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            humidity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            powerConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    }, {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        reason: z.ZodOptional<z.ZodString>;
        operator: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        reason?: string | undefined;
        operator?: string | undefined;
    }, {
        reason?: string | undefined;
        operator?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "UPDATE_DEVICE";
    payload: {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    };
    metadata?: {
        reason?: string | undefined;
        operator?: string | undefined;
    } | undefined;
}, {
    intent: "UPDATE_DEVICE";
    payload: {
        deviceId: string;
        updates: {
            id?: string | undefined;
            type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
            status?: "online" | "offline" | "maintenance" | undefined;
            name?: string | undefined;
            location?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
    };
    metadata?: {
        reason?: string | undefined;
        operator?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"DELETE_DEVICE">;
    payload: z.ZodObject<{
        deviceId: z.ZodString;
        confirmation: z.ZodLiteral<true>;
    }, "strip", z.ZodTypeAny, {
        deviceId: string;
        confirmation: true;
    }, {
        deviceId: string;
        confirmation: true;
    }>;
    metadata: z.ZodObject<{
        reason: z.ZodString;
        operator: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reason: string;
        operator: string;
    }, {
        reason: string;
        operator: string;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "DELETE_DEVICE";
    payload: {
        deviceId: string;
        confirmation: true;
    };
    metadata: {
        reason: string;
        operator: string;
    };
}, {
    intent: "DELETE_DEVICE";
    payload: {
        deviceId: string;
        confirmation: true;
    };
    metadata: {
        reason: string;
        operator: string;
    };
}>, z.ZodObject<{
    intent: z.ZodLiteral<"CONTROL_HVAC">;
    payload: z.ZodObject<{
        action: z.ZodEnum<["turn_on", "turn_off", "set_temperature", "set_mode", "schedule"]>;
        targetDeviceId: z.ZodOptional<z.ZodString>;
        parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    }, {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "emergency"]>>;
        scheduledFor: z.ZodOptional<z.ZodDate>;
    }, "strip", z.ZodTypeAny, {
        priority: "low" | "high" | "normal" | "emergency";
        scheduledFor?: Date | undefined;
    }, {
        priority?: "low" | "high" | "normal" | "emergency" | undefined;
        scheduledFor?: Date | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "CONTROL_HVAC";
    payload: {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    };
    metadata?: {
        priority: "low" | "high" | "normal" | "emergency";
        scheduledFor?: Date | undefined;
    } | undefined;
}, {
    intent: "CONTROL_HVAC";
    payload: {
        action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
        targetDeviceId?: string | undefined;
        parameters?: Record<string, any> | undefined;
    };
    metadata?: {
        priority?: "low" | "high" | "normal" | "emergency" | undefined;
        scheduledFor?: Date | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"QUERY_SYSTEM">;
    payload: z.ZodObject<{
        queryType: z.ZodEnum<["device_status", "temperature_history", "power_consumption", "system_health", "user_activity", "alerts"]>;
        filters: z.ZodOptional<z.ZodObject<{
            deviceId: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            timeRange: z.ZodOptional<z.ZodObject<{
                start: z.ZodDate;
                end: z.ZodDate;
            }, "strip", z.ZodTypeAny, {
                start: Date;
                end: Date;
            }, {
                start: Date;
                end: Date;
            }>>;
            limit: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        }, {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        } | undefined;
    }, {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "QUERY_SYSTEM";
    payload: {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            limit: number;
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
        } | undefined;
    };
}, {
    intent: "QUERY_SYSTEM";
    payload: {
        queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
        filters?: {
            location?: string | undefined;
            deviceId?: string | undefined;
            timeRange?: {
                start: Date;
                end: Date;
            } | undefined;
            limit?: number | undefined;
        } | undefined;
    };
}>, z.ZodObject<{
    intent: z.ZodLiteral<"SEND_MESSAGE">;
    payload: z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
        id: z.ZodOptional<z.ZodString>;
        content: z.ZodString;
        sender: z.ZodString;
        recipient: z.ZodString;
        timestamp: z.ZodOptional<z.ZodDate>;
        priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
        type: z.ZodDefault<z.ZodEnum<["info", "warning", "error", "success"]>>;
    }, "id" | "timestamp">, "strip", z.ZodTypeAny, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    }, {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        channel: z.ZodDefault<z.ZodEnum<["email", "sms", "push", "in_app"]>>;
        template: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        channel: "email" | "push" | "sms" | "in_app";
        template?: string | undefined;
    }, {
        channel?: "email" | "push" | "sms" | "in_app" | undefined;
        template?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "SEND_MESSAGE";
    payload: {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
    };
    metadata?: {
        channel: "email" | "push" | "sms" | "in_app";
        template?: string | undefined;
    } | undefined;
}, {
    intent: "SEND_MESSAGE";
    payload: {
        content: string;
        sender: string;
        recipient: string;
        type?: "info" | "warning" | "error" | "success" | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    };
    metadata?: {
        channel?: "email" | "push" | "sms" | "in_app" | undefined;
        template?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_ALERT">;
    payload: z.ZodObject<{
        alertType: z.ZodEnum<["temperature_anomaly", "device_offline", "power_outage", "maintenance_due"]>;
        message: z.ZodString;
        severity: z.ZodEnum<["info", "warning", "error", "critical"]>;
        affectedDevices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        autoResolve: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        autoResolve: boolean;
        affectedDevices?: string[] | undefined;
    }, {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        affectedDevices?: string[] | undefined;
        autoResolve?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_ALERT";
    payload: {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        autoResolve: boolean;
        affectedDevices?: string[] | undefined;
    };
}, {
    intent: "CREATE_ALERT";
    payload: {
        message: string;
        alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
        severity: "info" | "warning" | "error" | "critical";
        affectedDevices?: string[] | undefined;
        autoResolve?: boolean | undefined;
    };
}>, z.ZodObject<{
    intent: z.ZodLiteral<"UPDATE_SETTINGS">;
    payload: z.ZodEffects<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
        language: z.ZodOptional<z.ZodDefault<z.ZodEnum<["zh-CN", "en-US"]>>>;
        notifications: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            email: z.ZodDefault<z.ZodBoolean>;
            push: z.ZodDefault<z.ZodBoolean>;
            sms: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
        }, {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        }>>>;
        autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        debugMode: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }>, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }, {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    }>;
    metadata: z.ZodOptional<z.ZodObject<{
        operator: z.ZodString;
        approvalRequired: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        operator: string;
        approvalRequired: boolean;
    }, {
        operator: string;
        approvalRequired?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    intent: "UPDATE_SETTINGS";
    payload: {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email: boolean;
            push: boolean;
            sms: boolean;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    };
    metadata?: {
        operator: string;
        approvalRequired: boolean;
    } | undefined;
}, {
    intent: "UPDATE_SETTINGS";
    payload: {
        theme?: "light" | "dark" | "auto" | undefined;
        language?: "zh-CN" | "en-US" | undefined;
        notifications?: {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        } | undefined;
        autoSave?: boolean | undefined;
        debugMode?: boolean | undefined;
    };
    metadata?: {
        operator: string;
        approvalRequired?: boolean | undefined;
    } | undefined;
}>, z.ZodObject<{
    intent: z.ZodLiteral<"ANALYZE_DATA">;
    payload: z.ZodObject<{
        analysisType: z.ZodEnum<["energy_efficiency", "usage_patterns", "predictive_maintenance", "cost_optimization", "performance_trends"]>;
        parameters: z.ZodOptional<z.ZodObject<{
            timeFrame: z.ZodDefault<z.ZodEnum<["day", "week", "month", "quarter", "year"]>>;
            includeForecasting: z.ZodDefault<z.ZodBoolean>;
            granularity: z.ZodDefault<z.ZodEnum<["hourly", "daily", "weekly"]>>;
        }, "strip", z.ZodTypeAny, {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        }, {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        } | undefined;
    }, {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "ANALYZE_DATA";
    payload: {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame: "day" | "week" | "month" | "quarter" | "year";
            includeForecasting: boolean;
            granularity: "hourly" | "daily" | "weekly";
        } | undefined;
    };
}, {
    intent: "ANALYZE_DATA";
    payload: {
        analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
        parameters?: {
            timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
            includeForecasting?: boolean | undefined;
            granularity?: "hourly" | "daily" | "weekly" | undefined;
        } | undefined;
    };
}>, z.ZodObject<{
    intent: z.ZodLiteral<"CREATE_AUTOMATION">;
    payload: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        trigger: z.ZodObject<{
            type: z.ZodEnum<["time", "temperature", "occupancy", "weather", "manual"]>;
            conditions: z.ZodRecord<z.ZodString, z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        }, {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        }>;
        actions: z.ZodArray<z.ZodObject<{
            deviceId: z.ZodString;
            action: z.ZodString;
            parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }, {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }>, "many">;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        enabled: boolean;
        description?: string | undefined;
    }, {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        description?: string | undefined;
        enabled?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    intent: "CREATE_AUTOMATION";
    payload: {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        enabled: boolean;
        description?: string | undefined;
    };
}, {
    intent: "CREATE_AUTOMATION";
    payload: {
        name: string;
        trigger: {
            type: "temperature" | "time" | "occupancy" | "weather" | "manual";
            conditions: Record<string, any>;
        };
        actions: {
            deviceId: string;
            action: string;
            parameters?: Record<string, any> | undefined;
        }[];
        description?: string | undefined;
        enabled?: boolean | undefined;
    };
}>]>;
export declare const AIResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    intent: z.ZodOptional<z.ZodDiscriminatedUnion<"intent", [z.ZodObject<{
        intent: z.ZodLiteral<"CREATE_USER">;
        payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
            id: z.ZodOptional<z.ZodString>;
            username: z.ZodString;
            email: z.ZodString;
            password: z.ZodString;
            createdAt: z.ZodOptional<z.ZodDate>;
            updatedAt: z.ZodOptional<z.ZodDate>;
        }, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
            username: string;
            email: string;
            password: string;
        }, {
            username: string;
            email: string;
            password: string;
        }>, {
            username: string;
            email: string;
            password: string;
        }, {
            username: string;
            email: string;
            password: string;
        }>, {
            username: string;
            email: string;
            password: string;
        }, {
            username: string;
            email: string;
            password: string;
        }>, {
            username: string;
            email: string;
            password: string;
        }, {
            username: string;
            email: string;
            password: string;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
            confidence: z.ZodOptional<z.ZodNumber>;
            timestamp: z.ZodDefault<z.ZodDate>;
        }, "strip", z.ZodTypeAny, {
            timestamp: Date;
            source: "ai" | "form" | "api";
            confidence?: number | undefined;
        }, {
            timestamp?: Date | undefined;
            source?: "ai" | "form" | "api" | undefined;
            confidence?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "CREATE_USER";
        payload: {
            username: string;
            email: string;
            password: string;
        };
        metadata?: {
            timestamp: Date;
            source: "ai" | "form" | "api";
            confidence?: number | undefined;
        } | undefined;
    }, {
        intent: "CREATE_USER";
        payload: {
            username: string;
            email: string;
            password: string;
        };
        metadata?: {
            timestamp?: Date | undefined;
            source?: "ai" | "form" | "api" | undefined;
            confidence?: number | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"LOGIN_USER">;
        payload: z.ZodObject<{
            identifier: z.ZodString;
            password: z.ZodString;
            rememberMe: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            password: string;
            identifier: string;
            rememberMe: boolean;
        }, {
            password: string;
            identifier: string;
            rememberMe?: boolean | undefined;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            source: z.ZodDefault<z.ZodEnum<["ai", "form", "api"]>>;
            ipAddress: z.ZodOptional<z.ZodString>;
            userAgent: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: "ai" | "form" | "api";
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        }, {
            source?: "ai" | "form" | "api" | undefined;
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "LOGIN_USER";
        payload: {
            password: string;
            identifier: string;
            rememberMe: boolean;
        };
        metadata?: {
            source: "ai" | "form" | "api";
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        } | undefined;
    }, {
        intent: "LOGIN_USER";
        payload: {
            password: string;
            identifier: string;
            rememberMe?: boolean | undefined;
        };
        metadata?: {
            source?: "ai" | "form" | "api" | undefined;
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"CREATE_DEVICE">;
        payload: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            type: z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
            location: z.ZodString;
            status: z.ZodEnum<["online", "offline", "maintenance"]>;
            temperature: z.ZodOptional<z.ZodNumber>;
            humidity: z.ZodOptional<z.ZodNumber>;
            powerConsumption: z.ZodOptional<z.ZodNumber>;
        }, "id">, "strip", z.ZodTypeAny, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            installationNotes: z.ZodOptional<z.ZodString>;
            installer: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        }, {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "CREATE_DEVICE";
        payload: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
        metadata?: {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        } | undefined;
    }, {
        intent: "CREATE_DEVICE";
        payload: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
        metadata?: {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"UPDATE_DEVICE">;
        payload: z.ZodObject<{
            deviceId: z.ZodString;
            updates: z.ZodEffects<z.ZodObject<{
                id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
                name: z.ZodOptional<z.ZodString>;
                type: z.ZodOptional<z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
                location: z.ZodOptional<z.ZodString>;
                status: z.ZodOptional<z.ZodEnum<["online", "offline", "maintenance"]>>;
                temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
                humidity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
                powerConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            }, {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            }>, {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            }, {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        }, {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            reason: z.ZodOptional<z.ZodString>;
            operator: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            reason?: string | undefined;
            operator?: string | undefined;
        }, {
            reason?: string | undefined;
            operator?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "UPDATE_DEVICE";
        payload: {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        };
        metadata?: {
            reason?: string | undefined;
            operator?: string | undefined;
        } | undefined;
    }, {
        intent: "UPDATE_DEVICE";
        payload: {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        };
        metadata?: {
            reason?: string | undefined;
            operator?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"DELETE_DEVICE">;
        payload: z.ZodObject<{
            deviceId: z.ZodString;
            confirmation: z.ZodLiteral<true>;
        }, "strip", z.ZodTypeAny, {
            deviceId: string;
            confirmation: true;
        }, {
            deviceId: string;
            confirmation: true;
        }>;
        metadata: z.ZodObject<{
            reason: z.ZodString;
            operator: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            reason: string;
            operator: string;
        }, {
            reason: string;
            operator: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        intent: "DELETE_DEVICE";
        payload: {
            deviceId: string;
            confirmation: true;
        };
        metadata: {
            reason: string;
            operator: string;
        };
    }, {
        intent: "DELETE_DEVICE";
        payload: {
            deviceId: string;
            confirmation: true;
        };
        metadata: {
            reason: string;
            operator: string;
        };
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"CONTROL_HVAC">;
        payload: z.ZodObject<{
            action: z.ZodEnum<["turn_on", "turn_off", "set_temperature", "set_mode", "schedule"]>;
            targetDeviceId: z.ZodOptional<z.ZodString>;
            parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        }, {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "emergency"]>>;
            scheduledFor: z.ZodOptional<z.ZodDate>;
        }, "strip", z.ZodTypeAny, {
            priority: "low" | "high" | "normal" | "emergency";
            scheduledFor?: Date | undefined;
        }, {
            priority?: "low" | "high" | "normal" | "emergency" | undefined;
            scheduledFor?: Date | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "CONTROL_HVAC";
        payload: {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        };
        metadata?: {
            priority: "low" | "high" | "normal" | "emergency";
            scheduledFor?: Date | undefined;
        } | undefined;
    }, {
        intent: "CONTROL_HVAC";
        payload: {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        };
        metadata?: {
            priority?: "low" | "high" | "normal" | "emergency" | undefined;
            scheduledFor?: Date | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"QUERY_SYSTEM">;
        payload: z.ZodObject<{
            queryType: z.ZodEnum<["device_status", "temperature_history", "power_consumption", "system_health", "user_activity", "alerts"]>;
            filters: z.ZodOptional<z.ZodObject<{
                deviceId: z.ZodOptional<z.ZodString>;
                location: z.ZodOptional<z.ZodString>;
                timeRange: z.ZodOptional<z.ZodObject<{
                    start: z.ZodDate;
                    end: z.ZodDate;
                }, "strip", z.ZodTypeAny, {
                    start: Date;
                    end: Date;
                }, {
                    start: Date;
                    end: Date;
                }>>;
                limit: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                limit: number;
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
            }, {
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
                limit?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                limit: number;
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
            } | undefined;
        }, {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
                limit?: number | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        intent: "QUERY_SYSTEM";
        payload: {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                limit: number;
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
            } | undefined;
        };
    }, {
        intent: "QUERY_SYSTEM";
        payload: {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
                limit?: number | undefined;
            } | undefined;
        };
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"SEND_MESSAGE">;
        payload: z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
            id: z.ZodOptional<z.ZodString>;
            content: z.ZodString;
            sender: z.ZodString;
            recipient: z.ZodString;
            timestamp: z.ZodOptional<z.ZodDate>;
            priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
            type: z.ZodDefault<z.ZodEnum<["info", "warning", "error", "success"]>>;
        }, "id" | "timestamp">, "strip", z.ZodTypeAny, {
            type: "info" | "warning" | "error" | "success";
            content: string;
            sender: string;
            recipient: string;
            priority: "low" | "medium" | "high" | "urgent";
        }, {
            content: string;
            sender: string;
            recipient: string;
            type?: "info" | "warning" | "error" | "success" | undefined;
            priority?: "low" | "medium" | "high" | "urgent" | undefined;
        }>, {
            type: "info" | "warning" | "error" | "success";
            content: string;
            sender: string;
            recipient: string;
            priority: "low" | "medium" | "high" | "urgent";
        }, {
            content: string;
            sender: string;
            recipient: string;
            type?: "info" | "warning" | "error" | "success" | undefined;
            priority?: "low" | "medium" | "high" | "urgent" | undefined;
        }>, {
            type: "info" | "warning" | "error" | "success";
            content: string;
            sender: string;
            recipient: string;
            priority: "low" | "medium" | "high" | "urgent";
        }, {
            content: string;
            sender: string;
            recipient: string;
            type?: "info" | "warning" | "error" | "success" | undefined;
            priority?: "low" | "medium" | "high" | "urgent" | undefined;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            channel: z.ZodDefault<z.ZodEnum<["email", "sms", "push", "in_app"]>>;
            template: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            channel: "email" | "push" | "sms" | "in_app";
            template?: string | undefined;
        }, {
            channel?: "email" | "push" | "sms" | "in_app" | undefined;
            template?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "SEND_MESSAGE";
        payload: {
            type: "info" | "warning" | "error" | "success";
            content: string;
            sender: string;
            recipient: string;
            priority: "low" | "medium" | "high" | "urgent";
        };
        metadata?: {
            channel: "email" | "push" | "sms" | "in_app";
            template?: string | undefined;
        } | undefined;
    }, {
        intent: "SEND_MESSAGE";
        payload: {
            content: string;
            sender: string;
            recipient: string;
            type?: "info" | "warning" | "error" | "success" | undefined;
            priority?: "low" | "medium" | "high" | "urgent" | undefined;
        };
        metadata?: {
            channel?: "email" | "push" | "sms" | "in_app" | undefined;
            template?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"CREATE_ALERT">;
        payload: z.ZodObject<{
            alertType: z.ZodEnum<["temperature_anomaly", "device_offline", "power_outage", "maintenance_due"]>;
            message: z.ZodString;
            severity: z.ZodEnum<["info", "warning", "error", "critical"]>;
            affectedDevices: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            autoResolve: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            autoResolve: boolean;
            affectedDevices?: string[] | undefined;
        }, {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            affectedDevices?: string[] | undefined;
            autoResolve?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        intent: "CREATE_ALERT";
        payload: {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            autoResolve: boolean;
            affectedDevices?: string[] | undefined;
        };
    }, {
        intent: "CREATE_ALERT";
        payload: {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            affectedDevices?: string[] | undefined;
            autoResolve?: boolean | undefined;
        };
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"UPDATE_SETTINGS">;
        payload: z.ZodEffects<z.ZodObject<{
            theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>>;
            language: z.ZodOptional<z.ZodDefault<z.ZodEnum<["zh-CN", "en-US"]>>>;
            notifications: z.ZodOptional<z.ZodDefault<z.ZodObject<{
                email: z.ZodDefault<z.ZodBoolean>;
                push: z.ZodDefault<z.ZodBoolean>;
                sms: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
            }, {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            }>>>;
            autoSave: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
            debugMode: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email: boolean;
                push: boolean;
                sms: boolean;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        }, {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        }>, {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email: boolean;
                push: boolean;
                sms: boolean;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        }, {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        }>;
        metadata: z.ZodOptional<z.ZodObject<{
            operator: z.ZodString;
            approvalRequired: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            operator: string;
            approvalRequired: boolean;
        }, {
            operator: string;
            approvalRequired?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        intent: "UPDATE_SETTINGS";
        payload: {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email: boolean;
                push: boolean;
                sms: boolean;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        };
        metadata?: {
            operator: string;
            approvalRequired: boolean;
        } | undefined;
    }, {
        intent: "UPDATE_SETTINGS";
        payload: {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        };
        metadata?: {
            operator: string;
            approvalRequired?: boolean | undefined;
        } | undefined;
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"ANALYZE_DATA">;
        payload: z.ZodObject<{
            analysisType: z.ZodEnum<["energy_efficiency", "usage_patterns", "predictive_maintenance", "cost_optimization", "performance_trends"]>;
            parameters: z.ZodOptional<z.ZodObject<{
                timeFrame: z.ZodDefault<z.ZodEnum<["day", "week", "month", "quarter", "year"]>>;
                includeForecasting: z.ZodDefault<z.ZodBoolean>;
                granularity: z.ZodDefault<z.ZodEnum<["hourly", "daily", "weekly"]>>;
            }, "strip", z.ZodTypeAny, {
                timeFrame: "day" | "week" | "month" | "quarter" | "year";
                includeForecasting: boolean;
                granularity: "hourly" | "daily" | "weekly";
            }, {
                timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                includeForecasting?: boolean | undefined;
                granularity?: "hourly" | "daily" | "weekly" | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame: "day" | "week" | "month" | "quarter" | "year";
                includeForecasting: boolean;
                granularity: "hourly" | "daily" | "weekly";
            } | undefined;
        }, {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                includeForecasting?: boolean | undefined;
                granularity?: "hourly" | "daily" | "weekly" | undefined;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        intent: "ANALYZE_DATA";
        payload: {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame: "day" | "week" | "month" | "quarter" | "year";
                includeForecasting: boolean;
                granularity: "hourly" | "daily" | "weekly";
            } | undefined;
        };
    }, {
        intent: "ANALYZE_DATA";
        payload: {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                includeForecasting?: boolean | undefined;
                granularity?: "hourly" | "daily" | "weekly" | undefined;
            } | undefined;
        };
    }>, z.ZodObject<{
        intent: z.ZodLiteral<"CREATE_AUTOMATION">;
        payload: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            trigger: z.ZodObject<{
                type: z.ZodEnum<["time", "temperature", "occupancy", "weather", "manual"]>;
                conditions: z.ZodRecord<z.ZodString, z.ZodAny>;
            }, "strip", z.ZodTypeAny, {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            }, {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            }>;
            actions: z.ZodArray<z.ZodObject<{
                deviceId: z.ZodString;
                action: z.ZodString;
                parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }, {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }>, "many">;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            enabled: boolean;
            description?: string | undefined;
        }, {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            description?: string | undefined;
            enabled?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        intent: "CREATE_AUTOMATION";
        payload: {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            enabled: boolean;
            description?: string | undefined;
        };
    }, {
        intent: "CREATE_AUTOMATION";
        payload: {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            description?: string | undefined;
            enabled?: boolean | undefined;
        };
    }>]>>;
    message: z.ZodOptional<z.ZodString>;
    suggestions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        field: z.ZodString;
        message: z.ZodString;
        code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        field: string;
        code?: string | undefined;
    }, {
        message: string;
        field: string;
        code?: string | undefined;
    }>, "many">>;
    metadata: z.ZodOptional<z.ZodObject<{
        processingTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        model: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        confidence?: number | undefined;
        processingTime?: number | undefined;
        model?: string | undefined;
    }, {
        confidence?: number | undefined;
        processingTime?: number | undefined;
        model?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    message?: string | undefined;
    intent?: {
        intent: "CREATE_USER";
        payload: {
            username: string;
            email: string;
            password: string;
        };
        metadata?: {
            timestamp: Date;
            source: "ai" | "form" | "api";
            confidence?: number | undefined;
        } | undefined;
    } | {
        intent: "LOGIN_USER";
        payload: {
            password: string;
            identifier: string;
            rememberMe: boolean;
        };
        metadata?: {
            source: "ai" | "form" | "api";
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        } | undefined;
    } | {
        intent: "CREATE_DEVICE";
        payload: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
        metadata?: {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        } | undefined;
    } | {
        intent: "UPDATE_DEVICE";
        payload: {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        };
        metadata?: {
            reason?: string | undefined;
            operator?: string | undefined;
        } | undefined;
    } | {
        intent: "DELETE_DEVICE";
        payload: {
            deviceId: string;
            confirmation: true;
        };
        metadata: {
            reason: string;
            operator: string;
        };
    } | {
        intent: "CONTROL_HVAC";
        payload: {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        };
        metadata?: {
            priority: "low" | "high" | "normal" | "emergency";
            scheduledFor?: Date | undefined;
        } | undefined;
    } | {
        intent: "QUERY_SYSTEM";
        payload: {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                limit: number;
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
            } | undefined;
        };
    } | {
        intent: "SEND_MESSAGE";
        payload: {
            type: "info" | "warning" | "error" | "success";
            content: string;
            sender: string;
            recipient: string;
            priority: "low" | "medium" | "high" | "urgent";
        };
        metadata?: {
            channel: "email" | "push" | "sms" | "in_app";
            template?: string | undefined;
        } | undefined;
    } | {
        intent: "CREATE_ALERT";
        payload: {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            autoResolve: boolean;
            affectedDevices?: string[] | undefined;
        };
    } | {
        intent: "UPDATE_SETTINGS";
        payload: {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email: boolean;
                push: boolean;
                sms: boolean;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        };
        metadata?: {
            operator: string;
            approvalRequired: boolean;
        } | undefined;
    } | {
        intent: "ANALYZE_DATA";
        payload: {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame: "day" | "week" | "month" | "quarter" | "year";
                includeForecasting: boolean;
                granularity: "hourly" | "daily" | "weekly";
            } | undefined;
        };
    } | {
        intent: "CREATE_AUTOMATION";
        payload: {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            enabled: boolean;
            description?: string | undefined;
        };
    } | undefined;
    metadata?: {
        confidence?: number | undefined;
        processingTime?: number | undefined;
        model?: string | undefined;
    } | undefined;
    suggestions?: string[] | undefined;
    errors?: {
        message: string;
        field: string;
        code?: string | undefined;
    }[] | undefined;
}, {
    success: boolean;
    message?: string | undefined;
    intent?: {
        intent: "CREATE_USER";
        payload: {
            username: string;
            email: string;
            password: string;
        };
        metadata?: {
            timestamp?: Date | undefined;
            source?: "ai" | "form" | "api" | undefined;
            confidence?: number | undefined;
        } | undefined;
    } | {
        intent: "LOGIN_USER";
        payload: {
            password: string;
            identifier: string;
            rememberMe?: boolean | undefined;
        };
        metadata?: {
            source?: "ai" | "form" | "api" | undefined;
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        } | undefined;
    } | {
        intent: "CREATE_DEVICE";
        payload: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        };
        metadata?: {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        } | undefined;
    } | {
        intent: "UPDATE_DEVICE";
        payload: {
            deviceId: string;
            updates: {
                id?: string | undefined;
                type?: "air_conditioner" | "heater" | "ventilator" | "thermostat" | undefined;
                status?: "online" | "offline" | "maintenance" | undefined;
                name?: string | undefined;
                location?: string | undefined;
                temperature?: number | undefined;
                humidity?: number | undefined;
                powerConsumption?: number | undefined;
            };
        };
        metadata?: {
            reason?: string | undefined;
            operator?: string | undefined;
        } | undefined;
    } | {
        intent: "DELETE_DEVICE";
        payload: {
            deviceId: string;
            confirmation: true;
        };
        metadata: {
            reason: string;
            operator: string;
        };
    } | {
        intent: "CONTROL_HVAC";
        payload: {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        };
        metadata?: {
            priority?: "low" | "high" | "normal" | "emergency" | undefined;
            scheduledFor?: Date | undefined;
        } | undefined;
    } | {
        intent: "QUERY_SYSTEM";
        payload: {
            queryType: "device_status" | "temperature_history" | "power_consumption" | "system_health" | "user_activity" | "alerts";
            filters?: {
                location?: string | undefined;
                deviceId?: string | undefined;
                timeRange?: {
                    start: Date;
                    end: Date;
                } | undefined;
                limit?: number | undefined;
            } | undefined;
        };
    } | {
        intent: "SEND_MESSAGE";
        payload: {
            content: string;
            sender: string;
            recipient: string;
            type?: "info" | "warning" | "error" | "success" | undefined;
            priority?: "low" | "medium" | "high" | "urgent" | undefined;
        };
        metadata?: {
            channel?: "email" | "push" | "sms" | "in_app" | undefined;
            template?: string | undefined;
        } | undefined;
    } | {
        intent: "CREATE_ALERT";
        payload: {
            message: string;
            alertType: "temperature_anomaly" | "device_offline" | "power_outage" | "maintenance_due";
            severity: "info" | "warning" | "error" | "critical";
            affectedDevices?: string[] | undefined;
            autoResolve?: boolean | undefined;
        };
    } | {
        intent: "UPDATE_SETTINGS";
        payload: {
            theme?: "light" | "dark" | "auto" | undefined;
            language?: "zh-CN" | "en-US" | undefined;
            notifications?: {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            } | undefined;
            autoSave?: boolean | undefined;
            debugMode?: boolean | undefined;
        };
        metadata?: {
            operator: string;
            approvalRequired?: boolean | undefined;
        } | undefined;
    } | {
        intent: "ANALYZE_DATA";
        payload: {
            analysisType: "energy_efficiency" | "usage_patterns" | "predictive_maintenance" | "cost_optimization" | "performance_trends";
            parameters?: {
                timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                includeForecasting?: boolean | undefined;
                granularity?: "hourly" | "daily" | "weekly" | undefined;
            } | undefined;
        };
    } | {
        intent: "CREATE_AUTOMATION";
        payload: {
            name: string;
            trigger: {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            };
            actions: {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }[];
            description?: string | undefined;
            enabled?: boolean | undefined;
        };
    } | undefined;
    metadata?: {
        confidence?: number | undefined;
        processingTime?: number | undefined;
        model?: string | undefined;
    } | undefined;
    suggestions?: string[] | undefined;
    errors?: {
        message: string;
        field: string;
        code?: string | undefined;
    }[] | undefined;
}>;
export declare const IntentExecutionResultSchema: z.ZodObject<{
    intentId: z.ZodString;
    status: z.ZodEnum<["pending", "executing", "completed", "failed", "cancelled"]>;
    result: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodString>;
    executionTime: z.ZodOptional<z.ZodNumber>;
    timestamp: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "executing" | "completed" | "failed" | "cancelled";
    timestamp: Date;
    intentId: string;
    error?: string | undefined;
    result?: any;
    executionTime?: number | undefined;
}, {
    status: "pending" | "executing" | "completed" | "failed" | "cancelled";
    intentId: string;
    timestamp?: Date | undefined;
    error?: string | undefined;
    result?: any;
    executionTime?: number | undefined;
}>;
export type AppIntent = z.infer<typeof AppIntentSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export type IntentExecutionResult = z.infer<typeof IntentExecutionResultSchema>;
export type CreateUserIntent = z.infer<typeof CreateUserIntent>;
export type LoginUserIntent = z.infer<typeof LoginUserIntent>;
export type CreateDeviceIntent = z.infer<typeof CreateDeviceIntent>;
export type UpdateDeviceIntent = z.infer<typeof UpdateDeviceIntent>;
export type DeleteDeviceIntent = z.infer<typeof DeleteDeviceIntent>;
export type ControlHVACIntent = z.infer<typeof ControlHVACIntent>;
export type QuerySystemIntent = z.infer<typeof QuerySystemIntent>;
export type SendMessageIntent = z.infer<typeof SendMessageIntent>;
export type CreateAlertIntent = z.infer<typeof CreateAlertIntent>;
export type UpdateSettingsIntent = z.infer<typeof UpdateSettingsIntent>;
export type AnalyzeDataIntent = z.infer<typeof AnalyzeDataIntent>;
export type CreateAutomationIntent = z.infer<typeof CreateAutomationIntent>;
export {};
