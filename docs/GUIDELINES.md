# Project Guidelines

## Summary

This project is a sophisticated multi-agent AI system built with modern web technologies. It features a modular architecture with specialized agents working together through a Mixture of Agents (MoA) approach.

### Key Technical Specifications

- Frontend: React 18+ with TypeScript and Tailwind CSS
- Build System: Vite for fast development and optimized production builds
- UI Components: Custom component library with dark mode support
- API Integration: Multiple AI model providers (Groq, X.AI, Perplexity)
- State Management: React Context + Hooks for scalable state management
- Testing: Comprehensive testing suite with unit, integration, and E2E tests
- Documentation: Extensive markdown documentation and JSDoc comments

### Development Focus

- Type-safe development with TypeScript
- Component-based architecture
- Responsive and accessible design
- Performance optimization
- Secure API handling
- Comprehensive testing
- Clear documentation

## Technology Stack

### Core Technologies

- Framework: React 18+ with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS
- State Management: React Context + Hooks
- Package Manager: npm
- Node Version: 18.0.0+

### File Extensions

- `.tsx` for React components with TypeScript
- `.ts` for TypeScript files
- `.css` for stylesheets
- `.json` for configuration files
- `.md` for documentation
- `.env` for environment variables

## Project Structure

```plaintext
project/
├── src/
│   ├── components/        # React components
│   ├── lib/              # Core functionality
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles and Tailwind
│   └── utils/            # Utility functions
├── public/               # Static assets
└── docs/                 # Documentation
```

## Coding Standards

### TypeScript

- Strict mode enabled
- Explicit type definitions
- Interface over type when possible
- Proper error handling
- Async/await over promises

### React

- Functional components
- Custom hooks for logic reuse
- Proper prop typing
- Memoization when needed
- Error boundaries

### CSS/Tailwind

- Use Tailwind utility classes
- Custom classes in components/
- Dark mode support
- Responsive design
- CSS variables for theming

## Component Guidelines

### Naming Conventions

- Components: PascalCase (e.g., `ChatPanel.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Types/Interfaces: PascalCase (e.g., `UserProfile.ts`)

### Component Structure

```typescript
import { type FC } from 'react';
import { useCallback, useState } from 'react';

interface ComponentProps {
  // Props definition
}

export const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  );
};
```

## API Integration

### Error Handling

```typescript
try {
  await apiCall();
} catch (error) {
  if (error instanceof AppError) {
    // Handle application errors
  } else {
    // Handle unknown errors
  }
}
```

### API Response Types

```typescript
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

## State Management

### Context Structure

```typescript
interface State {
  // State definition
}

interface Actions {
  // Action definitions
}

const Context = createContext<{
  state: State;
  actions: Actions;
}>(initialValue);
```

## Testing

### Test Files

- `.test.ts` for unit tests
- `.spec.ts` for integration tests
- `.e2e.ts` for end-to-end tests

### Testing Guidelines

- Unit tests for utilities
- Integration tests for components
- E2E tests for critical paths
- Mock external dependencies

## Documentation

### Code Documentation

- JSDoc for functions and components
- Inline comments for complex logic
- README files for directories
- Type definitions as documentation

### Markdown Standards

- Clear headings
- Code examples
- Links to references
- Updated regularly

## Performance

### Optimization Techniques

- Code splitting
- Lazy loading
- Image optimization
- Memoization
- Debouncing/throttling

### Monitoring

- Lighthouse scores
- Bundle size
- Load times
- Memory usage

## Security

### Best Practices

- Input validation
- API key protection
- XSS prevention
- CSRF protection
- Secure headers

## Environment Variables

### Required Variables

```plaintext
VITE_API_URL=api_url
VITE_GITHUB_TOKEN=github_token
VITE_XAI_API_KEY=xai_api_key
VITE_GROQ_API_KEY=groq_api_key
VITE_PERPLEXITY_API_KEY=perplexity_api_key
```

## Git Workflow

### Branch Naming

- feature/feature-name
- fix/bug-description
- docs/documentation-update
- refactor/refactor-description

### Commit Messages

```plaintext
type(scope): description

- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code restructuring
- test: adding tests
- chore: maintenance
```

## Dependencies

### Core Dependencies

```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "lucide-react": "^0.300.0",
  "vite": "^5.0.0"
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.0.0",
  "@types/node": "^20.0.0",
  "@typescript-eslint/eslint-plugin": "^6.0.0",
  "@typescript-eslint/parser": "^6.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

## IDE Configuration

### VSCode Settings

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

### Recommended Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Error Lens

## Build and Deployment

### Development

```bash
# Windows PowerShell
npm run dev

# Linux/macOS
npm run dev
```

### Production

```bash
# Windows PowerShell
npm run build
npm run preview

# Linux/macOS
npm run build
npm run preview
```

### Environment Configurations

- Development: `.env.development`
- Production: `.env.production`
- Testing: `.env.test`
