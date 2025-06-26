/**
 * HVAC AI Design Token System - Layer 1 (Unified)
 * 统一的基础设计令牌系统，为 Layer 2 业务组件提供样式基础
 * 整合了 Figma 精确数据和企业级架构
 */

// ===========================================
// 1. 品牌颜色系统 (从 Figma 精确提取)
// ===========================================

export const brandColors = {
  // Primary Blue System
  blue: {
    1: 'rgb(51, 160, 255)',      // r: 0.201, g: 0.627, b: 1.0
    2: 'rgb(112, 188, 255)',     // r: 0.437, g: 0.737, b: 1.0  
    3: 'rgb(139, 236, 255)',     // r: 0.544, g: 0.926, b: 1.0
    4: 'rgb(141, 254, 248)',     // r: 0.553, g: 0.996, b: 0.974
  },
  
  // Success Green System
  green: {
    1: 'rgb(96, 255, 109)',      // r: 0.376, g: 1.0, b: 0.428
    2: 'rgb(96, 255, 189)',      // r: 0.376, g: 1.0, b: 0.740
    success: 'rgb(103, 215, 94)', // r: 0.404, g: 0.843, b: 0.369
  },
  
  // Warning Amber System
  amber: {
    primary: 'rgb(225, 161, 86)', // r: 0.882, g: 0.631, b: 0.337
  },
  
  // Nebula Purple System  
  nebula: {
    primary: 'rgb(138, 91, 255)', // r: 0.541, g: 0.356, b: 1.0
    dark: 'rgb(114, 69, 225)',    // r: 0.447, g: 0.271, b: 0.882
  },
  
  // Neutral System
  neutral: {
    white: 'rgb(255, 255, 255)',      // r: 1.0, g: 1.0, b: 1.0
    black: 'rgb(10, 10, 10)',         // r: 0.039, g: 0.039, b: 0.039
    lightGray: 'rgb(245, 245, 245)',  // 浅灰色背景
    mediumGray: 'rgb(156, 163, 175)', // 中等灰色文本
    darkGray: 'rgb(26, 26, 26)',      // 深灰色背景
  },
  
  // Light Theme Background Colors (基于 SVG 分析)
  lightTheme: {
    background: 'rgba(45, 62, 127, 0.05)',  // #2D3E7F 5% 透明度
    cardBackground: 'rgb(255, 255, 255)',
    borderColor: 'rgba(45, 62, 127, 0.1)',
  }
} as const

// ===========================================
// 2. 字体系统 (Scto Grotesk A - 基于 Figma 规范)
// ===========================================

export const typography = {
  fontFamily: {
    primary: '"Scto Grotesk A", system-ui, -apple-system, sans-serif',
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  },
  
  fontWeight: {
    light: 300,     // Scto Grotesk A Light
    regular: 400,   // Scto Grotesk A Regular
    medium: 500,    // Scto Grotesk A Medium
    bold: 700,      // Scto Grotesk A Bold
    black: 900,     // Scto Grotesk A Black
  },
  
  fontSize: {
    mini: '0.625rem',   // 10px - 单位，状态，三级文本
    xs: '0.75rem',      // 12px - 次要文本
    sm: '0.9375rem',    // 15px - 标签文本 (Figma 确认)
    base: '1rem',       // 16px - 标准文本，标题
    md: '1.25rem',      // 20px - 重要标签
    lg: '1.5rem',       // 24px - 章节标题，主标题 (Figma 确认)
    xl: '2.5rem',       // 40px - 主数据显示值 (Figma 确认)
    '2xl': '3rem',      // 48px - 超大显示
  },
  
  lineHeight: {
    tight: 1.0,     // 数据显示和标题
    snug: 1.07,     // 舒适阅读
    normal: 1.2,    // 标准行高
    relaxed: 1.3,   // 放松阅读
  },
  
  letterSpacing: {
    tight: '-0.025em',   // For display numbers
    normal: '0',         // Default
    wide: '0.025em',     // For small labels
  }
} as const

// ===========================================
// 3. 间距系统 (8px 基础网格 + HVAC 专用)
// ===========================================

export const spacing = {
  // 基础网格 (8px)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  
  // HVAC 专用间距 (基于 Figma 精确提取)
  hvac: {
    containerPadding: '0.9375rem',  // 15px - Container内边距
    componentGap: '0.625rem',       // 10px - 组件间距
    textVerticalGap: '0.625rem',    // 10px - 文本垂直间距
    moduleMargin: '0.9375rem',      // 15px - 模块外边距
    slotGap: '0.9375rem',          // 15px - Widget 槽位间距
    textGap: '0.375rem',           // 6px - 小文本间距
    microGap: '0.3125rem',         // 5px - 微间距
  }
} as const

// ===========================================
// 4. 尺寸系统 (基于 Figma 精确尺寸)
// ===========================================

export const sizing = {
  // 图标尺寸
  icon: {
    xs: '1rem',     // 16px
    sm: '1.25rem',  // 20px
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem',     // 48px
  },
  
  // 基础组件高度
  component: {
    sm: '2rem',     // 32px
    md: '2.5rem',   // 40px
    lg: '3rem',     // 48px
  },
  
  // HVAC 专用尺寸 (从 Figma 精确提取)
  hvac: {
    widget: {
      width: 195,    // Figma: 25169:2668
      height: 97     // Figma: 25169:2668
    },
    container: {
      width: 430,    // Figma: 25169:2667
      height: 225,   // Figma: 25169:2667
      minHeight: 225,
      maxHeight: 800
    },
    button: {
      width: 195,    // Figma: 25169:2691
      height: 47     // Figma: 25169:2691
    },
    card: {
      width: 440,    // Figma: 25169:2866
      height: 1081   // Figma: 25169:2866
    }
  }
} as const

// ===========================================
// 5. 圆角系统 (基于 Figma 规范)
// ===========================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',     // 4px - 小圆角
  md: '0.5rem',      // 8px - Widget默认圆角 (Figma确认)
  lg: '0.75rem',     // 12px - 大圆角
  xl: '1rem',        // 16px - 超大圆角
  pill: '6.4375rem', // 103px - 胶囊形按钮 (Figma确认)
  full: '50%',       // 圆形
  
  // HVAC 专用圆角 (基于 shadcn 原生值)
  hvac: {
    card: '0.75rem',    // 对应 rounded-lg (12px)
    button: '0.5rem',   // 对应 rounded-md (8px)
    input: '0.5rem',    // 对应 rounded-md (8px)
    widget: '0.5rem',   // 对应 rounded-md (8px)
  }
} as const

