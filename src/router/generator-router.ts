import { VNode } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { moduleRoutes } from './index'
import { MenuOption, SubMenuOption, MenuGroupOption, MenuItemOption } from '@/layout/components/Menu/type'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const { getIsLogin } = storeToRefs(userStore)
const loginStatus = getIsLogin

/**
 * @description: 动态生成菜单
 * @return {*}
 */
export const generatorDynamicMenu = () => {
  let menuOptions: MenuOption[] = []

  moduleRoutes.forEach((moduleRoute) => {
    menuOptions.push(generatorAnyMenu(moduleRoute))
  })

  return menuOptions
}

/**
 * @description: 递归生成数据
 * @param {RouteRecordRaw} route
 * @return {MenuOption}
 */
function generatorAnyMenu(route: RouteRecordRaw): MenuOption {
  let menuOption: MenuOption = {}

  if (!route.meta?.loginVisible || route.meta?.loginVisible == false) {
    menuOption = generateItem(route, menuOption)
  } else {
    //需要登录才能显示
    if (loginStatus) {
      //用户已经登录
      menuOption = generateItem(route, menuOption)
    }
  }

  return menuOption
}

/**
 * @description: 生成菜单数据具体实现
 * @param {RouteRecordRaw} route
 * @param {MenuOption} menuOption
 * @return {*}
 */
function generateItem(route: RouteRecordRaw, menuOption: MenuOption): MenuOption {
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
        children.push(generatorAnyMenu(item))
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
        children.push(generatorAnyMenu(item))
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

  return menuOption
}
