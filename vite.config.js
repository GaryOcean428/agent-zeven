"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="vitest" />
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        (0, plugin_react_1.default)({
            babel: {
                plugins: [],
                presets: ['@babel/preset-react', '@babel/preset-typescript'],
                babelrc: false,
                configFile: false,
            }
        })
    ],
    resolve: {
        alias: {
            '@': path_1.default.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom'],
                    'ui': ['@/components/ui']
                }
            }
        }
    },
    optimizeDeps: {
        include: ['tailwindcss-animate']
    },
    server: {
        hmr: {
            overlay: true
        }
    },
    server: {
        hmr: {
            overlay: true
        }
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        globals: true
    }
});
