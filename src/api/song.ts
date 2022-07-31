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
