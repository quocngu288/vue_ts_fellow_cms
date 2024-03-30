import { AuthGuard, ResolveGuard } from '@/core/guards'

export default [
  {
    path: '/member',
    beforeEnter: ResolveGuard([AuthGuard]),
    children: [
      {
        path: '',
        name: 'Member',
        component: () => import('@/views/pages/member/MemberIndex.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE' }
          ],
          title: 'MEMBER.TITLE'
        }
      },
      {
        path: '/member/create',
        name: 'MemberCreate',
        component: () => import('@/views/pages/member/MemberCreate.vue'),
        meta: {
          breadcrumb: [
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE', routeName: 'Employee' },
            { breadcrumbName: 'BREADCRUMB.EMPLOYEE_CREATE' }
          ],
          title: 'TITLE.EMPLOYEE'
        }
      },
      {
        path: '/member/edit/:id',
        name: 'MemberEdit',
        component: () => import('@/views/pages/member/MemberEdit.vue'),
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
