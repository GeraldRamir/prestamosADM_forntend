import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'logo-72.png',
        'logo-120.png',
        'logo-128.png',
        'logo-144.png',
        'logo-152.png',
        'logo-196.png',
      ],
      injectRegister: 'auto',
      devOptions: {
        enabled: false,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // ← Este valor resuelve tu error
      },
      manifest: {
        name: 'Prestamos-ja',
        short_name: 'Prestamos-ja',
        start_url: '/',
        display: 'standalone',
        background_color: '#658c78',
        theme_color: '#658c78',
        orientation: 'portrait-primary',
        icons: [
          { src: '/logo-72.png', type: 'image/png', sizes: '72x72' },
          { src: '/logo-120.png', type: 'image/png', sizes: '120x120' },
          { src: '/logo-128.png', type: 'image/png', sizes: '128x128' },
          { src: '/logo-144.png', type: 'image/png', sizes: '144x144' },
          { src: '/logo-152.png', type: 'image/png', sizes: '152x152' },
          { src: '/logo-196.png', type: 'image/png', sizes: '196x196' },
        ],
      },
    }),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    sourcemap: true,
  },
});
