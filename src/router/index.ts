import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { BaseRoutes } from './base'

const allRouteList: RouteRecordRaw[] = []
const routeModuleList: RouteRecordRaw[] = []

const modules = import.meta.globEager('./modules/**/*.ts')

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}

routeModuleList.sort(sortRoute)

allRouteList.push(...BaseRoutes, ...routeModuleList)

const router = createRouter({
  history: createWebHashHistory(),
  routes: allRouteList,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App) {
  app.use(router)
}

export default router

export const moduleRoutes: RouteRecordRaw[] = [...routeModuleList]
