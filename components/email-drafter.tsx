"use client"

// Import the context provider
import { EmailDrafterProvider } from "@/contexts/email-drafter-context"
// Import the child components
import { BulletPointsInput } from "@/components/bullet-points-input"
import { EmailOutput } from "@/components/email-output"
import { ErrorMessage } from "@/components/error-message"

/**
 * Main component for the email drafter
 * This component wraps the child components with the context provider
 * and arranges them in the correct order
 */
export function EmailDrafter() {
  return (
    <EmailDrafterProvider>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Input form for bullet points */}
        <BulletPointsInput />
        {/* Output display for the generated email */}
        <EmailOutput />
        {/* Error message display */}
        <ErrorMessage />
      </div>
    </EmailDrafterProvider>
  )
}
