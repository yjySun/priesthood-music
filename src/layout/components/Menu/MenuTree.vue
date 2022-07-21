<template>
  <template v-for="menuOption in props.menuOptions">
    <!-- 如果当前有子菜单，则显示 el-submenu ，在el-subment 里调用 递归组件 -->
    <el-sub-menu
      v-if="menuOption.children && menuOption.children.length > 0 && (!menuOption.type || menuOption.type !== 'group')"
      :index="menuOption.path"
      :key="menuOption.key"
    >
      <template #title>
        <Icon v-if="menuOption.icon" :iconNode="menuOption.icon" />
        <span class="sub-label">{{ menuOption.title }}</span>
      </template>

      <!-- 调用自身  此处是重点-->
      <MenuTreeChild :menuOptions="menuOption.children"></MenuTreeChild>
    </el-sub-menu>

    <el-menu-item-group
      v-else-if="menuOption.type && menuOption.type === 'group'"
      :key="menuOption.key"
      :title="menuOption.title"
    >
      <MenuTreeChild :menuOptions="menuOption.children"></MenuTreeChild>
    </el-menu-item-group>

    <!-- 如果没有子菜单，则显示当前内容 -->
    <el-menu-item v-else :index="menuOption.path" :key="menuOption.key">
      <Icon v-if="menuOption.icon" :iconNode="menuOption.icon" />
      <span class="item-label">{{ menuOption.title }}</span>
    </el-menu-item>
  </template>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'
  import { MenuOption } from './type'
  import MenuTreeChild from './MenuTree.vue'
  import Icon from './Icon.vue'

  const props = defineProps<{
    menuOptions: MenuOption
  }>()
</script>
<style scoped></style>
