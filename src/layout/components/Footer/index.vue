<template>
  <div class="paly-footer">
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
          <i class="iconfont icon-shangyishou"></i>
        </span>
        <span class="operate-button play-pause">
          <i v-if="!state.playState" class="iconfont icon-bofang" @click="playMusic"></i>
          <i v-else class="iconfont icon-zanting" @click="pauseMusic"></i>
        </span>
        <span class="operate-button next">
          <i class="iconfont icon-xiayishou"></i>
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
        <i class="iconfont icon-music-list"></i>
      </div>
    </div>
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
    playState: false, //播放状态
    mute: false, //静音
    playUrl: '',
    profile: '', //歌曲信息
    duration: '00:00', //总播放时长, 毫秒
    currentTime: '00:00', //当前播放时间
    volume: 70, //音量，默认70%
    volumeSave: 0, //静音前保存的音量
    progress: 0 //进度条进度
  })

  onMounted(() => {
    changeVolume()
  })

  /**
   * @description: 监听事件播放音乐
   * @return {*}
   */
  proxy.$bus.on('handlePlayMusic', async (profile) => {
    state.profile = profile
    const res = await getSongUrl({ id: profile.id, timestamp: new Date().getTime() })
    if (res.code === 200) {
      state.playUrl = res.data[0].url
      state.currentTime = '00:00'
      state.duration = profile.dt
      playMusic()
    } else {
      console.log('获取歌曲失败，请稍后重试')
    }
  })

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
</script>
<style lang="scss">
  .paly-footer {
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
  }
</style>
