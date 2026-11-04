import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function chatApiPlugin() {
  return {
    name: 'chat-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res, next) => {
        try {
          const { default: handler } = await import('./api/chat.js');
          await handler(req, res);
        } catch (err) {
          console.error('Dev chat API error:', err);
          next(err);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), chatApiPlugin()],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
