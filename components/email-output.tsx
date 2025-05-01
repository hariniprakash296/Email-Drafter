"use client"

// Import React hooks
import { useState } from "react"
// Import the custom hook to access the email drafter context
import { useEmailDrafter } from "@/contexts/email-drafter-context"
// Import UI components from shadcn/ui
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// Import the Check icon for the copy confirmation
import { Check } from "lucide-react"

/**
 * Component for displaying the generated email
 * This component shows the drafted email and provides a button to copy it to the clipboard
 */
export function EmailOutput() {
  // Use the email drafter context to access the current state
  const { state } = useEmailDrafter()
  // State to track whether the email has been copied to the clipboard
  const [copied, setCopied] = useState(false)

  /**
   * Handles copying the email to the clipboard
   * Sets a temporary state to show a confirmation message
   */
  const handleCopy = () => {
    if (state.email) {
      // Copy the email to the clipboard
      navigator.clipboard.writeText(state.email)
      // Set the copied state to true
      setCopied(true)
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // If there's no email to display, don't render anything
  if (!state.email) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drafted Email</CardTitle>
        <CardDescription>Here's your professionally drafted email based on your bullet points.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Display the email with proper formatting */}
        <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-sans">{state.email}</div>
      </CardContent>
      <CardFooter>
        {/* Button to copy the email to the clipboard */}
        <Button onClick={handleCopy} variant="outline" className="w-full">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            "Copy to Clipboard"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
