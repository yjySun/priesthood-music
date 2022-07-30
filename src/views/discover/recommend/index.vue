<template>
  <div class="recommend">
    <Loading :loading="state.loading">
      <!-- 轮播图 -->
      <Banner v-if="state.banners.length > 0" :banners="state.banners" />
      <!-- 推荐歌单 -->
      <div v-if="state.musicList.length > 0" class="recommend-music-list">
        <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
        <RecommendList :musicList="state.musicList" />
      </div>
    </Loading>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from 'vue'
  import Banner from './components/Banner.vue'
  import RecommendList from './components/RecommendList.vue'
  import { getBanner, getRecommendMusicList } from '@/api/discover/recommend'

  const state = reactive({
    loading: true,
    banners: [],
    musicList: []
  })

  onMounted(() => {
    generateBanner()
    generateMusicList()
  })

  /**
   * @description: 获取轮播图
   * @return {*}
   */
  const generateBanner = async () => {
    const res = await getBanner()
    state.banners = res.banners
  }

  /**
   * @description: 获取推荐歌单
   * @return {*}
   */
  const generateMusicList = async () => {
    const res = await getRecommendMusicList({ limit: 10 })
    state.musicList = res.result
    state.loading = false
  }
</script>
<style lang="scss">
  .recommend {
    @include absolute-fill;

    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .recommend-music-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h3 {
        text-align: left;
        margin-left: 4%;
        // padding-left: 2%;
      }
    }
  }
</style>
