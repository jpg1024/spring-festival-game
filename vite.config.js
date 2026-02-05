import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 开发环境使用根路径，生产环境使用 GitHub Pages 路径
  const base = mode === 'development' ? '/' : '/spring-festival-game/'
  
  return {
    plugins: [vue()],
    base: base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vant': ['vant'],
            'vue-vendor': ['vue', 'vue-router', 'pinia']
          }
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: true
    }
  }
})