// ===========================================
// 6. 阴影系统 (包含 HVAC 专用阴影)
// ===========================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  
  // HVAC Widget 专用阴影
  widget: {
    default: '0 2px 8px rgba(0, 0, 0, 0.1)',
    hover: '0 4px 16px rgba(0, 0, 0, 0.15)',
    active: '0 1px 4px rgba(0, 0, 0, 0.1)'
  },
  
  // 状态阴影 (彩色)
  status: {
    success: '0 4px 6px -1px rgb(103 215 94 / 0.2)',
    warning: '0 4px 6px -1px rgb(225 161 86 / 0.2)',
    danger: '0 4px 6px -1px rgb(114 69 225 / 0.2)',
    info: '0 4px 6px -1px rgb(51 160 255 / 0.2)',
  },
  
  // HVAC 专用阴影 (基于shadcn原生shadow)
  hvac: {
    success: '0 1px 2px 0 rgb(0 0 0 / 0.05)',      // 对应 shadow-sm
    warning: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // 对应 shadow-md
    danger: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',  // 对应 shadow-md
    hover: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)', // 对应 shadow-lg
    subtle: '0 1px 2px 0 rgb(0 0 0 / 0.05)',       // 对应 shadow-sm
    focus: '0 0 0 3px rgb(51 160 255 / 0.2)',      // 自定义focus ring
    dropdown: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' // 对应 shadow-lg
  }
} as const

// ===========================================
// 7. 图标系统设计令牌
// ===========================================

export const iconTokens = {
  // 图标尺寸标准 (基于 Figma 发现的规范)
  sizes: {
    sm: 20,    // 20x20px - 小图标
    md: 30,    // 30x30px - 标准图标
    lg: 40,    // 40x40px - 大图标
  },
  
  // 图标颜色变体 (与品牌色系统集成)
  colors: {
    white: brandColors.neutral.white,
    black: brandColors.neutral.black,
    primary: brandColors.blue[1],
    secondary: brandColors.nebula.primary,
    success: brandColors.green.success,
    warning: brandColors.amber.primary,
    danger: brandColors.nebula.dark,
  },
  
  // 图标间距系统
  spacing: {
    gap: spacing.hvac.textGap,      // 6px - 图标与文本间距
    margin: spacing.hvac.microGap,   // 5px - 图标外边距
  }
} as const

// ===========================================
// 7.1. 按钮系统设计令牌
// ===========================================

export const buttonTokens = {
  // 按钮尺寸
  sizes: {
    sm: {
      height: 32,
      padding: '8px 16px',
      fontSize: typography.fontSize.sm,
      borderRadius: borderRadius.md,
    },
    md: {
      height: 36,
      padding: '10px 20px',
      fontSize: typography.fontSize.base,
      borderRadius: borderRadius.md,
    },
    lg: {
      height: 44,
      padding: '12px 24px',
      fontSize: typography.fontSize.md,
      borderRadius: borderRadius.md,
    },
  },
  
  // 按钮变体
  variants: {
    primary: {
      background: brandColors.blue[1],
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.md,
    },
    secondary: {
      background: brandColors.neutral.white,
      color: brandColors.blue[1],
      border: `1px solid ${brandColors.blue[1]}`,
      shadow: 'none',
    },
    success: {
      background: brandColors.green.success,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.success,
    },
    warning: {
      background: brandColors.amber.primary,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.warning,
    },
    danger: {
      background: brandColors.nebula.dark,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.danger,
    },
    ghost: {
      background: 'transparent',
      color: brandColors.blue[1],
      border: 'none',
      shadow: 'none',
    },
  },
  
  // 按钮状态
  states: {
    hover: {
      opacity: 0.9,
      transform: 'translateY(-1px)',
      shadow: shadows.hvac.hover,
    },
    pressed: {
      opacity: 0.8,
      transform: 'translateY(0px)',
      shadow: 'none',
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      shadow: 'none',
    },
    loading: {
      opacity: 0.7,
      cursor: 'wait',
    },
  },
} as const

// ===========================================
// 7.2. 下拉框系统设计令牌
// ===========================================

export const dropdownTokens = {
  // 下拉框尺寸 (与按钮尺寸对应)
  sizes: {
    sm: {
      height: 32,
      padding: '8px 12px',
      fontSize: typography.fontSize.sm,
      borderRadius: borderRadius.md,
    },
    md: {
      height: 36,
      padding: '8px 16px',
      fontSize: typography.fontSize.base,
      borderRadius: borderRadius.md,
    },
    lg: {
      height: 44,
      padding: '10px 20px',
      fontSize: typography.fontSize.md,
      borderRadius: borderRadius.md,
    },
  },
  
  // 下拉框样式变体
  variants: {
    default: {
      background: brandColors.neutral.white,
      border: `1px solid ${brandColors.neutral.white}`,
      borderOpacity: 0.3,
      color: brandColors.neutral.black,
      shadow: 'none',
    },
    outlined: {
      background: 'transparent',
      border: `1px solid ${brandColors.blue[1]}`,
      borderOpacity: 1,
      color: brandColors.neutral.black,
      shadow: 'none',
    },
    filled: {
      background: brandColors.neutral.lightGray,
      border: 'none',
      borderOpacity: 1,
      color: brandColors.neutral.black,
      shadow: 'none',
    },
  },
  
  // 下拉框状态
  states: {
    hover: {
      borderOpacity: 0.5,
      shadow: shadows.hvac.subtle,
    },
    focus: {
      borderOpacity: 1,
      shadow: shadows.hvac.focus,
      outline: `2px solid ${brandColors.blue[1]}40`,
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      background: brandColors.neutral.lightGray,
    },
    error: {
      borderColor: brandColors.nebula.dark,
      shadow: shadows.hvac.danger,
    },
  },
  
  // 下拉菜单样式
  menu: {
    background: brandColors.neutral.white,
    border: `1px solid ${brandColors.neutral.lightGray}`,
    borderRadius: borderRadius.hvac.card,
    shadow: shadows.hvac.dropdown,
    maxHeight: '200px',
    zIndex: 1000,
  },
  
  // 选项样式
  option: {
    padding: '8px 16px',
    fontSize: typography.fontSize.base,
    color: brandColors.neutral.black,
    hoverBackground: brandColors.blue[1] + '10',
    selectedBackground: brandColors.blue[1] + '20',
  },
} as const

// ===========================================
// 8. 主题感知设计系统 (基于 Figma 变量系统)
// ===========================================

export type Theme = 'light' | 'dark'

// 透明度系统 (基于 Figma 组件学习)
export const opacityTokens = {
  // 背景透明度
  background: {
    solid: 1.0,           // 完全不透明
    subtle: 0.1,          // 10% - 微妙背景层 (VariableID:23520:18943)
    medium: 0.3,          // 30% - 中等透明度
    overlay: 0.8,         // 80% - 模态覆盖
  },
  
  // 文字透明度
  text: {
    primary: 1.0,         // 主要文字
    secondary: 0.7,       // 次要文字
    muted: 0.5,           // 静默文字
    disabled: 0.3,        // 禁用文字
  },
  
  // 边框透明度
  border: {
    default: 0.3,         // 默认边框 (如 Dropdown)
    focus: 1.0,           // 聚焦边框
    subtle: 0.1,          // 微妙边框
  }
} as const

