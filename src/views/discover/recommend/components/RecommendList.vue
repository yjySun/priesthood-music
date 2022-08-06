<template>
  <div class="recommend-list">
    <div class="list-card">
      <!-- 登录状态下显示每日推荐歌单 -->
      <div class="list-card-item" v-if="isLogin" @click="router.push({ path: '/daily/daily-recommend' })">
        <div class="image">
          <i :class="'iconfont icon-rili' + getTodyDate()"></i>
          <img src="@/assets/img/dailyRecommend.jpg" alt="" />
        </div>
        <div class="title">每日歌曲推荐</div>
      </div>

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
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { storage } from '@/utils/Storage'
  import { IS_LOGIN } from '@/store/mutation-types'
  import { getTodyDate } from '@/utils/dateUtil'

  const router = useRouter()
  const isLogin = ref<boolean>(storage.get(IS_LOGIN))

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
          text-align-last: left;
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
