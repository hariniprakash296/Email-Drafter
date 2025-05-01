"use client"

// Import the custom hook to access the email drafter context
import { useEmailDrafter } from "@/contexts/email-drafter-context"

/**
 * Component for displaying error messages
 * This component shows error messages from the email drafting process
 */
export function ErrorMessage() {
  // Use the email drafter context to access the current state
  const { state } = useEmailDrafter()

  // Only show the error message if there is a message and no email
  // This prevents showing error messages when the email was successfully generated
  if (!state.message || state.email) {
    return null
  }

  // Display the error message in a styled container
  return <div className="p-4 rounded-md bg-destructive/10 text-destructive">{state.message}</div>
}
