import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲
 * @param {*} Promise
 * @return {*}
 */
export const getSearchHotDetail = (): Promise<any> => {
  return request({
    url: '/search/hot/detail',
    method: RequestEnum.GET,
    params: {}
  })
}

/**
 * @description: 搜索建议
 * @param {string} keywords
 * @param {number} timestamp
 * @return {*}
 */
export const getSearchSuggest = (keywords: string, timestamp: number): Promise<any> => {
  return request({
    url: '/search/suggest',
    method: RequestEnum.GET,
    params: { keywords, timestamp }
  })
}
