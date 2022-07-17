<template>
  <div>
    个性推荐

    <iCon />
  </div>
</template>
<script lang="ts" setup>
  import { h, render } from 'vue'
  import { renderIcon } from '@/utils/index'
  import { Search } from '@element-plus/icons-vue'
  
  const iCon = renderIcon('icon-arrow-left-bold', null, ['aa', 'bb'])
</script>
<style scoped></style>
