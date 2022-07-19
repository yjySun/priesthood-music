<template>
  <Icon />
</template>
<script lang="ts" setup>
  import { defineProps, VNode } from 'vue'

  const props = defineProps<{
    iconNode: VNode
  }>()

  const Icon = props.iconNode
</script>
<style scoped></style>