// 卡片系统令牌 (基于天气预报卡片设计)
export const cardTokens = {
  // 卡片尺寸
  sizes: {
    compact: {
      width: 165,         // Figma 中的标准宽度
      height: 82,         // Figma 中的标准高度
      padding: 12,
      borderRadius: 8,
    },
    standard: {
      width: 195,         // 温度显示卡片宽度
      height: 195,        // 正方形卡片
      padding: 16,
      borderRadius: 12,
    },
    wide: {
      width: 400,         // 天气预报容器宽度
      height: 195,        // 横向卡片高度
      padding: 20,
      borderRadius: 16,
    }
  },
  
  // 卡片变体
  variants: {
    // 微妙背景卡片 (10% 透明度)
    subtle: {
      backgroundOpacity: opacityTokens.background.subtle,
      borderOpacity: opacityTokens.border.subtle,
      shadow: 'none',
    },
    
    // 标准卡片
    elevated: {
      backgroundOpacity: opacityTokens.background.solid,
      borderOpacity: opacityTokens.border.default,
      shadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
    // 高级卡片
    premium: {
      backgroundOpacity: opacityTokens.background.solid,
      borderOpacity: opacityTokens.border.focus,
      shadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    }
  }
} as const

// 主题感知的颜色令牌
export const themeTokens = {
  light: {
    // 背景色系统 (基于 SVG 白色主题设计)
    background: {
      primary: brandColors.lightTheme.background,    // 主背景 - 淡蓝色
      secondary: brandColors.neutral.lightGray,      // 次要背景
      elevated: brandColors.lightTheme.cardBackground, // 浮层背景 - 纯白
      card: brandColors.lightTheme.cardBackground,   // 卡片背景
    },
    
    // 前景色系统 (基于 SVG 文本颜色)
    foreground: {
      primary: brandColors.neutral.black,            // 主文本 - 黑色
      secondary: 'rgba(10, 10, 10, 0.7)',           // 次要文本 - 70% 黑色
      muted: 'rgba(10, 10, 10, 0.5)',               // 静默文本 - 50% 黑色
      inverse: brandColors.neutral.white,            // 反色文本
    },
    
    // 边框和分割线 (基于 SVG 边框设计)
    border: {
      default: brandColors.lightTheme.borderColor,   // 默认边框
      muted: 'rgba(45, 62, 127, 0.05)',             // 更淡的边框
      accent: brandColors.blue[1],                   // 强调边框
    },
    
    // 按钮主题适配
    button: {
      primary: {
        background: brandColors.blue[1],
        foreground: brandColors.neutral.white,
        border: brandColors.blue[1],
      },
      secondary: {
        background: brandColors.neutral.white,
        foreground: brandColors.blue[1],
        border: brandColors.blue[1],
      },
      ghost: {
        background: 'transparent',
        foreground: brandColors.blue[1],
        border: 'transparent',
      }
    },
    
    // 下拉框主题适配
    dropdown: {
      background: brandColors.neutral.white,
      foreground: brandColors.neutral.black,
      border: brandColors.neutral.white,
      borderOpacity: 0.3,
      menu: {
        background: brandColors.neutral.white,
        border: brandColors.neutral.lightGray,
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }
    }
  },
  
  dark: {
    // 背景色系统 (与已有黑色主题保持一致)
    background: {
      primary: brandColors.neutral.black,      // 主背景 - 纯黑
      secondary: brandColors.neutral.darkGray, // 次要背景 - 深灰
      elevated: brandColors.neutral.darkGray,  // 浮层背景 - 深灰
      card: 'rgba(26, 26, 26, 1)',            // 卡片背景 - 稍亮的黑
    },
    
    // 前景色系统 (保持现有设计)
    foreground: {
      primary: brandColors.neutral.white,      // 主文本 - 白色
      secondary: 'rgba(255, 255, 255, 0.8)',  // 次要文本 - 80% 白色
      muted: 'rgba(255, 255, 255, 0.6)',      // 静默文本 - 60% 白色
      inverse: brandColors.neutral.black,      // 反色文本
    },
    
    // 边框和分割线 (改进透明度处理)
    border: {
      default: 'rgba(255, 255, 255, 0.1)',    // 默认边框 - 10% 白色
      muted: 'rgba(255, 255, 255, 0.05)',     // 更淡的边框 - 5% 白色
      accent: brandColors.blue[1],             // 强调边框
    },
    
    // 按钮主题适配
    button: {
      primary: {
        background: brandColors.blue[1],
        foreground: brandColors.neutral.white,
        border: brandColors.blue[1],
      },
      secondary: {
        background: 'transparent',
        foreground: brandColors.blue[1],
        border: brandColors.blue[1],
      },
      ghost: {
        background: 'transparent',
        foreground: brandColors.neutral.white,
        border: 'transparent',
      }
    },
    
    // 下拉框主题适配
    dropdown: {
      background: brandColors.neutral.darkGray,
      foreground: brandColors.neutral.white,
      border: brandColors.neutral.white,
      borderOpacity: 0.3,
      menu: {
        background: brandColors.neutral.darkGray,
        border: brandColors.neutral.mediumGray,
        shadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
      }
    }
  }
} as const

// 主题感知的按钮令牌 (重新定义)
export const createButtonTokens = (theme: Theme) => ({
  ...buttonTokens,
  variants: {
    primary: {
      background: themeTokens[theme].button.primary.background,
      color: themeTokens[theme].button.primary.foreground,
      border: `1px solid ${themeTokens[theme].button.primary.border}`,
      shadow: shadows.md,
    },
    secondary: {
      background: themeTokens[theme].button.secondary.background,
      color: themeTokens[theme].button.secondary.foreground,
      border: `1px solid ${themeTokens[theme].button.secondary.border}`,
      shadow: 'none',
    },
    success: {
      background: brandColors.green.success,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.success,
    },
    warning: {
      background: brandColors.amber.primary,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.warning,
    },
    danger: {
      background: brandColors.nebula.dark,
      color: brandColors.neutral.white,
      border: 'none',
      shadow: shadows.hvac.danger,
    },
    ghost: {
      background: themeTokens[theme].button.ghost.background,
      color: themeTokens[theme].button.ghost.foreground,
      border: `1px solid ${themeTokens[theme].button.ghost.border}`,
      shadow: 'none',
    },
  }
})

// 主题感知的下拉框令牌 (重新定义)
export const createDropdownTokens = (theme: Theme) => ({
  ...dropdownTokens,
  variants: {
    default: {
      background: themeTokens[theme].dropdown.background,
      border: `1px solid ${themeTokens[theme].dropdown.border}`,
      borderOpacity: themeTokens[theme].dropdown.borderOpacity,
      color: themeTokens[theme].dropdown.foreground,
      shadow: 'none',
    },
    outlined: {
      background: 'transparent',
      border: `1px solid ${themeTokens[theme].border.accent}`,
      borderOpacity: 1,
      color: themeTokens[theme].dropdown.foreground,
      shadow: 'none',
    },
    filled: {
      background: themeTokens[theme].background.secondary,
      border: 'none',
      borderOpacity: 1,
      color: themeTokens[theme].dropdown.foreground,
      shadow: 'none',
    },
  },
  menu: {
    background: themeTokens[theme].dropdown.menu.background,
    border: `1px solid ${themeTokens[theme].dropdown.menu.border}`,
    borderRadius: borderRadius.hvac.card,
    shadow: themeTokens[theme].dropdown.menu.shadow,
    maxHeight: '200px',
    zIndex: 1000,
  },
  option: {
    padding: '8px 16px',
    fontSize: typography.fontSize.base,
    color: themeTokens[theme].dropdown.foreground,
    hoverBackground: themeTokens[theme].border.accent + '10',
    selectedBackground: themeTokens[theme].border.accent + '20',
  },
})

// 标准设计系统映射 (保持向后兼容)
// 标准语义颜色映射 (主题感知)
export const standardTokens = {
  light: {
    // 白色主题：使用稍深的颜色确保在淡色背景上的对比度
    primary: brandColors.blue[1],          // 主色 - 蓝色 (#33A0FF)
    secondary: brandColors.nebula.dark,    // 次要色 - 深紫色 (更好对比度)
    success: brandColors.green.success,    // 成功 - 绿色 (#67D75E)
    warning: brandColors.amber.primary,    // 警告 - 橙色 (#E1A156)
    danger: '#DC2626',                     // 危险 - 深红色 (白色主题用深色)
    info: brandColors.blue[2],             // 信息 - 浅蓝色 (#70BCFF)
    background: themeTokens.light.background.primary,
    foreground: themeTokens.light.foreground.primary,
  },
  dark: {
    // 黑色主题：使用亮色确保在深色背景上的对比度
    primary: brandColors.blue[1],          // 主色 - 蓝色 (保持一致)
    secondary: brandColors.nebula.primary, // 次要色 - 亮紫色
    success: brandColors.green.success,    // 成功 - 绿色
    warning: brandColors.amber.primary,    // 警告 - 橙色  
    danger: '#F87171',                     // 危险 - 亮红色 (黑色主题用亮色)
    info: brandColors.blue[3],             // 信息 - 更亮的蓝色
    background: themeTokens.dark.background.primary,
    foreground: themeTokens.dark.foreground.primary,
  }
} as const

// ===========================================
// 8. 动画系统
// ===========================================

export const animation = {
  duration: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 750,
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
} as const

// ===========================================
// 9. CSS 变量生成
// ===========================================

export const cssVariables = {
  // 品牌颜色
  '--brand-blue-1': brandColors.blue[1],
  '--brand-blue-2': brandColors.blue[2],
  '--brand-blue-3': brandColors.blue[3],
  '--brand-blue-4': brandColors.blue[4],
  '--brand-green-1': brandColors.green[1],
  '--brand-green-2': brandColors.green[2],
  '--brand-green-success': brandColors.green.success,
  '--brand-amber-primary': brandColors.amber.primary,
  '--brand-nebula-primary': brandColors.nebula.primary,
  '--brand-nebula-dark': brandColors.nebula.dark,
  '--brand-white': brandColors.neutral.white,
  '--brand-black': brandColors.neutral.black,
  
  // 标准映射
  '--primary': standardTokens.light.primary,
  '--secondary': standardTokens.light.secondary,
  '--success': standardTokens.light.success,
  '--warning': standardTokens.light.warning,
  '--danger': standardTokens.light.danger,
  '--background': standardTokens.light.background,
  '--foreground': standardTokens.light.foreground,
  
  // 字体
  '--font-family-primary': typography.fontFamily.primary,
  '--font-weight-light': typography.fontWeight.light.toString(),
  '--font-weight-regular': typography.fontWeight.regular.toString(),
  '--font-weight-medium': typography.fontWeight.medium.toString(),
  '--font-weight-bold': typography.fontWeight.bold.toString(),
  '--font-weight-black': typography.fontWeight.black.toString(),
  
  // HVAC 间距
  '--hvac-container-padding': spacing.hvac.containerPadding,
  '--hvac-module-gap': spacing.hvac.moduleGap,
  '--hvac-text-gap': spacing.hvac.textGap,
  '--hvac-text-line-spacing': spacing.hvac.textLineSpacing,
  
  // 布局变量 (TODO: 定义 layout 对象)
  // '--layout-grid-gap': layout.grid.base.gap,
  // '--layout-container-padding': layout.grid.base.padding,
  // '--widget-columns': layout.grid.widget.columns.toString(),
  // '--widget-rows': layout.grid.widget.rows.toString(),
} as const

// ===========================================
// 11. 业务语义映射 (完整版)
// ===========================================

export const businessMapping = {
  // 温度状态
  temperature_normal: 'success',
  temperature_warning: 'warning',
  temperature_critical: 'danger',
  temperature_optimal: 'primary',
  
  // 设备状态
  equipment_online: 'success',
  equipment_offline: 'danger',
  equipment_maintenance: 'warning',
  equipment_efficiency: 'info',
  
  // 空气质量
  air_excellent: 'success',
  air_good: 'success',
  air_moderate: 'warning',
  air_poor: 'danger',
  
  // 水系统
  water_pure: 'info',
  water_clean: 'info',
  water_filtered: 'primary',
  water_treatment: 'secondary',
  
  // AI 状态
  ai_active: 'secondary',
  ai_learning: 'primary',
  ai_optimizing: 'success',
  ai_inactive: 'danger',
  
  // 操作
  confirm_action: 'primary',
  cancel_action: 'secondary',
  delete_action: 'danger',
  save_action: 'success',
  
  // 图表业务语义
  energy_efficiency: 'success',      // 能效 -> 绿色系
  energy_reduction: 'primary',       // 节能 -> 蓝色系  
  temperature_range: 'info',         // 温度范围 -> 蓝色系
  performance_score: 'secondary',    // 性能评分 -> 紫色系
  rt_efficiency_distribution: 'primary', // RT效率分布 -> 蓝色系
  default: 'primary',                // 默认语义 -> 主色系
  cost_savings: 'success',          // 成本节约 -> 绿色系
  usage_comparison: 'warning',       // 使用对比 -> 橙色系
  system_ranking: 'primary',         // 系统排名 -> 蓝色系
  efficiency_trend: 'success',       // 效率趋势 -> 绿色系
  
  // 多环形图业务语义
  consumption_planning: 'primary',   // 消耗规划 -> 蓝色系
  cost_breakdown: 'success',         // 成本分解 -> 绿色系  
  efficiency_comparison: 'secondary', // 效率对比 -> 紫色系
  resource_allocation: 'info',       // 资源分配 -> 蓝色系
  
  // 线形图业务语义
  actual_flow: 'primary',            // 实际流量 -> 蓝色系
  current_setpoint: 'success',       // 当前设定点 -> 绿色系
  temperature_trend: 'warning',      // 温度趋势 -> 橙色系
  energy_consumption: 'primary',     // 能耗趋势 -> 蓝色系
  performance_trend: 'secondary',    // 性能趋势 -> 紫色系
  flow_monitoring: 'primary',        // 流量监控 -> 蓝色系
  
  // 功率监控业务语义
  total_power: 'secondary',          // 总功率 -> 紫色系
  chiller_power: 'success',          // 冷却器功率 -> 绿色系
  pump_power: 'primary',             // 泵功率 -> 蓝色系
  power_monitoring: 'secondary',     // 功率监控 -> 紫色系
  
  // 双线图业务语义 (最新Figma设计)
  dual_line_primary: 'primary',      // 主线 -> 蓝色渐变
  dual_line_setpoint: 'success',     // 设定点线 -> 白色虚线
  
  // 图例示例业务语义 (基于Figma图例设计)
  actual_energy: 'primary',          // 实际能耗 -> 蓝色渐变实线
  predicted_energy: 'success',       // 预测能耗 -> 白色虚线
  
  // 柱状图业务语义 (基于Figma柱状图设计)
  rt_efficiency_distribution: 'primary', // RT效率分布 -> 蓝色系渐变柱状图
  
  // HVAC控制界面语义 (基于Figma控制面板设计)
  hvac_control_panel: 'primary',        // HVAC控制面板 -> 主色系
  hvac_status_running: 'success',       // 运行状态 -> 绿色系
  hvac_status_cooling: 'primary',       // 制冷状态 -> 蓝色系  
  hvac_status_offline: 'secondary',     // 离线状态 -> 灰色系
  
  // 分段环形图业务语义 (基于Figma分段环形图设计)
  hvac_performance_distribution: 'primary',    // HVAC性能分布 -> 蓝色系
  system_efficiency_breakdown: 'secondary',    // 系统效率分解 -> 紫色系
  energy_distribution: 'info',                 // 能耗分布 -> 信息蓝色
  segment_primary: 'primary',                  // 主要段 -> 蓝色
  segment_secondary: 'secondary',              // 次要段 -> 紫色
  segment_tertiary: 'info',                    // 第三段 -> 信息色
  segment_quaternary: 'success',               // 第四段 -> 成功色
  
  // 图表状态语义
  chart_optimal: 'success',          // 最佳状态
  chart_normal: 'primary',           // 正常状态  
  chart_warning: 'warning',          // 警告状态
  chart_critical: 'danger'           // 严重状态
} as const

// ===========================================
// 12. 导出和类型
// ===========================================

// ===========================================
// 12. 图表设计令牌系统 (基于 Figma 图表分析)
// ===========================================

export type ChartType = 'donut' | 'bar' | 'line' | 'gauge' | 'multiRing' | 'column' | 'segmentedRing'
export type ChartSize = 'sm' | 'md' | 'lg'
export type GradientType = 'linear' | 'angular' | 'radial'

// 图表尺寸令牌
export const chartTokens = {
  // 图表类型定义
  types: {
    donut: 'donut',           // 环形图 (Figma: Energy Reduction Ranking)
    bar: 'bar',               // 条形图 (Figma: Performance Score)
    line: 'line',             // 折线图
    gauge: 'gauge',           // 仪表盘
    multiRing: 'multiRing'    // 多环形图 (Figma: Plant Consumption Planning)
  },
  
  // 通用尺寸系统
  sizes: {
    sm: { 
      width: 120, 
      height: 120,
      container: { width: 280, height: 160 }
    },
    md: { 
      width: 195, 
      height: 195,
      container: { width: 430, height: 225 }  // Figma 标准卡片
    },
    lg: { 
      width: 260, 
      height: 260,
      container: { width: 580, height: 300 }
    }
  },
  
  // 环形图专用令牌 (基于 Figma: 23910:4724)
  donut: {
    strokeWidth: { 
      sm: 6, 
      md: 10,     // Figma 实际值
      lg: 14 
    },
    diameter: { 
      sm: 100, 
      md: 162.84, // Figma 实际值 
      lg: 220 
    },
    centerOffset: { x: 0, y: 0 },
    // 起始角度 (顶部开始，顺时针)
    startAngle: -90,
    // 数值显示位置
    valuePosition: {
      x: 'center',
      y: 'top',
      offset: { x: 0, y: -20 }
    }
  },
  
  // 条形图专用令牌 (基于 Figma: 23258:3904)
  bar: {
    height: { 
      sm: 4, 
      md: 8,      // Figma 实际值 (strokeWeight)
      lg: 12 
    },
    width: { 
      sm: 120, 
      md: 171,    // Figma 实际值
      lg: 220 
    },
    labelGap: 8,
    // 主数值样式
    mainValue: {
      fontSize: { sm: 12, md: 16, lg: 20 },  // Figma: 16px
      position: 'center'
    },
    // 范围标签样式  
    rangeLabels: {
      fontSize: { sm: 8, md: 10, lg: 12 },   // Figma: 10px
      position: ['left', 'right']
    },
    // 网格线配置
    gridLines: {
      stroke: 1,
      opacity: 0.2,                          // Figma: 20% 白色
      spacing: 'auto'
    }
  },
  
  // 多环形图专用令牌 (基于 Figma: 23910:4739)
  multiRing: {
    strokeWidth: { 
      sm: 8, 
      md: 10,     // Figma 实际值
      lg: 12 
    },
    radius: { 
      sm: 60, 
      md: 85,     // Figma 实际值: 约85px
      lg: 110 
    },
    
    // 分段配置
    segments: {
      minAngle: 15,            // 最小分段角度 (度)
      maxSegments: 8,          // 最大分段数
      gapAngle: 4,             // 分段间隙角度 (度)
      defaultSegments: 4       // 默认分段数 (基于Figma)
    },
    
    // 数据标签区布局 (基于Figma分析)
    labelArea: {
      height: 48,              // Figma: 每行48px高度
      gap: 0,                  // 标签行间距
      backgroundColor: "rgba(255,255,255,0.1)",  // Figma: 10%透明白色
      borderRadius: 5,
      padding: 8,
      fontSize: 16             // 主标签字体大小
    },
    
    // 中心位置偏移
    centerOffset: { x: 0, y: 0 },
    
    // 背景环配置
    backgroundRing: {
      opacity: 0.2,           // Figma: 20% 透明度
      stroke: "white"
    }
  },

  // 线形图专用令牌 (基于 Figma: 23258:3647)
  line: {
    strokeWidth: { 
      sm: 1, 
      md: 2,      // Figma 实际值: 2px
      lg: 3 
    },
    width: { 
      sm: 280, 
      md: 401,    // Figma 实际值: 401px宽度
      lg: 520 
    },
    height: { 
      sm: 120, 
      md: 196,    // Figma 实际值: 196px高度
      lg: 240 
    },
    
    // 数据点配置
    dataPoints: {
      radius: { sm: 2, md: 3, lg: 4 },
      strokeWidth: { sm: 1, md: 2, lg: 2 },
      showPoints: true,        // 是否显示数据点
      hoverRadius: { sm: 4, md: 6, lg: 8 }  // hover状态半径
    },
    
    // 网格线配置 (基于Figma虚线网格)
    gridLines: {
      stroke: 1,
      opacity: 0.2,           // Figma: 20% 白色
      dashArray: "0.1 4",     // Figma: stroke-dasharray="0.1 4"
      horizontal: true,       // 显示水平网格线
      vertical: false         // 不显示垂直网格线
    },
    
    // 坐标轴配置
    axes: {
      x: {
        show: true,
        labelGap: 8,           // 标签与轴线间距
        fontSize: { sm: 8, md: 10, lg: 12 },  // 坐标轴标签字体
        tickLength: 4,
        opacity: 0.4           // Figma: x轴标签透明度40%
      },
      y: {
        show: true,
        labelGap: 12,
        fontSize: { sm: 8, md: 10, lg: 12 },
        tickLength: 0,         // 不显示y轴刻度线
        opacity: 0.4           // Figma: y轴标签透明度40%
      }
    },
    
    // 图例配置
    legend: {
      show: true,
      position: 'top',        // Figma: 图例在顶部
      gap: 24,               // 图例项间距
      itemGap: 8,            // 图例标记与文字间距
      fontSize: { sm: 10, md: 12, lg: 14 },
      opacity: 0.7           // Figma: 图例透明度70%
    },
    
    // 图表边距 (给坐标轴和标签留空间)
    padding: {
      top: 40,               // 为图例预留空间
      right: 48,             // 右侧边距
      bottom: 40,            // 底部坐标轴空间
      left: 48               // 左侧坐标轴空间
    },
    
    // 柱状图专用令牌 (基于 Figma: 23521:19843)
    column: {
      width: { 
        sm: 300, 
        md: 400,    // Figma 实际值: 400px宽度
        lg: 520 
      },
      height: { 
        sm: 120, 
        md: 196,    // Figma 实际值: 196px高度
        lg: 240 
      },
      
      // 柱子配置
      bars: {
        width: 64,              // Figma: 柱子宽度64px
        gap: 3,                 // Figma: 柱子间距3px
        borderRadius: 0,        // Figma: 无圆角
        minHeight: 10,          // 最小高度
        maxOpacity: 0.2         // Figma: 柱子透明度20%
      },
      
      // 数据标签配置
      labels: {
        show: true,
        fontSize: { sm: 10, md: 12, lg: 14 },  // 数据标签字体
        gap: 8,                // 标签与柱子顶部间距
        opacity: 1.0,          // 标签完全不透明
        gradient: true         // 标签使用渐变色
      },
      
      // 网格线配置 (基于Figma虚线网格)
      gridLines: {
        stroke: 1,
        opacity: 0.2,           // Figma: 20% 白色
        dashArray: "0.1 4",     // Figma: stroke-dasharray="0.1 4"
        horizontal: true,       // 显示水平网格线
        vertical: false         // 不显示垂直网格线
      },
      
      // 坐标轴配置
      axes: {
        x: {
          show: true,
          labelGap: 12,          // X轴标签间距
          fontSize: { sm: 8, md: 10, lg: 12 },
          opacity: 0.7           // Figma: x轴标签透明度70%
        },
        y: {
          show: false,           // Figma: 不显示y轴标签
          labelGap: 12,
          fontSize: { sm: 8, md: 10, lg: 12 },
          opacity: 0.4
        }
      },
      
      // 图表边距
      padding: {
        top: 40,               // 为数据标签预留空间
        right: 24,             
        bottom: 40,            // 底部坐标轴空间
        left: 24               
      }
    }
  },
  
  // 分段环形图令牌 (基于 Figma: 23639:5065)
  segmentedRing: {
    // 尺寸配置 (基于 196x195 原始尺寸)
    width: { 
      sm: 147,    // 75% 缩放
      md: 196,    // Figma 原始宽度
      lg: 245     // 125% 缩放
    },
    height: { 
      sm: 146,    // 75% 缩放 
      md: 195,    // Figma 原始高度
      lg: 244     // 125% 缩放
    },
    radius: {
      sm: 73,     // 对应缩放半径
      md: 97,     // Figma 原始半径
      lg: 121     // 对应缩放半径
    },
    
    // 段配置
    segments: {
      maxSegments: 8,           // 最大段数
      minValue: 0.01,          // 最小段值 (百分比)
      strokeWidth: 1,          // 段边框宽度
      strokeOpacity: 0.2,      // Figma: 20% 描边透明度
      hoverScale: 1.05,        // 悬停放大比例
      gap: 1                   // 段间隙 (度数)
    },
    
    // 动画配置
    animation: {
      duration: 600,           // 动画持续时间 (ms)
      stagger: 100,           // 段动画间隔 (ms)
      easing: 'ease-out',     // 缓动函数
      hoverDuration: 200      // 悬停动画时长
    },
    
    // 标签配置
    labels: {
      show: true,
      fontSize: { sm: 10, md: 12, lg: 14 },
      gap: 8,                 // 标签与图表间距
      maxLength: 12           // 标签最大字符数
    }
  }
} as const

// 图表渐变系统 (基于 Figma 精确提取)
export const chartGradients = {
  // 环形图渐变配置 (Figma: Energy Reduction)
  donut: {
    energy_reduction: {
      type: 'angular' as const,
      stops: [
        { 
          color: 'rgb(121, 155, 255)',        // Figma: r:0.472, g:0.595, b:1
          position: 0 
        },
        { 
          color: 'rgb(122, 228, 255)',        // Figma: r:0.478, g:0.896, b:1  
          position: 0.82 
        },
        { 
          color: 'transparent',               // Figma: 透明部分
          position: 0.82 
        }
      ],
      // Figma 变换矩阵转换为标准角度
      rotation: 0
    },
    
    // 其他业务语义的环形图渐变
    performance_score: {
      type: 'angular' as const,
      stops: [
        { color: brandColors.nebula.primary, position: 0 },
        { color: brandColors.nebula.dark, position: 0.75 },
        { color: 'transparent', position: 0.75 }
      ],
      rotation: 0
    }
  },
  
  // 条形图渐变配置 (Figma: Performance Bar)
  bar: {
    temperature_range: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(51, 160, 255)',         // Figma: VariableID:23545:3018
          position: 0 
        },
        { 
          color: 'rgb(141, 254, 248)',        // Figma: VariableID:23545:3023
          position: 1 
        }
      ]
    },
    
    performance_score: {
      type: 'linear' as const,
      direction: 'horizontal', 
      stops: [
        { 
          color: 'rgb(51, 160, 255)',         // 主值使用蓝色渐变
          position: 0 
        },
        { 
          color: 'rgb(139, 236, 255)',        
          position: 1 
        }
      ]
    },
    
    energy_efficiency: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { color: brandColors.green.success, position: 0 },
        { color: brandColors.green[1], position: 1 }
      ]
    }
  },
  
  // 多环形图渐变配置 (基于 Figma: Plant Consumption Planning)
  multiRing: {
    consumption_planning: {
      type: 'segments' as const,
      colors: [
        'rgb(51, 160, 255)',    // #33A0FF - Figma: VariableID:23545:3018
        'rgb(112, 188, 255)',   // #70BCFF - 中蓝色
        'rgb(139, 236, 255)',   // #8BECFF - 浅蓝色  
        'rgb(141, 254, 248)'    // #8DFEF8 - 青绿色
      ]
    },
    
    cost_breakdown: {
      type: 'segments' as const,
      colors: [
        brandColors.green.success,   // 绿色系成本分解
        brandColors.green[1],
        brandColors.green[2], 
        brandColors.amber.primary
      ]
    },
    
    efficiency_comparison: {
      type: 'segments' as const,
      colors: [
        brandColors.nebula.primary,  // 紫色系效率对比
        brandColors.nebula.dark,
        brandColors.blue[1],
        brandColors.blue[2]
      ]
    },
    
    resource_allocation: {
      type: 'segments' as const,
      colors: [
        brandColors.blue[1],         // 蓝色系资源分配
        brandColors.blue[2],
        brandColors.blue[3],
        brandColors.blue[4]
      ]
    }
  },

  // 线形图渐变配置 (基于 Figma: 23258:3647)
  line: {
    // 实际流量线 (Actual Flow) - 蓝色到青色渐变
    actual_flow: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(51, 160, 255)',         // Figma: #33A0FF
          position: 0 
        },
        { 
          color: 'rgb(141, 254, 248)',        // Figma: #8DFEF8  
          position: 1 
        }
      ],
      // 线条样式
      strokeDasharray: 'none',                // 实线
      opacity: 1.0
    },

    // 当前设定点线 (Current Set point) - 绿色渐变，虚线
    current_setpoint: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(68, 255, 55)',          // Figma: #44FF37
          position: 0 
        },
        { 
          color: 'rgb(96, 255, 242)',         // Figma: #60FFF2
          position: 1 
        }
      ],
      // 线条样式
      strokeDasharray: '2 4',                 // Figma: 虚线样式
      opacity: 1.0
    },

    // 基于 Figma 图例设计的新语义
    // Actual Energy - 蓝色渐变实线 (精确匹配 Figma SVG)
    actual_energy: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: '#33A0FF',                       // Figma SVG: #33A0FF
          position: 0 
        },
        { 
          color: '#8DFEF8',                       // Figma SVG: #8DFEF8  
          position: 1 
        }
      ],
      strokeDasharray: 'none',                    // 实线
      opacity: 1.0
    },
    
    // Predicted Energy - 白色虚线 (精确匹配 Figma SVG)
    predicted_energy: {
      type: 'solid' as const,
      stops: [
        { 
          color: 'white',                         // Figma SVG: 白色
          position: 0 
        }
      ],
      strokeDasharray: '2 4',                     // Figma SVG: stroke-dasharray="2 4"
      opacity: 1.0
    },

    // 其他业务语义的线形图渐变
    temperature_trend: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { color: brandColors.amber.primary, position: 0 },
        { color: brandColors.green.success, position: 1 }
      ],
      strokeDasharray: 'none',
      opacity: 1.0
    },

    energy_consumption: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { color: brandColors.blue[1], position: 0 },
        { color: brandColors.blue[3], position: 1 }
      ],
      strokeDasharray: 'none', 
      opacity: 1.0
    },

    performance_trend: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { color: brandColors.nebula.primary, position: 0 },
        { color: brandColors.nebula.dark, position: 1 }
      ],
      strokeDasharray: 'none',
      opacity: 1.0
    },

    // 功率监控线 (基于 Figma: 23258:3681)
    total_power: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(138, 91, 255)',          // Figma: #8A5BFF
          position: 0 
        },
        { 
          color: 'rgb(232, 129, 255)',         // Figma: #E881FF
          position: 1 
        }
      ],
      strokeDasharray: 'none',
      opacity: 1.0
    },

    chiller_power: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(68, 255, 55)',           // Figma: #44FF37
          position: 0 
        },
        { 
          color: 'rgb(96, 255, 242)',          // Figma: #60FFF2
          position: 1 
        }
      ],
      strokeDasharray: 'none',
      opacity: 1.0
    },

    pump_power: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: 'rgb(51, 160, 255)',          // Figma: #33A0FF
          position: 0 
        },
        { 
          color: 'rgb(141, 254, 248)',         // Figma: #8DFEF8
          position: 1 
        }
      ],
      strokeDasharray: 'none',
      opacity: 1.0
    }
  },

  // 柱状图渐变配置 (基于 Figma: 23521:19843)  
  column: {
    // RT 效率分布数据 - 蓝色渐变 (匹配 Figma SVG)
    rt_efficiency_distribution: {
      type: 'linear' as const,
      direction: 'vertical',  // 垂直渐变，从上到下
      stops: [
        { 
          color: '#70BCFF',                      // Figma SVG: #70BCFF
          position: 0 
        },
        { 
          color: 'rgba(255, 255, 255, 0)',      // Figma SVG: 透明白色
          position: 1 
        }
      ],
      opacity: 0.2                              // Figma: 柱子透明度20%
    },
    
    // 数据标签渐变 (匹配 Figma 文字样式)
    data_labels: {
      type: 'linear' as const,
      direction: 'horizontal',
      stops: [
        { 
          color: '#33A0FF',                      // Figma: 蓝色起点
          position: 0 
        },
        { 
          color: '#8DFEF8',                      // Figma: 青色终点
          position: 1 
        }
      ],
      opacity: 1.0                              // 标签完全不透明
    }
  },
  
  // 主题特定渐变 (基于 SVG 白色主题分析)
  themeSpecific: {
    light: {
      // 白色主题背景渐变 (基于 SVG radialGradient)
      backgroundGradient: {
        type: 'radial' as const,
        stops: [
          { color: '#FFC4B2', position: 0 },      // SVG: stop-color="#FFC4B2"
          { color: '#CED0FF', position: 0.51 },   // SVG: offset="0.509615"
          { color: '#7DC7FF', position: 1 }       // SVG: stop-color="#7DC7FF"
        ]
      },
      
      // 白色主题发光效果 (基于 SVG linearGradient)
      glowEffect: {
        type: 'linear' as const,
        direction: 'vertical',
        stops: [
          { color: '#FFF7B7', position: 0 },      // SVG: stop-color="#FFF7B7"
          { color: 'white', position: 1 }         // SVG: stop-color="white"
        ]
      }
    },
    
    dark: {
      // 黑色主题保持现有渐变不变
      backgroundGradient: {
        type: 'radial' as const,
        stops: [
          { color: 'rgba(51, 160, 255, 0.1)', position: 0 },
          { color: 'rgba(10, 10, 10, 0.8)', position: 1 }
        ]
      },
      
      glowEffect: {
        type: 'linear' as const,
        direction: 'vertical',
        stops: [
          { color: 'rgba(139, 236, 255, 0.3)', position: 0 },
          { color: 'transparent', position: 1 }
        ]
      }
    }
  },
  
  // 分段环形图渐变配置 (基于 Figma: 23639:5065)
  segmentedRing: {
    hvac_performance_distribution: {
      type: 'segments' as const,
      colors: [
        '#33A0FF',  // Figma 段1: 主蓝色
        '#50BCFF',  // Figma 段2: 中蓝色
        '#57DDFF',  // Figma 段3: 浅蓝色
        '#6CEBE5'   // Figma 段4: 青绿色
      ]
    },
    
    system_efficiency_breakdown: {
      type: 'segments' as const,
      colors: [
        brandColors.blue[1],      // 主要效率 - 蓝色
        brandColors.blue[2],      // 次要效率 - 中蓝色
        brandColors.green.success, // 优化效率 - 绿色
        brandColors.amber.primary  // 待优化 - 橙色
      ]
    },
    
    energy_distribution: {
      type: 'segments' as const,
      colors: [
        brandColors.blue[1],       // 制冷能耗
        brandColors.blue[2],       // 通风能耗
        brandColors.green[1],      // 照明能耗
        brandColors.amber.primary  // 其他能耗
      ]
    }
  }
} as const

