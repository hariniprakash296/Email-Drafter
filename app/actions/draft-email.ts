"use server"

// Import zod for form validation
import { z } from "zod"

// Define the schema for form validation
// This ensures the bulletPoints field is not empty
const formSchema = z.object({
  bulletPoints: z.string().min(1, "Bullet points are required"),
})

// Define the type for the form state
// This includes potential errors, success/error messages, and the generated email
export type FormState = {
  errors?: {
    bulletPoints?: string[]
  }
  message?: string
  email?: string
}

/**
 * Removes markdown formatting from text
 * @param text - The text to process
 * @returns The text with markdown formatting removed
 */
function removeMarkdown(text: string): string {
  // Remove bold markdown (**text**) using regex
  // The pattern matches any text between double asterisks and captures it
  // The replacement keeps only the captured text without the asterisks
  return text.replace(/\*\*(.*?)\*\*/g, "$1")
}

/**
 * Server Action to draft an email based on bullet points
 * @param prevState - The previous form state
 * @param formData - The form data containing bullet points
 * @returns The updated form state with either errors or the drafted email
 */
export async function draftEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate the form data using the schema
  const validatedFields = formSchema.safeParse({
    bulletPoints: formData.get("bulletPoints"),
  })

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please provide some bullet points to draft an email.",
    }
  }

  // Extract the validated bullet points
  const { bulletPoints } = validatedFields.data

  try {
    // Make a request to the DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Use the API key from environment variables
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            // System message defines the behavior of the AI
            role: "system",
            content:
              "You are an assistant that drafts professional emails based on bullet points. Format the email properly with greeting, body paragraphs, and closing. Make it sound professional but friendly. DO NOT use markdown formatting like ** for bold text or * for italic text. Use plain text only.",
          },
          {
            // User message contains the bullet points
            role: "user",
            content: `Draft a professional email based on these bullet points:\n${bulletPoints}`,
          },
        ],
        stream: false, // We want the complete response at once, not streamed
      }),
    })

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`API error: ${errorData.error?.message || response.statusText}`)
    }

    // Parse the API response
    const data = await response.json()
    let draftedEmail = data.choices[0].message.content

    // Remove any markdown formatting that might still be present
    draftedEmail = removeMarkdown(draftedEmail)

    // Return the successful result
    return {
      message: "Email drafted successfully!",
      email: draftedEmail,
    }
  } catch (error) {
    // Log and return any errors
    console.error("Error drafting email:", error)
    return {
      message: `Failed to draft email: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
