<template>
  <div class="common-music-list">
    <div class="music-list-info">
      <div class="image-info">
        <img src="@/assets/img/album.jpg" alt="" />
      </div>
      <div class="concise-info">
        <div class="title">
          <Tag value="歌单" />
          <div class="headline">
            今天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达天从《不可爱》听起|私人雷达
          </div>
        </div>
        <div class="author-info">
          <img src="@/assets/img/album.jpg" alt="" />
          <span class="author-name">周杰伦</span>
          <div class="created-time">2016-01-19创建</div>
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
          <div class="tags">
            <div>标签：</div>
            <div class="tag-item">流行</div>
            <div class="tag-item">摇滚</div>
          </div>
          <div class="quantity">
            <div>
              <div>歌曲：</div>
              <div class="content">300</div>
            </div>
            <div class="plays">
              <div>播放：</div>
              <div class="content">1.2亿</div>
            </div>
          </div>
          <div class="abstract">
            <div>简介：</div>
            <div class="content">
              私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱私人雷达，每日更新，收藏你的最爱
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="playlist">歌曲列表</div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
  .common-music-list {
    background-color: pink;
    @include absolute-fill;

    .music-list-info {
      display: flex;
      margin-left: 40px;
      margin-top: 30px;

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
  }
</style>
