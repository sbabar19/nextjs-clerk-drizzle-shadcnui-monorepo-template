# UI Package

A comprehensive UI component library built with shadcn/ui, Tailwind CSS, and Radix UI primitives.

## 🚀 Features

- **Modern Components**: 50+ pre-built components
- **Type Safety**: Full TypeScript support
- **Accessibility**: Built on Radix UI primitives
- **Customizable**: Tailwind CSS with CSS variables
- **Theme Support**: Dark/light mode ready
- **Responsive**: Mobile-first design approach

## 📁 Structure

```
packages/ui/
├── src/
│   ├── components/         # UI components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...            # 50+ components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── styles/            # Global styles
├── components.json        # shadcn/ui configuration
├── postcss.config.mjs     # PostCSS configuration
└── package.json
```

## 🛠️ Tech Stack

- **Framework**: React 19
- **Styling**: Tailwind CSS 4
- **Primitives**: Radix UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js >= 20
- pnpm >= 10.4.1
- React 19
- Tailwind CSS 4

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Import components

```tsx
import { Button } from '@workspace/ui/components/button'
import { Card, CardContent, CardHeader, CardTitle } from '@workspace/ui/components/card'
```

### 3. Use in your application

```tsx
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## 📜 Available Scripts

```bash
pnpm lint              # Run ESLint
pnpm build             # Build package (if needed)
```

## 🎨 Components

### Layout Components

- **Accordion**: Collapsible content sections
- **Card**: Container with header, content, and footer
- **Collapsible**: Expandable content areas
- **Drawer**: Slide-out panels
- **Sheet**: Modal-like side panels
- **Separator**: Visual dividers

### Form Components

- **Button**: Interactive buttons with variants
- **Input**: Text input fields
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection
- **Checkbox**: Checkbox inputs
- **Radio Group**: Radio button groups
- **Switch**: Toggle switches
- **Slider**: Range sliders
- **Form**: Form wrapper with validation

### Navigation Components

- **Breadcrumb**: Navigation breadcrumbs
- **Navigation Menu**: Horizontal navigation
- **Pagination**: Page navigation
- **Tabs**: Tabbed content
- **Command**: Command palette

### Feedback Components

- **Alert**: Status messages
- **Alert Dialog**: Confirmation dialogs
- **Dialog**: Modal dialogs
- **Hover Card**: Hover-triggered cards
- **Popover**: Floating content
- **Tooltip**: Hover tooltips
- **Progress**: Progress indicators
- **Skeleton**: Loading placeholders
- **Sonner**: Toast notifications

### Data Display Components

- **Avatar**: User avatars
- **Badge**: Status badges
- **Calendar**: Date picker
- **Table**: Data tables
- **Chart**: Data visualization

### Utility Components

- **Aspect Ratio**: Maintain aspect ratios
- **Scroll Area**: Custom scrollable areas
- **Resizable**: Resizable panels
- **Toggle**: Toggle buttons
- **Toggle Group**: Grouped toggles

## 🎨 Theming

### CSS Variables

Components use CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

### Dark Mode

Dark mode is automatically supported through CSS variables:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

## 🔧 Development

### Adding New Components

1. Create component in `src/components/`
2. Follow shadcn/ui conventions
3. Export from package exports
4. Update documentation

### Component Structure

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Component-specific props
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("component-base-classes", className)}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component }
```

### Styling Guidelines

- Use Tailwind CSS classes
- Leverage CSS variables for theming
- Follow mobile-first responsive design
- Ensure accessibility with Radix UI primitives

## 📦 Exports

The package exports the following:

```typescript
// Global styles
export * from './globals.css'

// PostCSS configuration
export * from './postcss.config'

// Utility functions
export * from './lib/*'

// Components
export * from './components/*'

// Hooks
export * from './hooks/*'
```

## 🔍 Usage Examples

### Basic Button

```tsx
import { Button } from '@workspace/ui/components/button'

<Button variant="default" size="lg">
  Click me
</Button>
```

### Form with Validation

```tsx
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Button } from '@workspace/ui/components/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email(),
})

function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

### Dialog with Form

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@workspace/ui/components/dialog'
import { Button } from '@workspace/ui/components/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

## 🎨 Customization

### Tailwind Configuration

The package includes Tailwind CSS configuration optimized for the components.

### Component Variants

Many components support variants through `class-variance-authority`:

```tsx
// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

## 📦 Dependencies

### Core Dependencies

- `react`: ^19.1.1
- `react-dom`: ^19.1.1
- `@radix-ui/*`: Various Radix UI primitives
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^3.3.1

### Form Dependencies

- `react-hook-form`: ^7.62.0
- `@hookform/resolvers`: ^5.2.1
- `zod`: ^3.25.76

### Icon Dependencies

- `lucide-react`: ^0.475.0

### Development Dependencies

- `@types/react`: ^19.1.9
- `@types/react-dom`: ^19.1.7
- `tailwindcss`: ^4.1.11
- `typescript`: ^5.9.2

## 🔍 Troubleshooting

### Common Issues

1. **Styling Issues**: Ensure Tailwind CSS is properly configured
2. **Type Errors**: Check TypeScript configuration
3. **Component Not Found**: Verify import paths and exports

### Debug Mode

Enable debug logging by setting `DEBUG=true` in your environment variables.

## 📚 Documentation

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)
