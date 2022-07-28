<template>
  <div class="aside-menu">
    <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
      <MenuTree :menuOptions="state.menuOptions" />
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
  import { PageEnum } from '@/enums/pageEnum'
  import { MenuOption } from './type'
  import { generatorDynamicMenu } from '@/router/generator-router'
  import MenuTree from './MenuTree.vue'

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME,
    menuOptions: []
  })

  onMounted(() => {
    getMenuList()
  })

  /**
   * @description: 获取菜单数据
   * @return {*}
   */
  const getMenuList = () => {
    generatorDynamicMenu().then((res) => {
      state.menuOptions = res
    })
  }

  const { proxy } = getCurrentInstance()

  proxy.$bus.on('haveLogin', () => {
    console.log('nihao');
    
    getMenuList()
  })
</script>
<style lang="scss"></style>
