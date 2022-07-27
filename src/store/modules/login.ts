import { defineStore } from 'pinia'

export interface ILoginState {
  errorMsg: string
}

export const useLoginStore = defineStore('loginStore', {
  state: (): ILoginState => ({
    errorMsg: ''
  }),
  getters: {
    getErrorMsg(): string {
      return this.errorMsg
    }
  },
  actions: {
    setErrorMsg(errorMsg) {
      this.errorMsg = errorMsg
    }
  }
})
