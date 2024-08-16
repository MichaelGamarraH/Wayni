import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        short_name: 'MyApp',
        description: 'My Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Permite acceso desde cualquier IP en la red local
    proxy: {
      '/api': {
        target: 'https://localhost:7154',  // Cambiar a 'https://localhost:7154' si usas HTTPS
        changeOrigin: true,
        secure: false,  // Para evitar problemas con certificados autofirmados
      },
    },
  }
});