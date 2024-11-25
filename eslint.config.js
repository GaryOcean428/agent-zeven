import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import * as tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import vitestPlugin from "eslint-plugin-vitest";

const compat = new FlatCompat();

export default [
  // Global configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "import": importPlugin
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.config({
    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ]
  }),

  // Testing configuration
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    plugins: {
      "vitest": vitestPlugin
    },
    rules: {
      "vitest/expect-expect": "error",
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/valid-expect": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off"
    },
    globals: {
      ...globals.jest
    }
  },

  // Custom rules
  {
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_"
      }],
      "@typescript-eslint/no-non-null-assertion": "warn",

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import rules
      "import/no-unresolved": "off",
      "import/order": ["warn", {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "@/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "newlines-between": "always"
      }],

      // General rules
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "warn",
      "no-unused-expressions": "warn",
      "no-duplicate-imports": "error",

      // Project-specific rules
      "camelcase": ["error", { 
        allow: ["api_key", "access_token", "refresh_token"] 
      }],
      "max-len": ["warn", { 
        code: 100,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }]
    }
  }
];