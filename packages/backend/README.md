# Backend Package

Database schema, utilities, and backend logic for the Learning Management System.

## 🚀 Features

- **Database Schema**: PostgreSQL schema definitions using Drizzle ORM
- **Type Safety**: Full TypeScript support with generated types
- **Migrations**: Automated database migrations with Drizzle Kit
- **User Management**: User-related database operations
- **Utilities**: Shared backend utilities and helpers

## 📁 Structure

```
packages/backend/
├── drizzle/               # Database migrations and schema
│   ├── 0000_brainy_glorian.sql
│   └── meta/              # Migration metadata
├── src/
│   ├── db/                # Database configuration and schema
│   │   ├── index.ts       # Database connection
│   │   ├── schema/        # Database schema definitions
│   │   └── utils.ts       # Database utilities
│   ├── users/             # User-related operations
│   └── utils.ts           # General utilities
├── drizzle.config.ts      # Drizzle configuration
└── package.json
```

## 🛠️ Tech Stack

- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Language**: TypeScript
- **Migrations**: Drizzle Kit
- **Authentication**: Clerk integration

## 📋 Prerequisites

- Node.js >= 20
- PostgreSQL database
- pnpm >= 10.4.1

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment Setup

Ensure your database environment variables are available:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=lms_db
DB_PASSWORD=your_db_password
DB_PORT=5432
```

### 3. Database Setup

```bash
# Generate database schema
pnpm db:generate

# Run migrations
pnpm db:migrate

# Open Drizzle Studio (optional)
pnpm db:studio
```

## 📜 Available Scripts

```bash
pnpm db:generate        # Generate new migration files
pnpm db:migrate         # Run database migrations
pnpm db:studio          # Open Drizzle Studio
pnpm test               # Run tests (placeholder)
```

## 🗄️ Database Schema

### Core Tables

The database schema includes tables for:

- **Users**: User accounts and profiles
- **Courses**: Course information and metadata
- **Enrollments**: Student course enrollments
- **Lessons**: Individual lesson content
- **Progress**: Student progress tracking

### Schema Management

Schema definitions are located in `src/db/schema/` and follow Drizzle ORM conventions.

## 🔧 Development

### Adding New Tables

1. Create schema definition in `src/db/schema/`
2. Export from `src/db/schema/index.ts`
3. Generate migration: `pnpm db:generate`
4. Run migration: `pnpm db:migrate`

### Example Schema Definition

```typescript
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const users = pgTable('users', {
  id: text('id').$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### Database Utilities

Common database utilities are available in `src/db/utils.ts`:

- Connection management
- Query helpers
- Type utilities

## 📦 Exports

The package exports the following modules:

```typescript
// Database connection and utilities
export * from './db'
export * from './db/utils'

// Schema definitions
export * from './db/schema'

// User operations
export * from './users/*'

// General utilities
export * from './utils'
```

## 🔍 Usage Examples

### Database Connection

```typescript
import { db } from '@workspace/backend/db'

// Query users
const users = await db.select().from(users)
```

### User Operations

```typescript
import { createUser } from '@workspace/backend/users/create-user'

const newUser = await createUser({
  email: 'user@example.com',
  name: 'John Doe'
})
```

### Schema Access

```typescript
import { users, courses } from '@workspace/backend/db/schema'

// Use schema definitions
const userQuery = db.select().from(users)
```

## 🚀 Migration Management

### Creating Migrations

```bash
# Generate migration from schema changes
pnpm db:generate
```

### Running Migrations

```bash
# Development
pnpm db:migrate

# Production (with environment file)
dotenv -e .env.production -- pnpm db:migrate
```

### Migration Files

Migrations are stored in `drizzle/` and follow the naming convention:
- `0000_brainy_glorian.sql` - Initial migration
- `0001_description.sql` - Subsequent migrations

## 🔧 Configuration

### Drizzle Configuration

The `drizzle.config.ts` file configures:

- Database connection
- Migration output directory
- Schema location
- Generated types location

### Environment Variables

Required environment variables:

- `DB_USER`: Database username
- `DB_HOST`: Database host
- `DB_DATABASE`: Database name
- `DB_PASSWORD`: Database password
- `DB_PORT`: Database port

## 📦 Dependencies

### Core Dependencies

- `drizzle-orm`: ^0.44.4 - Database ORM
- `pg`: ^8.16.3 - PostgreSQL client
- `@clerk/nextjs`: ^6.31.4 - Authentication integration
- `@paralleldrive/cuid2`: ^2.2.2 - ID generation

### Development Dependencies

- `drizzle-kit`: ^0.31.4 - Migration tool
- `@types/pg`: ^8.15.5 - TypeScript types
- `tsx`: ^4.20.4 - TypeScript execution

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection**: Verify all database environment variables (`DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`) are correct and database is accessible
2. **Migration Errors**: Check for schema conflicts and resolve manually if needed
3. **Type Generation**: Ensure Drizzle Kit is properly configured

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your environment variables.

## 📚 Documentation

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Drizzle Kit Documentation](https://orm.drizzle.team/kit-docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
