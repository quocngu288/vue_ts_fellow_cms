import { reactive, ref, toRefs } from 'vue'
import { IPagination } from '@/core/interfaces/Pagination'
import { useRouter } from 'vue-router'
import useNotifications from '@/shared/composables/useNotifications'
import { IMember } from '@/core/interfaces/Member'
import { useMemberStore } from '@/stores/MemberStore'
import { useI18n } from 'vue-i18n'
import { forEach, get } from 'lodash-es'

interface IState {
  isLoading: boolean,
  pagination: IPagination,
  members: IMember[],
  member: IMember
}

export default function useMember () {
  const router = useRouter()
  const { openNotification } = useNotifications()
  const useStoreMember = useMemberStore()
  const { t } = useI18n()

  const include = ref(null)

  const state = reactive<IState>({
    isLoading: false,
    pagination: {} as IPagination,
    members: [],
    member: {} as IMember
  })

  const fetchMembers = async (params?: object) => {
    state.isLoading = true
    try {
      const { data, pagination } = await useStoreMember.getList({ include: include.value, ...params })
      state.members = data
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

  const fetchMember = async (id: string, params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreMember.getItem(id, params)
      state.member = data
      return data
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

  const addMember = async (admin: object, action?) => {
    state.isLoading = true
    try {
      await useStoreMember.addItem(admin)
      openNotification({})
      await router.push({ name: 'Member' })
    } catch (err) {
      if (action && err.response.status === 422) {
        forEach(get(err, 'response.data.errors'), (item) => {
          if (item.field === 'regist_number') {
            action.setFieldError('regist_number_first', item.message[0])
            action.setFieldError('regist_number_last', item.message[0])
          } else if (item.field.includes('industry_type')) {
            action.setFieldError('industry_type', item.message[0])
          } else {
            action.setFieldError(item.field, item.message[0])
          }
        })
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

  const updateMember = async (id: string, admin: object, action?) => {
    state.isLoading = true
    try {
      await useStoreMember.updateItem(id, admin)
      openNotification({})
      await router.push({ name: 'Member' })
    } catch (err) {
      if (action && err.response.status === 422) {
        forEach(get(err, 'response.data.errors'), (item) => {
          if (item.field === 'regist_number') {
            action.setFieldError('regist_number_first', item.message[0])
          } else if (item.field.includes('industry_type')) {
            action.setFieldError('industry_type', item.message[0])
          } else {
            action.setFieldError(item.field, item.message[0])
          }
        })
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

  const deleteMember = async (id: string) => {
    state.isLoading = true
    try {
      await useStoreMember.deleteItem(id)
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
    fetchMembers,
    fetchMember,
    addMember,
    updateMember,
    deleteMember
  }
}
