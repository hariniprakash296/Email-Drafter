import type React from "react"
// Import global styles
import "./globals.css"
// Import Next.js types
import type { Metadata } from "next"
// Import the Inter font
import { Inter } from "next/font/google"
// Import the theme provider
import { ThemeProvider } from "@/components/theme-provider"

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] })

// Define metadata for the application
export const metadata: Metadata = {
  title: "Email Draft Assistant",
  description: "Transform bullet points into professional emails",
    generator: 'v0.dev'
}

/**
 * Root layout component
 * This component wraps all pages in the application
 * @param children - The page content to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Theme provider enables theme switching */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
