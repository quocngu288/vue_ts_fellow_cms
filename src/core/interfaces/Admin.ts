import { Dayjs } from 'dayjs'
import { IRole } from '@/core/interfaces/Role'
import { IBase } from '@/core/interfaces/Base'

export interface IGender {
  key: string
  name: string
}

interface IBaseAdmin extends IBase {
  full_name: string
  furigana_name: string
  email: string
  gender: IGender
  phone: string
  birthday: string | Dayjs | null
  roles: IRole[]
}

export type IAdminSearch = Pick<IBaseAdmin, 'full_name' | 'furigana_name'>

export type IAdmin = IBaseAdmin

export interface IAdminForm extends Omit<IBaseAdmin, 'gender'> {
  password: string
  password_confirmation: string
  role: string
  gender: string
}
