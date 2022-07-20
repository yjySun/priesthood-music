import { RouteRecordRaw } from 'vue-router'
import { Layout } from '@/router/constant'
import { Star } from '@element-plus/icons-vue'
import { renderIcon } from '@/utils/icon'

/**
 * @param name 路由名称, 必须设置, 且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.subMenu 是否有子级菜单，默认false
 * @param meta.groupMenu 是否为分组菜单，默认false
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/my-music',
    name: 'my-music',
    redirect: '/my-music/recent-play',
    component: Layout,
    meta: {
      title: '我的音乐',
      sort: 4,
      groupMenu: true
    },
    children: [
      {
        path: 'recent-play',
        name: 'recent-play',
        meta: {
          title: '最近播放',
          icon: renderIcon('icon-bofangjilu')
        },
        component: () => import('@/views/discover/recommend/index.vue')
      },
      {
        path: 'cloud',
        name: 'cloud',
        meta: {
          title: '我的音乐云盘',
          icon: renderIcon('icon-yun')
        },
        component: () => import('@/views/discover/recommend/index.vue')
      },
      {
        path: 'icon-yun',
        name: 'icon-yun',
        meta: {
          title: '我的收藏',
          icon: renderIcon(Star)
        },
        component: () => import('@/views/discover/recommend/index.vue')
      }
    ]
  }
]

export default routes
