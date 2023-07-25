import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assets: '/src/assets',
      constants: '/src/constants',
      helpers: '/src/helpers',
      modules: '/src/modules',
      service: '/src/service',
      shared: '/src/shared',
      styles: '/src/styles',
      web3: '/node_modules/web3/dist/web3.min.js',
    },
  },
})
