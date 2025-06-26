/**
 * Layer 1 图标数据存储
 * 
 * 职责：
 * - 存储 82 个 HVAC 图标的 SVG 路径数据
 * - 提供图标数据查询接口
 * - 不包含具体的 React 组件，只有纯数据
 */

import type { IconData } from './icon-primitives'

// 图标数据注册表
export const iconDataRegistry: Record<string, IconData> = {
  // ===== 设备类图标数据 (15个) =====
  'thermometer': {
    viewBox: "0 0 30 30",
    paths: [
      {
        d: "M15.551 5.086V18.4C15.551 19.934 14.367 21.25 12.9 21.25H12.849C11.382 21.25 10.198 19.934 10.198 18.4V5.061C9.118 5.884 8.5 7.171 8.5 8.509C8.5 10.928 10.456 12.883 12.874 12.883C15.293 12.883 17.249 10.928 17.249 8.509C17.249 7.196 16.631 5.91 15.551 5.086Z"
      },
      {
        d: "M14.444 6.296L13.929 5.935V5.292V0.789H11.845V5.292V5.935L11.33 6.296C10.584 6.81 10.146 7.66 10.146 8.534C10.146 10.053 11.382 11.288 12.9 11.288C14.418 11.288 15.653 10.053 15.653 8.534C15.627 7.634 15.19 6.81 14.444 6.296Z"
      }
    ]
  },

  'gauge': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      {
        d: "M15 9C15.276 9 15.5 9.224 15.5 9.5V15.5L15.495 15.602C15.444 16.107 15.518 15.5 15 15.5C14.483 15.5 14.057 16.107 14.005 15.602L14 15.5V9.5C14 9.224 14.224 9 14.5 9Z"
      }
    ],
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ]
  },

  'fan': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    groups: [
      {
        transform: "translate(15,15)",
        children: [
          { d: "M-8 -2L-4 0L-8 2C-9 1 -9 -1 -8 -2Z", fill: 'currentColor' },
          { d: "M8 -2L4 0L8 2C9 1 9 -1 8 -2Z", fill: 'currentColor' },
          { d: "M-2 -8L0 -4L2 -8C1 -9 -1 -9 -2 -8Z", fill: 'currentColor' },
          { d: "M-2 8L0 4L2 8C1 9 -1 9 -2 8Z", fill: 'currentColor' }
        ]
      }
    ],
    circles: [
      { cx: 15, cy: 15, r: 1.5, fill: 'currentColor' }
    ]
  },

  'compressor': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 8, width: 20, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 12, y: 5, width: 6, height: 3, fill: 'currentColor' }
    ],
    circles: [
      { cx: 15, cy: 15, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    paths: [
      { d: "M15 13V17", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M13 15H17", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'heater': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M7 20H23V18H7V20ZM7 16H23V14H7V16ZM7 12H23V10H7V12Z" },
      { d: "M5 8H25C25.552 8 26 8.448 26 9V21C26 21.552 25.552 22 25 22H5C4.448 22 4 21.552 4 21V9C4 8.448 4.448 8 5 8Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'cooler': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 8, width: 18, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M10 12L14 16L20 10", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M6 6L8 4M12 6L14 4M18 6L20 4M24 6L22 4", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'pump': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M7 15H23", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M11 11L15 15L11 19", fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    rects: [
      { x: 2, y: 13, width: 4, height: 4, fill: 'currentColor' },
      { x: 24, y: 13, width: 4, height: 4, fill: 'currentColor' }
    ]
  },

  'valve': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5V25", stroke: 'currentColor', strokeWidth: 3 },
      { d: "M8 12L15 5L22 12", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M8 18L15 25L22 18", fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'currentColor' }
    ]
  },

  'filter': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M4 8H26L20 14V22L10 22V14L4 8Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M8 11H22", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M10 13H20", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M12 15H18", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  'pipe': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M5 10H25", stroke: 'currentColor', strokeWidth: 4 },
      { d: "M5 20H25", stroke: 'currentColor', strokeWidth: 4 },
      { d: "M8 10V20", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 10V20", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M22 10V20", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'motor': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 10, width: 18, height: 10, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 13, y: 8, width: 4, height: 2, fill: 'currentColor' },
      { x: 13, y: 20, width: 4, height: 2, fill: 'currentColor' }
    ],
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    paths: [
      { d: "M15 13V17", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'sensor': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 3V7", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 23V27", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M3 15H7", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M23 15H27", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'controller': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 8, width: 20, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 8, y: 11, width: 3, height: 3, fill: 'currentColor' },
      { x: 13, y: 11, width: 3, height: 3, fill: 'currentColor' },
      { x: 18, y: 11, width: 3, height: 3, fill: 'currentColor' },
      { x: 8, y: 16, width: 3, height: 3, fill: 'currentColor' },
      { x: 13, y: 16, width: 3, height: 3, fill: 'currentColor' },
      { x: 18, y: 16, width: 3, height: 3, fill: 'currentColor' }
    ]
  },

  'actuator': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 10, y: 6, width: 10, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 10V14", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 16V20", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M6 10L10 10", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M20 10L24 10", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 1, fill: 'currentColor' }
    ]
  },

  'heat-exchanger': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 10, width: 22, height: 10, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M8 13H22", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M8 15H22", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M8 17H22", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M4 8L6 6M4 22L6 24", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M26 8L24 6M26 22L24 24", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  // ===== 状态类图标数据 (12个) =====
  'running': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: '#67D75E' }
    ],
    paths: [
      { d: "M12 10L20 15L12 20V10Z", fill: 'white' }
    ]
  },

  'stopped': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: '#FF3939' }
    ],
    rects: [
      { x: 11, y: 11, width: 8, height: 8, fill: 'white' }
    ]
  },

  'paused': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: '#FECC36' }
    ],
    rects: [
      { x: 12, y: 10, width: 2, height: 10, fill: 'white' },
      { x: 16, y: 10, width: 2, height: 10, fill: 'white' }
    ]
  },

  'error': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: '#FF3939' }
    ],
    paths: [
      { d: "M10.5 10.5L19.5 19.5M19.5 10.5L10.5 19.5", stroke: 'white', strokeWidth: 2 }
    ]
  },

  'warning': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5L25 22H5L15 5Z", fill: '#FECC36' },
      { d: "M15 12V16", stroke: 'white', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 19, r: 1, fill: 'white' }
    ]
  },

  'normal': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: '#67D75E' }
    ],
    paths: [
      { d: "M11 15L14 18L20 12", fill: 'none', stroke: 'white', strokeWidth: 2 }
    ]
  },

  'offline': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: '#999999', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: '#999999' }
    ]
  },

  'online': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: '#67D75E', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: '#67D75E' },
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: '#67D75E', strokeWidth: 1 }
    ]
  },

  'connected': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 15H22", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 8, cy: 15, r: 3, fill: 'currentColor' },
      { cx: 22, cy: 15, r: 3, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 1, fill: 'currentColor' }
    ]
  },

  'disconnected': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 15H13", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M17 15H22", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M14 12L16 14M16 12L14 14", stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    circles: [
      { cx: 8, cy: 15, r: 3, fill: 'currentColor' },
      { cx: 22, cy: 15, r: 3, fill: 'currentColor' }
    ]
  },

  'maintenance': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: '#FF9747', strokeWidth: 2 }
    ],
    paths: [
      { d: "M12 12L18 18M18 12L12 18", stroke: '#FF9747', strokeWidth: 2 }
    ],
    rects: [
      { x: 8, y: 8, width: 14, height: 14, fill: 'none', stroke: '#FF9747', strokeWidth: 1 }
    ]
  },

  'fault': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5L25 22H5L15 5Z", fill: '#FF3939' },
      { d: "M15 12V16", stroke: 'white', strokeWidth: 2 },
      { d: "M5 22L25 22", stroke: '#FF3939', strokeWidth: 3 }
    ],
    circles: [
      { cx: 15, cy: 19, r: 1, fill: 'white' }
    ]
  },

  // ===== 监控类图标数据 (18个) =====
  'dashboard': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 6, width: 22, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 7, y: 9, width: 6, height: 4, fill: 'currentColor' },
      { x: 17, y: 9, width: 6, height: 4, fill: 'currentColor' },
      { x: 7, y: 16, width: 16, height: 3, fill: 'currentColor' }
    ]
  },

  'chart': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 24V8L12 12L18 6L24 10V24H6Z", fill: 'currentColor', fillRule: 'evenodd' }
    ]
  },

  'graph': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M5 25V5H25", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M8 20L12 12L16 16L20 8L24 14", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ],
    circles: [
      { cx: 8, cy: 20, r: 2, fill: 'currentColor' },
      { cx: 12, cy: 12, r: 2, fill: 'currentColor' },
      { cx: 16, cy: 16, r: 2, fill: 'currentColor' },
      { cx: 20, cy: 8, r: 2, fill: 'currentColor' },
      { cx: 24, cy: 14, r: 2, fill: 'currentColor' }
    ]
  },

  'meter': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M5 20C5 12.268 11.268 6 19 6C26.732 6 33 12.268 33 20", stroke: 'currentColor', strokeWidth: 2, fill: 'none', transform: "scale(0.6) translate(5,5)" },
      { d: "M15 12L15 18", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 1, fill: 'currentColor' }
    ]
  },

  'monitor': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 6, width: 22, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 13, y: 20, width: 4, height: 2, fill: 'currentColor' },
      { x: 10, y: 22, width: 10, height: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M8 10L12 14L16 11L20 15", stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' }
    ]
  },

  'display': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 8, width: 20, height: 12, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M9 12H21M9 14H18M9 16H20", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  'analytics': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 7V15L21 18", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M25 15C25 20.5 20.5 25 15 25C9.5 25 5 20.5 5 15", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'trend-up': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 20L12 14L16 18L24 10", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M18 10H24V16", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'trend-down': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 10L12 16L16 12L24 20", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M18 20H24V14", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'data': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 8, width: 4, height: 14, fill: 'currentColor' },
      { x: 11, y: 12, width: 4, height: 10, fill: 'currentColor' },
      { x: 16, y: 6, width: 4, height: 16, fill: 'currentColor' },
      { x: 21, y: 10, width: 4, height: 12, fill: 'currentColor' }
    ]
  },

  'report': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 4, width: 18, height: 22, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M10 8H20M10 12H20M10 16H16", stroke: 'currentColor', strokeWidth: 1.5 },
      { d: "M10 20L14 22L18 20", stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' }
    ]
  },

  'log': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 6, width: 20, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M8 10H22M8 13H18M8 16H20M8 19H15", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  'history': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 9V15L19 19", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M4 15C4 8.5 8.5 4 15 4", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M7 8L4 15L11 12", fill: 'currentColor' }
    ]
  },

  'real-time': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 1 },
      { cx: 15, cy: 15, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 1 }
    ],
    paths: [
      { d: "M15 3V6M15 24V27M3 15H6M24 15H27", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'timeline': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 15H24", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 8, cy: 15, r: 2, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' },
      { cx: 22, cy: 15, r: 2, fill: 'currentColor' }
    ],
    rects: [
      { x: 6, y: 10, width: 4, height: 3, fill: 'currentColor' },
      { x: 13, y: 17, width: 4, height: 3, fill: 'currentColor' },
      { x: 20, y: 10, width: 4, height: 3, fill: 'currentColor' }
    ]
  },

  'alert': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 3L26 22H4L15 3Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 11V16", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 19, r: 1, fill: 'currentColor' }
    ]
  },

  'notification': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 4C18.5 4 21 6.5 21 10V16L24 19H6L9 16V10C9 6.5 11.5 4 15 4Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M12 22C12 23.1 13.3 24 15 24C16.7 24 18 23.1 18 22", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'indicator': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 4, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 3V7M15 23V27M3 15H7M23 15H27", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  // ===== 控制类图标数据 (20个) =====
  'power': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5V15", stroke: 'currentColor', strokeWidth: 3 },
      { d: "M9 8C6.5 10.5 6.5 14.5 9 17C11.5 19.5 15.5 19.5 18 17C20.5 14.5 20.5 10.5 18 8", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'switch': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 12, width: 18, height: 6, rx: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 20, cy: 15, r: 4, fill: 'currentColor' }
    ]
  },

  'button': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 5, fill: 'currentColor' }
    ]
  },

  'slider': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 15H24", stroke: 'currentColor', strokeWidth: 4 }
    ],
    circles: [
      { cx: 18, cy: 15, r: 3, fill: 'currentColor' }
    ],
    rects: [
      { x: 15, y: 12, width: 6, height: 6, rx: 3, fill: 'white', stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'knob': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 1, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 7L15 11", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 15L19 11", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'toggle': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 8, y: 11, width: 14, height: 8, rx: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 12, cy: 15, r: 3, fill: 'currentColor' }
    ]
  },

  'dial': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 15L22 8", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M8 8L22 8", stroke: 'currentColor', strokeWidth: 1, opacity: 0.5 },
      { d: "M8 22L22 22", stroke: 'currentColor', strokeWidth: 1, opacity: 0.5 }
    ]
  },

  'remote': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 8, y: 4, width: 14, height: 22, rx: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 11, y: 7, width: 8, height: 4, rx: 1, fill: 'currentColor' },
      { x: 11, y: 13, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 16, y: 13, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 11, y: 18, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 16, y: 18, width: 3, height: 3, rx: 1, fill: 'currentColor' }
    ]
  },

  'joystick': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 20, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 12, r: 3, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 15V17", stroke: 'currentColor', strokeWidth: 3 }
    ]
  },

  'wheel': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 7V13M15 17V23M7 15H13M17 15H23", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'trigger': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 12L15 5L22 12V20C22 21.1 21.1 22 20 22H10C8.9 22 8 21.1 8 20V12Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 5V12", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ]
  },

  'lever': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 20, width: 22, height: 4, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M18 20L18 8", stroke: 'currentColor', strokeWidth: 3 }
    ],
    circles: [
      { cx: 18, cy: 8, r: 3, fill: 'currentColor' }
    ]
  },

  'handle': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 12, y: 6, width: 6, height: 18, rx: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 10, r: 2, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' },
      { cx: 15, cy: 20, r: 2, fill: 'currentColor' }
    ]
  },

  'rotary': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    paths: [
      { d: "M15 6L15 9M24 15L21 15M15 24L15 21M6 15L9 15", stroke: 'currentColor', strokeWidth: 1.5 },
      { d: "M15 15L21 9", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'keypad': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 6, width: 18, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 9, y: 9, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 13.5, y: 9, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 18, y: 9, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 9, y: 13.5, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 13.5, y: 13.5, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 18, y: 13.5, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 9, y: 18, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 13.5, y: 18, width: 3, height: 3, rx: 1, fill: 'currentColor' },
      { x: 18, y: 18, width: 3, height: 3, rx: 1, fill: 'currentColor' }
    ]
  },

  'interface': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 8, width: 22, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 10, cy: 15, r: 2, fill: 'currentColor' },
      { cx: 20, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M12 15H18", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'touchscreen': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 6, width: 20, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 12, cy: 13, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { cx: 18, cy: 17, r: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ],
    paths: [
      { d: "M10 11L8 9M20 17L22 19", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'gesture': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 12C8 10.9 8.9 10 10 10S12 10.9 12 10S10.9 8 10 8", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M12 10L18 16L22 12", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ],
    circles: [
      { cx: 10, cy: 10, r: 1, fill: 'currentColor' },
      { cx: 18, cy: 16, r: 1, fill: 'currentColor' },
      { cx: 22, cy: 12, r: 1, fill: 'currentColor' }
    ]
  },

  'automation': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M9 15L13 19L21 11", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M15 3V7M15 23V27M3 15H7M23 15H27", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  // ===== 系统类图标数据 (17个) =====
  'network': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 8, cy: 8, r: 3, fill: 'currentColor' },
      { cx: 22, cy: 8, r: 3, fill: 'currentColor' },
      { cx: 8, cy: 22, r: 3, fill: 'currentColor' },
      { cx: 22, cy: 22, r: 3, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M8 8L15 15M22 8L15 15M8 22L15 15M22 22L15 15", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'wifi': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 18C9.5 14.5 20.5 14.5 24 18", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M9 21C11.5 18.5 18.5 18.5 21 21", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M12 24C13.5 22.5 16.5 22.5 18 24", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ],
    circles: [
      { cx: 15, cy: 26, r: 1, fill: 'currentColor' }
    ]
  },

  'bluetooth': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 6V24M15 6L21 12L15 18M15 12L21 18L15 24", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'cloud': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 18C5.5 18 4 16.5 4 14C4 11.5 5.5 10 8 10C8.5 7.5 10.5 6 13 6C16 6 18.5 8.5 18.5 11.5C20.5 11.5 22 13 22 15C22 17 20.5 18.5 18.5 18.5H8Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'server': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 6, width: 22, height: 5, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 4, y: 12.5, width: 22, height: 5, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 4, y: 19, width: 22, height: 5, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 8, cy: 8.5, r: 1, fill: 'currentColor' },
      { cx: 8, cy: 15, r: 1, fill: 'currentColor' },
      { cx: 8, cy: 21.5, r: 1, fill: 'currentColor' }
    ]
  },

  'database': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 9C6 6.5 10 5 15 5C20 5 24 6.5 24 9M6 9V21C6 23.5 10 25 15 25C20 25 24 23.5 24 21V9M6 9V15C6 17.5 10 19 15 19C20 19 24 17.5 24 15V9M6 15V21", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'connection': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M4 15H26", stroke: 'currentColor', strokeWidth: 3 }
    ],
    circles: [
      { cx: 6, cy: 15, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 24, cy: 15, r: 4, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 6, cy: 15, r: 1, fill: 'currentColor' },
      { cx: 24, cy: 15, r: 1, fill: 'currentColor' }
    ]
  },

  'sync': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 12C10.5 8.5 19.5 8.5 22 12M22 18C19.5 21.5 10.5 21.5 8 18", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M20 10L22 12L20 14M10 16L8 18L10 20", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'backup': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 8, width: 18, height: 14, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 12V18M12 15L15 12L18 15", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M10 20H20", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'update': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M11 11L15 15L19 11", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M15 8V15", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'security': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5L8 8V14C8 19 11.5 23.5 15 24C18.5 23.5 22 19 22 14V8L15 5Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M12 15L14 17L18 13", stroke: 'currentColor', strokeWidth: 2, fill: 'none' }
    ]
  },

  'firewall': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5L8 8V14C8 19 11.5 23.5 15 24C18.5 23.5 22 19 22 14V8L15 5Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M11 11H19M11 15H19M11 19H19", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'protocol': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 10, width: 22, height: 10, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M8 13H22M8 15H18M8 17H20", stroke: 'currentColor', strokeWidth: 1 },
      { d: "M15 6V10M15 20V24", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'gateway': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 8, y: 10, width: 14, height: 10, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M4 15H8M22 15H26", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 10V6M15 20V24", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ]
  },

  'bridge': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M4 18C4 12 8.5 8 15 8C21.5 8 26 12 26 18", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M6 15H24", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 6, cy: 18, r: 2, fill: 'currentColor' },
      { cx: 24, cy: 18, r: 2, fill: 'currentColor' },
      { cx: 15, cy: 12, r: 1, fill: 'currentColor' }
    ]
  },

  'router': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 6, y: 14, width: 18, height: 8, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M10 10V14M15 8V14M20 10V14", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 10, cy: 18, r: 1, fill: 'currentColor' },
      { cx: 15, cy: 18, r: 1, fill: 'currentColor' },
      { cx: 20, cy: 18, r: 1, fill: 'currentColor' }
    ]
  },

  'integration': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 8, cy: 8, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 22, cy: 8, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 8, cy: 22, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 22, cy: 22, r: 3, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    rects: [
      { x: 12, y: 12, width: 6, height: 6, rx: 1, fill: 'currentColor' }
    ],
    paths: [
      { d: "M11 8H12M18 8H19M8 11V12M8 18V19M11 22H12M18 22H19M22 11V12M22 18V19", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  // ===== 扩展图标数据 (从 SVG 提取的缺失图标) =====
  
  // 仪表盘变体
  'dial-gauge': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 1 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M10 10L12 12M20 10L18 12M10 20L12 18M20 20L18 18", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  'fuel-gauge': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 25C21.627 25 27 19.627 27 13C27 6.373 21.627 1 15 1C8.373 1 3 6.373 3 13C3 19.627 8.373 25 15 25Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M9 13H21", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 13V7", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'liquid-level': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M20 5C23.314 5 26 7.686 26 11C26 14.314 23.314 17 20 17H10V11C10 7.686 12.686 5 16 5H20Z", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M10 17V25H8V17H10Z", fill: 'currentColor' }
    ]
  },

  'pressure-meter': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M5 20C5 12.268 11.268 6 19 6C26.732 6 33 12.268 33 20", stroke: 'currentColor', strokeWidth: 2, fill: 'none', transform: "scale(0.7) translate(3,3)" },
      { d: "M15 15L20 10", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M12 18L18 18", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  // 控制器变体
  'directional-pad': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M14 6H16V14H24V16H16V24H14V16H6V14H14V6Z", fill: 'currentColor' }
    ]
  },

  'joystick-advanced': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 20, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 12, r: 4, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 16V18", stroke: 'currentColor', strokeWidth: 3 },
      { d: "M7 20H23", stroke: 'currentColor', strokeWidth: 1 }
    ]
  },

  'thumbstick': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 12, cy: 12, r: 3, fill: 'currentColor' }
    ],
    paths: [
      { d: "M12 12L15 15", stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'direction-control': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 3L23 11H19V19H21L15 27L9 19H11V11H7L15 3Z", fill: 'currentColor' }
    ]
  },

  // 传感器扩展
  'vision-sensor': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 5C19.5 5 23.5 8.4 25 12.5C25.2 13 25.2 13.5 25 14C23.5 18.1 19.5 21.5 15 21.5C10.5 21.5 6.5 18.1 5 14C4.8 13.5 4.8 13 5 12.5C6.5 8.4 10.5 5 15 5Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M15 18C16.657 18 18 16.657 18 15C18 13.343 16.657 12 15 12C13.343 12 12 13.343 12 15C12 16.657 13.343 18 15 18Z", fill: 'currentColor' }
    ]
  },

  'proximity-sensor': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'currentColor' },
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { cx: 15, cy: 15, r: 9, fill: 'none', stroke: 'currentColor', strokeWidth: 1 },
      { cx: 15, cy: 15, r: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 0.5 }
    ]
  },

  'motion-detector': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M6 18C9.5 14.5 20.5 14.5 24 18", stroke: 'currentColor', strokeWidth: 2, fill: 'none' },
      { d: "M8 20C10.5 17.5 19.5 17.5 22 20", stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' },
      { d: "M10 22C12 20.5 18 20.5 20 22", stroke: 'currentColor', strokeWidth: 1, fill: 'none' }
    ],
    circles: [
      { cx: 15, cy: 24, r: 1.5, fill: 'currentColor' }
    ]
  },

  // 界面布局
  'grid-layout': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 5, y: 5, width: 8, height: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 17, y: 5, width: 8, height: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 5, y: 17, width: 8, height: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 17, y: 17, width: 8, height: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'panel-layout': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 4, y: 6, width: 22, height: 18, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { x: 6, y: 8, width: 6, height: 4, fill: 'currentColor' },
      { x: 14, y: 8, width: 10, height: 4, fill: 'currentColor' },
      { x: 6, y: 14, width: 18, height: 8, fill: 'currentColor' }
    ]
  },

  'modular-interface': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 2, y: 2, width: 10, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 18, y: 2, width: 10, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 2, y: 18, width: 10, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 18, y: 18, width: 10, height: 10, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
      { x: 10, y: 10, width: 10, height: 10, rx: 1, fill: 'currentColor' }
    ]
  },

  // 导航系统
  'compass': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 12, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 3V7M15 23V27M3 15H7M23 15H27", stroke: 'currentColor', strokeWidth: 1.5 },
      { d: "M15 8L12 15L15 22L18 15L15 8Z", fill: 'currentColor' },
      { d: "M15 3L13 5H17L15 3Z", fill: 'currentColor' }
    ]
  },

  'navigation-arrow': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 3L25 20H20V27H10V20H5L15 3Z", fill: 'currentColor' }
    ]
  },

  'position-marker': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 3C18.866 3 22 6.134 22 10C22 15.5 15 27 15 27S8 15.5 8 10C8 6.134 11.134 3 15 3Z", fill: 'currentColor' }
    ],
    circles: [
      { cx: 15, cy: 10, r: 3, fill: 'white' }
    ]
  },

  // 天气/环境
  'weather-station': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M8 18C5.5 18 4 16.5 4 14C4 11.5 5.5 10 8 10C8.5 7.5 10.5 6 13 6C16 6 18.5 8.5 18.5 11.5C20.5 11.5 22 13 22 15C22 17 20.5 18.5 18.5 18.5H8Z", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M10 20L12 22L10 24M16 20L18 22L16 24M13 21L13 23", stroke: 'currentColor', strokeWidth: 1.5 }
    ]
  },

  'humidity-sensor': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 3C18 7 21 12 21 16C21 19.314 18.314 22 15 22C11.686 22 9 19.314 9 16C9 12 12 7 15 3Z", fill: 'currentColor' },
      { d: "M12 16C12 17.657 13.343 19 15 19", stroke: 'white', strokeWidth: 1.5, fill: 'none' }
    ]
  },

  'air-quality': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 8, cy: 12, r: 2, fill: 'currentColor' },
      { cx: 15, cy: 8, r: 1.5, fill: 'currentColor' },
      { cx: 22, cy: 15, r: 2.5, fill: 'currentColor' },
      { cx: 12, cy: 20, r: 1, fill: 'currentColor' },
      { cx: 20, cy: 22, r: 1.5, fill: 'currentColor' }
    ],
    paths: [
      { d: "M5 25C7 23 13 19 15 17C17 19 23 23 25 25", stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' }
    ]
  },

  // 高级控制
  'multi-axis-control': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 8, fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ],
    paths: [
      { d: "M15 7V23M7 15H23", stroke: 'currentColor', strokeWidth: 2 },
      { d: "M11 11L19 19M19 11L11 19", stroke: 'currentColor', strokeWidth: 1 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'currentColor' }
    ]
  },

  'precision-control': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { cx: 15, cy: 15, r: 6, fill: 'none', stroke: 'currentColor', strokeWidth: 1 },
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ],
    paths: [
      { d: "M15 5L16 8L15 11L14 8L15 5M15 19L16 22L15 25L14 22L15 19M5 15L8 14L11 15L8 16L5 15M19 15L22 14L25 15L22 16L19 15", fill: 'currentColor' }
    ]
  },

  'variable-control': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M5 15H25", stroke: 'currentColor', strokeWidth: 3 },
      { d: "M8 12V18M12 10V20M16 8V22M20 10V20M24 12V18", stroke: 'currentColor', strokeWidth: 2 }
    ],
    circles: [
      { cx: 15, cy: 15, r: 2, fill: 'currentColor' }
    ]
  },

  // ===== 操作控制图标数据 =====
  'play': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M10 8L22 15L10 22V8Z", fill: 'currentColor' }
    ]
  },

  'stop': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 8, y: 8, width: 14, height: 14, fill: 'currentColor' }
    ]
  },

  'pause': {
    viewBox: "0 0 30 30",
    rects: [
      { x: 9, y: 8, width: 4, height: 14, fill: 'currentColor' },
      { x: 17, y: 8, width: 4, height: 14, fill: 'currentColor' }
    ]
  },

  'reset': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M4 15C4 20.523 8.477 25 14 25C19.523 25 24 20.523 24 15C24 9.477 19.523 5 14 5C10.5 5 7.5 6.5 5.5 9", fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
      { d: "M2 9L5.5 9L5.5 5.5", fill: 'none', stroke: 'currentColor', strokeWidth: 2 }
    ]
  },

  'settings': {
    viewBox: "0 0 30 30",
    circles: [
      { cx: 15, cy: 15, r: 3, fill: 'currentColor' }
    ],
    paths: [
      { d: "M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.2579 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.01127 9.77251C4.28054 9.5799 4.48571 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z", fill: 'currentColor' }
    ]
  },

  'manual': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M10 8C10 6.895 10.895 6 12 6H18C19.105 6 20 6.895 20 8V12H18V8H12V22H18V18H20V22C20 23.105 19.105 24 18 24H12C10.895 24 10 23.105 10 22V8Z", fill: 'currentColor' },
      { d: "M22 13L18 10V12H14V14H18V16L22 13Z", fill: 'currentColor' }
    ]
  },

  'emergency': {
    viewBox: "0 0 30 30",
    paths: [
      { d: "M15 2L18.09 8.26L25 9L20 14L21.18 21L15 17.27L8.82 21L10 14L5 9L11.91 8.26L15 2Z", fill: 'currentColor' }
    ],
    lines: [
      { x1: 15, y1: 10, x2: 15, y2: 16, stroke: 'white', strokeWidth: 2 },
      { x1: 15, y1: 18, x2: 15.01, y2: 18, stroke: 'white', strokeWidth: 2 }
    ]
  }

  // 注：现在已包含完整的 109 个图标数据（原102个 + 新增操作控制7个）
}

