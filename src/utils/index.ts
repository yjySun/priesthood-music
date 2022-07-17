import { h, VNode } from 'vue'
import { DefineComponent } from 'vue'
import { ElIcon } from 'element-plus'

type IconType =
  | string
  | DefineComponent<
      {},
      {},
      {},
      import('vue').ComputedOptions,
      import('vue').MethodOptions,
      import('vue').ComponentOptionsMixin,
      import('vue').ComponentOptionsMixin,
      {},
      string,
      import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
      Readonly<import('vue').ExtractPropTypes<{}>>,
      {}
    >

type ElementIconParams =
  | {
      color: string
      size: string | number
    }
  | {}
  | null

/**
 * render 图标
 * */
export function renderIcon(icon: IconType, params?: ElementIconParams, className?: string[]): VNode {
  let node: VNode = null
  let generateClassName: string = ''
  params = !!params ? params : {}

  if (className) {
    generateClassName = className.join(' ')
  }

  if (typeof icon === 'string') {
    node = h('i', { class: generateClassName.concat(' iconfont '.concat(icon)) }, { default: () => h(icon) })
  }

  if (typeof icon === 'object') {
    node = h(ElIcon, { class: generateClassName, ...params }, { default: () => h(icon) })
  }

  return node
}
