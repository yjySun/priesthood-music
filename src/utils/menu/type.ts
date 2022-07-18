import { VNode } from 'vue'

export interface CommonOption {
  label: string
  index: string
  icon?: VNode
}

export interface SubMenuOption extends CommonOption {
  children: MenuGroupOption | MenuItemOption
  'popper-class'?: string
  'show-timeout'?: number
  'hide-timeout'?: number
  disabled?: boolean
  'popper-offset'?: number
}

export interface MenuGroupOption {
  type: string
  label: string
  children: MenuItemOption
}

export interface MenuItemOption extends CommonOption {
  route?: object
  disabled?: boolean
}

export type MenuOption = MenuItemOption | SubMenuOption | MenuGroupOption
