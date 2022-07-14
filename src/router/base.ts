import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

export const BaseRoutes: RouteRecordRaw[] = [RootRoute]
