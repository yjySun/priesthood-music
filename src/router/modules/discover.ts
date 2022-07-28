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
    path: '/discover',
    name: 'discover',
    redirect: '/discover/recommend',
    component: Layout,
    meta: {
      title: '发现音乐',
      sort: 1
    },
    children: [
      {
        path: 'recommend',
        name: 'recommend',
        meta: {
          title: '个性推荐'
        },
        component: () => import('@/views/discover/index.vue')
      },
      {
        path: 'song-list',
        name: 'song-list',
        meta: {
          title: '歌单'
        },
        component: () => import('@/views/discover/index.vue')
      },
      {
        path: 'ranking-list',
        name: 'ranking-list',
        meta: {
          title: '排行榜'
        },
        component: () => import('@/views/discover/index.vue')
      },
      {
        path: 'singer',
        name: 'singer',
        meta: {
          title: '歌手'
        },
        component: () => import('@/views/discover/index.vue')
      }
    ]
  }
]

export default routes
