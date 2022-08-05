import { defineStore } from 'pinia'

export interface IMusicState {
  profile: any
  playList: Array<any>
}

export const useMusicStore = defineStore('musicStore', {
  state: (): IMusicState => ({
    profile: '', //当前播放歌曲信息
    playList: [] //当前播放歌曲列表
  }),
  getters: {
    getProfile(): string {
      return this.profile
    },
    getPlayList(): string {
      return this.playList
    }
  },
  actions: {
    setProfile(profile) {
      this.profile = profile
    },
    setPlayList(playList) {
      this.playList = playList
    }
  }
})
