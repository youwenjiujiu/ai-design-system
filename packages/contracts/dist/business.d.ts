import { z } from 'zod';
export declare const UserSignupSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
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
export declare const UserLoginSchema: z.ZodObject<{
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
export declare const HVACDeviceCreateSchema: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
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
export declare const HVACDeviceUpdateSchema: z.ZodEffects<z.ZodObject<{
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
export declare const MessageSendSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<Omit<{
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
export declare const SystemSettingsUpdateSchema: z.ZodEffects<z.ZodObject<{
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
export declare const HVACSystemStateSchema: z.ZodEffects<z.ZodObject<{
    devices: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        type: z.ZodEnum<["air_conditioner", "heater", "ventilator", "thermostat"]>;
        location: z.ZodString;
        status: z.ZodEnum<["online", "offline", "maintenance"]>;
        temperature: z.ZodOptional<z.ZodNumber>;
        humidity: z.ZodOptional<z.ZodNumber>;
        powerConsumption: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
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
    overallStatus: z.ZodEnum<["normal", "warning", "critical"]>;
    totalPowerConsumption: z.ZodNumber;
    averageTemperature: z.ZodNumber;
    systemEfficiency: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
export declare const DeviceLocationSchema: z.ZodEffects<z.ZodObject<{
    location: z.ZodString;
    existingDeviceCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    location: string;
    existingDeviceCount: number;
}, {
    location: string;
    existingDeviceCount: number;
}>, {
    location: string;
    existingDeviceCount: number;
}, {
    location: string;
    existingDeviceCount: number;
}>;
export type UserSignupInput = z.infer<typeof UserSignupSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
export type HVACDeviceCreateInput = z.infer<typeof HVACDeviceCreateSchema>;
export type HVACDeviceUpdateInput = z.infer<typeof HVACDeviceUpdateSchema>;
export type MessageSendInput = z.infer<typeof MessageSendSchema>;
export type SystemSettingsUpdateInput = z.infer<typeof SystemSettingsUpdateSchema>;
export type HVACSystemState = z.infer<typeof HVACSystemStateSchema>;
export type DeviceLocationInput = z.infer<typeof DeviceLocationSchema>;
