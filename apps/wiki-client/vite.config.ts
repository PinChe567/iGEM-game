import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        hub: 'index.html',
        about: 'about/index.html',
        pixel: 'games/pixel/index.html',
        labyrinth: 'games/labyrinth/index.html',
        labyrinthValidator: 'games/labyrinth-validator/index.html',
        spectrum: 'games/spectrum/index.html',
        spectrumVisualizer: 'games/spectrum-visualizer/index.html',
      },
    },
  },
  server: {
    port: 5173,
  },
});
