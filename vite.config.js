import { resolve } from 'path';
import glob from 'glob';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import 'module-alias/register'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [reactRefresh(), legacy({
    target: 'es2015',
    polyfills: ['es.promise'],
    modernPolyfills: ['es.promise']
  })],
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
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#6236FF',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    },
    postcss: {
      plugins: process.env.NODE_ENV === 'production' ?  [
        require('autoprefixer'),
      ] : []
    },
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
      'react-dom',
      // "animejs",
      // 'lodash',
      // 'whatwg-fetch',
      // 'ahooks',
      // 'antd',
    ],
  }
})
