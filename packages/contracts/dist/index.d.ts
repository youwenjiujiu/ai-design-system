export * from './base.js';
export * from './business.js';
export * from './intents.js';
export { z } from 'zod';
export declare const Schemas: {
    User: import("zod").ZodObject<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        username: import("zod").ZodString;
        email: import("zod").ZodString;
        password: import("zod").ZodString;
        createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
        updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
    }, "strip", import("zod").ZodTypeAny, {
        username: string;
        email: string;
        password: string;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }, {
        username: string;
        email: string;
        password: string;
        id?: string | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }>;
    HVACDevice: import("zod").ZodObject<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        name: import("zod").ZodString;
        type: import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
        location: import("zod").ZodString;
        status: import("zod").ZodEnum<["online", "offline", "maintenance"]>;
        temperature: import("zod").ZodOptional<import("zod").ZodNumber>;
        humidity: import("zod").ZodOptional<import("zod").ZodNumber>;
        powerConsumption: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        id?: string | undefined;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }, {
        type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
        status: "online" | "offline" | "maintenance";
        name: string;
        location: string;
        id?: string | undefined;
        temperature?: number | undefined;
        humidity?: number | undefined;
        powerConsumption?: number | undefined;
    }>;
    Message: import("zod").ZodObject<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        content: import("zod").ZodString;
        sender: import("zod").ZodString;
        recipient: import("zod").ZodString;
        timestamp: import("zod").ZodOptional<import("zod").ZodDate>;
        priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "medium", "high", "urgent"]>>;
        type: import("zod").ZodDefault<import("zod").ZodEnum<["info", "warning", "error", "success"]>>;
    }, "strip", import("zod").ZodTypeAny, {
        type: "info" | "warning" | "error" | "success";
        content: string;
        sender: string;
        recipient: string;
        priority: "low" | "medium" | "high" | "urgent";
        id?: string | undefined;
        timestamp?: Date | undefined;
    }, {
        content: string;
        sender: string;
        recipient: string;
        id?: string | undefined;
        type?: "info" | "warning" | "error" | "success" | undefined;
        timestamp?: Date | undefined;
        priority?: "low" | "medium" | "high" | "urgent" | undefined;
    }>;
    SystemSettings: import("zod").ZodObject<{
        theme: import("zod").ZodDefault<import("zod").ZodEnum<["light", "dark", "auto"]>>;
        language: import("zod").ZodDefault<import("zod").ZodEnum<["zh-CN", "en-US"]>>;
        notifications: import("zod").ZodDefault<import("zod").ZodObject<{
            email: import("zod").ZodDefault<import("zod").ZodBoolean>;
            push: import("zod").ZodDefault<import("zod").ZodBoolean>;
            sms: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
        }, {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        }>>;
        autoSave: import("zod").ZodDefault<import("zod").ZodBoolean>;
        debugMode: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        theme: "light" | "dark" | "auto";
        language: "zh-CN" | "en-US";
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
        autoSave: boolean;
        debugMode: boolean;
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
    UserSignup: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        username: import("zod").ZodString;
        email: import("zod").ZodString;
        password: import("zod").ZodString;
        createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
        updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
    }, "id" | "createdAt" | "updatedAt">, "strip", import("zod").ZodTypeAny, {
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
    UserLogin: import("zod").ZodObject<{
        identifier: import("zod").ZodString;
        password: import("zod").ZodString;
        rememberMe: import("zod").ZodDefault<import("zod").ZodBoolean>;
    }, "strip", import("zod").ZodTypeAny, {
        password: string;
        identifier: string;
        rememberMe: boolean;
    }, {
        password: string;
        identifier: string;
        rememberMe?: boolean | undefined;
    }>;
    HVACDeviceCreate: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        name: import("zod").ZodString;
        type: import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
        location: import("zod").ZodString;
        status: import("zod").ZodEnum<["online", "offline", "maintenance"]>;
        temperature: import("zod").ZodOptional<import("zod").ZodNumber>;
        humidity: import("zod").ZodOptional<import("zod").ZodNumber>;
        powerConsumption: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "id">, "strip", import("zod").ZodTypeAny, {
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
    HVACDeviceUpdate: import("zod").ZodEffects<import("zod").ZodObject<{
        id: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
        name: import("zod").ZodOptional<import("zod").ZodString>;
        type: import("zod").ZodOptional<import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
        location: import("zod").ZodOptional<import("zod").ZodString>;
        status: import("zod").ZodOptional<import("zod").ZodEnum<["online", "offline", "maintenance"]>>;
        temperature: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
        humidity: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
        powerConsumption: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    MessageSend: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
        id: import("zod").ZodOptional<import("zod").ZodString>;
        content: import("zod").ZodString;
        sender: import("zod").ZodString;
        recipient: import("zod").ZodString;
        timestamp: import("zod").ZodOptional<import("zod").ZodDate>;
        priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "medium", "high", "urgent"]>>;
        type: import("zod").ZodDefault<import("zod").ZodEnum<["info", "warning", "error", "success"]>>;
    }, "id" | "timestamp">, "strip", import("zod").ZodTypeAny, {
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
    SystemSettingsUpdate: import("zod").ZodEffects<import("zod").ZodObject<{
        theme: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["light", "dark", "auto"]>>>;
        language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["zh-CN", "en-US"]>>>;
        notifications: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodObject<{
            email: import("zod").ZodDefault<import("zod").ZodBoolean>;
            push: import("zod").ZodDefault<import("zod").ZodBoolean>;
            sms: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            email: boolean;
            push: boolean;
            sms: boolean;
        }, {
            email?: boolean | undefined;
            push?: boolean | undefined;
            sms?: boolean | undefined;
        }>>>;
        autoSave: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
        debugMode: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    HVACSystemState: import("zod").ZodEffects<import("zod").ZodObject<{
        devices: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodOptional<import("zod").ZodString>;
            name: import("zod").ZodString;
            type: import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
            location: import("zod").ZodString;
            status: import("zod").ZodEnum<["online", "offline", "maintenance"]>;
            temperature: import("zod").ZodOptional<import("zod").ZodNumber>;
            humidity: import("zod").ZodOptional<import("zod").ZodNumber>;
            powerConsumption: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "strip", import("zod").ZodTypeAny, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }, {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }>, "many">;
        overallStatus: import("zod").ZodEnum<["normal", "warning", "critical"]>;
        totalPowerConsumption: import("zod").ZodNumber;
        averageTemperature: import("zod").ZodNumber;
        systemEfficiency: import("zod").ZodNumber;
    }, "strip", import("zod").ZodTypeAny, {
        devices: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }[];
        overallStatus: "warning" | "normal" | "critical";
        totalPowerConsumption: number;
        averageTemperature: number;
        systemEfficiency: number;
    }, {
        devices: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }[];
        overallStatus: "warning" | "normal" | "critical";
        totalPowerConsumption: number;
        averageTemperature: number;
        systemEfficiency: number;
    }>, {
        devices: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }[];
        overallStatus: "warning" | "normal" | "critical";
        totalPowerConsumption: number;
        averageTemperature: number;
        systemEfficiency: number;
    }, {
        devices: {
            type: "air_conditioner" | "heater" | "ventilator" | "thermostat";
            status: "online" | "offline" | "maintenance";
            name: string;
            location: string;
            id?: string | undefined;
            temperature?: number | undefined;
            humidity?: number | undefined;
            powerConsumption?: number | undefined;
        }[];
        overallStatus: "warning" | "normal" | "critical";
        totalPowerConsumption: number;
        averageTemperature: number;
        systemEfficiency: number;
    }>;
    AppIntent: import("zod").ZodDiscriminatedUnion<"intent", [import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"CREATE_USER">;
        payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
            id: import("zod").ZodOptional<import("zod").ZodString>;
            username: import("zod").ZodString;
            email: import("zod").ZodString;
            password: import("zod").ZodString;
            createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
            updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
        }, "id" | "createdAt" | "updatedAt">, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            source: import("zod").ZodDefault<import("zod").ZodEnum<["ai", "form", "api"]>>;
            confidence: import("zod").ZodOptional<import("zod").ZodNumber>;
            timestamp: import("zod").ZodDefault<import("zod").ZodDate>;
        }, "strip", import("zod").ZodTypeAny, {
            timestamp: Date;
            source: "ai" | "form" | "api";
            confidence?: number | undefined;
        }, {
            timestamp?: Date | undefined;
            source?: "ai" | "form" | "api" | undefined;
            confidence?: number | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"LOGIN_USER">;
        payload: import("zod").ZodObject<{
            identifier: import("zod").ZodString;
            password: import("zod").ZodString;
            rememberMe: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            password: string;
            identifier: string;
            rememberMe: boolean;
        }, {
            password: string;
            identifier: string;
            rememberMe?: boolean | undefined;
        }>;
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            source: import("zod").ZodDefault<import("zod").ZodEnum<["ai", "form", "api"]>>;
            ipAddress: import("zod").ZodOptional<import("zod").ZodString>;
            userAgent: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            source: "ai" | "form" | "api";
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        }, {
            source?: "ai" | "form" | "api" | undefined;
            ipAddress?: string | undefined;
            userAgent?: string | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"CREATE_DEVICE">;
        payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
            id: import("zod").ZodOptional<import("zod").ZodString>;
            name: import("zod").ZodString;
            type: import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
            location: import("zod").ZodString;
            status: import("zod").ZodEnum<["online", "offline", "maintenance"]>;
            temperature: import("zod").ZodOptional<import("zod").ZodNumber>;
            humidity: import("zod").ZodOptional<import("zod").ZodNumber>;
            powerConsumption: import("zod").ZodOptional<import("zod").ZodNumber>;
        }, "id">, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            installationNotes: import("zod").ZodOptional<import("zod").ZodString>;
            installer: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        }, {
            installationNotes?: string | undefined;
            installer?: string | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"UPDATE_DEVICE">;
        payload: import("zod").ZodObject<{
            deviceId: import("zod").ZodString;
            updates: import("zod").ZodEffects<import("zod").ZodObject<{
                id: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
                name: import("zod").ZodOptional<import("zod").ZodString>;
                type: import("zod").ZodOptional<import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
                location: import("zod").ZodOptional<import("zod").ZodString>;
                status: import("zod").ZodOptional<import("zod").ZodEnum<["online", "offline", "maintenance"]>>;
                temperature: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
                humidity: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
                powerConsumption: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            reason: import("zod").ZodOptional<import("zod").ZodString>;
            operator: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            reason?: string | undefined;
            operator?: string | undefined;
        }, {
            reason?: string | undefined;
            operator?: string | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"DELETE_DEVICE">;
        payload: import("zod").ZodObject<{
            deviceId: import("zod").ZodString;
            confirmation: import("zod").ZodLiteral<true>;
        }, "strip", import("zod").ZodTypeAny, {
            deviceId: string;
            confirmation: true;
        }, {
            deviceId: string;
            confirmation: true;
        }>;
        metadata: import("zod").ZodObject<{
            reason: import("zod").ZodString;
            operator: import("zod").ZodString;
        }, "strip", import("zod").ZodTypeAny, {
            reason: string;
            operator: string;
        }, {
            reason: string;
            operator: string;
        }>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"CONTROL_HVAC">;
        payload: import("zod").ZodObject<{
            action: import("zod").ZodEnum<["turn_on", "turn_off", "set_temperature", "set_mode", "schedule"]>;
            targetDeviceId: import("zod").ZodOptional<import("zod").ZodString>;
            parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
        }, "strip", import("zod").ZodTypeAny, {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        }, {
            action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
            targetDeviceId?: string | undefined;
            parameters?: Record<string, any> | undefined;
        }>;
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "normal", "high", "emergency"]>>;
            scheduledFor: import("zod").ZodOptional<import("zod").ZodDate>;
        }, "strip", import("zod").ZodTypeAny, {
            priority: "low" | "high" | "normal" | "emergency";
            scheduledFor?: Date | undefined;
        }, {
            priority?: "low" | "high" | "normal" | "emergency" | undefined;
            scheduledFor?: Date | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"QUERY_SYSTEM">;
        payload: import("zod").ZodObject<{
            queryType: import("zod").ZodEnum<["device_status", "temperature_history", "power_consumption", "system_health", "user_activity", "alerts"]>;
            filters: import("zod").ZodOptional<import("zod").ZodObject<{
                deviceId: import("zod").ZodOptional<import("zod").ZodString>;
                location: import("zod").ZodOptional<import("zod").ZodString>;
                timeRange: import("zod").ZodOptional<import("zod").ZodObject<{
                    start: import("zod").ZodDate;
                    end: import("zod").ZodDate;
                }, "strip", import("zod").ZodTypeAny, {
                    start: Date;
                    end: Date;
                }, {
                    start: Date;
                    end: Date;
                }>>;
                limit: import("zod").ZodDefault<import("zod").ZodNumber>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"SEND_MESSAGE">;
        payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
            id: import("zod").ZodOptional<import("zod").ZodString>;
            content: import("zod").ZodString;
            sender: import("zod").ZodString;
            recipient: import("zod").ZodString;
            timestamp: import("zod").ZodOptional<import("zod").ZodDate>;
            priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "medium", "high", "urgent"]>>;
            type: import("zod").ZodDefault<import("zod").ZodEnum<["info", "warning", "error", "success"]>>;
        }, "id" | "timestamp">, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            channel: import("zod").ZodDefault<import("zod").ZodEnum<["email", "sms", "push", "in_app"]>>;
            template: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            channel: "email" | "push" | "sms" | "in_app";
            template?: string | undefined;
        }, {
            channel?: "email" | "push" | "sms" | "in_app" | undefined;
            template?: string | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"CREATE_ALERT">;
        payload: import("zod").ZodObject<{
            alertType: import("zod").ZodEnum<["temperature_anomaly", "device_offline", "power_outage", "maintenance_due"]>;
            message: import("zod").ZodString;
            severity: import("zod").ZodEnum<["info", "warning", "error", "critical"]>;
            affectedDevices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
            autoResolve: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"UPDATE_SETTINGS">;
        payload: import("zod").ZodEffects<import("zod").ZodObject<{
            theme: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["light", "dark", "auto"]>>>;
            language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["zh-CN", "en-US"]>>>;
            notifications: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodObject<{
                email: import("zod").ZodDefault<import("zod").ZodBoolean>;
                push: import("zod").ZodDefault<import("zod").ZodBoolean>;
                sms: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                email: boolean;
                push: boolean;
                sms: boolean;
            }, {
                email?: boolean | undefined;
                push?: boolean | undefined;
                sms?: boolean | undefined;
            }>>>;
            autoSave: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
            debugMode: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            operator: import("zod").ZodString;
            approvalRequired: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
            operator: string;
            approvalRequired: boolean;
        }, {
            operator: string;
            approvalRequired?: boolean | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"ANALYZE_DATA">;
        payload: import("zod").ZodObject<{
            analysisType: import("zod").ZodEnum<["energy_efficiency", "usage_patterns", "predictive_maintenance", "cost_optimization", "performance_trends"]>;
            parameters: import("zod").ZodOptional<import("zod").ZodObject<{
                timeFrame: import("zod").ZodDefault<import("zod").ZodEnum<["day", "week", "month", "quarter", "year"]>>;
                includeForecasting: import("zod").ZodDefault<import("zod").ZodBoolean>;
                granularity: import("zod").ZodDefault<import("zod").ZodEnum<["hourly", "daily", "weekly"]>>;
            }, "strip", import("zod").ZodTypeAny, {
                timeFrame: "day" | "week" | "month" | "quarter" | "year";
                includeForecasting: boolean;
                granularity: "hourly" | "daily" | "weekly";
            }, {
                timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                includeForecasting?: boolean | undefined;
                granularity?: "hourly" | "daily" | "weekly" | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        intent: import("zod").ZodLiteral<"CREATE_AUTOMATION">;
        payload: import("zod").ZodObject<{
            name: import("zod").ZodString;
            description: import("zod").ZodOptional<import("zod").ZodString>;
            trigger: import("zod").ZodObject<{
                type: import("zod").ZodEnum<["time", "temperature", "occupancy", "weather", "manual"]>;
                conditions: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
            }, "strip", import("zod").ZodTypeAny, {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            }, {
                type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                conditions: Record<string, any>;
            }>;
            actions: import("zod").ZodArray<import("zod").ZodObject<{
                deviceId: import("zod").ZodString;
                action: import("zod").ZodString;
                parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
            }, "strip", import("zod").ZodTypeAny, {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }, {
                deviceId: string;
                action: string;
                parameters?: Record<string, any> | undefined;
            }>, "many">;
            enabled: import("zod").ZodDefault<import("zod").ZodBoolean>;
        }, "strip", import("zod").ZodTypeAny, {
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
    }, "strip", import("zod").ZodTypeAny, {
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
    AIResponse: import("zod").ZodObject<{
        success: import("zod").ZodBoolean;
        intent: import("zod").ZodOptional<import("zod").ZodDiscriminatedUnion<"intent", [import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"CREATE_USER">;
            payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
                id: import("zod").ZodOptional<import("zod").ZodString>;
                username: import("zod").ZodString;
                email: import("zod").ZodString;
                password: import("zod").ZodString;
                createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
                updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
            }, "id" | "createdAt" | "updatedAt">, "strip", import("zod").ZodTypeAny, {
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
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                source: import("zod").ZodDefault<import("zod").ZodEnum<["ai", "form", "api"]>>;
                confidence: import("zod").ZodOptional<import("zod").ZodNumber>;
                timestamp: import("zod").ZodDefault<import("zod").ZodDate>;
            }, "strip", import("zod").ZodTypeAny, {
                timestamp: Date;
                source: "ai" | "form" | "api";
                confidence?: number | undefined;
            }, {
                timestamp?: Date | undefined;
                source?: "ai" | "form" | "api" | undefined;
                confidence?: number | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"LOGIN_USER">;
            payload: import("zod").ZodObject<{
                identifier: import("zod").ZodString;
                password: import("zod").ZodString;
                rememberMe: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                password: string;
                identifier: string;
                rememberMe: boolean;
            }, {
                password: string;
                identifier: string;
                rememberMe?: boolean | undefined;
            }>;
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                source: import("zod").ZodDefault<import("zod").ZodEnum<["ai", "form", "api"]>>;
                ipAddress: import("zod").ZodOptional<import("zod").ZodString>;
                userAgent: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                source: "ai" | "form" | "api";
                ipAddress?: string | undefined;
                userAgent?: string | undefined;
            }, {
                source?: "ai" | "form" | "api" | undefined;
                ipAddress?: string | undefined;
                userAgent?: string | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"CREATE_DEVICE">;
            payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
                id: import("zod").ZodOptional<import("zod").ZodString>;
                name: import("zod").ZodString;
                type: import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
                location: import("zod").ZodString;
                status: import("zod").ZodEnum<["online", "offline", "maintenance"]>;
                temperature: import("zod").ZodOptional<import("zod").ZodNumber>;
                humidity: import("zod").ZodOptional<import("zod").ZodNumber>;
                powerConsumption: import("zod").ZodOptional<import("zod").ZodNumber>;
            }, "id">, "strip", import("zod").ZodTypeAny, {
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
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                installationNotes: import("zod").ZodOptional<import("zod").ZodString>;
                installer: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                installationNotes?: string | undefined;
                installer?: string | undefined;
            }, {
                installationNotes?: string | undefined;
                installer?: string | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"UPDATE_DEVICE">;
            payload: import("zod").ZodObject<{
                deviceId: import("zod").ZodString;
                updates: import("zod").ZodEffects<import("zod").ZodObject<{
                    id: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
                    name: import("zod").ZodOptional<import("zod").ZodString>;
                    type: import("zod").ZodOptional<import("zod").ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>>;
                    location: import("zod").ZodOptional<import("zod").ZodString>;
                    status: import("zod").ZodOptional<import("zod").ZodEnum<["online", "offline", "maintenance"]>>;
                    temperature: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
                    humidity: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
                    powerConsumption: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNumber>>;
                }, "strip", import("zod").ZodTypeAny, {
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
            }, "strip", import("zod").ZodTypeAny, {
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
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                reason: import("zod").ZodOptional<import("zod").ZodString>;
                operator: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                reason?: string | undefined;
                operator?: string | undefined;
            }, {
                reason?: string | undefined;
                operator?: string | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"DELETE_DEVICE">;
            payload: import("zod").ZodObject<{
                deviceId: import("zod").ZodString;
                confirmation: import("zod").ZodLiteral<true>;
            }, "strip", import("zod").ZodTypeAny, {
                deviceId: string;
                confirmation: true;
            }, {
                deviceId: string;
                confirmation: true;
            }>;
            metadata: import("zod").ZodObject<{
                reason: import("zod").ZodString;
                operator: import("zod").ZodString;
            }, "strip", import("zod").ZodTypeAny, {
                reason: string;
                operator: string;
            }, {
                reason: string;
                operator: string;
            }>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"CONTROL_HVAC">;
            payload: import("zod").ZodObject<{
                action: import("zod").ZodEnum<["turn_on", "turn_off", "set_temperature", "set_mode", "schedule"]>;
                targetDeviceId: import("zod").ZodOptional<import("zod").ZodString>;
                parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
            }, "strip", import("zod").ZodTypeAny, {
                action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
                targetDeviceId?: string | undefined;
                parameters?: Record<string, any> | undefined;
            }, {
                action: "turn_on" | "turn_off" | "set_temperature" | "set_mode" | "schedule";
                targetDeviceId?: string | undefined;
                parameters?: Record<string, any> | undefined;
            }>;
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "normal", "high", "emergency"]>>;
                scheduledFor: import("zod").ZodOptional<import("zod").ZodDate>;
            }, "strip", import("zod").ZodTypeAny, {
                priority: "low" | "high" | "normal" | "emergency";
                scheduledFor?: Date | undefined;
            }, {
                priority?: "low" | "high" | "normal" | "emergency" | undefined;
                scheduledFor?: Date | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"QUERY_SYSTEM">;
            payload: import("zod").ZodObject<{
                queryType: import("zod").ZodEnum<["device_status", "temperature_history", "power_consumption", "system_health", "user_activity", "alerts"]>;
                filters: import("zod").ZodOptional<import("zod").ZodObject<{
                    deviceId: import("zod").ZodOptional<import("zod").ZodString>;
                    location: import("zod").ZodOptional<import("zod").ZodString>;
                    timeRange: import("zod").ZodOptional<import("zod").ZodObject<{
                        start: import("zod").ZodDate;
                        end: import("zod").ZodDate;
                    }, "strip", import("zod").ZodTypeAny, {
                        start: Date;
                        end: Date;
                    }, {
                        start: Date;
                        end: Date;
                    }>>;
                    limit: import("zod").ZodDefault<import("zod").ZodNumber>;
                }, "strip", import("zod").ZodTypeAny, {
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
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"SEND_MESSAGE">;
            payload: import("zod").ZodEffects<import("zod").ZodEffects<import("zod").ZodObject<Omit<{
                id: import("zod").ZodOptional<import("zod").ZodString>;
                content: import("zod").ZodString;
                sender: import("zod").ZodString;
                recipient: import("zod").ZodString;
                timestamp: import("zod").ZodOptional<import("zod").ZodDate>;
                priority: import("zod").ZodDefault<import("zod").ZodEnum<["low", "medium", "high", "urgent"]>>;
                type: import("zod").ZodDefault<import("zod").ZodEnum<["info", "warning", "error", "success"]>>;
            }, "id" | "timestamp">, "strip", import("zod").ZodTypeAny, {
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
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                channel: import("zod").ZodDefault<import("zod").ZodEnum<["email", "sms", "push", "in_app"]>>;
                template: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
                channel: "email" | "push" | "sms" | "in_app";
                template?: string | undefined;
            }, {
                channel?: "email" | "push" | "sms" | "in_app" | undefined;
                template?: string | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"CREATE_ALERT">;
            payload: import("zod").ZodObject<{
                alertType: import("zod").ZodEnum<["temperature_anomaly", "device_offline", "power_outage", "maintenance_due"]>;
                message: import("zod").ZodString;
                severity: import("zod").ZodEnum<["info", "warning", "error", "critical"]>;
                affectedDevices: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
                autoResolve: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"UPDATE_SETTINGS">;
            payload: import("zod").ZodEffects<import("zod").ZodObject<{
                theme: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["light", "dark", "auto"]>>>;
                language: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodEnum<["zh-CN", "en-US"]>>>;
                notifications: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodObject<{
                    email: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    push: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    sms: import("zod").ZodDefault<import("zod").ZodBoolean>;
                }, "strip", import("zod").ZodTypeAny, {
                    email: boolean;
                    push: boolean;
                    sms: boolean;
                }, {
                    email?: boolean | undefined;
                    push?: boolean | undefined;
                    sms?: boolean | undefined;
                }>>>;
                autoSave: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
                debugMode: import("zod").ZodOptional<import("zod").ZodDefault<import("zod").ZodBoolean>>;
            }, "strip", import("zod").ZodTypeAny, {
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
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                operator: import("zod").ZodString;
                approvalRequired: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
                operator: string;
                approvalRequired: boolean;
            }, {
                operator: string;
                approvalRequired?: boolean | undefined;
            }>>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"ANALYZE_DATA">;
            payload: import("zod").ZodObject<{
                analysisType: import("zod").ZodEnum<["energy_efficiency", "usage_patterns", "predictive_maintenance", "cost_optimization", "performance_trends"]>;
                parameters: import("zod").ZodOptional<import("zod").ZodObject<{
                    timeFrame: import("zod").ZodDefault<import("zod").ZodEnum<["day", "week", "month", "quarter", "year"]>>;
                    includeForecasting: import("zod").ZodDefault<import("zod").ZodBoolean>;
                    granularity: import("zod").ZodDefault<import("zod").ZodEnum<["hourly", "daily", "weekly"]>>;
                }, "strip", import("zod").ZodTypeAny, {
                    timeFrame: "day" | "week" | "month" | "quarter" | "year";
                    includeForecasting: boolean;
                    granularity: "hourly" | "daily" | "weekly";
                }, {
                    timeFrame?: "day" | "week" | "month" | "quarter" | "year" | undefined;
                    includeForecasting?: boolean | undefined;
                    granularity?: "hourly" | "daily" | "weekly" | undefined;
                }>>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodObject<{
            intent: import("zod").ZodLiteral<"CREATE_AUTOMATION">;
            payload: import("zod").ZodObject<{
                name: import("zod").ZodString;
                description: import("zod").ZodOptional<import("zod").ZodString>;
                trigger: import("zod").ZodObject<{
                    type: import("zod").ZodEnum<["time", "temperature", "occupancy", "weather", "manual"]>;
                    conditions: import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>;
                }, "strip", import("zod").ZodTypeAny, {
                    type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                    conditions: Record<string, any>;
                }, {
                    type: "temperature" | "time" | "occupancy" | "weather" | "manual";
                    conditions: Record<string, any>;
                }>;
                actions: import("zod").ZodArray<import("zod").ZodObject<{
                    deviceId: import("zod").ZodString;
                    action: import("zod").ZodString;
                    parameters: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
                }, "strip", import("zod").ZodTypeAny, {
                    deviceId: string;
                    action: string;
                    parameters?: Record<string, any> | undefined;
                }, {
                    deviceId: string;
                    action: string;
                    parameters?: Record<string, any> | undefined;
                }>, "many">;
                enabled: import("zod").ZodDefault<import("zod").ZodBoolean>;
            }, "strip", import("zod").ZodTypeAny, {
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
        }, "strip", import("zod").ZodTypeAny, {
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
        message: import("zod").ZodOptional<import("zod").ZodString>;
        suggestions: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
        errors: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodObject<{
            field: import("zod").ZodString;
            message: import("zod").ZodString;
            code: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            message: string;
            field: string;
            code?: string | undefined;
        }, {
            message: string;
            field: string;
            code?: string | undefined;
        }>, "many">>;
        metadata: import("zod").ZodOptional<import("zod").ZodObject<{
            processingTime: import("zod").ZodOptional<import("zod").ZodNumber>;
            confidence: import("zod").ZodOptional<import("zod").ZodNumber>;
            model: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
            confidence?: number | undefined;
            processingTime?: number | undefined;
            model?: string | undefined;
        }, {
            confidence?: number | undefined;
            processingTime?: number | undefined;
            model?: string | undefined;
        }>>;
    }, "strip", import("zod").ZodTypeAny, {
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
    IntentExecutionResult: import("zod").ZodObject<{
        intentId: import("zod").ZodString;
        status: import("zod").ZodEnum<["pending", "executing", "completed", "failed", "cancelled"]>;
        result: import("zod").ZodOptional<import("zod").ZodAny>;
        error: import("zod").ZodOptional<import("zod").ZodString>;
        executionTime: import("zod").ZodOptional<import("zod").ZodNumber>;
        timestamp: import("zod").ZodDefault<import("zod").ZodDate>;
    }, "strip", import("zod").ZodTypeAny, {
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
};
import type { ZodSchema } from 'zod';
export declare const createValidator: <T extends ZodSchema>(schema: T) => {
    validate: (data: unknown) => any;
    safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
    isValid: (data: unknown) => boolean;
};
export declare const validators: {
    user: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    userSignup: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    userLogin: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    hvacDevice: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    hvacDeviceCreate: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    hvacDeviceUpdate: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    message: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    messageSend: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    systemSettings: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    systemSettingsUpdate: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    appIntent: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    aiResponse: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
    intentExecutionResult: {
        validate: (data: unknown) => any;
        safeValidate: (data: unknown) => import("zod").SafeParseReturnType<any, any>;
        isValid: (data: unknown) => boolean;
    };
};
