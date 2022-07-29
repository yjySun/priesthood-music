import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'

/**
 * @param name 路由名称, 必须设置, 且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.subMenu 是否有子级菜单，默认false
 * @param meta.groupMenu 是否为分组菜单，默认false
 * @param meta.sort 排序越小越排前
 * @param meta.loginVisible 登录显示, 默认false
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/fm',
    name: 'fm',
    redirect: '/fm/personal_fm',
    component: Layout,
    meta: {
      title: '私人FM',
      sort: 3
    },
    children: [
      {
        path: 'personal_fm',
        name: 'personal_fm',
        meta: {
          title: '私人FM'
        },
        component: () => import('@/components/MusicList/index.vue')
      }
    ]
  }
]

export default routes
