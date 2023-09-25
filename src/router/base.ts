import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { PageEnum } from '@/enums/pageEnum'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

//不在菜单蓝内显示的router
const DailyRecommendRoute: RouteRecordRaw = {
  path: '/daily',
  name: 'daily',
  redirect: '/daily/daily-recommend',
  component: Layout,
  children: [
    {
      path: 'daily-recommend',
      name: 'daily-recommend',
      component: () => import('@/views/recommend-daily/index.vue')
    }
  ]
}

const SearchRoute: RouteRecordRaw = {
  path: '/search',
  name: 'search',
  redirect: '/search/search/:keywords',
  component: Layout,
  children: [
    {
      path: 'search/:keywords',
      name: 'search',
      component: () => import('@/views/search-list/index.vue')
    }
  ]
}

export const BaseRoutes: RouteRecordRaw[] = [RootRoute, DailyRecommendRoute, SearchRoute]
