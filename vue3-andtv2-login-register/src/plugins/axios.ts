import axios from 'axios'
import { notification } from 'ant-design-vue'
import App from '@/plugins/App'

const router = App.config.globalProperties.$router
const request = axios.create({
  baseURL: 'http://localhost:8076/',
  timeout: 6000
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  console.log(JSON.stringify(error), 'line 13')
  if (error.message === 'Network Error') {
    return notification.error({ message: 'Network Error' })
  }
  switch (error.response.status) {
    case 401:
      notification.error({ message: error.response.data.msg })
      localStorage.removeItem('token')
      router.replace({ name: 'Login' })
      break
    default:
      break
  }
}

// 全局通知统一处理
const notifyHandler = (info: any) => {
  console.log(info.code, 'info.code')
  switch (info.code) {
    case 200:
      info.msg && notification.success({ message: info.msg })
      break
    case 4000:
      info.msg && notification.warning({ message: info.msg })
      break
    default:
      info.msg && notification.info({ message: info.msg })
      break
  }
}

// request interceptor
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  notifyHandler(response.data)
  return response.data
}, errorHandler)

export default request
