# Next.js Todo App

This is a **Next.js** project built with the following tech stack:

<img width="570" height="115" alt="Screenshot 2025-09-25 at 20 18 18" src="https://github.com/user-attachments/assets/b9179d31-63f1-4749-8001-71583ba4a9cf" />


## Features

- **Shadcn** was used for UI components.
- **API routes** handle hashing of user credentials securely.
- **Middleware** prevents direct access to the `/todo` page without logging in.

## User Credentials

You can log in with the following credentials:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

## Production

The app is accessible on Netlify:  
👉 [https://todoapp-next.netlify.app/](https://todoapp-next.netlify.app/)

## Getting Started

To run the development server locally, follow these steps:

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Or using Yarn
yarn dev

# Or using PNPM
pnpm dev

# Or using Bun
bun dev
```
