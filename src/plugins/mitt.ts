import type { App } from 'vue'
import mitt from 'mitt'

export function setupMitt(app: App<Element>) {
  app.config.globalProperties.$bus = mitt()
}
