import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupElementPlusIcon, setupMitt } from '@/plugins'

async function bootstrap() {
  const app = createApp(App)

  //挂载通信总线
  setupMitt(app)

  // 挂载状态管理
  setupStore(app)

  //加载elementPlus图标
  setupElementPlusIcon(app)

  // 挂载路由
  await setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  app.mount('#app', true)
}

void bootstrap()
