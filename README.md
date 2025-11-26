# ExamGen - AI-Powered Exam Question Generator

An open-source web application that transforms study materials into practice exam questions using AI. Students upload PDFs and receive intelligent multiple-choice questions for self-assessment.

## Features

- AI Question Generation - Upload PDFs and generate practice questions using OpenAI
- Token-Based Usage - 3 free generations per day, resets at midnight UTC
- Interactive Practice Tests - Take timed tests with instant grading
- Smart PDF Processing - Client-side text extraction from study materials
- Secure Authentication - JWT-based user authentication
- Auto-Cleanup - Questions automatically expire after 24 hours
- Download Options - Export questions and answers as separate PDFs

## Architecture

**Monorepo Structure**

```
examgen/
├── client/          # React + Vite + TypeScript
├── server/          # Express + Prisma + PostgreSQL
├── shared/          # Shared TypeScript types
└── package.json     # Root scripts with concurrently
```

**Tech Stack**

- Frontend: React 18, TypeScript, Vite, TailwindCSS, Shadcn/ui
- Backend: Node.js, Express, TypeScript, Prisma ORM
- Database: PostgreSQL
- AI: OpenAI GPT-4o-mini
- Deployment: Railway (backend), Vercel (frontend)

## Getting Started

### Prerequisites

- Node.js 20+ LTS
- PostgreSQL 15+
- OpenAI API key

### Installation

```bash
# Clone repository
git clone https://github.com/kehinde-durodola/examgen.git
cd examgen

# Install all dependencies
npm run install:all

# Setup environment variables
cp server/.env.example server/.env
# Add your DATABASE_URL and OPENAI_API_KEY

# Run database migrations
npm run prisma:migrate

# Start development servers
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Development

### Available Scripts

```bash
# Run both client and server concurrently
npm run dev

# Run server only
npm run dev:server

# Run client only
npm run dev:client

# Build for production
npm run build

# Run Prisma Studio (database GUI)
npm run prisma:studio

# Run database migrations
npm run prisma:migrate
```

## Author

**Kehinde Durodola**

- Portfolio: [devkehinde.com](https://devkehinde.com)
- GitHub: [@kehinde-durodola](https://github.com/kehinde-durodola)
- LinkedIn: [Kehinde Durodola](https://linkedin.com/in/kehinde-durodola)