// 图表文字样式令牌
export const chartTypography = {
  // 标题样式 (Figma: "Energy Reduction Ranking")
  title: {
    fontSize: { sm: 18, md: 24, lg: 28 },    // Figma: 24px
    fontWeight: typography.fontWeight.medium, // Figma: Medium
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.tight
  },
  
  // 主数值样式 (Figma: "81")
  mainValue: {
    fontSize: { sm: 14, md: 16, lg: 20 },    // Figma: 16px
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.tight
  },
  
  // 范围标签样式 (Figma: "29", "87")
  rangeLabel: {
    fontSize: { sm: 8, md: 10, lg: 12 },     // Figma: 10px
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.normal
  },
  
  // 单位标签样式 (Figma: "250/0")
  unitLabel: {
    fontSize: { sm: 8, md: 10, lg: 12 },     // Figma: 10px
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.normal
  },
  
  // 通用标签系统 (新增)
  labels: {
    fontSize: { sm: 10, md: 12, lg: 14 },
    fontWeight: {
      regular: typography.fontWeight.regular,
      bold: typography.fontWeight.medium
    },
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.normal
  },
  
  // 坐标轴标签 (新增)
  axes: {
    x: {
      fontSize: { sm: 8, md: 10, lg: 12 },
      fontWeight: typography.fontWeight.regular,
      fontFamily: typography.fontFamily.primary,
      lineHeight: typography.lineHeight.normal
    },
    y: {
      fontSize: { sm: 8, md: 10, lg: 12 },
      fontWeight: typography.fontWeight.regular,
      fontFamily: typography.fontFamily.primary,
      lineHeight: typography.lineHeight.normal
    }
  },
  
  // 数据标签 (新增)
  dataLabels: {
    fontSize: { sm: 8, md: 10, lg: 12 },     // Figma: 各种数值标签
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.tight
  },
  
  // 工具提示 (新增)
  tooltip: {
    fontSize: { sm: 10, md: 12, lg: 14 },
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.primary,
    lineHeight: typography.lineHeight.normal
  }
} as const

