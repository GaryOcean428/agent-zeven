import { validateEnv } from './env';

try {
  const env = validateEnv();
  // Use env safely with type checking
} catch (error) {
  // Handle configuration errors gracefully
  console.error('Environment configuration error:', error);
}