import ApiService from '../api.service'
import { IResponseTypePaginate } from '@/core/interfaces/Response'

const BaseUrl = 'permissions'

export const PermissionService = {
  list<T> (data: object = {}) {
    return ApiService.get<IResponseTypePaginate<T>>(`${BaseUrl}`, data).then((resp) => resp.data)
  }
}
