import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tailwindcss(),
  ],
  server: {
    port: 5173,      // Replace with your desired port
    strictPort: true // Force Vite to fail if the port is busy instead of defaulting to 5174
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});

