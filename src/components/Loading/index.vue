<template>
  <div class="custom-loading" v-loading="loading" element-loading-text="载入中...">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps<{
    loading: boolean
  }>()
</script>
<style lang="scss"></style>
