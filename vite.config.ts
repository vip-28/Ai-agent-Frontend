import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker when new content is available.
      devOptions: {
        enabled: true, // Enables PWA functionality in development mode.
      },
      manifest: {
        name: 'My PWA App', // Full name of the app.
        short_name: 'PWA App', // Short name for display.
        description: 'A PWA built with React and Vite', // Description of the app.
        theme_color: '#ffffff', // Theme color for the app.
        background_color: '#ffffff', // Background color of the splash screen.
        display: 'standalone', // Ensures it runs in a standalone window (not a browser tab).
        start_url: '/', // The entry point when launched from the home screen.
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50, // Store up to 50 assets.
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache them for 30 days.
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'image',
            handler: 'StaleWhileRevalidate', // Serve from cache first but update in the background.
            options: {
              cacheName: 'image-cache',
            },
          },
        ],
      },
    }),
  ],
})
