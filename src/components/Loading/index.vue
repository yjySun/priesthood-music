<template>
  <div class="custom-loading" v-loading="loading" element-loading-text="载入中...">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { $ref } from 'vue/macros'

  const props = defineProps<{
    loading: boolean
  }>()
</script>
<style lang="scss">
  .custom-loading {
    @include absolute-fill;

    .el-loading-spinner {
      .circular {
        $width: 25px;

        widows: $width !important;
        height: $width !important;
      }

      .path {
        stroke: #909399 !important;
      }

      .el-loading-text {
        color: #909399 !important;
      }
    }
  }
</style>
