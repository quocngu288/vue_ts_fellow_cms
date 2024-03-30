import ApiService from '../api.service'

const BaseUrl = 'import'

export const ImportService = {
  importCSV (data: FormData | File) {
    return ApiService.upload(`${BaseUrl}`, data).then((resp) => resp.data)
  }
}
