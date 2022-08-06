<template>
  <div class="recommend-daily">
    <div class="loading-parent">
      <Loading :loading="state.loading">
        <div class="header">
          <div class="daily">
            <div class="tody-date">
              <i :class="'iconfont icon-rili' + getTodyDate()"></i>
            </div>
            <div class="description">
              <div class="title">每日歌曲推荐</div>
              <div class="rule">根据你的音乐口味生成，每天6:00更新</div>
            </div>
          </div>
          <div class="operate">
            <div class="button-item play-all" @click="playAllMusic">
              <i class="iconfont icon-bofang play-all"></i>
              <span>播放全部</span>
            </div>
          </div>
        </div>
        <div class="music-list">
          <MusicListTable ref="musicListTable" />
        </div>
      </Loading>
    </div>

    <el-backtop target=".recommend-daily" :bottom="100">
      <i class="iconfont icon-top"></i>
    </el-backtop>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, getCurrentInstance } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMusicStore } from '@/store/modules/music'
  import { getDailySongs } from '@/api/discover/recommend'
  import { handleNum } from '@/utils/number'
  import { getTodyDate } from '@/utils/dateUtil'
  import { $ref } from 'vue/macros'

  const { proxy } = getCurrentInstance()
  const route = useRoute()
  const musicStore = useMusicStore()
  const musicListTable = $ref<any>()

  const state = reactive({
    loading: true,
    musicList: '' //歌单的歌曲列表
  })

  onMounted(() => {
    getPlaylist()
  })

  /**
   * @description: 获取歌曲列表
   * @return {*}
   */
  const getPlaylist = async () => {
    const res = await getDailySongs()
    if (res.code === 200) {
      state.musicList = res.data.dailySongs
      const { getDailyPlayList } = musicListTable
      getDailyPlayList(res.data.dailySongs)
      state.loading = false
    } else {
      console.log('获取歌曲失败')
    }
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
  .recommend-daily {
    @include absolute-fill;
    overflow-x: hidden; //目的显示el-backtop

    .header {
      padding: 20px 0 10px 40px;
      display: flex;
      flex-direction: column;
      border: 1px solid #ddd;

      .daily {
        display: flex;
        align-items: center;

        .tody-date i {
          font-size: 100px;
          color: #ec4141;
        }

        .description {
          margin-left: 20px;

          .title {
            text-align: left;
            font-size: 20px;
            font-weight: 900;
          }

          .rule {
            font-size: 13px;
            color: #676767;
          }
        }
      }

      .operate {
        margin-top: 20px;
        text-align: left;

        .button-item {
          display: inline-block;
          padding: 8px 20px;
          border: 1px solid #ddd;
          border-radius: 20px;
          cursor: pointer;

          &.play-all {
            color: #fff;
            background-color: #ec4141;
          }

          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
