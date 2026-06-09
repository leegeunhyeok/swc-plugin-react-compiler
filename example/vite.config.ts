import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import reactCompilerPlugin from 'swc-plugin-react-compiler';

export default defineConfig({
  plugins: [
    react({
      plugins: [[reactCompilerPlugin, { compilationMode: 'all' }]],
    }),
  ],
});
