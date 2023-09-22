import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲
 * @param {number | string} ids
 * @param {number} timestamp
 * @return {*}
 */
export const getSongs = (ids: number | string, timestamp: number): Promise<any> => {
  return request({
    url: '/song/detail',
    method: RequestEnum.GET,
    params: { ids, timestamp }
  })
}

/**
 * @description: 获取歌曲url
 * @param {number} id
 * @param {number} timestamp
 * @return {*}
 */
export const getSongUrl = (id: number, timestamp: number): Promise<any> => {
  return request({
    url: '/song/url',
    method: RequestEnum.GET,
    params: { id, timestamp }
  })
}

/**
 * @description: 获取下载歌曲url
 * @param {number} id
 * @param {number} timestamp
 * @return {*}
 */
export const getSongDownloadUrl = (id: number, timestamp: number): Promise<any> => {
  return request({
    url: '/song/download/url',
    method: RequestEnum.GET,
    params: { id, timestamp }
  })
}

/**
 * @description: 获取歌词
 * @param {number} id
 * @return {*}
 */
export const getLyric = (id: number): Promise<any> => {
  return request({
    url: '/lyric',
    method: RequestEnum.GET,
    params: { id }
  })
}
