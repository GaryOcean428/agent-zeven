/// <reference types="@testing-library/jest-dom" />

// This file is needed to make the jest-dom matchers available in tests
// It re-exports everything from @testing-library/jest-dom
export {};

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  }
}
