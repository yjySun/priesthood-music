<template>
  <div class="play-footer">
    <audio
      :src="state.playUrl"
      autoplay="autoplay"
      @pause="pauseMusic"
      @play="playMusic"
      ref="audioPlayer"
      @timeupdate="getCurrentTime"
    ></audio>
    <div class="music-avatar">
      <div class="avatar">
        <img v-if="state.profile" :src="state.profile.al.picUrl" alt="" />
        <img v-else src="@/assets/img/album.jpg" alt="" />
      </div>
      <div class="info">
        <div class="name" v-if="state.profile">{{ state.profile.name }}</div>
        <div class="author" v-if="state.profile">{{ state.profile.ar[0].name }}</div>
      </div>
    </div>

    <div class="play">
      <div class="operate">
        <span class="operate-button play-mode">
          <i class="iconfont icon-danquxunhuan"></i>
        </span>
        <span class="operate-button previous">
          <i class="iconfont icon-shangyishou" @click="preSong"></i>
        </span>
        <span class="operate-button play-pause">
          <i v-if="!state.playState" class="iconfont icon-bofang" @click="playMusic"></i>
          <i v-else class="iconfont icon-zanting" @click="pauseMusic"></i>
        </span>
        <span class="operate-button next">
          <i class="iconfont icon-xiayishou" @click="nextSong"></i>
        </span>
      </div>
      <div class="progress">
        <span class="current-time">{{ handleMusicTimeSeconds(state.currentTime) }}</span>
        <el-slider
          class="progress-slider"
          v-model="state.progress"
          size="small"
          :show-tooltip="false"
          @input="changeCurrenTime"
        />
        <span class="total-time">{{ handleMusicTimeMS(state.duration) }}</span>
      </div>
    </div>

    <div class="sound">
      <div class="sound-icon horn">
        <i v-if="!state.mute" class="iconfont icon-laba" @click="changeMute"></i>
        <i v-else class="iconfont icon-laba-no" @click="changeMute"></i>
      </div>
      <div class="sound-slider">
        <el-slider
          class="sound-slider"
          v-model="state.volume"
          size="small"
          :show-tooltip="false"
          @input="changeVolume"
        />
      </div>
      <div class="sound-icon music-list">
        <i class="iconfont icon-music-list" @click="state.drawer = true"></i>
      </div>
    </div>

    <el-drawer v-model="state.drawer" :with-header="false">
      <div class="music-list-drawer" v-if="state.playlist">
        <div class="head">
          <div class="title">当前播放</div>
          <div class="count">总{{ state.playlist.length }}首</div>
        </div>
        <div class="list">
          <el-table
            :data="state.playlist"
            stripe
            style="width: 100%"
            :show-header="false"
            @row-dblclick="dblclickPlayMusic"
            highlight-current-row
          >
            <el-table-column prop="name" min-width="180"></el-table-column>
            <el-table-column prop="ar[0].name" min-width="90"></el-table-column>
            <el-table-column prop="dt" min-width="60" :formatter="formatterMusicTime"></el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
  import { $ref } from 'vue/macros'
  import { getSongUrl } from '@/api/song'
  import { handleMusicTimeMS, handleMusicTimeSeconds } from '@/utils'

  const { proxy } = getCurrentInstance()
  const audioPlayer = $ref<any>()

  const state = reactive({
    playlist: '', //播放列表
    playState: false, //播放状态
    mute: false, //静音
    playUrl: '', //歌曲url
    currentMusicIndex: 0, //当前播放歌曲的索引
    profile: '', //歌曲信息
    duration: '00:00', //总播放时长, 毫秒
    currentTime: '00:00', //当前播放时间
    volume: 70, //音量，默认70%
    volumeSave: 0, //静音前保存的音量
    progress: 0, //进度条进度
    drawer: false
  })

  onMounted(() => {
    changeVolume()
  })

  /**
   * @description: 监听事件播放音乐
   * @return {*}
   */
  proxy.$bus.on('handlePlayMusic', (param) => {
    state.playlist = param.musicList
    state.profile = param.profile
    console.log('state.playlist', state.playlist)
    console.log('state.profile', state.profile)

    playMusicById()
  })

  /**
   * @description: 根据url播放歌曲
   * @return {*}
   */
  const playMusicById = async () => {
    const res = await getSongUrl({ id: state.profile.id, timestamp: new Date().getTime() })
    if (res.code === 200) {
      state.playUrl = res.data[0].url
      state.currentTime = '00:00'
      state.duration = state.profile.dt
      playMusic()

      //修改播放索引
      changePlayIndex()
    } else {
      console.log('获取歌曲失败，请稍后重试')
    }
  }

  /**
   * @description: 播放音乐
   * @param {*}
   * @return {void}
   */
  const playMusic = (): void => {
    state.playState = true
    audioPlayer.play()
  }

  /**
   * @description: 暂停音乐
   * @param {*}
   * @return {void}
   */
  const pauseMusic = (): void => {
    state.playState = false
    audioPlayer.pause()
  }

  /**
   * @description: 获取歌曲播放时间
   * @return {*}
   */
  const getCurrentTime = () => {
    state.currentTime = audioPlayer.currentTime

    //改变进度条进度
    const durationSeconds = parseInt(state.duration / 1000)
    state.progress = Math.ceil((audioPlayer.currentTime / durationSeconds) * 100)
  }

  /**
   * @description: 拖动进度条改变歌曲播放进度
   * @param {*}
   * @return {void}
   */
  const changeCurrenTime = (newTime): void => {
    const ratio = newTime / 100
    const durationSeconds = state.duration / 1000
    audioPlayer.currentTime = durationSeconds * ratio
  }

  /**
   * @description: 改变声音大小
   * @param {*}
   * @return {void}
   */
  const changeVolume = (newVolume): void => {
    audioPlayer.volume = state.volume / 100

    if (state.volume <= 0) {
      state.volumeSave = state.volume
      state.mute = true
    } else {
      state.mute = false
    }
  }

  /**
   * @description: 是否静音
   * @param {*}
   * @return {void}
   */
  const changeMute = (): void => {
    let volume: number = 0
    state.mute = !state.mute
    if (state.mute) {
      state.volumeSave = state.volume
      state.volume = 0
    } else {
      volume = state.volumeSave
      state.volume = state.volumeSave
    }

    audioPlayer.volume = volume / 100
  }

  /**
   * @description: 格式化音乐时间
   * @param {*} row
   * @param {*} column
   * @param {*} cellValue
   * @param {*} index
   * @return {*}
   */
  const formatterMusicTime = (row, column, cellValue, index) => {
    return handleMusicTimeMS(cellValue)
  }

  /**
   * @description: 双击播放歌曲
   * @param {*} row
   * @param {*} column
   * @param {*} event
   * @return {*}
   */
  const dblclickPlayMusic = (row, column, event) => {
    state.profile = row
    playMusicById()
  }

  /**
   * @description: 修改为当前播放歌曲索引
   * @return {*}
   */
  const changePlayIndex = () => {
    const ids = state.playlist.map((item) => item.id)
    state.currentMusicIndex = ids.indexOf(state.profile.id)
  }

  /**
   * @description: 播放上一首歌曲
   * @return {*}
   */
  const preSong = () => {
    if (!state.playlist) {
      return
    }

    if (state.currentMusicIndex === 0) {
      const index = state.playlist.length - 1
      state.currentMusicIndex = index
      state.profile = state.playlist[index]
    } else {
      const ids = state.playlist.map((item) => item.id)
      const oldIndex = ids.indexOf(state.profile.id)
      const newIndex = oldIndex - 1
      state.profile = state.playlist[newIndex]
      state.currentMusicIndex = newIndex
    }

    playMusicById()
  }

  /**
   * @description: 播放下一首歌曲
   * @return {*}
   */
  const nextSong = () => {
    if (!state.playlist) {
      return
    }

    if (state.currentMusicIndex === (state.playlist.length - 1)) {
      const index = 0
      state.currentMusicIndex = index
      state.profile = state.playlist[index]
    } else {
      const ids = state.playlist.map((item) => item.id)
      const oldIndex = ids.indexOf(state.profile.id)
      const newIndex = oldIndex + 1
      state.profile = state.playlist[newIndex]
      state.currentMusicIndex = newIndex
    }

    playMusicById()
  }
