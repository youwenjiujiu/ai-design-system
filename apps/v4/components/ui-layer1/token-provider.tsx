import * as React from "react"
import { cssTokens } from "./design-tokens"

interface TokenProviderProps {
  children: React.ReactNode
  theme?: 'light' | 'dark'
}

// Apply CSS custom properties to document root
const applyTokens = (tokens: Record<string, string>) => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    Object.entries(tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ 
  children, 
  theme = 'light' 
}) => {
  React.useEffect(() => {
    applyTokens(cssTokens)
  }, [theme])

  return (
    <div 
      data-layer="1"
      data-component="token-provider"
      data-theme={theme}
      style={{
        // Inject tokens as inline styles for SSR compatibility
        ...Object.fromEntries(
          Object.entries(cssTokens).map(([key, value]) => [key, value])
        )
      }}
    >
      {children}
    </div>
  )
}

// Hook for accessing design tokens
export const useTokens = () => {
  return cssTokens
}

// Utility function to get token value
export const getToken = (tokenName: keyof typeof cssTokens): string => {
  return cssTokens[tokenName]
}

// Type-safe token accessor
export const token = (name: keyof typeof cssTokens) => `var(${name})`