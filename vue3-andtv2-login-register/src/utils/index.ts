import { RouteRecordRaw } from 'vue-router'
import { onBeforeUnmount, onMounted } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Dot from '@/plugins/Dot'

// 路由信息生成菜单
export function getMenuList (target: RouteRecordRaw[]) {
  target.forEach(item => {
    for (const k in item) {
      if ((k !== 'children' && k !== 'name') && typeof item === 'object') {
        Object.assign(item, {
          key: item.name,
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          title: item.meta.title
        })
        delete item.component
        delete item.redirect
        delete item.path
      }
      if (item.children && item.children.length) getMenuList(item.children)
    }
  })
}

// 获取面包屑数据
export function getKeyPath () {
  const value: string | null = sessionStorage.getItem('keyPath')
  return value ? JSON.parse(value) : ['Home', 'TableTool']
}

// 粒子特效
export function useParticleEffect () {
  const repaintDot = () => Dot('dot', {
    cW: document.documentElement.clientWidth,
    cH: document.documentElement.clientHeight
  })

  onMounted(() => {
    repaintDot()
    window.addEventListener('resize', repaintDot)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', repaintDot)
  })
}
