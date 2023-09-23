<template>
  <div class="lyric-drawer">
    <el-drawer v-model="state.visible" :with-header="false" direction="btt">
      <div class="major">
        <div class="lyric">
          <div class="phonograph">
            <div class="needle">
              <img
                :class="{
                  point: true,
                  'play-point': state.isPlay
                }"
                src="@/assets/img/needle.png"
                alt=""
              />
            </div>
            <div
              :class="{
                'optical-disc': true,
                'optical-disc-paused': !state.isPlay
              }"
            >
              <img class="music-picture" :src="state.profile.al.picUrl" alt="" />
              <img class="disc-outer" src="@/assets/img/disc.png" alt="" />
            </div>
          </div>
          <div class="lyric-content">
            <LyricScroll />
          </div>
        </div>
        <div class="comment">评论部分</div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMusicStore } from '@/store/modules/music'
  import { getLyric } from '@/api/song'
  import LyricScroll from './LyricScroll.vue'

  const musicStore = useMusicStore()
  const { getProfile, getIsPlay } = storeToRefs(musicStore)

  const state = reactive({
    visible: false,
    profile: !!getProfile ? getProfile : '', //歌曲信息
    isPlay: getIsPlay
  })

  const open = (visible) => {
    state.visible = !state.visible
  }

  defineExpose({
    open
  })
</script>
<style lang="scss">
  .lyric-drawer {

    .major {
      display: flex;
      align-items: center;
      flex-direction: column;

      .phonograph {
        $needle-delay: 0.8s;
        $phonograph-width: 350px;

        display: inline-block;
        position: relative;
        margin-top: 20px;
        width: $phonograph-width;
        height: 500px;

        .needle {
          position: absolute;
          z-index: 3;
          text-align: right;
          right: 50px;

          img.point {
            width: 100px;
            height: 100px;
            transform-origin: 0 0;
            transition: $needle-delay;
          }

          img.play-point {
            transform: rotate(25deg);
            transition: $needle-delay;
          }
        }

        .optical-disc {
          position: relative;
          animation: disc-rotate 40s linear infinite;
          /* 动画延迟0.8秒 */
          animation-delay: $needle-delay;
          width: $phonograph-width;
          height: $phonograph-width;
          top: 80px;

          img.disc-outer {
            position: absolute;
            width: $phonograph-width;
            height: $phonograph-width;
            z-index: 1;
          }

          img.music-picture {
            $picture-height: 250px;

            position: absolute;
            border-radius: 20px;
            top: 45px;
            left: 50px;
            width: $picture-height;
            height: $picture-height;
            z-index: 0;
          }
        }

        .optical-disc-paused {
          animation-play-state: paused;
          -webkit-animation-play-state: paused;
        }
      }

      .lyric-content, .phonograph {
        vertical-align: top;
      }

      .lyric-content {
        position:relative;
        display: inline-block;
        width: 500px;
        margin: 20px 0 0 40px;
      }
    }
  }
  @keyframes disc-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
