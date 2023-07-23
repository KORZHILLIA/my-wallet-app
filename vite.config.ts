import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      helpers: '/src/helpers',
      modules: '/src/modules',
      service: '/src/service',
      // process: "process/browser",
      // stream: "stream-browserify",
      // zlib: "browserify-zlib",
      // util: 'util',
      web3: '/node_modules/web3/dist/web3.min.js',
    },
  },
})
