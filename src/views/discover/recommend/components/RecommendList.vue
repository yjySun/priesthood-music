<template>
  <div class="recommend-list">
    <div class="list-card">
      <div class="list-card-item" v-for="(item, index) in musicList" :key="index">
        <div class="image">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue'

  const props = defineProps<{
    musicList: Array
  }>()
</script>
<style lang="scss">
  .recommend-list {
    .list-card {
      display: flex;
      gap: 40px;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 1300px;

      .list-card-item {
        width: 17%;
        overflow: hidden;
        cursor: pointer;

        img {
          $width: 100%;

          width: $width;
          height: $width;
          border-radius: 20px;
        }

        .title {
          /* 两行溢出 */
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>
