import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:5001',
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  integrations: [tailwind()],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
      hmr: {
        clientPort: 443,
        port: 5000
      },
      strictPort: false,
      cors: true,
      // Allow the Replit domain to access the server
      allowedHosts: ['localhost', '*.replit.dev', '*.worf.replit.dev', '*.repl.co', '*.replit.app', 'all']
    }
  }
});