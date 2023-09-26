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
    loginStore.setErrorMsg('发生未知错误，请到控制台查看')
  }
)

export default axios
