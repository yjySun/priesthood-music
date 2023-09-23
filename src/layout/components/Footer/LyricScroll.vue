<template>
  <div class="lyric-scroll">
    <div class="song-head">
      <div class="title">{{ state.profile.name }}</div>
      <div class="detail">
        <div class="author">歌手：{{ state.profile.ar[0].name }}</div>
        <div class="album">专辑：{{ state.profile.al.name }}</div>
      </div>
    </div>
    <div class="lyric-any-one">
      <div
        :class="{ 'lyric-item': true, 'lyric-current': state.lyricIndex === index }"
        v-for="(item, index) in state.lyric"
        :key="index"
      >
        {{ item[1] }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMusicStore } from '@/store/modules/music'
  import { getLyric } from '@/api/song'

  const musicStore = useMusicStore()
  const { getProfile, getIsPlay, getCurrentTime } = storeToRefs(musicStore)

  const state = reactive({
    visible: false,
    profile: !!getProfile ? getProfile : '', //歌曲信息
    isPlay: getIsPlay,
    lyric: [], //歌词
    currentTime: getCurrentTime, //当前歌曲播放时间
    lyricIndex: 0 //歌词位置
  })

  onMounted(() => {
    getSongLyric()
  })

  /**
   * @description: 监听当前播放歌曲是否变化切换歌词
   * @return {*}
   */
  watch(
    () => state.profile,
    (newValue, oldValue) => {
      getSongLyric()
    }
  )

  /**
   * @description: 监听当前播放歌曲时间
   * @return {*}
   */
  watch(
    () => state.currentTime,
    (newValue, oldValue) => {
      changeBoldLyric()
    }
  )

  /**
   * @description: 改变歌词位置，加粗歌词
   * @return {*}
   */
  const changeBoldLyric = () => {
    state.lyric.some((item, index) => {
      if (state.currentTime >= item[0]) {
        state.lyricIndex = index
        return false
      }
      state.lyricIndex = index - 1
      return true
    })
  }

  /**
   * @description: 获取歌词
   * @return {*}
   */
  const getSongLyric = async () => {
    const res = await getLyric(state.profile.id)
    const lyricStr = res.lrc.lyric
    let lyricArray = lyricStr.split('\n')
    lyricArray = lyricArray.filter((line) => line.trim() !== '') //去除空行
    const pattern = /\[(\d{2}):(\d{2}).(\d{2,3})\](?:\s?)(.*)/
    const result = []
    lyricArray.forEach((item) => {
      const matches = item.match(pattern)
      if (matches) {
        const minutes = parseInt(matches[1], 10)
        const seconds = parseInt(matches[2], 10)
        const milliseconds = parseInt(matches[3], 10)
        const text = matches[4]

        // 将分钟、秒和毫秒部分转换为秒为单位，并存储总秒数
        const totalInSeconds = minutes * 60 + seconds + milliseconds / 1000
        result.push([totalInSeconds, text])
      }
    })
    state.lyric = result
  }

  defineExpose({})
</script>
<style lang="scss">
  .lyric-scroll {

    .song-head {
      .title {
        font-size: 30px;
        color: #222;
        // font-weight: bold;
      }

      .detail {
        margin-top: 10px;

        div {
          display: inline-block;
          color: #919191;
        }

        .album {
          margin-left: 40px;
        }
      }
    }

    .lyric-any-one {
      max-height: 350px;
      overflow-y: auto;

      .lyric-item {
        margin-top: 20px;
        transition: all 0.5s;
      }

      .lyric-current {
        font-weight: 600;
        font-size: 18px;
        color: black;
      }
    }
  }
</style>
