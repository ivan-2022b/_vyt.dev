import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/_vyt.dev',  // add this line - must match your repo name!
  server: {
    proxy: {
      // proxy API requests to the ASP.NET Core backend
      '/weatherforecast': {
        target: 'http://localhost:5217', // backend's HTTPS URL
        secure: false, // disables SSL certificate validation
        changeOrigin: true
      }
    }
  }
})
