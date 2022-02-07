import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteMarkdownPlugin from './viteMarkdownPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMarkdownPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
