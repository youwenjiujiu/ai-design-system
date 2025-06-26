import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
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
export declare const HVACDeviceSchema: z.ZodObject<{
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
}>;
export declare const MessageSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    sender: z.ZodString;
    recipient: z.ZodString;
    timestamp: z.ZodOptional<z.ZodDate>;
    priority: z.ZodDefault<z.ZodEnum<["low", "medium", "high", "urgent"]>>;
    type: z.ZodDefault<z.ZodEnum<["info", "warning", "error", "success"]>>;
}, "strip", z.ZodTypeAny, {
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
export declare const SystemSettingsSchema: z.ZodObject<{
    theme: z.ZodDefault<z.ZodEnum<["light", "dark", "auto"]>>;
    language: z.ZodDefault<z.ZodEnum<["zh-CN", "en-US"]>>;
    notifications: z.ZodDefault<z.ZodObject<{
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
    }>>;
    autoSave: z.ZodDefault<z.ZodBoolean>;
    debugMode: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
export type User = z.infer<typeof UserSchema>;
export type HVACDevice = z.infer<typeof HVACDeviceSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type SystemSettings = z.infer<typeof SystemSettingsSchema>;
