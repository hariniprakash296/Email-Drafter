"use client"

// Import the ThemeProvider from next-themes
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Import the ThemeProviderProps type
import type { ThemeProviderProps } from "next-themes"

/**
 * Theme provider component that wraps the application
 * This enables theme switching functionality (light, dark, system)
 * @param props - The props for the theme provider, including children and theme options
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
