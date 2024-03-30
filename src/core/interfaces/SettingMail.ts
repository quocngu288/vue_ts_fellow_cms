import { IBase } from '@/core/interfaces/Base'

export interface IBaseSettingMail extends IBase {
  type: string
  mail_name?: string
  mail_sent: string
  password_mail: string
  host: string
  port: string
  encryption: string
  default: number
}

export type ISettingMail = IBaseSettingMail

export type ISettingMailForm = Omit<IBaseSettingMail, 'mail_name' | 'default'>

export type IMailReceivedResponse = {
  id: number
  mail:string
}
