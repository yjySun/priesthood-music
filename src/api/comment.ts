import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌曲评论信息
 * @param {any} params
 * @return {*}
 */
export const getSongComment = (id: number, offset: number, limit: number): Promise<any> => {
  return request({
    url: '/comment/music',
    method: RequestEnum.GET,
    params: { id, offset, limit }
  })
}

/**
 * @description: 获取歌单评论信息
 * @param {any} params
 * @return {*}
 */
export const getPlayListComment = (id: number, offset: number, limit: number): Promise<any> => {
  return request({
    url: '/comment/playlist',
    method: RequestEnum.GET,
    params: { id, offset, limit }
  })
}
