import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取账号信息
 * @param {any} params
 * @return {*}
 */
export const getAccountInfo = (params: any): Promise<any> => {
  return request({
    url: '/user/account',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取用户的歌单
 * @param {number} uid
 * @param {number} timestamp
 * @return {*}
 */
export const getUserPayList = (uid: number, timestamp: number): Promise<any> => {
  return request({
    url: '/user/playlist',
    method: RequestEnum.GET,
    params: {uid, timestamp}
  })
}

/**
 * @description: 用户喜欢的音乐列表
 * @param {number} uid
 * @param {number} timestamp
 * @return {*}
 */
export const getUserLikeList = (uid: number, timestamp: number): Promise<any> => {
  return request({
    url: '/likelist',
    method: RequestEnum.GET,
    params: {uid, timestamp}
  })
}

/**
 * @description: 喜欢某个音乐
 * @param {number} id
 * @param {boolean} like
 * @param {number} timestamp
 * @return {*}
 */
export const likeMusic = (id: number, like: boolean, timestamp: number): Promise<any> => {
  return request({
    url: '/like',
    method: RequestEnum.GET,
    params: {id, like, timestamp}
  })
}

