import ApiService from '../api.service'
import { IResponseTypePaginate } from '@/core/interfaces/Response'

const BaseUrl = 'register'

export const RegisterService = {
  list<T> (data: object = {}) {
    return ApiService.get<IResponseTypePaginate<T>>(`${BaseUrl}`, data).then((resp) => resp.data)
  }
}