export const baseDesignTokens = {
  brandColors,
  typography,
  spacing,
  sizing,
  borderRadius,
  shadows,
  iconTokens,
  chartTokens,
  chartGradients, 
  chartTypography,
  animation,
  standardTokens,
  cssVariables,
  businessMapping,
} as const

export type BusinessSemantic = keyof typeof businessMapping
export type StandardToken = typeof businessMapping[BusinessSemantic]
export type HVACSpacing = keyof typeof spacing.hvac
export type HVACSizing = keyof typeof sizing.hvac
export type IconSize = keyof typeof iconTokens.sizes
export type IconColor = keyof typeof iconTokens.colors
export type IconCategory = keyof typeof iconTokens.categories

// 图表相关类型
export type ChartSemantic = Extract<BusinessSemantic, 
  | 'energy_efficiency' 
  | 'energy_reduction' 
  | 'temperature_range' 
  | 'performance_score' 
  | 'cost_savings' 
  | 'usage_comparison'
  | 'system_ranking'
  | 'efficiency_trend'
  | 'consumption_planning'
  | 'cost_breakdown'
  | 'efficiency_comparison'
  | 'resource_allocation'
  | 'actual_flow'
  | 'current_setpoint'
  | 'temperature_trend'
  | 'energy_consumption'
  | 'performance_trend'
  | 'flow_monitoring'
  | 'total_power'
  | 'chiller_power'
  | 'pump_power'
  | 'power_monitoring'
  | 'chart_optimal'
  | 'chart_normal' 
  | 'chart_warning'
  | 'chart_critical'
