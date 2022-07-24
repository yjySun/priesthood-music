import axios from 'axios'
import { useUserStore } from '@/store/modules/user'

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
    console.log('error info:', [err])
    if (err.response.data.msg == '需要登录') {
      const userStore = useUserStore()
      userStore.setIsLogin(false)

      console.log('need login')
    } else {
      console.log(err.response.data.msg)
    }
  }
)

export default axios
