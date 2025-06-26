# Contracts Package Integration Guide

## 🧠 系统语义大脑已就位

您的Monorepo现在拥有了一个强大的"语义大脑" - `packages/contracts`包。这个包实现了基于Zod Schema驱动的开发方法，将验证、业务语义和AI意图完美统一。

## 📁 包结构

```
packages/contracts/
├── src/
│   ├── base.ts          # 基础数据验证Schema
│   ├── business.ts      # 业务语义规则Schema  
│   ├── intents.ts       # AI意图处理Schema
│   └── index.ts         # 统一导出入口
├── package.json
├── tsconfig.json
└── dist/               # 构建输出
```

## 🔧 核心功能

### 1. 基础数据验证 (base.ts)
- **UserSchema**: 用户数据验证
- **HVACDeviceSchema**: HVAC设备验证  
- **MessageSchema**: 消息/通知验证
- **SystemSettingsSchema**: 系统设置验证

### 2. 业务语义规则 (business.ts)
- **UserSignupSchema**: 用户注册业务规则（密码强度、用户名限制）
- **HVACDeviceCreateSchema**: 设备创建规则（名称校验、类型约束）
- **MessageSendSchema**: 消息发送规则（防止自发消息、优先级约束）
- **HVACSystemStateSchema**: 系统状态一致性验证

### 3. AI意图处理 (intents.ts)
- **AppIntentSchema**: 核心意图Schema，支持12种意图类型
- **AIResponseSchema**: AI响应标准格式
- **IntentExecutionResultSchema**: 意图执行结果跟踪

## 🚀 使用示例

### 基础验证
```typescript
import { validators, type User } from 'contracts';

// 验证用户数据
const userData = { username: "john", email: "john@example.com", password: "MyPass123" };
const result = validators.userSignup.safeValidate(userData);

if (result.success) {
  console.log('用户数据有效:', result.data);
} else {
  console.log('验证错误:', result.error.errors);
}
```

### AI意图处理
```typescript
import { AppIntentSchema, IntentProcessor } from 'contracts';

// AI输出的JSON
const aiOutput = {
  intent: "CREATE_DEVICE",
  payload: {
    name: "客厅空调",
    type: "air_conditioner", 
    location: "客厅",
    status: "offline",
    temperature: 22
  }
};

// 验证并执行
const result = await IntentProcessor.processAIOutput(aiOutput);
if (result.success) {
  console.log('意图执行成功:', result.message);
}
```

### 表单验证Hook
```typescript
import { useFormValidation, validators } from 'contracts';

function DeviceCreateForm() {
  const { validate, errors, isValid } = useFormValidation(validators.hvacDeviceCreate.safeValidate);
  
  const handleSubmit = (formData: any) => {
    const validatedData = validate(formData);
    if (validatedData) {
      // 数据有效，执行创建
      createDevice(validatedData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
      {errors.name && <span className="error">{errors.name}</span>}
    </form>
  );
}
```

## 🔗 现有系统集成

### V4应用集成
已在`apps/v4`中创建集成文件：
- `lib/contracts-integration.ts`: 基础集成工具
- `lib/intent-processor-enhanced.ts`: AI系统增强处理器

### 工作流程
1. **自然语言输入** → 现有IntentParser解析
2. **意图转换** → 转换为contracts格式的结构化意图
3. **Schema验证** → 使用contracts验证数据和业务规则
4. **业务执行** → 类型安全的业务逻辑执行
5. **结果返回** → 标准化的AI响应格式

## 📋 支持的AI意图类型

1. **CREATE_USER** - 创建用户
2. **LOGIN_USER** - 用户登录
3. **CREATE_DEVICE** - 创建HVAC设备
4. **UPDATE_DEVICE** - 更新设备信息
5. **DELETE_DEVICE** - 删除设备
6. **CONTROL_HVAC** - 控制HVAC系统
7. **QUERY_SYSTEM** - 查询系统数据
8. **SEND_MESSAGE** - 发送消息/通知
9. **CREATE_ALERT** - 创建警报
10. **UPDATE_SETTINGS** - 更新系统设置
11. **ANALYZE_DATA** - 数据分析
12. **CREATE_AUTOMATION** - 创建自动化规则

## 🎯 关键优势

### 1. 解耦与健壮性
- AI的"创造力"与系统的"执行力"完全解耦
- 所有外部输入都经过严格Schema验证
- 从源头杜绝bug和安全漏洞

### 2. 类型安全
- 从Schema自动推断TypeScript类型
- 整个代码库享受完整的类型检查
- IDE自动补全和错误提示

### 3. 业务规则集中化
- 所有验证和业务逻辑在一个地方定义
- 规则变更时只需修改contracts包
- 前端和后端自动同步更新

### 4. 可维护性与扩展性
- 新增AI意图只需在AppIntentSchema中添加定义
- Schema变更自动反映到整个系统
- 清晰的架构边界和职责分离

## 🔄 下一步建议

1. **迁移现有验证逻辑**到contracts包
2. **更新表单组件**使用contracts验证
3. **增强AI处理器**集成更多意图类型
4. **添加单元测试**确保Schema正确性
5. **创建文档生成**从Schema自动生成API文档

## 📚 最佳实践

1. **Schema优先**: 先定义Schema，再实现功能
2. **类型复用**: 从Schema推断类型，避免重复定义
3. **错误处理**: 使用safeParse进行验证，优雅处理错误
4. **业务规则文档化**: 在Schema中使用描述性错误消息
5. **版本管理**: Schema变更时注意向后兼容性

---

🎉 **恭喜！您的系统现在拥有了一个强大的语义大脑，能够理解、验证和执行复杂的AI意图！**