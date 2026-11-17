import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const api = process.env.DAILIES_API_URL ?? 'http://127.0.0.1:4100';

export default defineConfig({
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom', 'remotion'] },
  server: {
    port: 5173,
    strictPort: true,
    proxy: { '/api': { target: api, changeOrigin: true } },
    // Workspaces are written by Claude Code at runtime and loaded through the API, not through Vite.
    watch: { ignored: ['**/workspaces/**'] },
  },
  preview: { port: 5173, proxy: { '/api': { target: api, changeOrigin: true } } },
  build: { target: 'es2020', chunkSizeWarningLimit: 1500 },
});
