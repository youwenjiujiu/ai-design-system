/**
 * Layer 2: HVAC Business Semantic Components + 组件组合验证
 * 
 * This layer provides business-specific components for HVAC domain,
 * implementing the mapping from AI intent to concrete UI components.
 * Also includes component composition validation system.
 * 
 * Architecture:
 * - AI Intent → Business Semantic → Layer 1 Components
 * - Business domain knowledge encoded in component interfaces
 * - Type-safe mapping between business concepts and visual states
 * - Component composition validation and consistency checking
 */

// Core HVAC Business Components
export * from "./temperature-monitor"
export * from "./chiller-status"
export * from "./air-quality-display"
export * from "./energy-efficiency"
export * from "./equipment-control"
export * from "./system-dashboard"
export * from "./alert-panel"

// Chart Components and Factory
export * from "./hvac-charts"
export * from "./chart-factory"
export * from "./hvac-dashboard-layout"
export * from "./hvac-control-panel"

// Business Semantic Mapping
export * from "./business-mapping"
export * from "./hvac-types"
export * from "./layout-mapping"

// Component Composition Validation (Layer 2)
export * from "./component-validation"
export * from "./auto-validation"