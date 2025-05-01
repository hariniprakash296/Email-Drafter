# Email Draft Assistant Documentation

This documentation provides a comprehensive guide to the Email Draft Assistant application, explaining its architecture, data flow, and key concepts. It's designed for fresh graduates who are new to Next.js and React.

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Project Structure](#project-structure)
4. [Data Flow](#data-flow)
5. [Key Concepts](#key-concepts)
6. [Component Breakdown](#component-breakdown)
7. [API Integration](#api-integration)
8. [Theme System](#theme-system)
9. [Next Steps](#next-steps)

## Introduction

The Email Draft Assistant is a web application that helps users convert bullet points into professionally written emails. Users enter their bullet points, click a button, and receive a well-formatted email that they can copy and use.

The application uses:
- **Next.js**: A React framework for building web applications
- **React**: A JavaScript library for building user interfaces
- **Shadcn UI**: A collection of reusable UI components
- **DeepSeek API**: An AI service that generates the email content

## System Architecture

The application follows a client-server architecture within the Next.js framework:

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│                                                         │
│  ┌─────────────┐       ┌─────────────┐      ┌────────┐  │
│  │  Input Form │──────▶│ Server Action│─────▶│ Output │  │
│  └─────────────┘       └─────────────┘      └────────┘  │
│          │                     │                         │
└──────────┼─────────────────────┼─────────────────────────┘
           │                     │                          
           │                     ▼                          
           │        ┌─────────────────────────┐             
           │        │     Next.js Server      │             
           │        │                         │             
           │        │  ┌─────────────────┐    │             
           └────────┼──│  Server Action  │    │             
                    │  └─────────────────┘    │             
                    │           │             │             
                    └───────────┼─────────────┘             
                                │                           
                                ▼                           
                    ┌─────────────────────────┐             
                    │      DeepSeek API       │             
                    │   (External Service)    │             
                    └─────────────────────────┘             
\`\`\`

## Project Structure

The project follows a standard Next.js App Router structure:

\`\`\`
email-drafter/
├── app/                  # Next.js App Router directory
│   ├── actions/          # Server Actions
│   │   └── draft-email.ts # Email drafting server action
│   ├── globals.css       # Global CSS styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/           # React components
│   ├── bullet-points-input.tsx # Input form component
│   ├── email-drafter.tsx # Main component
│   ├── email-output.tsx  # Output display component
│   ├── error-message.tsx # Error message component
│   ├── header.tsx        # Header component
│   ├── theme-provider.tsx # Theme provider component
│   ├── theme-toggle.tsx  # Theme toggle component
│   └── ui/               # Shadcn UI components
├── contexts/             # React contexts
│   └── email-drafter-context.tsx # Email drafter context
├── public/               # Static files
└── tailwind.config.ts    # Tailwind CSS configuration
\`\`\`

## Data Flow

The data flow in the application follows these steps:

1. **User Input**: The user enters bullet points in the input form.
2. **Form Submission**: When the user clicks "Convert to Email", the form is submitted.
3. **Server Action**: The form data is sent to the server action (`draftEmail`).
4. **Validation**: The server action validates the input.
5. **API Request**: If valid, the server action sends a request to the DeepSeek API.
6. **Email Generation**: The DeepSeek API generates an email based on the bullet points.
7. **Response Processing**: The server action processes the response and removes any markdown formatting.
8. **State Update**: The state is updated with the generated email or error message.
9. **UI Update**: The UI updates to display the email or error message.

## Key Concepts

### Next.js App Router

Next.js App Router is a file-system based router built on top of React Server Components. It provides a way to organize your application into pages and layouts.

Key files:
- `app/page.tsx`: The home page component
- `app/layout.tsx`: The root layout component that wraps all pages

### React Server Components

React Server Components allow components to be rendered on the server. This improves performance and SEO.

In this application:
- `app/page.tsx` is a Server Component
- Components with "use client" at the top are Client Components

### Server Actions

Server Actions are functions that run on the server but can be called from the client. They're used for handling form submissions and other server-side operations.

In this application:
- `app/actions/draft-email.ts` contains the `draftEmail` server action
- The form in `components/bullet-points-input.tsx` submits to this action

### React Context

React Context provides a way to share state between components without passing props through every level.

In this application:
- `contexts/email-drafter-context.tsx` defines the context for email drafting
- `useEmailDrafter` is a custom hook to access this context

### Shadcn UI

Shadcn UI is a collection of reusable UI components built with Tailwind CSS and Radix UI.

In this application:
- Components like `Button`, `Card`, and `Textarea` come from Shadcn UI
- These components are styled with Tailwind CSS classes

### Theme System

The application supports light, dark, and system themes using the `next-themes` library.

Components involved:
- `components/theme-provider.tsx`: Provides theme context to the application
- `components/theme-toggle.tsx`: Allows users to switch themes

## Component Breakdown

### EmailDrafter

The main component that orchestrates the email drafting process. It:
- Provides the context to child components
- Arranges the input, output, and error components

### BulletPointsInput

Handles user input for bullet points. It:
- Displays a form with a text area
- Shows a loading state during submission
- Displays validation errors

### EmailOutput

Displays the generated email. It:
- Shows the email in a formatted container
- Provides a button to copy the email to the clipboard
- Shows a confirmation when the email is copied

### ErrorMessage

Displays error messages from the email drafting process.

### Header

Displays the application title and theme toggle.

### ThemeToggle

Allows users to switch between light, dark, and system themes.

## API Integration

The application integrates with the DeepSeek API to generate emails from bullet points.

Integration details:
- The API key is stored as an environment variable (`DEEPSEEK_API_KEY`)
- The server action sends a POST request to the API
- The request includes the bullet points and instructions for the AI
- The response is processed to remove markdown formatting

## Theme System

The application supports light, dark, and system themes using:

1. **ThemeProvider**: Wraps the application and provides theme context
2. **ThemeToggle**: Allows users to switch themes
3. **CSS Variables**: Define colors for each theme
4. **Tailwind Classes**: Use theme-aware classes like `bg-background`

## Next Steps

Potential enhancements for the application:

1. **Tone Selection**: Allow users to choose the tone of the email (formal, casual, friendly)
2. **Subject Line Generation**: Generate a subject line based on the bullet points
3. **Email Templates**: Add pre-defined templates for different email types
4. **Email Sending**: Integrate with email services to send the drafted email
5. **History Feature**: Save previously drafted emails for future reference

## Conclusion

The Email Draft Assistant demonstrates several modern web development concepts:
- Next.js App Router for routing and layouts
- React Server Components for improved performance
- Server Actions for server-side operations
- React Context for state management
- Shadcn UI for consistent styling
- Theme switching for user preference
- API integration for AI-powered features

By understanding these concepts, you'll be well-equipped to maintain and extend this application, as well as build your own Next.js applications.
