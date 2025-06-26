/**
 * Enhanced Intent Processor - 将Contracts集成到现有AI系统
 * 
 * 这个文件展示了如何将新的contracts包集成到现有的AI意图处理系统中
 * 提供了从自然语言到结构化意图的完整流程
 */

import { 
  AppIntentSchema, 
  validators,
  type AppIntent,
  type AIResponse,
  type HVACDeviceCreateInput,
  type ControlHVACIntent,
  type QuerySystemIntent
} from 'contracts';

import { IntentParser } from '../components/ui-layer3/intent-parser';
import { CompositionGenerator } from '../components/ui-layer3/composition-generator';

// ============================================================================
// 增强的意图处理器 - 桥接新旧系统
// ============================================================================

export class EnhancedIntentProcessor {
  private intentParser: IntentParser;
  private compositionGenerator: CompositionGenerator;

  constructor() {
    this.intentParser = new IntentParser();
    this.compositionGenerator = new CompositionGenerator();
  }

  /**
   * 从自然语言到结构化意图的完整处理流程
   */
  async processNaturalLanguage(input: string): Promise<{
    // 原有系统的输出（用于UI生成）
    legacyResult: any;
    // 新contracts系统的输出（用于业务逻辑）
    contractsResult: AIResponse;
    // 建议的下一步操作
    suggestions: string[];
  }> {
    try {
      // Step 1: 使用现有系统解析意图（保持UI生成能力）
      const legacyResult = this.intentParser.parseIntent(input);
      const legacyComposition = this.compositionGenerator.generateComposition({
        userInput: input,
        intent: legacyResult.intent,
        entities: legacyResult.entities,
        confidence: legacyResult.confidence || 0.8
      });

      // Step 2: 将自然语言转换为contracts格式的结构化意图
      const contractsIntent = await this.convertToContractsIntent(input, legacyResult);
      
      // Step 3: 使用contracts系统验证和处理
      const contractsResult = await this.processWithContracts(contractsIntent);

      // Step 4: 生成综合建议
      const suggestions = this.generateSuggestions(legacyResult, contractsResult);

      return {
        legacyResult: {
          context: legacyResult,
          composition: legacyComposition
        },
        contractsResult,
        suggestions
      };

    } catch (error) {
      return {
        legacyResult: null,
        contractsResult: {
          success: false,
          message: `处理失败: ${error instanceof Error ? error.message : '未知错误'}`,
          errors: [{
            field: 'system',
            message: error instanceof Error ? error.message : '系统错误'
          }]
        },
        suggestions: ['请尝试重新表达您的需求', '检查输入格式是否正确']
      };
    }
  }

  /**
   * 将现有系统的意图转换为contracts格式
   */
  private async convertToContractsIntent(input: string, legacyContext: any): Promise<unknown> {
    // 基于现有解析结果，构建contracts格式的意图
    const { intent, entities } = legacyContext;

    switch (intent) {
      case 'temperature_check':
        return {
          intent: 'QUERY_SYSTEM',
          payload: {
            queryType: 'temperature_history',
            filters: {
              timeRange: {
                start: new Date(Date.now() - 24 * 60 * 60 * 1000), // 过去24小时
                end: new Date(),
              },
              limit: 50
            }
          },
          metadata: {
            source: 'ai',
            originalInput: input,
            confidence: 0.9
          }
        };

      case 'control_device':
        const device = entities.find((e: any) => e.type === 'device');
        const action = entities.find((e: any) => e.type === 'action');
        
        return {
          intent: 'CONTROL_HVAC',
          payload: {
            action: this.mapActionToControlAction(action?.value || 'turn_on'),
            targetDeviceId: device?.id || undefined,
            parameters: {
              originalCommand: input
            }
          },
          metadata: {
            source: 'ai',
            priority: 'normal',
            confidence: 0.8
          }
        };

      case 'create_device':
        const deviceName = entities.find((e: any) => e.type === 'device')?.value || 'New Device';
        const location = entities.find((e: any) => e.type === 'location')?.value || 'Unknown';
        
        return {
          intent: 'CREATE_DEVICE',
          payload: {
            name: deviceName,
            type: 'air_conditioner', // 默认类型
            location: location,
            status: 'offline',
            temperature: 22,
            powerConsumption: 0
          },
          metadata: {
            source: 'ai',
            installationNotes: `通过AI助手创建: ${input}`
          }
        };

      case 'show_data':
        return {
          intent: 'QUERY_SYSTEM',
          payload: {
            queryType: 'device_status',
            filters: {
              limit: 10
            }
          }
        };

      default:
        throw new Error(`无法转换意图类型: ${intent}`);
    }
  }

