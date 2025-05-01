"use client"

// Import icons from lucide-react
import { Moon, Sun } from "lucide-react"
// Import the useTheme hook from next-themes
import { useTheme } from "next-themes"

// Import UI components from shadcn/ui
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

/**
 * Theme toggle component that allows users to switch between light, dark, and system themes
 * This component displays a button with sun/moon icons and a dropdown menu
 */
export function ThemeToggle() {
  // Use the useTheme hook to access the current theme and the setTheme function
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      {/* The trigger button that shows the sun/moon icons */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* Sun icon - visible in light mode, hidden in dark mode */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon - hidden in light mode, visible in dark mode */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Dropdown menu with theme options */}
      <DropdownMenuContent align="end">
        {/* Light theme option */}
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        {/* Dark theme option */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        {/* System theme option (follows the user's system preference) */}
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
