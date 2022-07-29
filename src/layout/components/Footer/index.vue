<template>
  <div class="paly-footer">
    <audio
      src="https://ci-sycdn.kuwo.cn/c03a56882bb2f956e080a7c22c92ba7c/62e3813e/resource/n2/67/80/2690011765.mp3"
      autoplay="autoplay"
      @pause="pauseMusic"
      @play="playMusic"
      ref="audioPlayer"
    ></audio>
    <div class="music-avatar">
      <div class="avatar">
        <img src="@/assets/img/album.jpg" alt="" />
      </div>
      <div class="info">
        <div class="name">离歌</div>
        <div class="author">信乐团</div>
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
        <span class="current-time">0:19</span>
        <el-slider class="progress-slider" v-model="value1" size="small" :show-tooltip="false" />
        <span class="total-time">0:19</span>
      </div>
    </div>

    <div class="sound">
      <div class="sound-icon horn">
        <i class="iconfont icon-laba"></i>
      </div>
      <div class="sound-slider">
        <el-slider class="sound-slider" v-model="value1" size="small" :show-tooltip="false" />
      </div>
      <div class="sound-icon music-list">
        <i class="iconfont icon-music-list"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { $ref } from 'vue/macros'

  const audioPlayer = $ref<any>()

  const state = reactive({
    playState: false,
    playUrl: '@/assets/等你归来.mp3',
    duration: 0,
    currentTime: 0
  })

  /**
   * @description: 播放音乐
   * @return {*}
   */
  const playMusic = () => {
    state.playState = true
    audioPlayer.play()
  }

  /**
   * @description: 暂停音乐
   * @return {*}
   */
  const pauseMusic = () => {
    state.playState = false
    audioPlayer.pause()
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
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
