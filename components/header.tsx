// Import the Mail icon from lucide-react
import { Mail } from "lucide-react"
// Import the ThemeToggle component
import { ThemeToggle } from "@/components/theme-toggle"

/**
 * Header component that displays the application title and theme toggle
 * This appears at the top of every page
 */
export function Header() {
  return (
    <header className="border-b py-4 bg-background">
      <div className="container flex items-center justify-between">
        {/* Left side: App title with icon */}
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Email Draft Assistant</span>
        </div>
        {/* Right side: Powered by text and theme toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Powered by DeepSeek AI</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
