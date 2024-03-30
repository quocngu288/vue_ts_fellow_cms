import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import { router } from '@/router'
import { useAuthStore } from '@/stores/AuthStore'
import { useLoaderStore } from '@/stores/LoaderStore'
import { ACCESS_TOKEN } from '@/core/enums/cookie.enum'
import { DEFAULT_LOCALE } from '@/core/enums/options'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) config.headers = {}

    // check locale
    config.headers['X-localization'] = localStorage.getItem('locale') || DEFAULT_LOCALE

    const token = Cookie.get(ACCESS_TOKEN)
    if (token) config.headers.Authorization = 'Bearer ' + token

    // Loading on
    const useLoader = useLoaderStore()
    useLoader.pending()

    return config
  },
  (error: AxiosError) => {
    // Loading off
    const useLoader = useLoaderStore()
    useLoader.done()

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Loading off
    const useLoader = useLoaderStore()
    useLoader.done()

    return response
  },
  (error: AxiosError) => {
    const { response } = error
    const useLoader = useLoaderStore()
    const useAuth = useAuthStore()

    switch (response?.status) {
      case 401:
        useAuth.setLogout()
        router.push({ name: 'Login' }).then()
        break
      case 404:
        router.push({ name: 'Error404' }).then()
        break
      case 403:
        router.push({ name: 'Error403' }).then()
        break
      case 500:
        router.push({ name: 'Error500' }).then()
        break
    }

    // Loading off
    useLoader.done()

    return Promise.reject(error)
  }
)

export default axiosInstance
