import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲
 * @param {any} params
 * @return {*}
 */
export const getSearchHotDetail = (params: any): Promise<any> => {
  return request({
    url: '/search/hot/detail',
    method: RequestEnum.GET,
    params
  })
}


/**
 * @description: 搜索建议
 * @param {any} params
 * @return {*}
 */
export const getSearchSuggest = (params: any): Promise<any> => {
  return request({
    url: '/search/suggest',
    method: RequestEnum.GET,
    params
  })
}
