import { resolve } from 'path';
import glob from 'glob';
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
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('src/**/*.html')
    }
  },
  server:{
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://dev-api.qimiao.com/',
        changeOrigin: true
      },
      '/tools': {
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