>

export type DonutGradientKey = keyof typeof chartGradients.donut
export type BarGradientKey = keyof typeof chartGradients.bar
export type MultiRingGradientKey = keyof typeof chartGradients.multiRing
export type LineGradientKey = keyof typeof chartGradients.line

// ===========================================
// 13. 工具函数
// ===========================================

/**
 * 获取 HVAC 间距值
 */
export const getHVACSpacing = (key: HVACSpacing): string => {
  return spacing.hvac[key]
}

/**
 * 获取组件尺寸
 */
export const getHVACSize = (component: HVACSizing) => {
  return sizing.hvac[component]
}

/**
 * 获取语义化颜色
 */
export const getSemanticColor = (semantic: BusinessSemantic, theme: 'light' | 'dark' = 'light') => {
  const standard = businessMapping[semantic]
  return standardTokens[theme][standard]
}

/**
 * 获取布局位置样式
 */
export const getLayoutPosition = (position: LayoutPosition) => {
  return layout.positions.slots[position]
}

/**
 * 获取容器布局样式
 */
export const getContainerLayout = (type: 'widget' | 'card', variant: string) => {
  if (type === 'widget') {
    return layout.containers.widget[variant as WidgetVariant]
  }
  return layout.containers.card[variant as CardVariant]
}

