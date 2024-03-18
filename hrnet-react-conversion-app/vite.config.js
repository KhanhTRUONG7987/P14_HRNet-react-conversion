import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  base: '/P14_HRNet-react-conversion/', 
  plugins: [react()],
  build: {
    outDir: 'dist', 
    emptyOutDir: true, // This will ensure that the dist directory is emptied before each build
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), 
    },
  },
});
