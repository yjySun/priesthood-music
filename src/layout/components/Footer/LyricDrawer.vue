<template>
  <div class="lyric-drawer">
    <el-drawer v-model="state.visible" :with-header="false" direction="btt">
      <div class="major">
        <div class="lyric">
          <div class="phonograph">
            <div class="needle">
              <img src="@/assets/img/needle.png" alt="" />
            </div>
            <div class="optical-disc">
              <img class="music-picture" :src="state.profile.al.picUrl" alt="" />
              <img class="disc-outer" src="@/assets/img/disc.png" alt="" />
            </div>
          </div>
          <div class="lyric-scroll">
            <div class="title">歌曲名称</div>
            <div class="lyric-content">歌曲歌词</div>
          </div>
        </div>
        <div class="comment">评论部分</div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMusicStore } from '@/store/modules/music'

  const musicStore = useMusicStore()
  const { getProfile, getIsPlay } = storeToRefs(musicStore)

  const state = reactive({
    visible: false,
    profile: !!getProfile ? getProfile : '' //歌曲信息
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
        display: inline-block;
        position: relative;
        top: 20px;
        width: 400px;
        height: 500px;
        .needle {
          position: relative;
          z-index: 3;
          text-align: right;
          margin-right: 100px;
          // transform-origin: 0px 0px;
          transform: rotate(22deg); //旋转
          img {
            width: 100px;
            height: 100px;
          }
        }

        .optical-disc {
          position: absolute;
          top: 100px;
          right: 50px;

          img.disc-outer {
            position: relative;
            width: 300px;
            height: 300px;
            z-index: 1;
          }

          img.music-picture {
            $picture-height: 210px;

            position: absolute;
            border-radius: 20px;
            top: 45px;
            left: 48px;
            width: $picture-height;
            height: $picture-height;
            z-index: 0;
          }
        }
      }

      .lyric-scroll {
        display: inline-block;
        width: 400px;
      }
    }
  }
</style>
