<template>
  <div class="lyric-drawer">
    <el-drawer v-model="state.visible" :with-header="false" direction="btt" custom-class="lyric-card">
      <i class="iconfont icon-xiajiantou close-drawer" @click="state.visible = false"></i>
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
        <div class="comment">
          <div class="title">全部评论</div>
          <div v-if="!!state.comments">
            <div class="content">
              <Comment :commentList="state.comments" />
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="state.pageSize"
                :total="state.total"
                :current-page="state.currentPage"
                @current-change="currentPageChange"
              />
            </div>
          </div>
          <div v-else style="display: flex; justify-content: center; margin-top: 20px">暂无评论</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMusicStore } from '@/store/modules/music'
  import { getLyric } from '@/api/song'
  import LyricScroll from './LyricScroll.vue'
  import { Comment } from '@/components/Comment'
  import { getSongComment } from '@/api/comment'
  import { commentEnum } from '@/enums/CommentEnum'

  const musicStore = useMusicStore()
  const { getProfile, getIsPlay } = storeToRefs(musicStore)

  const state = reactive({
    visible: false,
    profile: !!getProfile ? getProfile : '', //歌曲信息
    isPlay: getIsPlay,
    comments: [], //评论
    total: 0,
    pageSize: 30,
    currentPage: 1
  })

  /**
   * @description: 当前页数改变
   * @param {*} currentPage
   * @return {*}
   */
  const currentPageChange = (currentPage) => {
    state.currentPage = currentPage
    getSongComments(state.profile.id, (state.currentPage - 1) * state.pageSize, state.pageSize)
  }

  /**
   * @description: 获取歌曲评论
   * @return {*}
   */
  const getSongComments = async (id, offset, limit) => {
    const res = await getSongComment(id, offset, limit)
    if (res.code === 200) {
      state.total = res.total
      state.comments = res.comments
    } else {
      console.log(`获取评论失败`, res)
    }
  }

  /**
   * @description: 监听传入评论信息
   * @return {*}
   */
  watch(
    () => state.profile,
    (newValue, oldValue) => {
      state.currentPage = 1
      getSongComments(state.profile.id, (state.currentPage - 1) * state.pageSize, state.pageSize)
    }
  )

  const open = (visible) => {
    state.visible = !state.visible
  }

  defineExpose({
    open
  })
</script>
<style lang="scss">
  .lyric-drawer {
    .close-drawer {
      position: absolute;
      font-size: 30px;
      cursor: pointer;
      color: #9f9f9f;
    }
    
    .lyric-card {
      background-color: white;
      background-image: linear-gradient(to bottom, #e3e2e3, white);
    }

    .major {
      display: flex;
      align-items: center;
      flex-direction: column;

      $children-width: 850px;
      .lyric {
        width: $children-width;

        .phonograph {
          $needle-delay: 0.8s;
          $phonograph-width: 350px;

          display: inline-block;
          position: relative;
          margin-top: 20px;
          width: $phonograph-width;
          height: 470px;

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

        .lyric-content,
        .phonograph {
          vertical-align: top;
        }

        .lyric-content {
          position: relative;
          display: inline-block;
          width: 400px;
          margin: 20px 0 0 80px;
        }
      }

      .comment {
        text-align: left;
        width: $children-width;

        .title {
          font-size: 20px;
          font-weight: 600;
          color: #000;
        }

        .pagination {
          width: 100%;
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }
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
