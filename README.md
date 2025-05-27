# Do It - Task Management Application

A modern task management application built with a monorepo structure, featuring a React frontend and Nest.js backend.

## 🚀 Features

- **User Authentication**
  - Secure login and registration
  - Cookie-based session management
  - Protected routes

- **Task Management**
  - Create, edit, and delete tasks
  - Organize tasks by categories
  - Mark tasks as complete/incomplete
  - Set due dates for tasks
  - Add descriptions to tasks

- **Category Management**
  - Create custom categories
  - Assign colors to categories
  - Organize tasks within categories
  - Edit and delete categories

- **User Interface**
  - Clean and modern design
  - Responsive layout
  - Intuitive navigation
  - Real-time updates
  - Search functionality

## 🛠️ Technologies Used

- **Frontend (apps/web)**
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router
  - React Icons

- **Backend (apps/api)**
  - Nest.js
  - PostgreSQL
  - JWT Authentication

- **Development Tools**
  - PNPM (Package Manager)
  - Monorepo Structure
  - TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/do-it.git
cd do-it
```

2. Install dependencies using PNPM:
```bash
pnpm install
```

3. Create environment files:
   - Create `.env` in `apps/web` for frontend variables
   - Create `.env` in `apps/api` for backend variables

4. Start the development servers:
```bash
# Start both frontend and backend
 pnpm -r dev

# Or start them separately
cd apps/web && pnpm dev
cd apps/api && pnpm dev

```

## 🏗️ Project Structure

```
do-it/
├── apps/
│   ├── web/           # Frontend React application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/      # Page components
│   │   │   ├── services/   # API services
│   │   │   ├── types/      # TypeScript type definitions
│   │   │   └── utils/      # Utility functions
│   │   └── ...
│   │
│   └── api/           # Backend Node.js application
│       ├── src/
│       │   ├── controllers/ # Route controllers
│       │   ├── models/      # Database models
│       │   ├── routes/      # API routes
│       │   ├── services/    # Business logic
│       │   └── utils/       # Utility functions
│       └── ...
│
├── package.json       # Root package.json
└── pnpm-workspace.yaml # PNPM workspace configuration
```

## 👥 Authors

- Noah Markovich


