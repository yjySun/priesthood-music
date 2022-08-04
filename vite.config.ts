import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { injectHtml } from 'vite-plugin-html'
import path from 'path'
import { wrapperEnv } from './build/vite/utils'
import { createProxy } from './build/vite/proxy'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_BASE_URL, VITE_PORT, VITE_PROXY, VITE_GLOB_TITLE } = viteEnv
  return {
    base: VITE_BASE_URL,
    plugins: [
      vue({ reactivityTransform: true }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      injectHtml({
        data: {
          title: VITE_GLOB_TITLE
        }
      })
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: true,
      // proxy: createProxy(VITE_PROXY)
      proxy: {
        '/api': {
          target: 'https://priesthood-music-1jd9vpdgg-yjysun.vercel.app',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/assets/css/global-variable.scss";'
        }
      }
    }
  }
}
