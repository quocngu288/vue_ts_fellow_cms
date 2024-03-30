import { reactive, ref, toRefs } from 'vue'
import { IPagination } from '@/core/interfaces/Pagination'
import { useRouter } from 'vue-router'
import useNotifications from '@/shared/composables/useNotifications'
import { IAdmin } from '@/core/interfaces/Admin'
import { useAdminStore } from '@/stores/AdminStore'
import { useI18n } from 'vue-i18n'
import { forEach, get, pickBy } from 'lodash-es'

interface IState {
  isLoading: boolean,
  pagination: IPagination,
  admins: IAdmin[],
  admin: IAdmin
}

export default function useAdmin () {
  const router = useRouter()
  const { openNotification, checkErrorsAPI } = useNotifications()
  const useStoreAdmin = useAdminStore()
  const { t } = useI18n()

  const include = ref({ with: 'roles' })

  const state = reactive<IState>({
    isLoading: false,
    pagination: {} as IPagination,
    admins: [],
    admin: {} as IAdmin
  })

  const fetchAdmins = async (params?: object) => {
    state.isLoading = true
    try {
      const { data, pagination } = await useStoreAdmin.getList({ ...include.value, ...params })
      state.admins = data
      state.pagination = pagination
    } catch (e) {
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.DESCRIPTION_UNSUCCESSFUL')
      })
    } finally {
      state.isLoading = false
    }
  }

  const fetchAdmin = async (id: string, params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreAdmin.getItem(id, { ...include.value, ...params })
      state.admin = data
    } catch (e) {
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.DESCRIPTION_UNSUCCESSFUL')
      })
    } finally {
      state.isLoading = false
    }
  }

  const addAdmin = async (admin: object, action?) => {
    state.isLoading = true
    try {
      await useStoreAdmin.addItem(admin)
      openNotification({})
      await router.push({ name: 'Admin' })
    } catch (err) {
      if (action && err.response.status === 422) {
        checkErrorsAPI(err, action)
      }
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.DESCRIPTION_UNSUCCESSFUL')
      })
    } finally {
      state.isLoading = false
    }
  }

  const updateAdmin = async (id: string, admin: object, action?) => {
    state.isLoading = true
    try {
      await useStoreAdmin.updateItem(id, admin)
      openNotification({})
      await router.push({ name: 'Admin' })
    } catch (err) {
      if (action && err.response.status === 422) {
        checkErrorsAPI(err, action)
      }
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.DESCRIPTION_UNSUCCESSFUL')
      })
    } finally {
      state.isLoading = false
    }
  }

  const deleteAdmin = async (id: string) => {
    state.isLoading = true
    try {
      await useStoreAdmin.deleteItem(id)
      openNotification({})
    } catch (e) {
      openNotification({
        type: 'error',
        message: t('NOTIFICATION.MESSAGE_UNSUCCESSFUL'),
        description: t('NOTIFICATION.DESCRIPTION_UNSUCCESSFUL')
      })
    } finally {
      state.isLoading = false
    }
  }

  return {
    ...toRefs(state),
    fetchAdmins,
    fetchAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin
  }
}
