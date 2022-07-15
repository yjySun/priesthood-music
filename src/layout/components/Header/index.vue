<template>
  <div class="custom-header">
    <div class="music-logo">
      <img class="music-logo" src="@/assets/img/common/logo.png" alt="" />
    </div>
    <div class="move-back-search">
      <div class="move-back">
        <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" :prefix-icon="Search" size="mini" v-model="searchInput" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Search } from '@element-plus/icons-vue'
</script>
<style lang="scss">
  .custom-header {
    $header-height: 60px;

    width: 100%;
    height: $header-height;
    box-sizing: border-box;
    display: flex;

    .music-logo {
      width: 200px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-left: -20px;
        transform: scale(0.7);
      }
    }

    .move-back-search {
      padding-left: 30px;
      display: flex;
      align-items: center;

      .move-back {
        width: 90px;
        height: $header-height;
        display: flex;
        align-items: center;

        i {
          background-color: #e13e3e;
          color: rgb(235, 235, 235);
          font-size: 20px;
          transform: scale(0.8);
          padding: 6px;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          margin: 0 3px;
        }
      }
    }
  }
</style>
