import ApiService from '../api.service'
import { IResponseType, IResponseTypePaginate } from '@/core/interfaces/Response'
import { AxiosRequestConfig } from 'axios'

const BaseUrl = ''

export const SettingMailService = {
  getSettingMailDefault<T> (data: object = {}) {
    return ApiService.get<IResponseType<T>>(`${BaseUrl}/get-setting-mail-default`, data).then((resp) => resp.data)
  },

  getSettingMail<T> (type: string | number, data: object = {}) {
    return ApiService.get<IResponseType<T>>(`${BaseUrl}/get-setting-mail/${type}`, data).then((resp) => resp.data)
  },

  postSettingMailServer (data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.post(`${BaseUrl}/setting-mail-server`, data, config).then((resp) => resp.data)
  },

  postMailReceived (data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.post(`${BaseUrl}/mail-for-received`, data, config).then((resp) => resp.data)
  },
  getMailReceived<T> (data: object = {}) {
    return ApiService.get<IResponseType<T>>(`${BaseUrl}/mail-for-received`, data).then((resp) => resp.data)
  }
}
