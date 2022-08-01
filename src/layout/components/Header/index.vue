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
        <el-input
          class="search-input"
          placeholder="请输入内容"
          :prefix-icon="Search"
          size="mini"
          v-model="state.searchInput"
        />
      </div>
    </div>
    <div class="user-avatar">
      <div v-if="!state.profile" class="out-login">
        <i class="iconfont icon-ren" @click="openLogin"></i>
        <div class="username" @click="openLogin">未登录</div>
      </div>
      <div v-else class="in-login">
        <img :src="state.profile.avatarUrl" alt="" />
        <div class="nickname">{{ state.profile.nickname }}</div>
      </div>
    </div>
  </div>

  <Login ref="login" @getUserProfile="getUserProfile" />
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
  import { useRouter } from 'vue-router'
  import { Search } from '@element-plus/icons-vue'
  import { request } from '@/utils/http/axios/axios'
  import { getLoginStatus } from '@/api/login'
  import { createStorage } from '@/utils/Storage'
  import { USER_ID, IS_LOGIN } from '@/store/mutation-types'
  import { useUserStore } from '@/store/modules/user'
  import { COOKIE } from '@/store/mutation-types'

  const router = useRouter()
  const userStore = useUserStore()
  const Storage = createStorage({ storage: localStorage })
  const login = ref<any>()

  const state = reactive({
    searchInput: '',
    profile: ''
  })

  onMounted(() => {
    getCurrentUserInfo()
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

  const { proxy } = getCurrentInstance()

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
    }
  }
</style>
