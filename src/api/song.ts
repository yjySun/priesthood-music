import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲
 * @param {any} ids
 * @param {Date} timestamp
 * @return {*}
 */
export const getSongs = (ids: any, timestamp: Date): Promise<any> => {
  return request({
    url: '/song/detail',
    method: RequestEnum.GET,
    params: { ids, timestamp }
  })
}

/**
 * @description: 获取歌曲url
 * @param {any} id
 * @param {Date} timestamp
 * @return {*}
 */
export const getSongUrl = (id: any, timestamp: Date): Promise<any> => {
  return request({
    url: '/song/url',
    method: RequestEnum.GET,
    params: { id, timestamp }
  })
}

/**
 * @description: 获取下载歌曲url
 * @param {any} id
 * @param {Date} timestamp
 * @return {*}
 */
export const getSongDownloadUrl = (id: any, timestamp: Date): Promise<any> => {
  return request({
    url: '/song/download/url',
    method: RequestEnum.GET,
    params: { id, timestamp }
  })
}

/**
 * @description: 获取歌词
 * @param {any} id
 * @return {*}
 */
export const getLyric = (id: any): Promise<any> => {
  return request({
    url: '/lyric',
    method: RequestEnum.GET,
    params: {id}
  })
}
