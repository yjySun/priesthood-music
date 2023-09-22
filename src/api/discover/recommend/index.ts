import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取轮播图
 * @param {any} params
 * @return {*}
 */
export const getBanner = (): Promise<any> => {
  return request({
    url: '/banner',
    method: RequestEnum.GET,
    params: {}
  })
}

/**
 * @description: 获取推荐歌单
 * @param {number} limit
 * @param {number} timestamp
 * @return {*}
 */
export const getRecommendMusicList = (limit: number, timestamp: number): Promise<any> => {
  return request({
    url: '/personalized',
    method: RequestEnum.GET,
    params: { limit, timestamp }
  })
}

 /**
  * @description: 获取每日推荐歌曲(需要登录)
  * @param {*} Promise
  * @return {*}
  */
 export const getDailySongs = (): Promise<any> => {
  return request({
    url: '/recommend/songs',
    method: RequestEnum.GET,
    params: {}
  })
}