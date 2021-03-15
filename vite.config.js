import { resolve } from 'path';
import glob from 'glob';
import fs from 'fs';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import lessToJS from 'less-vars-to-js'
import 'module-alias/register'

const themeVariables = lessToJS(
  fs.readFileSync(resolve(__dirname, './src/style/antd.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [
    reactRefresh(),
    legacy({
      target: 'es2015',
      polyfills: ['es.promise'],
      modernPolyfills: ['es.promise']
    }),
  ],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: glob.sync('src/**/*.html'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: themeVariables,
        javascriptEnabled: true
      }
    },
    postcss: process.cwd()
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
      "animejs",
      'lodash',
      'whatwg-fetch',
      'ahooks',
      // 'antd',
    ],
  }
})
