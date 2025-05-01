// Import the main components
import { EmailDrafter } from "@/components/email-drafter"
import { Header } from "@/components/header"

/**
 * Home page component
 * This is the main page of the application that users see when they visit the site
 */
export default function Home() {
  return (
    <>
      {/* Header with app title and theme toggle */}
      <Header />
      {/* Main content area */}
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page title and description */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Email Draft Assistant</h1>
            <p className="text-muted-foreground">
              Transform your bullet points into professionally written emails with one click
            </p>
          </div>

          {/* Email drafter component */}
          <EmailDrafter />
        </div>
      </main>
    </>
  )
}
