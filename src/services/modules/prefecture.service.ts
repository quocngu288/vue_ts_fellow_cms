import ApiService from '../api.service'
import { IResponseTypePaginate } from '@/core/interfaces/Response'

const BaseUrl = 'consultation-counter'

export const PrefectureService = {
  list<T> (data: object = {}) {
    return ApiService.get<IResponseTypePaginate<T>>(`${BaseUrl}`, data).then((resp) => resp.data)
  }
}
