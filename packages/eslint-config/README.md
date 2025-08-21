# ESLint Configuration Package

Shared ESLint configuration for the Next.js full-stack monorepo template.

## 🚀 Features

- **Multiple Configurations**: Base, Next.js, and React configurations
- **TypeScript Support**: Full TypeScript linting rules
- **React Best Practices**: React and React Hooks rules
- **Next.js Optimization**: Next.js specific rules
- **Prettier Integration**: Compatible with Prettier formatting
- **Turbo Integration**: Optimized for monorepo workflows

## 📁 Structure

```
packages/eslint-config/
├── base.js              # Base ESLint configuration
├── next.js              # Next.js specific configuration
├── react-internal.js    # React internal configuration
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Linter**: ESLint 9
- **TypeScript**: TypeScript ESLint parser and rules
- **React**: React and React Hooks ESLint plugins
- **Next.js**: Next.js ESLint plugin
- **Turbo**: Turbo ESLint plugin

## 📋 Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1
- ESLint 9

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
    "@workspace/eslint-config": "workspace:*"
  }
}
```

### 3. Configure ESLint

Create `.eslintrc.js` in your package:

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/base"],
}
```

## 📜 Available Configurations

### Base Configuration (`base.js`)

General ESLint rules suitable for any JavaScript/TypeScript project:

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/base"],
}
```

**Includes:**
- TypeScript parser and rules
- Basic code quality rules
- Prettier compatibility
- Turbo optimization

### Next.js Configuration (`next.js`)

Optimized for Next.js applications:

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/next-js"],
}
```

**Includes:**
- All base configuration
- Next.js specific rules
- React and React Hooks rules
- Next.js best practices

### React Internal Configuration (`react-internal.js`)

For internal React components and utilities:

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/react-internal"],
}
```

**Includes:**
- React specific rules
- Component best practices
- Hooks rules
- Internal development patterns

## 🔧 Configuration Details

### Base Configuration

The base configuration includes:

- **Parser**: `@typescript-eslint/parser`
- **Plugins**: TypeScript ESLint, Turbo
- **Rules**: TypeScript best practices, code quality
- **Settings**: TypeScript-aware settings

### Next.js Configuration

Extends base configuration with:

- **Plugin**: `@next/eslint-plugin-next`
- **Rules**: Next.js specific linting rules
- **React**: React and React Hooks rules
- **Optimizations**: Next.js performance rules

### React Internal Configuration

Optimized for React component development:

- **React Rules**: Component and hooks best practices
- **Internal Patterns**: Development-specific rules
- **TypeScript**: Full TypeScript support for React

## 📦 Exports

The package exports the following configurations:

```typescript
// Base configuration
export * from './base'

// Next.js configuration
export * from './next-js'

// React internal configuration
export * from './react-internal'
```

## 🔍 Usage Examples

### Basic Package

```javascript
// .eslintrc.js
module.exports = {
  extends: ["@workspace/eslint-config/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
}
```

### Next.js Application

```javascript
// .eslintrc.js
module.exports = {
  extends: ["@workspace/eslint-config/next-js"],
  parserOptions: {
    project: "./tsconfig.json",
  },
}
```

### React Component Library

```javascript
// .eslintrc.js
module.exports = {
  extends: ["@workspace/eslint-config/react-internal"],
  parserOptions: {
    project: "./tsconfig.json",
  },
}
```

### Custom Configuration

```javascript
// .eslintrc.js
module.exports = {
  extends: ["@workspace/eslint-config/base"],
  rules: {
    // Override or add custom rules
    "@typescript-eslint/no-unused-vars": "error",
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
}
```

## 🎨 Rule Customization

### Common Rule Overrides

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/base"],
  rules: {
    // Allow console.log in development
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    
    // Customize TypeScript rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    
    // React specific rules
    "react/prop-types": "off", // Using TypeScript instead
  },
}
```

### Environment-Specific Rules

```javascript
module.exports = {
  extends: ["@workspace/eslint-config/base"],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  rules: {
    // Browser-specific rules
    "no-alert": "warn",
    "no-console": "warn",
  },
}
```

## 📦 Dependencies

### Core Dependencies

- `eslint`: ^9.32.0 - Main linting engine
- `typescript-eslint`: ^8.39.0 - TypeScript ESLint integration
- `@typescript-eslint/eslint-plugin`: ^8.39.0 - TypeScript rules
- `@typescript-eslint/parser`: ^8.39.0 - TypeScript parser

### React Dependencies

- `eslint-plugin-react`: ^7.37.5 - React linting rules
- `eslint-plugin-react-hooks`: ^5.2.0 - React Hooks rules

### Next.js Dependencies

- `@next/eslint-plugin-next`: ^15.4.5 - Next.js specific rules

### Utility Dependencies

- `eslint-config-prettier`: ^9.1.2 - Prettier compatibility
- `eslint-plugin-only-warn`: ^1.1.0 - Convert errors to warnings
- `eslint-plugin-turbo`: ^2.5.5 - Turbo monorepo rules
- `globals`: ^15.15.0 - Global variables

## 🔍 Troubleshooting

### Common Issues

1. **Parser Errors**: Ensure TypeScript configuration is correct
2. **Rule Conflicts**: Check for conflicting ESLint configurations
3. **Performance**: Use Turbo caching for faster linting

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your environment variables.

### Rule Conflicts

If you encounter rule conflicts:

1. Check the order of extends in your configuration
2. Ensure no conflicting plugins are loaded
3. Use `eslint --print-config` to see final configuration

## 📚 Documentation

- [ESLint Documentation](https://eslint.org/)
- [TypeScript ESLint Documentation](https://typescript-eslint.io/)
- [React ESLint Plugin Documentation](https://github.com/jsx-eslint/eslint-plugin-react)
- [Next.js ESLint Plugin Documentation](https://nextjs.org/docs/basic-features/eslint)