/**
 * 获取图标尺寸
 */
export const getIconSize = (size: IconSize): number => {
  return iconTokens.sizes[size]
}

/**
 * 获取图标颜色
 */
export const getIconColor = (color: IconColor): string => {
  return iconTokens.colors[color]
}

/**
 * 获取图标分类前缀
 */
export const getIconCategory = (category: IconCategory): string => {
  return iconTokens.categories[category]
}

/**
 * 生成图标类名
 */
export const getIconClassName = (
  category: IconCategory,
  name: string,
  color: IconColor = 'primary',
  size: IconSize = 'md'
): string => {
  return `${getIconCategory(category)}-${name}-${color}-${size}`
}

// ===========================================
// 图表工具函数
// ===========================================

/**
 * 获取图表尺寸配置
 */
export const getChartSize = (type: ChartType, size: ChartSize) => {
  const baseSize = chartTokens.sizes[size]
  const typeConfig = chartTokens[type]
  
  return {
    ...baseSize,
    ...typeConfig
  }
}

/**
 * 获取图表渐变配置
 */
export const getChartGradient = (
  type: ChartType, 
  semantic: ChartSemantic
) => {
  const gradients = chartGradients[type]
  return gradients[semantic as keyof typeof gradients] || null
}

/**
 * 获取图表语义颜色 (支持主题感知)
 */
export const getChartSemanticColor = (
  semantic: ChartSemantic, 
  theme: Theme = 'light'
) => {
  const standardToken = businessMapping[semantic]
  if (!standardToken) {
    // 如果没有映射，返回主题的主要前景色
    return themeTokens[theme].foreground.primary
  }
  
  // 根据业务语义和主题返回对应的标准颜色
  return standardTokens[theme][standardToken as keyof typeof standardTokens[typeof theme]]
}

/**
 * 创建图表配置对象
 */
export const createChartConfig = (
  type: ChartType,
  semantic: ChartSemantic,
  size: ChartSize = 'md',
  theme: Theme = 'light'
) => {
  return {
    type,
    semantic,
    size: getChartSize(type, size),
    gradient: getChartGradient(type, semantic),
    typography: chartTypography,
    colors: getChartSemanticColor(semantic, theme),
    tokens: chartTokens[type]
  }
}

export default baseDesignTokens