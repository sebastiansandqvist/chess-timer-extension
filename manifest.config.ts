import { defineManifest } from '@crxjs/vite-plugin';
import { version } from './package.json';

export default defineManifest((env) => ({
  manifest_version: 3,
  name: env.mode === 'development' ? '[d] chess timer' : 'chess timer',
  version,
  version_name: version,
  icons: {
    16: 'icon-16.png',
    32: 'icon-32.png',
    64: 'icon-64.png',
    128: 'icon-128.png',
  },
  description: 'Floating timers for chess.com',
  minimum_chrome_version: '116',
  permissions: [],
  content_scripts: [
    {
      matches: ['*://chess.com/*', '*://www.chess.com/*'],
      js: ['src/index.ts'],
    },
  ],
}));
