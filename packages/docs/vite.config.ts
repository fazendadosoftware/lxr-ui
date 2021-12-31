import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3333
  },
  base: process.env.NODE_ENV === 'production' ? '/lxr-ui/' : '/'
})
