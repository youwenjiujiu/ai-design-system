#!/usr/bin/env node

// 测试温度监控修复
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 测试 "Monitor temperature" 命令修复');
console.log('='.repeat(50));

// 模拟测试AI Intent Parser
async function testIntentParser() {
  try {
    // 检查IntentParser是否有temperature_check意图
    const intentParserPath = path.join(__dirname, 'components/ui-layer3/intent-parser.ts');
    const intentContent = fs.readFileSync(intentParserPath, 'utf8');
    
    const hasTemperatureCheck = intentContent.includes("intent: 'temperature_check'");
    const hasMonitorPattern = intentContent.includes("'monitor.*temperature'");
    
    console.log('📝 IntentParser检查:');
    console.log(`   temperature_check意图: ${hasTemperatureCheck ? '✅' : '❌'}`);
    console.log(`   monitor.*temperature模式: ${hasMonitorPattern ? '✅' : '❌'}`);
    
    return hasTemperatureCheck && hasMonitorPattern;
  } catch (error) {
    console.log('❌ IntentParser检查失败:', error.message);
    return false;
  }
}

// 检查CompositionGenerator
async function testCompositionGenerator() {
  try {
    const compositionPath = path.join(__dirname, 'components/ui-layer3/composition-generator.ts');
    const compositionContent = fs.readFileSync(compositionPath, 'utf8');
    
    const hasTemperatureRule = compositionContent.includes("intent: 'temperature_check'");
    const hasGenerateMethod = compositionContent.includes('generateTemperatureMonitor');
    
    console.log('📝 CompositionGenerator检查:');
    console.log(`   temperature_check规则: ${hasTemperatureRule ? '✅' : '❌'}`);
    console.log(`   generateTemperatureMonitor方法: ${hasGenerateMethod ? '✅' : '❌'}`);
    
    return hasTemperatureRule && hasGenerateMethod;
  } catch (error) {
    console.log('❌ CompositionGenerator检查失败:', error.message);
    return false;
  }
}

// 检查ComponentRenderer
async function testComponentRenderer() {
  try {
    const rendererPath = path.join(__dirname, 'components/ui-layer3/component-renderer.tsx');
    const rendererContent = fs.readFileSync(rendererPath, 'utf8');
    
    const hasTemperatureMonitor = rendererContent.includes("'TemperatureMonitor': TemperatureMonitorPanel");
    const hasTemperaturePanel = rendererContent.includes('const TemperatureMonitorPanel');
    
    console.log('📝 ComponentRenderer检查:');
    console.log(`   TemperatureMonitor注册: ${hasTemperatureMonitor ? '✅' : '❌'}`);
    console.log(`   TemperatureMonitorPanel组件: ${hasTemperaturePanel ? '✅' : '❌'}`);
    
    return hasTemperatureMonitor && hasTemperaturePanel;
  } catch (error) {
    console.log('❌ ComponentRenderer检查失败:', error.message);
    return false;
  }
}

// 检查AI Demo页面
async function testAIDemoPage() {
  try {
    const demoPath = path.join(__dirname, 'app/(app)/examples/ai-demo/page.tsx');
    const demoContent = fs.readFileSync(demoPath, 'utf8');
    
    const hasCorrectComment = demoContent.includes('"Monitor temperature",          // → TemperatureMonitor (HVAC内部温度)');
    const hasTemperatureMapping = demoContent.includes("componentType: 'TemperatureMonitor'");
    
    console.log('📝 AI Demo页面检查:');
    console.log(`   正确的注释: ${hasCorrectComment ? '✅' : '❌'}`);
    console.log(`   TemperatureMonitor映射: ${hasTemperatureMapping ? '✅' : '❌'}`);
    
    return hasCorrectComment && hasTemperatureMapping;
  } catch (error) {
    console.log('❌ AI Demo页面检查失败:', error.message);
    return false;
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始测试...\n');
  
  const results = await Promise.all([
    testIntentParser(),
    testCompositionGenerator(), 
    testComponentRenderer(),
    testAIDemoPage()
  ]);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 测试总结:');
  console.log(`IntentParser: ${results[0] ? '✅' : '❌'}`);
  console.log(`CompositionGenerator: ${results[1] ? '✅' : '❌'}`);
  console.log(`ComponentRenderer: ${results[2] ? '✅' : '❌'}`);
  console.log(`AI Demo页面: ${results[3] ? '✅' : '❌'}`);
  
  const allPassed = results.every(result => result);
  console.log(`\n🎯 总体结果: ${allPassed ? '✅ 所有测试通过!' : '❌ 部分测试失败!'}`);
  
  if (allPassed) {
    console.log('\n✨ "Monitor temperature" 应该现在能正确显示HVAC内部温度监控组件');
    console.log('   - 供水温度: ~7°C');
    console.log('   - 回水温度: ~12°C');
    console.log('   - 温度差值: ~5°C');
  }
  
  return allPassed;
}

// 执行测试
runAllTests()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('测试执行失败:', error);
    process.exit(1);
  });