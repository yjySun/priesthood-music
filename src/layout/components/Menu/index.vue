<template>
  <!-- <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
    <el-menu-item :index="item.path" :key="i" v-for="(item, i) in moduleRoutes">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu> -->
  <YMenu :options="state.menuOptions" />
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { moduleRoutes } from '@/router/index'
  import { PageEnum } from '@/enums/pageEnum'
  // import { MenuOption } from '../../../utils/menu/type'
  import { generateMenu, renderIcon, YMenu } from '@/utils/menu'
  import { MenuOption } from '@/utils/menu/type'

  console.log(moduleRoutes)

  // const Menu = generateMenu()

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME,
    menuOptions: [
      {
        label: '发现音乐',
        index: '/discover',
        icon: renderIcon('icon-bofang'),
        children: {
          type: 'group'
        }
      }
    ]
  })

  const menuOptions: ref<MenuOption[]> = [
    {
      label: '且听风吟',
      key: 'hear-the-wind-sing',
      icon: renderIcon(BookIcon)
    },
    {
      label: '1973年的弹珠玩具',
      key: 'pinball-1973',
      icon: renderIcon(BookIcon),
      disabled: true,
      children: [
        {
          label: '鼠',
          key: 'rat'
        }
      ]
    },
    {
      label: '寻羊冒险记',
      key: 'a-wild-sheep-chase',
      icon: renderIcon(BookIcon),
      disabled: true
    },
    {
      label: '舞，舞，舞',
      key: 'dance-dance-dance',
      icon: renderIcon(BookIcon),
      children: [
        {
          type: 'group',
          label: '人物',
          key: 'people',
          children: [
            {
              label: '叙事者',
              key: 'narrator',
              icon: renderIcon(PersonIcon)
            },
            {
              label: '羊男',
              key: 'sheep-man',
              icon: renderIcon(PersonIcon)
            }
          ]
        },
        {
          label: '饮品',
          key: 'beverage',
          icon: renderIcon(WineIcon),
          children: [
            {
              label: '威士忌',
              key: 'whisky'
            }
          ]
        },
        {
          label: '食物',
          key: 'food',
          children: [
            {
              label: '三明治',
              key: 'sandwich'
            }
          ]
        },
        {
          label: '过去增多，未来减少',
          key: 'the-past-increases-the-future-recedes'
        }
      ]
    }
  ]
</script>
<style scoped></style>
