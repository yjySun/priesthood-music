import type { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function setupElementPlusLocale(app: App<Element>) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
