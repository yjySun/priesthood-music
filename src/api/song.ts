import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲
 * @param {any} params
 * @return {*}
 */
export const getSongs = (params: any): Promise<any> => {
  return request({
    url: '/song/detail',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取歌曲url
 * @param {any} params
 * @return {*}
 */
export const getSongUrl = (params: any): Promise<any> => {
  return request({
    url: '/song/url',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取下载歌曲url
 * @param {any} params
 * @return {*}
 */
export const getSongDownloadUrl = (params: any): Promise<any> => {
  return request({
    url: '/song/download/url',
    method: RequestEnum.GET,
    params
  })
}
