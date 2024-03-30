import { AuthGuard, ResolveGuard } from '@/core/guards'

export default [
  {
    path: '/data-setting',
    beforeEnter: ResolveGuard([AuthGuard]),
    children: [
      {
        path: '',
        name: 'DataSetting',
        component: () => import('@/views/pages/data-setting/DataSettingIndex.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE' }
          ],
          title: 'TITLE.EMPLOYEE'
        }
      }
    ]
  }
]