  /**
   * 使用contracts系统处理意图
   */
  private async processWithContracts(intentData: unknown): Promise<AIResponse> {
    // 验证意图格式
    const validationResult = validators.appIntent.safeValidate(intentData);
    
    if (!validationResult.success) {
      return {
        success: false,
        message: '意图格式验证失败',
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      };
    }

    const intent = validationResult.data;

    // 执行业务逻辑
    try {
      const result = await this.executeBusinessLogic(intent);
      
      return {
        success: true,
        intent,
        message: result.message,
        suggestions: result.suggestions,
        metadata: {
          processingTime: Date.now(),
          confidence: intent.metadata?.confidence || 0.8
        }
      };
    } catch (error) {
      return {
        success: false,
        intent,
        message: `执行失败: ${error instanceof Error ? error.message : '未知错误'}`,
        errors: [{
          field: 'execution',
          message: error instanceof Error ? error.message : '系统错误'
        }]
      };
    }
  }

  /**
   * 执行具体的业务逻辑
   */
  private async executeBusinessLogic(intent: AppIntent): Promise<{ message: string; suggestions: string[] }> {
    switch (intent.intent) {
      case 'QUERY_SYSTEM':
        return this.handleQuerySystem(intent as QuerySystemIntent);
      
      case 'CONTROL_HVAC':
        return this.handleControlHVAC(intent as ControlHVACIntent);
      
      case 'CREATE_DEVICE':
        return this.handleCreateDevice(intent);
      
      default:
        throw new Error(`未实现的意图处理: ${intent.intent}`);
    }
  }

  private async handleQuerySystem(intent: QuerySystemIntent) {
    const { queryType, filters } = intent.payload;
    
    // 这里应该调用实际的数据查询服务
    console.log('查询系统数据:', { queryType, filters });
    
    return {
      message: `已查询${queryType}数据，找到相关记录`,
      suggestions: [
        '查看详细图表',
        '导出数据报告', 
        '设置监控警报',
        '配置自动化规则'
      ]
    };
  }

  private async handleControlHVAC(intent: ControlHVACIntent) {
    const { action, targetDeviceId, parameters } = intent.payload;
    
    // 这里应该调用实际的设备控制服务
    console.log('控制HVAC设备:', { action, targetDeviceId, parameters });
    
    return {
      message: `已执行${action}操作${targetDeviceId ? ` (设备: ${targetDeviceId})` : ''}`,
      suggestions: [
        '查看设备状态',
        '设置定时任务',
        '调整运行参数',
        '查看能耗分析'
      ]
    };
  }

  private async handleCreateDevice(intent: any) {
    const device = intent.payload;
    
    // 这里应该调用实际的设备创建服务
    console.log('创建HVAC设备:', device);
    
    return {
      message: `设备"${device.name}"已在${device.location}创建成功`,
      suggestions: [
        '配置设备参数',
        '添加监控规则',
        '设置操作权限',
        '创建维护计划'
      ]
    };
  }

  /**
   * 生成综合建议
   */
  private generateSuggestions(legacyContext: any, contractsResult: AIResponse): string[] {
    const suggestions = [];
    
    // 基于意图类型的建议
    if (legacyContext.intent === 'temperature_check') {
      suggestions.push('查看历史温度趋势', '设置温度警报', '比较不同时间段');
    }
    
    // 基于contracts结果的建议
    if (contractsResult.success && contractsResult.suggestions) {
      suggestions.push(...contractsResult.suggestions);
    }
    
    // 通用建议
    suggestions.push('获取更多帮助', '查看使用教程');
    
    return [...new Set(suggestions)]; // 去重
  }

  /**
   * 映射动作到控制动作
   */
  private mapActionToControlAction(action: string): string {
    const actionMap: Record<string, string> = {
      '打开': 'turn_on',
      '关闭': 'turn_off', 
      '开启': 'turn_on',
      '停止': 'turn_off',
      '设置温度': 'set_temperature',
      '调节': 'set_temperature',
      '定时': 'schedule'
    };
    
    return actionMap[action] || 'turn_on';
  }
}

// 导出单例实例
export const enhancedIntentProcessor = new EnhancedIntentProcessor();