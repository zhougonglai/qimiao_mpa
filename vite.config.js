import { resolve } from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        download: resolve(__dirname, 'src/download.html'),
        support: resolve(__dirname, 'src/support.html'),
        about: resolve(__dirname, 'src/about.html'),
      }
    }
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://dev-api.qimiao.com/',
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom'
    ],
  }
})
