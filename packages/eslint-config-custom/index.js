module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "turbo",
    "prettier",
    "plugin:tailwindcss/recommended"
  ],
  plugins: ["tailwindcss"],
  ignorePatterns: ["**/fixtures/**"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@next/next/no-duplicate-head": "off",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "error"
  },
  settings: {
    tailwindcss: {
      callees: ["cn", "cva"],
      config: "tailwind.config.cjs"
    },
    next: {
      rootDir: ["apps/*/"]
    }
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser"
    }
  ]
};