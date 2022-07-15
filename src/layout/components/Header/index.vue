<template>
  <div class="custom-header">
    <div class="music-logo">
      <img class="music-logo" src="@/assets/img/common/logo.png" alt="" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
  .custom-header {
    width: 100%;
    height: 60px;
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
  }
</style>
