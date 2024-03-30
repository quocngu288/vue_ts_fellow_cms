import { AuthGuard, ResolveGuard } from '@/core/guards'

export default [
  {
    path: '/admin',
    beforeEnter: ResolveGuard([AuthGuard]),
    children: [
      {
        path: '',
        name: 'Admin',
        component: () => import('@/views/pages/admin/AdminIndex.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE' }
          ],
          title: 'ADMIN.TITLE'
        }
      },
      {
        path: '/admin/create',
        name: 'AdminCreate',
        component: () => import('@/views/pages/admin/AdminCreate.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE', routeName: 'Employee' },
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE_CREATE' }
          ],
          title: 'TITLE.EMPLOYEE'
        }
      },
      {
        path: '/admin/edit/:id',
        name: 'AdminEdit',
        component: () => import('@/views/pages/admin/AdminEdit.vue'),
        props: true,
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE', routeName: 'Employee' },
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE_EDIT' }
          ],
          title: 'TITLE.EMPLOYEE'
        }
      }
    ]
  }
]
