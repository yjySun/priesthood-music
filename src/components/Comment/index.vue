<template>
  <div class="common-comment">
    <div class="comment-item" v-for="(item, index) in state.comments" :key="index">
      <img class="avatar" :src="item.user.avatarUrl" alt="" />
      <div class="content">
        <div class="content-text">
          <span class="user-name" :userId="item.user.id">{{ item.user.nickname }}: </span>
          <span class="text">{{ item.content }}</span>
        </div>
        <div class="content-operate">
          <div>
            <div class="timestamp">{{ formatToDateTime(item.time) }}</div>
            <div v-if="item.ipLocation.location" class="ip" style="margin-left: 5px">· {{ item.ipLocation.location }}</div>
          </div>
          <div class="operate">
            <div class="like-button" :commentId="item.commentId">
              <i class="iconfont icon-dianzan"></i>
              <span>{{ item.likedCount }}</span>
            </div>
            <div class="share-button">
              <i class="iconfont icon-fenxiang"></i>
            </div>
            <div class="comment-button">
              <i class="iconfont icon-pinglun"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, toRefs, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useMusicStore } from '@/store/modules/music'
  import { getSongComment, getPlayListComment } from '@/api/comment'
  import { IS_LOGIN, USER_ID } from '@/store/mutation-types'
  import { commentEnum } from '@/enums/CommentEnum'
  import { formatToDateTime } from '@/utils/dateUtil'

  interface ICommentInfo {
    id: number
    type: commentEnum
  }
  const props = defineProps<{
    commentInfo: ICommentInfo
  }>()

  //为了将defineProps接收的变量变成响应式传入state，如果不用toRefs则响应式失效
  const { commentInfo } = toRefs(props)

  const musicStore = useMusicStore()

  const state = reactive({
    commentInfo: commentInfo,
    comments: [] //评论
  })

  onMounted(() => {
    getSongComments()
  })

  /**
   * @description: 监听传入评论信息
   * @return {*}
   */
  watch(
    () => state.commentInfo,
    (newValue, oldValue) => {
      getSongComments()
    }
  )

  /**
   * @description: 获取歌曲评论
   * @return {*}
   */
  const getSongComments = async () => {
    if (state.commentInfo.type === commentEnum.SONG) {
      const res = await getSongComment(state.commentInfo.id, 0, 20)
      if (res.code === 200) {
        state.comments = res.comments
      } else {
        console.log(`获取评论失败`, res)
      }
    }
  }

  defineExpose({})
</script>
<style lang="scss">
  .common-comment {
    .comment-item {
      margin-top: 20px;
      //to img and div align top
      display: flex;
      justify-content: center;
      align-items: top;

      $avatar-height: 50px;
      .avatar {
        display: inline-block;
        width: $avatar-height;
        height: $avatar-height;
        border-radius: 50%;
      }

      .content {
        display: inline-block;
        box-sizing: border-box;
        padding-left: 10px;
        width: calc(100% - $avatar-height);
        word-wrap: break-word;

        .content-text {
          .user-name {
            color: #5a8ab9;
            cursor: pointer;
          }

          .text {
            line-height: 30px;
          }
        }

        .content-operate {
          margin-top: 15px;
          color: #acacac;
          font-size: 14px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;

          .operate {
            height: 20px;
            div {
              margin-left: 20px;
              cursor: pointer;
            }
          }

          div {
            display: inline-block;
          }
        }
      }
    }
  }
</style>
