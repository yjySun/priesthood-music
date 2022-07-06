<template>
  <div>
    <a href="">你好</a>
    <el-button type="primary">Primary</el-button>
    <el-input v-model="textarea1" autosize placeholder="Please input" />
  </div>
</template>

<script setup lang="ts">
  import { ref, unref } from 'vue'

  defineProps<{ msg: string }>()

  let msgref = ref(123)
  console.log(typeof unref(msgref)) // 你好
  let msg = 123455
  console.log(typeof unref(msg)) // 你好

  const count = ref(0)
</script>

<style lang="scss" scoped>
  div {
    background-color: pink;
    // min-width: 1400px;
    // height: 10px;

    a {
      color: red;
      display: inline-block;
    }
  }
</style>
