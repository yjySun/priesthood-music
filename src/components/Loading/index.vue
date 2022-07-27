<template>
  <div class="custom-loading" v-loading="loading" element-loading-text="载入中...">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps, onMounted } from 'vue'
  import { $ref } from 'vue/macros'

  const props = defineProps<{
    loading: boolean
    marginTop: {
      type: string
      required: false
    }
  }>()
</script>
<style lang="scss">
  .custom-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

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
