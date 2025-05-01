"use client"

// Import necessary React hooks and types
import { createContext, useContext, type ReactNode } from "react"
import { useActionState } from "react"
// Import the server action and its type
import { draftEmail, type FormState } from "@/app/actions/draft-email"

// Define the type for our context
// This includes the state, action function, and loading state
type EmailDrafterContextType = {
  state: FormState
  formAction: (payload: FormData) => void
  isPending: boolean
}

// Create the context with undefined as the default value
// We'll check if it's undefined when we use it to ensure it's being used within a provider
const EmailDrafterContext = createContext<EmailDrafterContextType | undefined>(undefined)

/**
 * Provider component for the EmailDrafter context
 * This wraps the components that need access to the email drafting functionality
 * @param children - The child components to render
 */
export function EmailDrafterProvider({ children }: { children: ReactNode }) {
  // Initialize the form state
  const initialState: FormState = {}

  // Use the useActionState hook to connect to the server action
  // This returns:
  // - state: The current form state
  // - formAction: The function to call the server action
  // - isPending: A boolean indicating if the action is in progress
  const [state, formAction, isPending] = useActionState(draftEmail, initialState)

  // Provide the state, action, and loading state to the children
  return (
    <EmailDrafterContext.Provider value={{ state, formAction, isPending }}>{children}</EmailDrafterContext.Provider>
  )
}

/**
 * Custom hook to access the EmailDrafter context
 * @returns The EmailDrafter context value
 * @throws Error if used outside of an EmailDrafterProvider
 */
export function useEmailDrafter() {
  // Get the context value
  const context = useContext(EmailDrafterContext)

  // Throw an error if the hook is used outside of a provider
  if (context === undefined) {
    throw new Error("useEmailDrafter must be used within an EmailDrafterProvider")
  }

  // Return the context value
  return context
}
