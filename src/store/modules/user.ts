import { defineStore } from 'pinia'

export interface IUserState {
  likeList: any
}

export const useUserStore = defineStore('userStore', {
  state: (): IUserState => ({
    likeList: ''
  }),
  getters: {
    getLikeList(): any {
      return this.likeList
    }
  },
  actions: {
    setLikeList(likeList) {
      this.likeList = likeList
    }
  }
})
