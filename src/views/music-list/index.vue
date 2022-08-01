<template>
  <div class="common-music-list">
    <div class="loading-parent">
      <Loading :loading="state.loading">
        <div class="music-list-info" v-if="state.playlist">
          <div class="image-info">
            <img :src="state.playlist.coverImgUrl" alt="" />
          </div>
          <div class="concise-info">
            <div class="title">
              <Tag value="歌单" />
              <div class="headline">
                {{ state.playlist.name }}
              </div>
            </div>
            <div class="author-info">
              <img :src="state.playlist.creator.avatarUrl" alt="" />
              <span class="author-name">{{ state.playlist.creator.nickname }}</span>
              <div class="created-time">{{ formatToDate(state.playlist.createTime) }}创建</div>
            </div>
            <div class="operate-button">
              <div class="button-item play-all">
                <i class="iconfont icon-bofang play-all"></i>
                <span>播放全部</span>
              </div>
              <div class="button-item">
                <i class="iconfont icon-xihuan"></i>
                <span>收藏</span>
              </div>
              <div class="button-item">
                <i class="iconfont icon-fenxiang"></i>
                <span>分享</span>
              </div>
            </div>
            <div class="list-abstract">
              <div class="tags" v-if="state.playlist.tags && state.playlist.tags.length > 0">
                <div>标签：</div>
                <div class="tag-item" v-for="(item, index) in state.playlist.tags" :key="index">{{ item }}</div>
              </div>
              <div class="quantity">
                <div>
                  <div>歌曲：</div>
                  <div class="content">
                    {{ state.playlist.trackCount }}
                  </div>
                </div>
                <div class="plays">
                  <div>播放：</div>
                  <div class="content">{{ handleNum(state.playlist.playCount) }}</div>
                </div>
              </div>
              <div class="abstract" v-if="state.playlist.description">
                <div>简介：</div>
                <div class="content">
                  {{ state.playlist.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="playlist">
          <el-tabs class="list-tabs" v-model="state.activeName" @tab-click="handleClick">
            <el-tab-pane name="musicList">
              <template #label>
                <div class="head-title">歌曲列表</div>
              </template>
              <MusicListTable
                ref="musicListTable"
                :trackIds="state.playlist.trackIds"
                @completeLoading="completeLoading"
              />
            </el-tab-pane>
            <el-tab-pane name="comment">
              <template #label>
                <div class="head-title">评论</div>
              </template>
              评论
            </el-tab-pane>
            <el-tab-pane name="collector">
              <template #label>
                <div class="head-title">收藏者</div>
              </template>
              收藏者
            </el-tab-pane>
          </el-tabs>
        </div>
      </Loading>
    </div>

    <el-backtop target=".common-music-list" :bottom="100">
      <i class="iconfont icon-top"></i>
    </el-backtop>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { useRoute } from 'vue-router'
  import { getPlaylistInfo } from '@/api/playlist'
  import { formatToDate } from '@/utils/dateUtil'
  import { handleNum } from '@/utils/number'
  import { $ref } from 'vue/macros'

  const route = useRoute()
  const playlistId = route.params.id
  const musicListTable = $ref<any>()

  const state = reactive({
    loading: true,
    activeName: 'musicList',
    playlist: ''
  })

  onMounted(() => {
    getPlaylist()
  })

  const getPlaylist = async () => {
    let res = await getPlaylistInfo({ id: playlistId, timestamp: new Date().getTime() })
    state.playlist = res.playlist

    const { getTrackIds } = musicListTable
    getTrackIds(state.playlist.trackIds)
  }

  /**
   * @description: 完成歌曲加载
   * @return {*}
   */
  const completeLoading = () => {
    state.loading = false
  }
</script>
<style lang="scss">
  .common-music-list {
    padding: 30px 40px 0 40px;
    @include absolute-fill;
    overflow-x: hidden;

    .loading-parent {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .music-list-info {
      display: flex;

      .image-info {
        display: inline-block;
        width: 200px;
        height: 200px;

        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
      }

      .concise-info {
        margin-left: 20px;
        flex: 1;
        width: 0;
        gap: 10px;
        display: flex;
        flex-direction: column;
        background-color: #fff;

        .title {
          display: flex;
          align-items: center;

          .headline {
            @include overflow-omit;
            flex: 1;
            margin-left: 10px;
            font-size: 24px;
            font-weight: bold;
            text-align-last: left;
          }
        }

        .author-info {
          display: flex;
          align-items: center;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }

          .author-name,
          .created-time {
            margin-left: 10px;
            font-size: 13px;
          }

          .author-name {
            color: #6191c2;
            cursor: pointer;
          }
        }

        .operate-button {
          display: flex;
          align-items: center;
          gap: 10px;

          .button-item {
            padding: 8px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            cursor: pointer;

            &.play-all {
              color: #fff;
              background-color: #ec4141;
            }

            i {
              margin-right: 3px;
            }
          }
        }

        .list-abstract {
          display: flex;
          flex-direction: column;
          text-align-last: left;
          gap: 10px;

          div {
            display: inline-block;
            font-size: 13px;
          }

          .content {
            color: #3c4c5c;
          }

          .tags .tag-item {
            color: #6191c2;
            margin-right: 5px;
          }

          .quantity .plays {
            margin-left: 15px;
          }

          .abstract {
            display: flex;

            .content {
              flex: 1;
              @include overflow-omit;
            }
          }
        }
      }
    }

    .playlist {
      margin-top: 20px;
    }
  }
</style>
