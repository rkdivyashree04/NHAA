import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js') || id.includes('react-chartjs-2')) return 'chart-vendor';
            if (id.includes('lucide-react')) return 'lucide-vendor';
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            return 'vendor';
          }
        }
      }
    }
  }
})
