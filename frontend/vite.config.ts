import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    proxy: {
      '/owapi': {
        target: 'https://rpc.online.ntnu.no',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/owapi/, ''),
      }
    },
  },
});
