"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useActionState } from "react"
import { draftEmail, type FormState } from "@/app/actions/draft-email"

type EmailDrafterContextType = {
  state: FormState
  formAction: (payload: FormData) => void
  isPending: boolean
  bulletPoints: string
  setBulletPoints: (value: string) => void
}

const EmailDrafterContext = createContext<EmailDrafterContextType | undefined>(undefined)

export function EmailDrafterProvider({ children }: { children: ReactNode }) {
  const initialState: FormState = {}
  const [state, formAction, isPending] = useActionState(draftEmail, initialState)
  const [bulletPoints, setBulletPoints] = useState("")

  // Create a wrapper for the form action that preserves the bullet points
  const handleFormAction = (formData: FormData) => {
    // Store the bullet points from the form data
    const inputBulletPoints = formData.get("bulletPoints") as string
    setBulletPoints(inputBulletPoints)

    // Call the original form action
    return formAction(formData)
  }

  return (
    <EmailDrafterContext.Provider
      value={{
        state,
        formAction: handleFormAction,
        isPending,
        bulletPoints,
        setBulletPoints,
      }}
    >
      {children}
    </EmailDrafterContext.Provider>
  )
}

export function useEmailDrafter() {
  const context = useContext(EmailDrafterContext)
  if (context === undefined) {
    throw new Error("useEmailDrafter must be used within an EmailDrafterProvider")
  }
  return context
}
