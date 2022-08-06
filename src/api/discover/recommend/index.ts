import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取轮播图
 * @param {any} params
 * @return {*}
 */
export const getBanner = (params: any): Promise<any> => {
  return request({
    url: '/banner',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取推荐歌单
 * @param {any} params
 * @return {*}
 */
export const getRecommendMusicList = (params: any): Promise<any> => {
  return request({
    url: '/personalized',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取每日推荐歌曲(需要登录)
 * @param {any} params
 * @return {*}
 */
 export const getDailySongs = (params: any): Promise<any> => {
  return request({
    url: '/recommend/songs',
    method: RequestEnum.GET,
    params
  })
}