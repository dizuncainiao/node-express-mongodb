import { RouteRecordRaw } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { cloneDeep } from 'lodash-es'
import { getMenuList } from '@/utils'

export default function (routes: RouteRecordRaw[]) {
  const cache = routes.filter(route => route.name === 'Home')
  const homeRoute = cache.length ? cloneDeep(cache) : []
  getMenuList(homeRoute)
  return homeRoute
}
