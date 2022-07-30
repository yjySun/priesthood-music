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
        <div class="abstract">简介</div>
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
        width: 160px;
        height: 160px;

        img {
          border-radius: 10px;
        }
      }

      .concise-info {
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
            padding: 8px 20px;
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
      }
    }
  }
</style>
