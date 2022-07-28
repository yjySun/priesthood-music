import { defineStore } from 'pinia'

export interface IUserState {
  profile: any,
  isLogin: boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    profile: {},
    isLogin: false
  }),
  getters: {
    getProfile(): any {
      return this.profile
    },
    getIsLogin(): any {
      return this.isLogin
    }
  },
  actions: {
    setProfile(profile) {
      this.profile = profile
    },
    setIsLogin(isLogin) {
      this.isLogin = isLogin
    }
  }
})
