# Next.js Full-Stack Monorepo Template

A modern, full-stack application template built with Next.js, TypeScript, and a monorepo architecture.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Authentication**: Clerk integration for secure user management
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: Custom shadcn/ui component library
- **Internationalization**: Multi-language support (English, Urdu, Chinese)
- **Theme Support**: Dark/light mode with next-themes
- **Monorepo**: Turbo-powered workspace management
- **Type Safety**: End-to-end TypeScript support

## 📁 Project Structure

```
nextjs-fullstack-monorepo/
├── apps/
│   └── web/                 # Next.js web application
├── packages/
│   ├── backend/            # Database schema and utilities
│   ├── ui/                 # Shared UI components
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared TypeScript configuration
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: PostgreSQL, Drizzle ORM
- **Package Manager**: pnpm
- **Monorepo**: Turbo
- **Linting**: ESLint, Prettier

## 📋 Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1
- PostgreSQL database

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd nextjs-fullstack-monorepo
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create `.env.local` in the `apps/web/` directory:

```env
# Database Configuration
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_app_db
DB_PASSWORD=your_db_password
DB_PORT=5432

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Set up the database

```bash
# Generate database schema
pnpm web:db:generate

# Run migrations
pnpm web:db:migrate:dev
```

### 5. Start the development server

```bash
# Start all services
pnpm dev

# Or start just the web app
pnpm web:dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

### Root Level Commands

```bash
# Development
pnpm dev                    # Start all services in development mode
pnpm build                  # Build all packages and applications
pnpm lint                   # Lint all packages and applications
pnpm format                 # Format code with Prettier

# Web Application
pnpm web:dev                # Start web app in development mode
pnpm web:build              # Build web application
pnpm web:db:generate        # Generate database schema
pnpm web:db:migrate:dev     # Run database migrations (development)
pnpm web:db:studio:dev      # Open Drizzle Studio (development)
pnpm web:db:migrate:prod    # Run database migrations (production)
pnpm web:db:studio:prod     # Open Drizzle Studio (production)
```

## 🏗️ Architecture

### Apps

- **`apps/web`**: Main Next.js application with authentication, internationalization, and dashboard features

### Packages

- **`packages/backend`**: Database schema, utilities, and backend logic
- **`packages/ui`**: Reusable UI components built with shadcn/ui
- **`packages/eslint-config`**: Shared ESLint configuration
- **`packages/typescript-config`**: Shared TypeScript configuration

## 🌐 Internationalization

The application supports multiple languages:
- English (en)
- Urdu (ur)
- Chinese Simplified (zh_CN)
- Chinese Traditional (zh_TW)

Language files are located in `apps/web/locale/`.

## 🎨 Theming

The application supports both light and dark themes using `next-themes`. Theme toggle is available in the UI.

## 🔧 Development

### Adding New Packages

1. Create a new directory in `packages/`
2. Initialize with `pnpm init`
3. Add to workspace configuration
4. Update Turbo configuration if needed

### Database Changes

1. Modify schema in `packages/backend/src/db/schema/`
2. Generate new migration: `pnpm web:db:generate`
3. Run migration: `pnpm web:db:migrate:dev`

### UI Components

New components should be added to `packages/ui/src/components/` and exported through the package's exports.

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

### Environment Setup

Ensure all production environment variables are set:
- `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

### Database Migration

```bash
pnpm web:db:migrate:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.

## 🚀 Getting Started with Your Project

After cloning this template:

1. Update the project name in `package.json`
2. Customize the database schema in `packages/backend/src/db/schema/`
3. Modify the authentication flow in `apps/web/app/[lang]/(auth)/`
4. Update the internationalization files in `apps/web/locale/`
5. Customize the UI components in `packages/ui/src/components/`
