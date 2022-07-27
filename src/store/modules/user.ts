import { defineStore } from 'pinia'

export interface IUserState {
  profile: any
}

export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    profile: {}
  }),
  getters: {
    getProfile(): any {
      return this.profile
    }
  },
  actions: {
    setProfile(profile) {
      this.profile = profile
    }
  }
})
