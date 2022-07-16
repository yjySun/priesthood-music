<template>
  <el-menu :default-active="state.defaultActive" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
    <el-menu-item :index="item.path" :key="i" v-for="(item, i) in moduleRoutes">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { moduleRoutes } from '@/router/index'
  import { PageEnum } from '@/enums/pageEnum'

  console.log(moduleRoutes)

  const state = reactive({
    defaultActive: PageEnum.BASE_HOME
  })
  
</script>
<style scoped></style>
