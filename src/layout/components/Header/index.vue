<template>
  <div class="custom-header">
    <div class="music-logo">
      <img class="music-logo" src="@/assets/img/common/logo.png" alt="" />
    </div>
    <div class="move-back-search">
      <div class="move-back">
        <i class="iconfont icon-arrow-left-bold" @click="router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold" @click="router.go(1)"></i>
      </div>
      <div class="search">
        <el-popover placement="bottom" :width="400" trigger="click" popper-class="search-popover" :show-arrow="false">
          <template #reference>
            <el-input
              class="search-input"
              placeholder="请输入内容"
              :prefix-icon="Search"
              size="small"
              v-model="state.searchInput"
              @focus="getHotSearchList"
              @input="getSearchResult"
            />
          </template>
          <div class="hot-search" v-if="!state.searchResult">
            <el-scrollbar height="500px">
              <div class="title">热搜榜</div>
              <div class="hot-item" v-for="(item, index) in state.hotSearchList" :key="index">
                <div class="sort-number" :class="{ 'top-three': index <= 2 }">{{ index + 1 }}</div>
                <div class="content">
                  <div class="search-word">
                    <div class="name" :class="{ 'top-three': index <= 2 }">{{ item.searchWord }}</div>
                    <img v-if="item.iconUrl" :src="item.iconUrl" alt="" />
                    <div class="score">{{ item.score }}</div>
                  </div>
                  <div class="description">{{ item.content }}</div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="search-result" v-if="state.searchResult">
            <el-scrollbar height="500px">
              <div class="song" v-if="state.searchResult.songs && state.searchResult.songs.length > 0">
                <div class="title">
                  <i class="iconfont icon-songs"></i>
                  <div class="title-name">单曲</div>
                </div>
                <div
                  class="result-item"
                  v-for="(song, index) in state.searchResult.songs"
                  :key="index"
                  @click="playSong(song)"
                >
                  <span class="name">{{ song.name }}</span>
                  <span class="link"> -</span>
                  <span class="artist" v-for="(artist, index) in song.artists" :key="index">
                    <span>{{ index !== 0 ? ' ' : '' }}</span>
                    {{ artist.name }}
                  </span>
                </div>
              </div>
              <div class="artist" v-if="state.searchResult.artists && state.searchResult.artists.length > 0">
                <div class="title">
                  <i class="iconfont icon-artists"></i>
                  <div class="title-name">歌手</div>
                </div>
                <div class="result-item" v-for="(artist, index) in state.searchResult.artists" :key="index">
                  <span class="name">{{ artist.name }}</span>
                </div>
              </div>
              <div class="album" v-if="state.searchResult.albums && state.searchResult.albums.length > 0">
                <div class="title">
                  <i class="iconfont icon-albums"></i>
                  <div class="title-name">专辑</div>
                </div>
                <div class="result-item" v-for="(album, index) in state.searchResult.albums" :key="index">
                  <span class="name">{{ album.name }}</span>
                  <span class="link"> - </span>
                  <span class="artist">{{ album.artist.name }}</span>
                </div>
              </div>
              <div class="song-list" v-if="state.searchResult.playlists && state.searchResult.playlists.length > 0">
                <div class="title">
                  <i class="iconfont icon-playlists"></i>
                  <div class="title-name">歌单</div>
                </div>
                <div
                  class="result-item"
                  v-for="(playlist, index) in state.searchResult.playlists"
                  :key="index"
                  @click="router.push({ path: '/created/created-playlist/' + playlist.id })"
                >
                  <span class="name">{{ playlist.name }}</span>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="user-avatar">
      <div v-if="!state.profile" class="out-login">
        <i class="iconfont icon-ren" @click="openLogin"></i>
        <div class="username" @click="openLogin">未登录</div>
      </div>
      <!-- <div v-else class="in-login">
        <img :src="state.profile.avatarUrl" alt="" />
        <div class="nickname">{{ state.profile.nickname }}</div>
      </div> -->

      <!-- 暂时 -->
      <div v-else class="in-login">
        <el-popover placement="bottom" :width="100" trigger="click">
          <template #reference>
            <div class="popover-login">
              <img :src="state.profile.avatarUrl" alt="" />
              <div class="nickname">{{ state.profile.nickname }}</div>
            </div>
          </template>
          <el-button type="danger" style="width: 100%" @click="logout">退出登录</el-button>
        </el-popover>
      </div>
    </div>
  </div>

  <Login ref="login" @getUserProfile="getUserProfile" />
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useUserStore } from '@/store/modules/user'
  import { useMusicStore } from '@/store/modules/music'
  import { useRouter } from 'vue-router'
  import { Search } from '@element-plus/icons-vue'
  import { request } from '@/utils/http/axios/axios'
  import { getLoginStatus } from '@/api/login'
  import { getUserLikeList } from '@/api/user'
  import { getSongs } from '@/api/song'
  import { getSearchHotDetail, getSearchSuggest } from '@/api/search'
  import { createStorage } from '@/utils/Storage'
  import { USER_ID, IS_LOGIN, COOKIE } from '@/store/mutation-types'

  const { proxy } = getCurrentInstance()
  const router = useRouter()
  const userStore = useUserStore()
  const musicStore = useMusicStore()
  const { setLikeList } = storeToRefs(userStore)
  const { getPlayList } = storeToRefs(musicStore)
  const Storage = createStorage({ storage: localStorage })
  const login = ref<any>()

  const state = reactive({
    searchInput: '',
    profile: '',
    hotSearchList: '',
    searchResult: ''
  })

  onMounted(async () => {
    await getCurrentUserInfo()
    await getCurrentUserLikeList()
  })

  /**
   * @description: 获取登录用户的信息
   * @return {*}
   */
  const getCurrentUserInfo = async () => {
    const res = await getLoginStatus({ cookie: Storage.get(COOKIE), timestamp: new Date().getTime() })

    if (res.data.profile) {
      state.profile = res.data.profile
      Storage.set(IS_LOGIN, true)
      Storage.set(USER_ID, res.data.profile.userId)
      proxy.$bus.emit('haveLogin')
    } else {
      console.log('请登录')
    }
  }

  /**
   * @description: 获取用户喜欢的音乐id
   * @return {*}
   */
  const getCurrentUserLikeList = async () => {
    const res = await getUserLikeList(state.profile.id, new Date().getTime())
    if (res.code === 200) {
      userStore.setLikeList(res.ids)
    } else {
      console.log('获取用户喜欢的音乐失败')
    }
  }

  /**
   * @description: 赋值用户信息
   * @param {*} val
   * @return {*}
   */
  const getUserProfile = async (profile) => {
    if (profile) {
      state.profile = profile
      Storage.set(USER_ID, state.profile.userId)
      Storage.set(IS_LOGIN, true)
      proxy.$bus.emit('haveLogin')
    } else {
      await getCurrentUserInfo()
    }
  }

  /**
   * @description: 获取热搜榜
   * @return {*}
   */
  const getHotSearchList = async () => {
    const res = await getSearchHotDetail()
    if (res.code === 200) {
      state.hotSearchList = res.data
    } else {
      console.log('获取热搜榜单失败')
    }
  }

  /**
   * @description: 获取搜索建议
   * @return {*}
   */
  const getSearchResult = async (keywords: string) => {
    const res = await getSearchSuggest(keywords, new Date().getTime())
    if (res.code === 200) {
      state.searchResult = res.result
    } else if (res.code === 400) {
      state.searchResult = ''
    } else {
      console.log(`获取搜索建议失败，搜索关键字为：${keywords}`)
    }
  }

  /**
   * @description: 播放搜索的单曲
   * @param {*} song
   * @return {*}
   */
  const playSong = async (song): void => {
    const res = await getSongs(song.id, new Date().getTime())
    musicStore.setProfile(res.songs[0])
    musicStore.getPlayList.push(res.songs[0])
    proxy.$bus.emit('handlePlayMusic')
  }

  /**
   * @description: 退出登录
   * @return {*}
   */
  const logout = () => {
    Storage.clearCookie()
    Storage.clear()
    router.push({ path: '/discover' })
    //目的为了重置菜单
    proxy.$bus.emit('haveLogin')
    state.profile = ''
  }

  const openLogin = () => {
    const { open } = login.value
    open()
  }
