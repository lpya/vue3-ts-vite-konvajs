import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      views: path.resolve(__dirname, 'src/views'),
      interface: path.resolve(__dirname, 'src/interface'),
      components: path.resolve(__dirname, 'src/components')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables";'
      }
    }
  },
  server: {
    port: 30001,
  }
})
