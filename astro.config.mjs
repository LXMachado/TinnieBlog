import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5001,
  },
  integrations: [tailwind()],
  vite: {
    server: {
      hmr: {
        clientPort: 5001,
        port: 5001,
      },
      strictPort: false,
      cors: true
    }
  }
});