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

/**
 * @description: 多重匹配，获取搜索结果
 * @param {string} keywords
 * @return {*}
 */
export const getMultiMatch = (keywords: string): Promise<any> => {
  return request({
    url: '/search/multimatch',
    method: RequestEnum.GET,
    params: { keywords }
  })
}

/**
 * @description: 传入搜索关键词可以搜索该音乐 /专辑/歌手/歌单/用户
 * @param {string} keywords
 * @return {*}
 */
export const getSearchResult = (keywords: string, offset: number, limit: number): Promise<any> => {
  return request({
    url: '/cloudsearch',
    method: RequestEnum.GET,
    params: { keywords, offset, limit }
  })
}