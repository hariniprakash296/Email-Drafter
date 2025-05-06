"use client"

import type React from "react"

import { useEmailDrafter } from "@/contexts/email-drafter-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function BulletPointsInput() {
  const { formAction, isPending, state, bulletPoints, setBulletPoints } = useEmailDrafter()

  // Handle changes to the textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBulletPoints(e.target.value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bullet Points</CardTitle>
        <CardDescription>Enter your bullet points below. Each point should be on a new line.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <Textarea
            name="bulletPoints"
            placeholder={`• Need to schedule a meeting
• Discuss Q2 results
• Request budget approval
• Follow up on previous action items`}
            className="min-h-[200px]"
            aria-label="Bullet points"
            value={bulletPoints}
            onChange={handleChange}
          />
          {state.errors?.bulletPoints && <p className="text-sm text-red-500 mt-2">{state.errors.bulletPoints}</p>}
        </CardContent>
        <CardFooter>
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
