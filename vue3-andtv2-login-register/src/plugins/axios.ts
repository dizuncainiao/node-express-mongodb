import axios from 'axios'
import { notification } from 'ant-design-vue'

const request = axios.create({
  baseURL: 'http://localhost:8076/',
  timeout: 6000
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  return error
}

// 全局通知统一处理
const notifyHandler = (info: any) => {
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
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  notifyHandler(response.data)
  return response.data
}, errorHandler)

export default request
