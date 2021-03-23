import { resolve } from 'path';
import glob from 'glob';
import fs from 'fs';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import lessToJS from 'less-vars-to-js'
import 'module-alias/register'
import handlebars from 'vite-plugin-handlebars';

const themeVariables = lessToJS(
  fs.readFileSync(resolve(__dirname, './src/style/antd.less'), 'utf8')
)

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [
    reactRefresh(),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials/'),
    }),
    // legacy({
    //   targets: ['defaults', 'ie 11'],
    //   polyfills: ['es.promise', 'es.promise.finally', 'es.promise.all-settled'],
    // }),
  ],
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  build: {
    manifest: true,
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
