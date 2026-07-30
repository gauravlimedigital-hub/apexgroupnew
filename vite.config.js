import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'next/link': resolve(__dirname, './src/stubs/next-link.jsx'),
      'next/navigation': resolve(__dirname, './src/stubs/next-navigation.js')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        landing: 'landing.html'
      }
    }
  }
});
