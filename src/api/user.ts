import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 获取账号信息
 * @param {any} params
 * @return {*}
 */
export const getAccountInfo = (params: any): Promise<any> => {
  return request({
    url: '/user/account',
    method: RequestEnum.GET,
    params
  })
}