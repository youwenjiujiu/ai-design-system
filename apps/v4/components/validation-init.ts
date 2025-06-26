/**
 * 验证系统初始化
 * 
 * 在应用启动时自动加载验证系统
 * 只需在应用入口导入此文件即可
 */

// 导入自动验证系统，它会在模块加载时自动启动
import './ui-layer2/auto-validation'

// 在开发模式下显示启动消息
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('🚀 HVAC组件验证系统已初始化')
  console.log('💡 使用 window.__HVAC_VALIDATION__ 控制验证系统')
}