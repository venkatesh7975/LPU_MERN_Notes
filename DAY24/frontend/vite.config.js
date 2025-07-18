import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // important for Vercel
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  define: {
    // Make environment variables available to the client
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
  },
  server: {
    port: 5173,
    host: true
  }
})
