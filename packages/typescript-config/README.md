# TypeScript Configuration Package

Shared TypeScript configuration for the Next.js full-stack monorepo template.

## 🚀 Features

- **Multiple Configurations**: Base, Next.js, and React library configurations
- **Strict Type Checking**: Comprehensive type safety rules
- **Modern JavaScript**: Latest ECMAScript features
- **Monorepo Support**: Optimized for workspace packages
- **Framework Specific**: Tailored configurations for different use cases

## 📁 Structure

```
packages/typescript-config/
├── base.json             # Base TypeScript configuration
├── nextjs.json           # Next.js specific configuration
├── react-library.json    # React library configuration
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Language**: TypeScript 5.7+
- **Target**: ES2022
- **Module**: ESNext
- **Strict Mode**: Enabled
- **Path Mapping**: Workspace-aware

## 📋 Prerequisites

- Node.js >= 20
- TypeScript >= 5.7
- pnpm >= 10.4.1

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Use in your package

Add to your `package.json`:

```json
{
  "devDependencies": {
    "@workspace/typescript-config": "workspace:*"
  }
}
```

### 3. Configure TypeScript

Create `tsconfig.json` in your package:

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 📜 Available Configurations

### Base Configuration (`base.json`)

General TypeScript configuration suitable for any project:

```json
{
  "extends": "@workspace/typescript-config/base.json"
}
```

**Features:**
- Strict type checking
- Modern JavaScript features
- Path mapping support
- Comprehensive type safety

### Next.js Configuration (`nextjs.json`)

Optimized for Next.js applications:

```json
{
  "extends": "@workspace/typescript-config/nextjs.json"
}
```

**Features:**
- Next.js specific types
- React JSX support
- App Router compatibility
- Server and client components

### React Library Configuration (`react-library.json`)

For React component libraries and utilities:

```json
{
  "extends": "@workspace/typescript-config/react-library.json"
}
```

**Features:**
- React component types
- Library development optimizations
- Declaration file generation
- External dependencies handling

## 🔧 Configuration Details

### Base Configuration

The base configuration includes:

- **Target**: ES2022
- **Module**: ESNext
- **Module Resolution**: Node
- **Strict Mode**: Enabled
- **Type Checking**: Comprehensive
- **Path Mapping**: Workspace support

### Next.js Configuration

Extends base configuration with:

- **JSX**: React JSX
- **Next.js Types**: Built-in Next.js type support
- **App Router**: App directory support
- **Server Components**: React Server Components

### React Library Configuration

Optimized for library development:

- **Declaration Files**: Generate .d.ts files
- **External Dependencies**: Handle external packages
- **Library Mode**: Optimized for distribution
- **React Types**: Full React type support

## 📦 Exports

The package exports the following configurations:

```typescript
// Base configuration
export * from './base.json'

// Next.js configuration
export * from './nextjs.json'

// React library configuration
export * from './react-library.json'
```

## 🔍 Usage Examples

### Basic Package

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Next.js Application

```json
{
  "extends": "@workspace/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### React Component Library

```json
{
  "extends": "@workspace/typescript-config/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### Custom Configuration

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 🎨 Configuration Customization

### Common Customizations

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    // Output configuration
    "outDir": "./dist",
    "rootDir": "./src",
    
    // Type checking options
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    
    // Module resolution
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    
    // Path mapping
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

### Environment-Specific Settings

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  }
}
```

## 📦 Dependencies

### Core Dependencies

- `typescript`: ^5.7.3 - TypeScript compiler

### Development Dependencies

- `@types/node`: ^20.19.9 - Node.js types (when needed)
- `@types/react`: ^19.1.9 - React types (when needed)
- `@types/react-dom`: ^19.1.7 - React DOM types (when needed)

## 🔍 Troubleshooting

### Common Issues

1. **Path Resolution**: Ensure `baseUrl` and `paths` are correctly configured
2. **Module Resolution**: Check `moduleResolution` and `module` settings
3. **Type Errors**: Verify `strict` mode settings and type definitions

### Debug Mode

Enable TypeScript debug logging by setting `TSC_COMPILE_ON_ERROR=true` in your environment variables.

### Type Checking

For better type checking:

1. Enable strict mode
2. Use proper type definitions
3. Configure path mapping correctly
4. Include all necessary files in `include`

## 📚 Documentation

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [Next.js TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [React TypeScript](https://react.dev/learn/typescript)
