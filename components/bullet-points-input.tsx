"use client"

// Import the custom hook to access the email drafter context
import { useEmailDrafter } from "@/contexts/email-drafter-context"
// Import UI components from shadcn/ui
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// Import the Loader icon for the loading state
import { Loader2 } from "lucide-react"

/**
 * Component for inputting bullet points
 * This component displays a form with a text area for entering bullet points
 * and a submit button to convert them to an email
 */
export function BulletPointsInput() {
  // Use the email drafter context to access the form action, loading state, and current state
  const { formAction, isPending, state } = useEmailDrafter()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bullet Points</CardTitle>
        <CardDescription>Enter your bullet points below. Each point should be on a new line.</CardDescription>
      </CardHeader>
      {/* Form that submits to the server action */}
      <form action={formAction}>
        <CardContent>
          {/* Text area for entering bullet points */}
          <Textarea
            name="bulletPoints"
            placeholder={`• Need to schedule a meeting
• Discuss Q2 results
• Request budget approval
• Follow up on previous action items`}
            className="min-h-[200px]"
            aria-label="Bullet points"
          />
          {/* Display validation errors if any */}
          {state.errors?.bulletPoints && <p className="text-sm text-red-500 mt-2">{state.errors.bulletPoints}</p>}
        </CardContent>
        <CardFooter>
          {/* Submit button with loading state */}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Drafting Email...
              </>
            ) : (
              "Convert to Email"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
