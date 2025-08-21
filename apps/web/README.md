# Web Application

The main Next.js web application for the Learning Management System.

## 🚀 Features

- **Next.js 15**: Latest version with App Router
- **Authentication**: Clerk integration for secure user management
- **Internationalization**: Multi-language support (EN, UR, ZH)
- **Theme Support**: Dark/light mode with next-themes
- **Type Safety**: Full TypeScript support
- **Modern UI**: Built with shadcn/ui components

## 📁 Structure

```
apps/web/
├── app/                    # Next.js App Router pages
│   ├── [lang]/            # Internationalized routes
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Dashboard pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── api/               # API routes
├── components/            # App-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── locale/                # Internationalization files
├── providers/             # Context providers
└── types/                 # TypeScript type definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Internationalization**: Custom i18n solution
- **Theming**: next-themes
- **Database**: Drizzle ORM (via backend package)

## 📋 Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1
- PostgreSQL database
- Clerk account for authentication

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment Setup

Create `.env.local` in the `apps/web/` directory:

```env
# Database Configuration
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=lms_db
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

### 3. Database Setup

```bash
# Generate database schema
pnpm web:db:generate

# Run migrations
pnpm web:db:migrate:dev
```

### 4. Start Development Server

```bash
# From root directory
pnpm web:dev

# Or from this directory
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

```bash
pnpm dev                    # Start development server with Turbopack
pnpm build                  # Build for production
pnpm start                  # Start production server
pnpm lint                   # Run ESLint
pnpm lint:fix               # Fix ESLint issues
pnpm typecheck              # Run TypeScript type checking
```

## 🌐 Internationalization

The application supports multiple languages through a custom i18n solution:

### Supported Languages

- **English** (en) - Default
- **Urdu** (ur)
- **Chinese Simplified** (zh_CN)
- **Chinese Traditional** (zh_TW)

### Language Files

Language files are located in `locale/`:
- `en.json` - English translations
- `ur.json` - Urdu translations
- `zh_CN.json` - Chinese Simplified translations
- `zh_TW.json` - Chinese Traditional translations

### Usage

```tsx
import { useLocale } from '@/hooks/use-locale'

function MyComponent() {
  const { t } = useLocale()
  
  return <h1>{t('welcome')}</h1>
}
```

## 🎨 Theming

The application supports both light and dark themes using `next-themes`.

### Theme Provider

The theme provider is configured in `providers/theme-provider.tsx`.

### Usage

```tsx
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  )
}
```

## 🔧 Development

### Adding New Pages

1. Create a new directory in `app/[lang]/`
2. Add `page.tsx` for the route
3. Update navigation if needed

### Adding New Components

1. Create component in `components/`
2. Import from `@workspace/ui` for shared components
3. Use TypeScript for type safety

### API Routes

API routes are located in `app/api/` and follow Next.js App Router conventions.

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

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

## 📦 Dependencies

### Core Dependencies

- `next`: ^15.4.5
- `react`: ^19.1.1
- `react-dom`: ^19.1.1
- `@clerk/nextjs`: ^6.31.4
- `next-themes`: ^0.4.6
- `zod`: ^3.25.76

### Workspace Dependencies

- `@workspace/backend`: Database and backend utilities
- `@workspace/ui`: Shared UI components

### Development Dependencies

- `@types/node`: ^20.19.9
- `@types/react`: ^19.1.9
- `@types/react-dom`: ^19.1.7
- `typescript`: ^5.9.2

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and all database environment variables (`DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`) are correctly set
2. **Authentication**: Verify Clerk keys are properly configured
3. **Build Errors**: Run `pnpm typecheck` to identify TypeScript issues
4. **Styling Issues**: Ensure Tailwind CSS is properly configured

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your environment variables.
