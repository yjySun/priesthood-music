<template>
  <div class="notable">
    <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    banners: Array
  }>()
</script>
<style lang="scss">
  .notable {
    margin-top: 20px;

    .el-carousel {
      margin: auto;
      width: 1000px;

      .el-carousel__item {
        border-radius: 10px;

        img {
          height: 100%;
        }
      }
    }
  }
</style>