</script>
<style lang="scss">
  .custom-header {
    $header-height: 55px;

    width: 100%;
    height: $header-height;
    box-sizing: border-box;
    display: flex;

    .music-logo {
      width: 200px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      img {
        margin-left: -30px;
        transform: scale(0.6);
      }
    }

    .move-back-search {
      padding-left: 30px;
      display: flex;
      align-items: center;

      .move-back {
        width: 90px;
        height: $header-height;
        display: flex;
        align-items: center;

        i {
          background-color: #e13e3e;
          color: rgb(235, 235, 235);
          font-size: 20px;
          transform: scale(0.8);
          padding: 6px;
          border-radius: 50%;
          margin: 0 3px;
          cursor: pointer;
        }
      }
    }

    .user-avatar {
      flex: 1;
      height: $header-height;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 70px;

      .out-login {
        display: flex;
        align-items: center;

        i {
          font-size: 35px;
          width: 40px;
          height: 40px;
          background: #e6e6e6;
          color: white;
          border-radius: 50%;
          cursor: pointer;
        }

        .username {
          display: inline-block;
          color: white;
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .in-login {
        display: flex;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }

        .nickname {
          margin-left: 10px;
          color: rgba(255, 255, 255, 0.9);
        }
      }

      // 暂时
      .popover-login {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }

  .search-popover {
    padding: 0 !important;

    .hot-search {
      .title {
        padding: 15px 0 15px 20px;
        color: #919191;
        font-size: 16px;
      }

      .hot-item {
        padding: 10px 0 10px 20px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: #f2f2f2;
        }

        .sort-number {
          color: #aaaaaa;
          font-size: 18px;

          &.top-three {
            color: #ff3a3a;
          }
        }

        .content {
          margin-left: 30px;
          width: 300px;

          .search-word {
            display: flex;
            align-items: center;
            color: black;

            .name.top-three {
              font-weight: 700;
            }

            .score {
              margin-left: 15px;
              font-size: 12px;
              color: #dbdbdb;
            }

            img {
              margin-left: 10px;
              height: 15px;
            }
          }

          .description {
            margin-top: 5px;
            color: #8e8b8b;
            @include overflow-omit;
          }
        }
      }
    }

    .search-result {
      .title {
        display: flex;
        align-items: center;
        color: #9f9f9f;
        font-size: 16px;
        padding: 10px 0 10px 10px;

        .title-name {
          margin-left: 8px;
        }
      }

      .result-item {
        color: #373737;
        padding: 5px 0 5px 35px;
        cursor: pointer;

        &:hover {
          background-color: #f2f2f2;
        }
      }
    }
  }
</style>
