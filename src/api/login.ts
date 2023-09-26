import { request } from '@/utils/http/axios'
import { RequestEnum } from '@/enums/httpEnum'

/**
 * @description: 手机号密码登录
 * @param {string} phone
 * @param {string} captcha
 * @return {*}
 */
export const phoneLogin = (phone: string, captcha: string): Promise<any> => {
  return request({
    url: '/login/cellphone',
    method: RequestEnum.GET,
    params: {phone, captcha},
    returnRes: true
  })
}

/**
 * @description: 发送验证码
 * @param {string} phone
 * @return {*}
 */
export const sendCaptcha = (phone: string): Promise<any> => {
  return request({
    url: '/captcha/sent',
    method: RequestEnum.GET,
    params: { phone }
  })
}

/**
 * @description: {二维码登录} 1.生成一个 key
 * @param {number} timestamp
 * @return {*}
 */
export const getQRcodeKey = (timestamp: number): Promise<any> => {
  return request({
    url: '/login/qr/key',
    method: RequestEnum.GET,
    params: { timestamp }
  })
}

/**
 * @description: {二维码登录} 2.传入key获取二维码
 * @param {string} key
 * @param {boolean} qrimg
 * @param {number} timestamp
 * @return {*}
 */
export const generateQRcode = (key: string, qrimg: boolean, timestamp: number): Promise<any> => {
  return request({
    url: '/login/qr/create',
    method: RequestEnum.GET,
    params: { key, qrimg, timestamp }
  })
}

/**
 * @description: {二维码登录} 3.传入key轮询此接口获取二维码状态
 * @param {string} key
 * @param {number} timestamp
 * @return {*}
 */
export const checkQRcode = (key: string, timestamp: number): Promise<any> => {
  return request({
    url: '/login/qr/check',
    method: RequestEnum.GET,
    params: { key, timestamp }
  })
}

/**
 * @description: 获取登录状态
 * @param {object} cookie
 * @param {number} timestamp
 * @return {*}
 */
export const getLoginStatus = (cookie: object, timestamp: number): Promise<any> => {
  return request({
    url: '/login/status',
    method: RequestEnum.GET,
    params: {cookie, timestamp}
  })
}

/**
 * @description: 退出登录
 * @param {*} Promise
 * @return {*}
 */
export const getLogout = (): Promise<any> => {
  return request({
    url: '/logout',
    method: RequestEnum.GET,
    params: {}
  })
}