</script>
<style lang="scss">
  .play-footer {
    height: 100%;
    display: flex;
    align-items: center;

    .music-avatar {
      flex: 1;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .avatar {
        $avatar-height: 50px;

        height: $avatar-height;
        margin-left: 20px;

        img {
          border-radius: 5px;
          width: $avatar-height;
          height: $avatar-height;
        }
      }

      .info {
        margin-left: 10px;
        text-align: left;

        @mixin info-style {
          width: 200px;
          @include overflow-omit;
        }

        .name {
          @include info-style;
        }

        .author {
          @include info-style;
          margin-top: 3px;
          font-size: 13px;
        }
      }
    }

    .play {
      .operate {
        .operate-button {
          display: inline-block;
          margin-left: 40px;
          cursor: pointer;

          &:first-child {
            margin-left: 0 !important;
          }

          i {
            font-size: 25px;
          }
        }
      }

      .progress {
        flex: 2;
        position: relative;
        top: 5px;

        .current-time,
        .total-time {
          display: inline-block;
          font-size: 12px;
          color: #aaaaaa;
          position: relative;
          top: -2px;
        }

        .current-time,
        .total-time,
        .progress-slider {
          vertical-align: bottom;
        }

        .progress-slider {
          margin: 0 20px;
          width: 400px;
          height: 10px;
          display: inline-block;
        }
      }
    }

    .sound {
      flex: 1;
      text-align: right;

      .sound-icon {
        display: inline-block;

        i {
          font-size: 20px;
          font-weight: bold;
          cursor: pointer;
        }

        &.horn {
          margin: 0 10px 0 0;
        }

        &.music-list {
          margin: 0 30px 0 20px;
        }
      }

      .sound-slider {
        display: inline-block;
        width: 80px;
        height: 10px;
      }
    }

    .music-list-drawer {
      .head {
        // background-color: pink;
        border-bottom: 1px solid #ddd;
        .title {
          font-size: 20px;
          font-weight: 900;
        }

        .count {
          font-size: 13px;
          color: #ddd;
          margin: 10px 0;
        }
      }
    }
  }
</style>
