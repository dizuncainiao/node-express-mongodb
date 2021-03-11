import request from '@/plugins/axios'
import Qs from 'qs'

// 查询微博热搜
export const weiBoHot = (params: object) => request.post('/weibohot/index', Qs.stringify(params))

// 登录
export const login = (params: object) => request.post('/login', Qs.stringify(params))

// 注册
export const register = (params: object) => request.post('/register', Qs.stringify(params))

// 获取人员列表
export const userList = (params: object) => request.post('/userList', Qs.stringify(params))
