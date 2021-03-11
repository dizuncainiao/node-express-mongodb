import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: { name: 'TableTool' },
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue'),
    meta: { title: 'Home' },
    children: [
      {
        path: 'tableTool',
        name: 'TableTool',
        component: () => import(/* webpackChunkName: "tableTool" */ '../views/antDemo/tableTool/TableTool.vue'),
        meta: { title: '人员管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  sessionStorage.setItem('selectedKeys', typeof to.name === 'string' ? to.name : '')
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
