import { IBase } from '@/core/interfaces/Base'

export interface IIndustryType {
  id: number
  name: string
}

export interface ICompanyInformation {
  key: string
  name: string
}

export interface IConsultationCounters {
  id: number
  name: string
}

interface IBaseMember extends IBase {
  regist_number: string
  agency_name: string
  location: string
  representatives_name: string
  pic_name: string
  url_company: string
  number_of_employees: string
  phone: string
  mail: string
  industry_type: Array<number>
  company_information_exp: string
  company_information: string
  company_information_other: string
  consultation_counters_id: number | null
  note: string
}

export interface IMemberSearch extends Pick<IBaseMember, 'regist_number' | 'agency_name' | 'phone' | 'mail' | 'company_information' | 'company_information_exp'> {
  regist_number_first?: string
  regist_number_last?: string
  industry_type?: string
}

export interface IMember extends Omit<IBaseMember, 'company_information' | 'company_information_exp' | 'number_of_employees' | 'industry_type' | 'consultation_counters_id'> {
  name: string
  number_of_employees: number
  industry_type_1: IIndustryType
  industry_type_2: IIndustryType
  industry_type_3: IIndustryType
  company_information_exp: ICompanyInformation
  company_information: ICompanyInformation
  public_to_consultation_counter: string
  consultation_counters_id: IConsultationCounters

  industryTypes: Array<IIndustryType>
}

export interface IMemberForm extends IBaseMember {
  regist_number_first?: string
  regist_number_last?: string
  other: boolean
}
