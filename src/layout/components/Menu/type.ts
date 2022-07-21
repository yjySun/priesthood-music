import { VNode } from 'vue'

export interface CommonOption {
  key: string
  title: string
  path: string
  icon?: VNode
}

export interface SubMenuOption extends CommonOption {
  children: (MenuGroupOption | MenuItemOption)[]
}

export interface MenuGroupOption {
  key: string
  type: string
  title: string
  children: MenuItemOption[]
}

export interface MenuItemOption extends CommonOption {
  route?: object
}

export type MenuOption = MenuItemOption | SubMenuOption | MenuGroupOption
