<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item :index="item.path" :key="i" v-for="(item, i) in moduleRoutes">
      <el-icon><icon-menu /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
  import { moduleRoutes } from '@/router/index'

  console.log(moduleRoutes)
</script>
<style scoped></style>
