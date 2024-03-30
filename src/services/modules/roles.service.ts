import ApiService from '../api.service'
import { AxiosRequestConfig } from 'axios'
import { IResponseType, IResponseTypePaginate } from '@/core/interfaces/Response'
import { IRole } from '@/core/interfaces/Role'

const BaseUrl = 'roles'

export const RoleService = {
  list<T> (data: object = {}) {
    return ApiService.get<IResponseTypePaginate<T>>(`${BaseUrl}`, data).then((resp) => resp.data)
  },

  item<T> (id: string | number, data: object = {}) {
    return ApiService.get<IResponseType<IRole>>(`${BaseUrl}/${id}`, data).then((resp) => resp.data)
  },

  create (data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.post(`${BaseUrl}`, data, config).then((resp) => resp.data)
  },

  edit (id: string | number, data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.put(`${BaseUrl}/${id}`, data, config).then((resp) => resp.data)
  },

  syncPermissions (id: string | number, data: object = {}, config?: AxiosRequestConfig) {
    return ApiService.put(`${BaseUrl}/${id}/sync`, data, config).then((resp) => resp.data)
  },

  delete (id: string | number, params?: object) {
    return ApiService.delete(`${BaseUrl}/${id}`, params).then((resp) => resp)
  }
}
