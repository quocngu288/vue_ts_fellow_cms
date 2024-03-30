export default [
  {
    path: '/error/500',
    name: 'Error500',
    component: () => import('@/views/pages/errors/ErrorPage500.vue')
  },
  {
    path: '/error/404',
    name: 'Error404',
    component: () => import('@/views/pages/errors/ErrorPage404.vue')
  },
  {
    path: '/error/403',
    name: 'Error403',
    component: () => import('@/views/pages/errors/ErrorPage403.vue')
  }
]
