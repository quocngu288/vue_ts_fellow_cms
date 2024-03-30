import { IBase } from '@/core/interfaces/Base'

interface IBaseIndustry extends IBase {
  name: string
}

export interface IIndustry extends IBaseIndustry {
  index_number: string
}

export interface IIndustryForm {
  name: string
}
