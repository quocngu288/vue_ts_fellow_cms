import {
  PlusOutlined,
  FilterOutlined,
  LogoutOutlined,
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  AlignCenterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'

export function setupAntDesignIcon (app) {
  app.component('PlusOutlined', PlusOutlined)
  app.component('FilterOutlined', FilterOutlined)
  app.component('LogoutOutlined', LogoutOutlined)
  app.component('UserOutlined', UserOutlined)
  app.component('LockOutlined', LockOutlined)
  app.component('EyeOutlined', EyeOutlined)
  app.component('EditOutlined', EditOutlined)
  app.component('DeleteOutlined', DeleteOutlined)
  app.component('AlignCenterOutlined', AlignCenterOutlined)
  app.component('MenuFoldOutlined', MenuFoldOutlined)
  app.component('MenuUnfoldOutlined', MenuUnfoldOutlined)
  app.component('MailOutlined', MailOutlined)
  app.component('SettingOutlined', SettingOutlined)
}
