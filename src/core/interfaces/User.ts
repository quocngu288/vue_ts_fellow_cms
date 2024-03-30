export interface IUserLogin {
  email: string
  password: string
}

export interface IUserPasswordReset {
  email: string
}

export interface IUserNewPassword {
  new_password: string
  new_password_confirmation: string
}

export interface IUserRoles {
  id: number
  name: string
}

export interface IUserProfile {
  id: string
  code: string
  full_name: string
  nickname: string
  email: string
  level: number
  department_id?: string
  job_position_id?: string
  created_at: string
  updated_at: string
  deleted_at?: string
  roles?: IUserRoles[]
}
