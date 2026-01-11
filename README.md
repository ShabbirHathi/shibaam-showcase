# Shibaam Showcase

## Project Overview

This is a modern e-commerce showcase application built with React and TypeScript.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

Follow these steps to set up the project locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd shibaam-showcase

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server with auto-reloading
- `npm run build` - Build the project for production
- `npm run build:dev` - Build the project in development mode
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Technologies Used

This project is built with:

- **Vite** - Next generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **shadcn-ui** - High-quality component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── data/          # Static data and mock data
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── pages/         # Page components and routes
```

## Deployment

Build the project for production:

```sh
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.
