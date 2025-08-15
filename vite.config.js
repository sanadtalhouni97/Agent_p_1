import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Agent_p_1/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  optimizeDeps: {
    include: ['three', 'gsap']
  },
  // Add SPA fallback for routing
  preview: {
    port: 3000
  }
});
