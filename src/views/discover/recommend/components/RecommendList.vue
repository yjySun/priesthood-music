<template>
  <div class="recommend-list">
    <div class="list-card">
      <div class="list-card-item" v-for="(item, index) in musicList" :key="index" @click="openMusicList(item.id)">
        <div class="image">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = defineProps<{
    musicList: Array
  }>()

  const openMusicList = (id) => {
    router.push({ path: '/created/created-playlist/' + id })
  }
</script>
<style lang="scss">
  .recommend-list {
    .list-card {
      display: flex;
      gap: 2%;
      flex-wrap: wrap;
      justify-content: center;

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
