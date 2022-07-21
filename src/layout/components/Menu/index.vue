<template>
  <div class="aside-menu">
    <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
      <MenuTree :menuOptions="menuOptions" />
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { PageEnum } from '@/enums/pageEnum'
  import { MenuOption } from './type'
  import { generatorDynamicMenu } from '@/router/generator-router'
  import MenuTree from './MenuTree.vue'

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME
  })

  const menuOptions: ref<MenuOption[]> = generatorDynamicMenu()
</script>
<style lang="scss">
  @import './menu-element.scss';
</style>
