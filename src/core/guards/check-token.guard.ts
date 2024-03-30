import { NavigationGuardNext } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'
import { i18n } from '@/plugins/i18n'
import useNotifications from '@/shared/composables/useNotifications'

const { openNotification } = useNotifications()

export const CheckTokenGuard = async (to, from, next:NavigationGuardNext) => {
  const { token } = to.params
  const useStore = useAuthStore()

  const { t } = i18n.global
  if (!token) {
    return next({ name: 'Login' })
  }

  try {
    await useStore.checkToken(token)
  } catch (err) {
    openNotification({
      type: 'error',
      message: t('NOTIFICATION.NEW_PASSWORD_FAIL'),
      description: err.response.data.error.message + '\n' + t('NOTIFICATION.NEW_PASSWORD_ERROR_GLOBAL')
    })
    // redirect to log in route
    return next({ name: 'Login' })
  }

  next()
}
