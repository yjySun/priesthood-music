import { defineStore } from 'pinia'

export interface IUserState {
  nickname: string
  avatar: string
  info: any
  isLogin: boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    nickname: '',
    avatar: '',
    info: '',
    isLogin: false
  }),
  getters: {
    getNickname(): string {
      return this.nickname
    },
    getAvatar(): string {
      return this.avatar
    },
    getUserInfo(): any {
      return this.info
    },
    getIsLogin(): any {
      return this.isLogin
    }
  },
  actions: {
    setNickname(nickname: string) {
      this.nickname = nickname
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setUserInfo(info) {
      this.info = info
    },
    setIsLogin(isLogin: boolean) {
      this.isLogin = isLogin
    }
  }
})
