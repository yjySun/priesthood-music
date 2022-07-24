import axios from 'axios'
import { RequestEnum } from '@/enums/httpEnum'

// 设置接口超时时间
axios.defaults.timeout = 30000
// 接口
axios.defaults.baseURL = import.meta.env.VITE_GLOB_API_URL_PREFIX

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    console.log(err)
  }
)

axios.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {
    console.log([err])
    if (err.response.data.msg == '需要登录') {
      //   vuex.state.isLogin = false
      console.log('need login')
    } else {
      console.log(err.response.data.msg)
    }
  }
)

export const request = (requestModel) => {
  return new Promise((resolve, reject) => {
    let promise
    if (requestModel.method.toUpperCase() === RequestEnum.GET) {
      promise = axios({
        method: RequestEnum.GET,
        url: requestModel.url,
        params: requestModel.params
      })
    } else if (requestModel.method.toUpperCase() === RequestEnum.POST) {
      promise = axios({
        method: RequestEnum.GET,
        url: requestModel.url,
        data: requestModel.params
      })
    }

    promise
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default axios
