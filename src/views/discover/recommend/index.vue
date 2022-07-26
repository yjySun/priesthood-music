<template>
  <div class="recommend">
    <!-- 轮播图 -->
    <Banner v-if="state.banners.length > 0" :banners="state.banners" />
    <!-- 推荐歌单 -->
    <div v-if="state.musicList.length > 0" class="recommend-music-list">
      <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
      <RecommendList :musicList="state.musicList" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from 'vue'
  import Banner from './components/Banner.vue'
  import RecommendList from './components/RecommendList.vue'
  import { getBanner, getRecommendMusicList } from '@/api/discover/recommend'

  const state = reactive({
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
    console.log(res.result)
  }
</script>
<style lang="scss">
  .recommend {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar-thumb {
      /*滑块部分*/
      border-radius: 5px;
      background-color: #cccccc;
    }

    &::-webkit-scrollbar {
      width: 0.6vw;
      height: 1px;
    }

    .recommend-music-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h3 {
        text-align: left;
        margin-left: 2%;
      }
    }
  }
</style>
