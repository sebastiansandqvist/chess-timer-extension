import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';
import { version } from './package.json';

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    target: 'esnext',
  },
  define: {
    'import.meta.env.VERSION': JSON.stringify(version),
  },
});
