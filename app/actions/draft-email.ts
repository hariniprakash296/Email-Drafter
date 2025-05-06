"use server"

import { z } from "zod"

const formSchema = z.object({
  bulletPoints: z.string().min(1, "Bullet points are required"),
})

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
            // Updated system message to increase professionalism while maintaining style elements
            role: "system",
            content: `You are drafting professional business emails that balance my personal style with appropriate formality. 

My writing style characteristics to incorporate:
1. Clear and direct communication
2. Occasional use of contractions (I'm, don't, can't) where appropriate
3. Simple explanations without unnecessary jargon
4. Occasional questions to engage the reader

Professional elements to emphasize:
1. Always use complete, grammatically correct sentences
2. Maintain a professional tone suitable for business communication
3. Ensure proper paragraph structure with clear topic sentences
4. Include appropriate transitions between ideas
5. Use proper business email format with formal greeting and closing
6. Ensure each point from the bullet list is fully developed into complete thoughts
7. Balance conciseness with sufficient detail and context

The email should be structured with:
- A professional greeting (Dear [Name/Team], Hello [Name/Team])
- A brief introduction stating the purpose of the email
- Body paragraphs that fully address each bullet point with complete sentences
- A clear conclusion or call to action
- A professional closing (Best regards, Thank you and Warmest regards)

Don't use markdown formatting like ** for bold text or * for italic text. Use plain text only.`,
          },
          {
            // User message contains the bullet points
            role: "user",
            content: `Draft a professional business email based on these bullet points:\n${bulletPoints}`,
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
