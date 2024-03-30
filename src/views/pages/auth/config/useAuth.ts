import { reactive, toRefs } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import useNotifications from '@/shared/composables/useNotifications'
import { IProfile } from '@/core/interfaces/Profile'
import { useI18n } from 'vue-i18n'
import { AuthService } from '@/services/modules/auth.service'
import { useRouter } from 'vue-router'

const useStoreAuth = useAuthStore()
const { openNotification, checkErrorsAPI } = useNotifications()

interface IState {
  isLoading: boolean,
  profile: IProfile | string
}

export default function useAuth () {
  const state = reactive<IState>({
    isLoading: false,
    profile: ''
  })
  const router = useRouter()

  const { t } = useI18n()

  const login = async (params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreAuth.userLogin({ ...params })
      useStoreAuth.setToken(data.access_token)
      openNotification({ type: 'success' })
    } catch (err) {
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: err.response.data.error.message
      })
    } finally {
      state.isLoading = false
    }
  }

  const logout = async () => {
    state.isLoading = true
    try {
      await useStoreAuth.userLogout()
      openNotification({ type: 'success' })
    } catch (err) {
      openNotification({
        type: 'error',
        message: 'Error',
        description: err.response.data.error.message
      })
    } finally {
      state.isLoading = false
    }
  }

  const getProfiles = async () => {
    state.profile = useStoreAuth.profile
  }

  const resetByEmail = async (params?: object, action?) => {
    state.isLoading = true
    try {
      await useStoreAuth.resetPassword(params)
      openNotification({ type: 'success' })
    } catch (err) {
      if (action && err.response.status === 422) {
        checkErrorsAPI(err, action)
      }
      openNotification({
        type: 'error',
        message: 'Error',
        description: err.response.data.error.message
      })
    } finally {
      state.isLoading = false
    }
  }

  const newPassword = async (token: string, params?: object) => {
    state.isLoading = true
    try {
      await AuthService.newPassword(token, params)
      openNotification({ type: 'success' })
      await router.push({ name: 'Login' })
    } catch (err) {
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.NEW_PASSWORD_ERROR_GLOBAL')
      })
    } finally {
      state.isLoading = false
    }
  }

  return {
    ...toRefs(state),
    login,
    logout,
    getProfiles,
    resetByEmail,
    newPassword
  }
}
