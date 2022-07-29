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
    path: '/video',
    name: 'video',
    redirect: '/video/video',
    component: Layout,
    meta: {
      title: '视频',
      sort: 2,
      subMenu: false
    },
    children: [
      {
        path: 'video',
        name: 'video',
        meta: {
          title: '视频'
        },
        component: () => import('@/components/MusicList/index.vue')
      },
      {
        path: 'mv',
        name: 'mv',
        meta: {
          title: 'MV'
        },
        component: () => import('@/components/MusicList/index.vue')
      }
    ]
  }
]

export default routes
