export const NAVIGATIONS = [
  {
    id: 'admin',
    title: 'ADMIN',
    routeName: 'Admin',
    exact: true,
    icon: 'UserOutlined',
    children: [
      {
        id: 'admin-list',
        title: 'ADMIN_LIST',
        routeName: 'Admin'
      },
      {
        id: 'admin-create',
        title: 'ADMIN_CREATE',
        routeName: 'AdminCreate'
      }
    ]
  },
  {
    id: 'member',
    title: 'MEMBER',
    routeName: 'Member',
    exact: true,
    icon: 'UserOutlined',
    children: [
      {
        id: 'member-list',
        title: 'MEMBER_LIST',
        routeName: 'Member'
      },
      {
        id: 'member-create',
        title: 'MEMBER_CREATE',
        routeName: 'MemberCreate'
      }
    ]
  },
  {
    id: 'data-setting',
    title: 'DATA_SETTING',
    routeName: 'DataSetting',
    exact: true,
    icon: 'SettingOutlined'
  },
  {
    id: 'mail-setting',
    title: 'MAIL_SETTING',
    routeName: 'MailSetting',
    exact: true,
    icon: 'MailOutlined',
    children: [
      {
        id: 'mail-server-setting',
        title: 'MAIL_SERVER_SETTING',
        routeName: 'MailSetting'
      },
      {
        id: 'contact-mail-setting',
        title: 'CONTACT_MAIL_SETTING',
        routeName: 'ContactMailSetting'
      }
    ]
  }
]
