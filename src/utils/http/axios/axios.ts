import axios from 'axios'
import { useLoginStore } from '@/store/modules/login'
import { config } from './config'

const loginStore = useLoginStore()

// 设置接口超时时间
axios.defaults.timeout = 30000
// 接口
axios.defaults.baseURL = config[import.meta.env.MODE].BASE_URL
axios.defaults.withCredentials = true

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
    console.log('error info:', [err])
    if (err.response) {
      if (err.response.msg && err.response.msg == '需要登录') {
        console.log('need login')
      } else if (err.response.data.message && err.response.data.message == '当前登录存在安全风险，请稍后再试') {
        loginStore.setErrorMsg('当前登录存在安全风险，请稍后再试')
      }
    }
    if (err.message && err.message == 'timeout of 30000ms exceeded') {
      loginStore.setErrorMsg('访问超时')
    }
  }
)

export default axios
