# ExamGen - AI-Powered Exam Question Generator

An open-source web application that transforms study materials into practice exam questions using AI. Students upload PDFs or paste text to receive intelligent multiple-choice questions for self-assessment.

## Features

### Core Features

- **AI Question Generation** - Upload PDFs or paste text to generate practice questions using OpenAI GPT-4o-mini
- **Token-Based System** - 3 free generations per day, automatically resets at midnight UTC
- **Instant Grading** - Client-side test evaluation with detailed explanations
- **PDF Export** - Download generated questions for offline study
- **Auto-Cleanup** - Questions automatically expire after 48 hours

### Security & Performance

- **JWT Authentication** - Secure user authentication with bcrypt password hashing
- **Rate Limiting** - Protection against abuse (5 registrations/hour per IP, 10 generations/hour per user)
- **CORS Protection** - Configured allowed origins
- **Helmet Security** - HTTP security headers

### Automation

- **Daily Token Refresh** - Automated cron job resets tokens at midnight UTC
- **Automatic Cleanup** - Cron job removes expired generations every hour

## System Architecture

```mermaid
graph TB
    Client[React Frontend<br/>Vite + TypeScript]
    API[Express API<br/>Node.js + TypeScript]
    DB[(PostgreSQL<br/>Prisma ORM)]
    OpenAI[OpenAI API<br/>GPT-4o-mini]

    Client -->|HTTPS/REST| API
    API -->|SQL Queries| DB
    API -->|Generate Questions| OpenAI

    style Client fill:#61dafb
    style API fill:#68a063
    style DB fill:#336791
    style OpenAI fill:#10a37f
```

**Architecture Highlights:**

- RESTful API design with stateless JWT authentication
- Server-side AI processing for question generation
- Internal cron jobs for automated maintenance (token refresh, cleanup)
- PostgreSQL with Prisma ORM for type-safe database access

## Security

This application implements multiple security layers:

- **Authentication:** JWT tokens with 7-day expiration
- **Password Security:** Bcrypt hashing with salt rounds
- **Rate Limiting:**
  - Registration: 5 accounts per IP per hour
  - Login: 10 attempts per IP per 15 minutes
  - Generation: 10 requests per user per hour
  - Global: 1000 requests per IP per hour
- **CORS:** Restricted origins (configurable via environment)
- **HTTP Security:** Helmet.js middleware for security headers
- **Input Validation:** Zod schemas validate all endpoint inputs
- **SQL Injection Protection:** Prisma ORM with parameterized queries

## Tech Stack

**Frontend:**

- React 18 + TypeScript + Vite
- TailwindCSS + Custom UI Components
- TanStack Query (React Query)
- React Router DOM
- React Hook Form + Zod validation
- Lucide React (icons)
- jsPDF (PDF export)

**Backend:**

- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- OpenAI GPT-4o-mini
- JWT Authentication
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- express-rate-limit (API protection)
- node-cron (background jobs)

**Deployment:**

- Backend: Render
- Frontend: Vercel
- Database: Render PostgreSQL

## Project Structure

```
examgen/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Base UI components (Button, Card, Input, etc.)
│   │   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   │   ├── shared/     # Shared components (GenerationCard, EmptyState, etc.)
│   │   │   ├── dashboard/  # Dashboard-specific components
│   │   │   ├── generate/   # Generation page components
│   │   │   └── test/       # Test/Quiz components
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── hooks/          # Custom hooks (useAuth, useGenerations, etc.)
│   │   ├── lib/            # Utilities and constants
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   ├── App.tsx         # App component with routes
│   │   └── main.tsx        # Entry point
│   ├── index.html
│   └── package.json
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── config/         # Database, env, OpenAI clients
│   │   ├── constants/      # Application constants
│   │   ├── cron/           # Cron job definitions
│   │   ├── types/          # TypeScript type definitions
│   │   ├── validation/     # Zod validation schemas
│   │   ├── utils/          # Helper functions
│   │   ├── middlewares/    # Express middlewares
│   │   ├── repositories/   # Database access layer
│   │   ├── services/       # Business logic
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── app.ts          # Express app config
│   │   └── server.ts       # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Seed script
│   └── package.json
│
├── package.json            # Root scripts
└── README.md
```

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

