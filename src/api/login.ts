import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 手机号密码登录
 * @param {any} params
 * @return {*}
 */
export const phoneLogin = (params: any): Promise<any> => {
  return request({
    url: '/login/cellphone',
    method: RequestEnum.GET,
    params,
    returnRes: true
  })
}

/**
 * @description: {二维码登录} 1.生成一个 key
 * @param {any} params
 * @return {*}
 */
export const getQRcodeKey = (params: any): Promise<any> => {
  return request({
    url: '/login/qr/key',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: {二维码登录} 2.传入key获取二维码
 * @param {any} params
 * @return {*}
 */
export const generateQRcode = (params: any): Promise<any> => {
  return request({
    url: '/login/qr/create',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: {二维码登录} 3.传入key轮询此接口获取二维码状态
 * @param {any} params
 * @return {*}
 */
export const checkQRcode = (params: any): Promise<any> => {
  return request({
    url: '/login/qr/check',
    method: RequestEnum.GET,
    params
  })
}

/**
 * @description: 获取登录状态
 * @param {any} params
 * @return {*}
 */
export const getLoginStatus = (params?: any): Promise<any> => {
  return request({
    url: '/login/status',
    method: RequestEnum.GET,
    params
  })
}
