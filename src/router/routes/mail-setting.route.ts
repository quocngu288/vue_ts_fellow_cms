import { AuthGuard, ResolveGuard } from '@/core/guards'

export default [
  {
    path: '/mail-setting',
    beforeEnter: ResolveGuard([AuthGuard]),
    children: [
      {
        path: '',
        redirect: '/mail-setting/server'
      },
      {
        path: 'server',
        name: 'MailSetting',
        component: () => import('@/views/pages/mail-setting/MailServerSettingIndex.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.MAIL_SERVER_SETTING' }
          ],
          title: 'MAIL_SERVER_SETTING.TITLE'
        }
      },
      {
        path: 'contact',
        name: 'ContactMailSetting',
        component: () => import('@/views/pages/mail-setting/ContactMailSettingIndex.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.CONTACT_MAIL_SETTING' }
          ],
          title: 'CONTACT_MAIL_SETTING.TITLE'
        }
      }
    ]
  }
]
