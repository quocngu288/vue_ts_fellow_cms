export interface IPermission {
  id: number
  name: string
  category: string
}

export interface IRole {
  id: number
  name: string
  guard_name: string
  permissions?: IPermission[]
}

export interface IRoleForm {
  name: string
  permission_ids: number[]
}

export interface ITreeChild {
  key: string,
  title: string
}

export interface ITreeData {
  key: string,
  title: string,
  children?: ITreeChild[]
}
