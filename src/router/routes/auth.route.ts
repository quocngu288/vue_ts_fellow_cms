import { LoginGuard, ResolveGuard, CheckTokenGuard } from '@/core/guards'

export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/auth/AuthLogin.vue'),
    meta: {
      title: 'LOGIN.TITLE'
    },
    beforeEnter: ResolveGuard([LoginGuard])
  },
  {
    path: '/password_reset',
    name: 'PasswordReset',
    component: () => import('@/views/pages/auth/AuthPasswordReset.vue'),
    meta: {
      title: 'PASSWORD_RESET.TITLE'
    },
    beforeEnter: ResolveGuard([LoginGuard])
  },
  {
    path: '/new-password/:token',
    name: 'NewPassword',
    component: () => import('@/views/pages/auth/AuthNewPassword.vue'),
    props: true,
    meta: {
      title: 'PASSWORD_RESET.TITLE'
    },
    beforeEnter: ResolveGuard([LoginGuard, CheckTokenGuard])
  }
]
