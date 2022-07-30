<template>
  <div class="title-tag">{{ value }}</div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    value: boolean
  }>()
</script>
<style lang="scss">
  .title-tag {
    display: inline-block;
    font-size: 12px;
    color: #ec4141;
    border: 1px solid #ec4141;
    padding: 1px 2px;
    border-radius: 2px;
  }
</style>
