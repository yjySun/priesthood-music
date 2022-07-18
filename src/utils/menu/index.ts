import { h, VNode } from 'vue'
import { DefineComponent } from 'vue'
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus'

interface ElementIconParams {
  color: string
  size: string | number
}

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

type Params = ElementIconParams | {} | null

/**
 * @description: render 图标
 * @param {IconType} icon 图标类型
 * @param {Params} params element图标参数
 * @param {string} className 类名
 * @return {VNode}
 */
export function renderIcon(icon: IconType, params?: Params, className?: string[]): VNode {
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

// export const generateMenu = (props, config): VNode => {
//   console.log('props', props)

//   // const options = props.options
//   // for (let item in props.options) {
//   //   console.log('item', item);

//   // }
//   return h(ElMenu, {}, { default: () => h(ElMenuItem, null, '你好') })
// }

/**
 * @description: 返回 ElMenu 组件
 * @param {*} props
 * @param {*} context
 * @return {VNode}
 */
export const YMenu = (props, context): VNode => {
  console.log('props', props.options[0])

  const options = props.options

  options.forEach((item: any) => {
    console.log('item', item.label)
  })
  // for (let item  options) {
  //   console.log('item', item.label)
  // }
  return h(ElMenu, {}, { default: () => h(ElMenuItem, null, '你好') })
}

/**
<el-menu-item index="3" disabled>
  <el-icon><document /></el-icon>
  <span>Navigator Three</span>
</el-menu-item> 
*/

function generateMenuItem() {
  return h(ElMenuItem, {}, {})
}
