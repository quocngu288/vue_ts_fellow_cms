import ApiService from '../api.service'
import { IResponseType } from '@/core/interfaces/Response'
import { IToken } from '@/core/interfaces/Auth'
import { IProfile } from '@/core/interfaces/Profile'
import { AxiosRequestConfig } from 'axios'

const BaseUrl = 'auth'

export const AuthService = {
  login (params?: object) {
    return ApiService.post<IResponseType<IToken>>(`${BaseUrl}/login`, params).then(resp => resp.data)
  },

  profile (params?: object) {
    return ApiService.get<IResponseType<IProfile>>(`${BaseUrl}/profile`, params).then(resp => resp.data)
  },

  resetPassword (params?: object) {
    return ApiService.post(`${BaseUrl}/reset-password`, params).then(resp => resp.data)
  },

  newPassword (token: string | number, data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.put(`${BaseUrl}/reset-password/${token}`, data, config).then((resp) => resp.data)
  },

  checkToken (token) {
    return ApiService.get(`${BaseUrl}/check-password/${token}`).then((resp) => resp.data)
  }
}
