<template>
  <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
    <MenuTree :menuOptions="menuOptions" />
  </el-menu>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { moduleRoutes } from '@/router/index'
  import { PageEnum } from '@/enums/pageEnum'
  import { renderIcon } from '@/utils/icon'
  import { MenuOption } from './type'
  import { Search } from '@element-plus/icons-vue'
  import MenuTree from './MenuTree.vue'

  console.log(moduleRoutes)

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME
  })

  const menuOptions: ref<MenuOption[]> = [
    {
      label: '且听风吟',
      index: '/discover',
      key: '1',
      icon: renderIcon(Search),
      disabled: true
    },
    {
      label: '1973年的弹珠玩具',
      icon: renderIcon('icon-skin'),
      index: '/dis',
      disabled: true,
      key: '2',
      children: [
        {
          key: '2-1',
          label: '鼠',
          index: '/dis'
        }
      ]
    },
    {
      label: '寻羊冒险记',
      icon: renderIcon('icon-skin'),
      index: '/discover',
      disabled: true,
      key: '3'
    },
    {
      label: '舞，舞，舞',
      icon: renderIcon('icon-skin'),
      index: '/discover',
      key: '4',
      children: [
        {
          type: 'group',
          label: '人物',
          key: '4-1',
          children: [
            {
              index: '/discover',
              key: '4-1-1',
              label: '叙事者',
              icon: renderIcon('icon-skin')
            },
            {
              index: '/discover',
              label: '羊男',
              key: '4-1-2',
              icon: renderIcon('icon-skin')
            }
          ]
        },
        {
          index: '/discover',
          label: '饮品',
          icon: renderIcon('icon-skin'),
          key: '5',
          children: [
            {
              index: '/discover',
              key: '5-1',
              label: '威士忌',
              key: 'whisky'
            }
          ]
        },
        {
          index: '/discover',
          label: '食物',
          key: '6',
          children: [
            {
              key: '6-1',
              label: '三明治',
              index: '/discover'
            }
          ]
        },
        {
          index: '/discover',
          label: '过去增多，未来减少',
          key: '7'
        }
      ]
    }
  ]
</script>
<style scoped></style>
