import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取歌单详情
 * @param {any} params
 * @return {*}
 */
export const getPlaylistInfo = (params: any): Promise<any> => {
  return request({
    url: '/playlist/detail',
    method: RequestEnum.GET,
    params
  })
}
