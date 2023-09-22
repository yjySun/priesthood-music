import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌单详情
 * @param {number} id
 * @param {number} timestamp
 * @return {*}
 */
export const getPlaylistInfo = (id: number, timestamp: number): Promise<any> => {
  return request({
    url: '/playlist/detail',
    method: RequestEnum.GET,
    params: { id, timestamp }
  })
}
