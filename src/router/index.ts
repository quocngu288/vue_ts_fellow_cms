import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// Modules
import AuthRoute from './routes/auth.route'
import AdminRoute from './routes/admin.route'
import MemberRoute from './routes/member.route'
import DataSettingRoute from '@/router/routes/data-setting.route'
import MailSettingRoute from '@/router/routes/mail-setting.route'

const routes: Array<RouteRecordRaw> = [
  // Auth
  {
    path: '/auth',
    name: 'Auth',
    redirect: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/pages/AuthView.vue'),
    children: [
      ...AuthRoute
    ]
  },

  // Main
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Admin' },
    component: () => import(/* webpackChunkName: "about" */ '@/views/pages/IndexView.vue'),
    children: [
      ...AdminRoute,
      ...MemberRoute,
      ...DataSettingRoute,
      ...MailSettingRoute
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_ROUTE),
  routes,
  scrollBehavior (to) {
    return { top: 0, behavior: 'smooth' }
  }
})

export function setupRouter (app) {
  app.use(router)
}
