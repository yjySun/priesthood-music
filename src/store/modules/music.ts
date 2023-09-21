import { defineStore } from 'pinia'

export interface IMusicState {
  profile: any
  playList: Array<any>
  isPlay: Boolean
}

export const useMusicStore = defineStore('musicStore', {
  state: (): IMusicState => ({
    profile: '', //当前播放歌曲信息
    playList: [], //当前播放歌曲列表
    isPlay: false //是否正在播放歌曲
  }),
  getters: {
    getProfile(): string {
      return this.profile
    },
    getPlayList(): Array<any> {
      return this.playList
    },
    getIsPlay(): boolean {
      return this.isPlay
    }
  },
  actions: {
    setProfile(profile) {
      this.profile = profile
    },
    setPlayList(playList) {
      this.playList = playList
    },
    setIsPlay(isPlay) {
      this.isPlay = isPlay
    }
  }
})
