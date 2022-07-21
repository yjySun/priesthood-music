import { VNode } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { moduleRoutes } from './index'
import { MenuOption, SubMenuOption, MenuGroupOption, MenuItemOption } from '@/layout/components/Menu/type'

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
  let menuOption: MenuOption = null

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