# Install server dependencies
cd server
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL and OPENAI_API_KEY

# Run database migrations
npm run prisma:migrate

# Seed test user (optional)
npm run prisma:seed

# Start development server
npm run dev
```

```bash
# Install client dependencies (in a new terminal)
cd client
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your VITE_API_URL

# Start frontend development server
npm run dev
```

The backend will be available at: http://localhost:3000
The frontend will be available at: http://localhost:5173

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Management

- `PATCH /api/users/me` - Update user profile (protected)

### Generations

- `POST /api/generations` - Create new generation (protected, requires tokens)
- `GET /api/generations` - Get user's generation history (protected)
- `GET /api/generations/:id` - Get specific generation with questions (protected)

### Test & Scoring

- `POST /api/generations/:id/score` - Submit test score (protected)

### Cron Webhooks (Optional - for manual execution and monitoring)

- `POST /api/cron/refresh-tokens` - Manual token refresh (protected by CRON_SECRET)
- `POST /api/cron/cleanup-generations` - Manual cleanup trigger (protected by CRON_SECRET)

### Health

- `GET /health` - Health check

## Environment Variables

### Server (`server/.env`)

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/examgen_db?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Server
PORT=3000
NODE_ENV="development"

# CORS
ALLOWED_ORIGINS="http://localhost:5173"

# Token System
DAILY_TOKEN_LIMIT=3
TOKEN_REFRESH_CRON="0 0 * * *"
GENERATION_CLEANUP_CRON="0 * * * *"

# Cron Webhooks (Optional - for manual execution and monitoring)
# Generate secure random string: openssl rand -hex 32
CRON_SECRET="your-secure-random-string-here"
```

### Client (`client/.env`)

```env
VITE_API_URL="http://localhost:3000/api"
```

## Development Scripts

### Server

```bash
npm run dev              # Start dev server with hot reload
npm run type-check       # Run TypeScript type checking
npm run build            # Compile TypeScript
npm start                # Start production server

# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed test user
```

### Client

```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

## Test User (Development)

After running `npm run prisma:seed`:

- Email: `test@example.com`
- Password: `test123`
- Tokens: 3

## Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set root directory to `server`
4. Set build command: `npm install --include=dev && npx prisma generate && npm run build`
5. Set start command: `npm start`
6. Add PostgreSQL database
7. Add environment variables
8. Deploy

### Frontend (Vercel)

1. Import project from GitHub
2. Set framework preset to Vite
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL`
5. Deploy

## TypeScript Configuration

This project uses `strict: false` to balance type safety with development velocity while maintaining runtime validation through Zod schemas. This is a deliberate choice to prioritize feature development while keeping adequate type checking.

## Roadmap

- [x] Backend API (Express + Prisma + PostgreSQL)
- [x] AI Question Generation (OpenAI GPT-4o-mini)
- [x] Authentication & Authorization (JWT + bcrypt)
- [x] Token System (Daily limits with automated refresh)
- [x] Rate Limiting (Prevents abuse)
- [x] Cron Jobs (Token refresh + Generation cleanup)
- [x] Clean API structure (REST endpoints)
- [x] Frontend UI (React + TypeScript + Vite)
- [x] TanStack Query caching
- [x] Mobile responsive design
- [x] PDF export for questions
- [x] Production deployment (Render + Vercel)

## Contributing

This is an open-source project and contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages (conventional commits)
- Add tests for new features (when applicable)
- Update documentation for API changes
- Run `npm run type-check` before committing

### Issues

Found a bug or have a feature request? [Open an issue](https://github.com/kehinde-durodola/examgen/issues)

## Author

**Kehinde Durodola**

- GitHub: [@kehinde-durodola](https://github.com/kehinde-durodola)
- LinkedIn: [Kehinde Durodola](https://linkedin.com/in/kehinde-durodola)

## License

MIT
