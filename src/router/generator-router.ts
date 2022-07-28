import { VNode } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { moduleRoutes } from './index'
import { MenuOption, SubMenuOption, MenuGroupOption, MenuItemOption } from '@/layout/components/Menu/type'
import { getLoginStatus } from '@/api/login'

/**
 * @description: 动态生成菜单
 * @return {*}
 */
export const generatorDynamicMenu = () => {
  const loginStatus: boolean = isLogin()
  let menuOptions: MenuOption[] = []

  moduleRoutes.forEach((moduleRoute) => {
    menuOptions.push(generatorAnyMenu(moduleRoute, loginStatus))
  })

  return menuOptions
}

/**
 * @description: 递归生成数据
 * @param {RouteRecordRaw} route
 * @return {MenuOption}
 */
function generatorAnyMenu(route: RouteRecordRaw, loginStatus: boolean): MenuOption {
  let menuOption: MenuOption = {}

  if (!route.meta?.loginVisible || route.meta?.loginVisible == false) {
    //不需要登录显示menu
    if (route.meta?.subMenu && route.meta?.subMenu === true) {
      let subMenu: SubMenuOption = {
        key: null,
        title: null,
        path: null,
        icon: null,
        children: null
      }

      subMenu.key = <string>route.path
      subMenu.title = <string>route.meta?.title
      subMenu.path = <string>route.path
      subMenu.icon = <VNode>route.meta?.icon
      if (route.children) {
        let children = []
        route.children.forEach((item) => {
          children.push(generatorAnyMenu(item, loginStatus))
        })
        subMenu.children = children
      }

      menuOption = subMenu
    } else if (route.meta?.groupMenu && route.meta?.groupMenu === true) {
      let groupMenu: MenuGroupOption = {
        type: null,
        key: null,
        title: null,
        children: null
      }

      groupMenu.type = 'group'
      groupMenu.key = <string>route.path
      groupMenu.title = <string>route.meta?.title
      if (route.children) {
        let children = []
        route.children.forEach((item) => {
          children.push(generatorAnyMenu(item, loginStatus))
        })
        groupMenu.children = children
      }

      menuOption = groupMenu
    } else {
      let itemMenu: MenuItemOption = {
        key: null,
        title: null,
        path: null,
        icon: null
      }

      itemMenu.key = <string>route.path
      itemMenu.title = <string>route.meta?.title
      itemMenu.path = <string>route.path
      itemMenu.icon = <VNode>route.meta?.icon

      menuOption = itemMenu
    }
  } else {
    //需要登录才能显示
    if (loginStatus) {
      //用户已经登录
    } else {
      //用户未登录
    }
  }

  return menuOption
}

/**
 * @description: 判断登录状态
 * @return {boolean}
 */
function isLogin(): boolean {
  let loginStatus: boolean = false
  getLoginStatus().then((res) => {
    loginStatus = !!res.profile ? true : false
  })

  return loginStatus
}
