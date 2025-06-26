# 🧪 HVAC AI Assistant 手动测试指南

## 测试目标
验证所有业务组件正常工作，确保显示真实HVAC数据而非虚假数据。

## 自动化测试结果
- ✅ **组件注册表**: 6/6 通过
- ✅ **导入语句**: 全部正常
- ✅ **业务数据生成**: 4/4 通过
- ⚠️ **页面加载**: 7/8 通过（ComponentRenderer组件需要验证）

## 🔍 手动测试步骤

### 1. 访问测试页面
```
http://localhost:3000/examples/ai-demo
```

### 2. 验证页面基础功能
- [ ] 页面标题显示: "HVAC AI Assistant - Business Data Architecture"
- [ ] 显示3层架构标识
- [ ] Chat界面正常显示
- [ ] 6个快速命令按钮都存在

### 3. 测试所有快速命令按钮

#### 3.1 "Show chiller efficiency"
**预期结果**: 显示制冷机效率分析
- [ ] 点击按钮后AI开始处理（显示"AI is analyzing..."）
- [ ] 生成PerformanceAnalysis组件
- [ ] 显示COP值（应该是4.2左右）
- [ ] 显示操作效率百分比（89%左右）
- [ ] 显示能耗数据（kWh）
- [ ] **关键**: 不应该显示Chrome、Safari等浏览器数据

#### 3.2 "Monitor temperature"
**预期结果**: 显示温度监控界面
- [ ] 生成TemperatureMonitor组件
- [ ] 显示供水温度（7°C左右）
- [ ] 显示回水温度（12°C左右）
- [ ] 显示温差（5°C左右）
- [ ] 温度单位为°C

#### 3.3 "View system overview"
**预期结果**: 显示系统概览
- [ ] 生成HVAC系统状态界面
- [ ] 显示设备运行状态
- [ ] 包含制冷机、冷却塔、水泵等设备
- [ ] 显示设备拓扑图

#### 3.4 "Analyze energy consumption"
**预期结果**: 显示能耗分析
- [ ] 生成能耗分析组件
- [ ] 显示kWh数据
- [ ] 显示节能建议
- [ ] 能耗趋势图表

#### 3.5 "Monitor flow rate"
**预期结果**: 显示流量监控
- [ ] 显示冷冻水流量
- [ ] 显示冷却水流量
- [ ] 流量单位为m³/h

#### 3.6 "What is COP?"
**预期结果**: 显示COP概念解释
- [ ] 生成ConceptExplainer组件
- [ ] 解释COP全称："Coefficient of Performance"
- [ ] 说明COP计算公式
- [ ] 显示正常COP范围（3.0-6.0）

### 4. 验证数据质量

#### 4.1 真实HVAC数据检查
每个组件应该显示：
- [ ] COP值在合理范围内（3.0-6.0）
- [ ] 温度数据符合HVAC系统特点
- [ ] 能耗数据使用kWh单位
- [ ] 流量数据使用m³/h单位
- [ ] 压力数据使用MPa单位

#### 4.2 禁止的虚假数据
确保不出现：
- [ ] ❌ Chrome、Safari、Firefox等浏览器名称
- [ ] ❌ 通用的"Browser Statistics"
- [ ] ❌ 非HVAC相关的数据类型
- [ ] ❌ 空白或"Lorem ipsum"占位符

### 5. AI意图解析测试

#### 5.1 自定义输入测试
在聊天框中输入以下命令，验证AI意图解析：

| 输入命令 | 预期解析结果 | 预期组件 |
|---------|-------------|----------|
| "chiller cop" | analyze_performance | PerformanceAnalysis |
| "water temperature" | show_data | TemperatureMonitor |
| "system status" | monitor_status | HVACChartsDemo |
| "energy usage" | analyze_performance | EnergyDashboard |

#### 5.2 容错性测试
- [ ] 输入拼写错误的命令
- [ ] 输入中英文混合命令
- [ ] 输入不完整的命令

### 6. 性能和稳定性测试

#### 6.1 连续操作测试
- [ ] 连续点击多个快速命令按钮
- [ ] 在AI处理过程中点击其他按钮
- [ ] 刷新页面后重新测试

#### 6.2 错误处理测试
- [ ] 检查浏览器控制台是否有JavaScript错误
- [ ] 网络中断情况下的表现
- [ ] 长时间无操作后的状态

### 7. 浏览器兼容性测试
- [ ] Chrome浏览器
- [ ] Safari浏览器
- [ ] Firefox浏览器
- [ ] 移动端浏览器

## 🚨 故障排除

### 常见问题和解决方案

1. **ColumnChart错误**
   - 检查是否已修复导入语句
   - 确认chart-primitives.tsx中ColumnChart已正确导出

2. **组件不渲染**
   - 检查ComponentRenderer是否正确导入
   - 验证组件注册表完整性

3. **显示虚假数据**
   - 检查business-data-generator.ts
   - 确认AI意图解析正确映射到业务数据

4. **AI意图解析错误**
   - 检查intent-parser.ts的模式匹配
   - 验证composition-generator.ts的组件映射

## ✅ 测试通过标准

系统测试通过需满足：
- [ ] 所有6个快速命令按钮正常工作
- [ ] 显示的都是真实HVAC业务数据
- [ ] 无JavaScript编译错误
- [ ] AI意图解析准确率≥90%
- [ ] 组件渲染成功率100%
- [ ] 无客户可见的错误信息

## 📊 测试报告模板

```
测试时间: ___________
测试人员: ___________
浏览器版本: _________

快速命令测试:
- Show chiller efficiency: [ ]通过 [ ]失败
- Monitor temperature: [ ]通过 [ ]失败  
- View system overview: [ ]通过 [ ]失败
- Analyze energy consumption: [ ]通过 [ ]失败
- Monitor flow rate: [ ]通过 [ ]失败
- What is COP?: [ ]通过 [ ]失败

数据质量检查:
- 显示真实HVAC数据: [ ]是 [ ]否
- 无虚假浏览器数据: [ ]是 [ ]否
- COP值合理: [ ]是 [ ]否
- 温度数据正确: [ ]是 [ ]否

整体评估: [ ]优秀 [ ]良好 [ ]需改进 [ ]不合格

问题记录:
_________________________________
_________________________________
```

完成此测试指南确保系统达到生产质量标准。