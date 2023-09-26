<template>
  <div class="search-music-list">
    <div class="loading-parent">
      <Loading :loading="state.loading">
        <div class="playlist">
          <el-tabs class="list-tabs" v-model="state.activeName" @tab-click="handleClick">
            <el-tab-pane name="song">
              <template #label>
                <div class="head-title">单曲</div>
              </template>
              <MusicListTable ref="musicListTable" @completeLoading="completeLoading" />
              <div class="pagination">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :page-size="state.pageSize"
                  :total="state.songCount"
                  @current-change="currentPageChange"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane name="singer">
              <template #label>
                <div class="head-title">歌手</div>
              </template>
              歌手
            </el-tab-pane>
            <el-tab-pane name="album">
              <template #label>
                <div class="head-title">专辑</div>
              </template>
              专辑
            </el-tab-pane>
            <el-tab-pane name="view">
              <template #label>
                <div class="head-title">视频</div>
              </template>
              视频
            </el-tab-pane>
            <el-tab-pane name="songList">
              <template #label>
                <div class="head-title">歌单</div>
              </template>
              歌单
            </el-tab-pane>
          </el-tabs>
        </div>
      </Loading>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, getCurrentInstance } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMusicStore } from '@/store/modules/music'
  import { $ref } from 'vue/macros'
  import { getSearchResult } from '@/api/search'

  const { proxy } = getCurrentInstance()
  const route = useRoute()
  const keywords = route.params.keywords
  const musicStore = useMusicStore()
  const musicListTable = $ref<any>()

  const state = reactive({
    loading: true,
    activeName: 'song',
    musicList: '', //歌单的歌曲列表
    songCount: 0,
    pageSize: 30,
    currentPage: 1
  })

  onMounted(() => {
    getSearch()
  })

  /**
   * @description: 搜索关键词
   * @return {*}
   */
  const getSearch = () => {
    getSearchResults()
  }

  /**
   * @description: 获取搜索结果
   * @return {*}
   */
  const getSearchResults = async () => {
    const res = await getSearchResult(keywords, (state.currentPage - 1) * state.pageSize, state.pageSize) //最后一页时有歌曲重复bug
    if (res.code === 200) {
      const result = res.result
      state.songCount = result.songCount
      console.log(`搜索 ${keywords} 歌曲总数为：${state.songCount}`)
      const { getTrackIds } = musicListTable
      getTrackIds(result.songCount !== 0 ? result.songs.map((item) => item.id) : [])
    } else if (res.code === 400) {
      console.log('搜索失败，code：400')
    } else {
      console.log(`搜索失败，搜索关键字为：${keywords}`)
    }
  }

  /**
   * @description: 当前页数改变
   * @param {*} currentPage
   * @return {*}
   */
  const currentPageChange = (currentPage) => {
    state.currentPage = currentPage
    state.loading = true
    getSearchResults()
  }

  /**
   * @description: 完成歌曲加载
   * @return {*}
   */
  const completeLoading = (musicList) => {
    state.loading = false
    state.musicList = musicList
    
    //页码改变发送footer页面调整喇叭
    proxy.$bus.emit('changeMusicList', state.musicList)
  }

  /**
   * @description: 播放所有歌曲
   * @return {*}
   */
  const playAllMusic = () => {
    const musicList = JSON.parse(JSON.stringify(state.musicList))
    musicStore.setPlayList(musicList)
    musicStore.setProfile(musicList[0])
    proxy.$bus.emit('handlePlayMusic')
  }
</script>
<style lang="scss">
  .search-music-list {
    padding: 30px 40px 0 40px;
    @include absolute-fill;
    overflow-x: hidden;

    .loading-parent {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .pagination {
      display: flex;
      margin: 20px 0;
      justify-content: center;
    }

    .playlist {
      margin-top: 20px;
    }
  }
</style>
