<template>
  <Icon />
</template>
<script lang="ts" setup>
  import { VNode } from 'vue'

  const props = defineProps<{
    iconNode: VNode
  }>()

  const Icon = props.iconNode
</script>
<style lang="scss"></style>
