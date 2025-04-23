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
        'logo-128.png', // renombrado (sugiero evitar paréntesis)
        'logo-144.png',
        'logo-152.png',
        'img/loco-192.png'
      ],
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000
      },
      manifest: {
        name: 'Prestamos-jaa',
        short_name: 'PJA',
        start_url: '.',
        display: 'standalone',
        background_color: '#658c78',
        theme_color: '#658c78',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/logo-72.png',
            type: 'image/png',
            sizes: '72x72'
          },
          {
            src: '/logo-120.png',
            type: 'image/png',
            sizes: '120x120'
          },
          {
            src: '/logo-128.png',
            type: 'image/png',
            sizes: '128x128'
          },
          {
            src: '/logo-14.png',
            type: 'image/png',
            sizes: '144x144'
          },
          {
            src: '/logo-152.png',
            type: 'image/png',
            sizes: '152x152'
          },
          {
            src: '/logo-192.png',
            type: 'image/png',
            sizes: '192x192'
          }
        ]
      }
    })
  ],

  // 🔍 Source maps en desarrollo
  build: {
    sourcemap: true
  },

  // 🔧 Source maps en modo dev
  server: {
    sourcemap: true
  }
});
