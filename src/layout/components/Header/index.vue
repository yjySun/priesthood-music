<template>
  <div class="custom-header">
    <div class="music-logo">
      <img class="music-logo" src="@/assets/img/common/logo.png" alt="" />
    </div>
    <div class="move-back-search">
      <div class="move-back">
        <i class="iconfont icon-arrow-left-bold"></i>
        <i class="iconfont icon-arrow-right-bold"></i>
      </div>
      <div class="search">
        <el-input
          class="search-input"
          placeholder="请输入内容"
          :prefix-icon="Search"
          size="mini"
          v-model="searchInput"
        />
      </div>
    </div>
    <div class="user-avatar">
      <i class="iconfont icon-ren"></i>
      <div class="username">未登录</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { Search } from '@element-plus/icons-vue'

  const searchInput = ref()
</script>
<style lang="scss">
  @import './header-element.scss';

  .custom-header {
    $header-height: 55px;

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
        margin-left: -30px;
        transform: scale(0.6);
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
          border-radius: 50%;
          margin: 0 3px;
          cursor: pointer;
        }
      }
    }

    .user-avatar {
      flex: 1;
      height: $header-height;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 70px;

      i {
        font-size: 35px;
        background: #e6e6e6;
        color: white;
        border-radius: 50%;
        cursor: pointer;
      }

      .username {
        color: white;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
</style>
