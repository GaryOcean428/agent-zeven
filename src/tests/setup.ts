import '@testing-library/jest-dom';
import type {} from '@testing-library/jest-dom/extend-expect';

// Add any global test setup here
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}; 