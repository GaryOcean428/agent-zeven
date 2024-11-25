import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript'
        ],
        plugins: ['@babel/plugin-transform-runtime'],
        babelrc: false,
        configFile: false
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
  }
});