/**
 * 图标分类信息
 */
export const iconCategories = {
  equipment: {
    name: '设备类',
    count: 18,
    description: '包含温度计、压力表、风扇、压缩机等HVAC核心设备，以及视觉传感器、接近传感器等高级传感器'
  },
  status: {
    name: '状态类', 
    count: 12,
    description: '包含运行、停止、警告、错误等系统状态指示'
  },
  monitoring: {
    name: '监控类',
    count: 22,
    description: '包含仪表盘、图表、数据、趋势等监控可视化，以及刻度盘表、液位计、压力表等精密仪表'
  },
  controls: {
    name: '控制类',
    count: 27,
    description: '包含开关、按钮、滑块、旋钮等交互控制，以及方向盘、操纵杆、精密控制器等高级控制设备'
  },
  systems: {
    name: '系统类',
    count: 20,
    description: '包含网络、通信、数据流、同步等系统集成，以及天气站、环境监测等扩展系统'
  },
  interface: {
    name: '界面类',
    count: 3,
    description: '包含网格布局、面板布局、模块化界面等用户界面组件'
  }
}

/**
 * 获取图标数据
 */
export function getIconData(name: string): IconData | undefined {
  return iconDataRegistry[name]
}

/**
 * 获取分类下的所有图标
 */
export function getIconsByCategory(category: string): string[] {
  // 这里可以根据命名约定或者元数据来过滤
  // 为简化，返回所有图标名称
  return Object.keys(iconDataRegistry)
}

/**
 * 搜索图标
 */
export function searchIcons(query: string): string[] {
  return Object.keys(iconDataRegistry).filter(name => 
    name.toLowerCase().includes(query.toLowerCase())
  )
}

/**
 * 获取图标统计信息
 */
export function getIconStats() {
  return {
    total: Object.keys(iconDataRegistry).length, // 应该是 102 个图标
    categories: iconCategories
  }
}