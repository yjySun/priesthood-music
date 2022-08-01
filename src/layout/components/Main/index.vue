<template>
  <router-view :key="route.fullPath"></router-view>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>
<style scoped></style>
