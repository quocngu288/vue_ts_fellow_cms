import { reactive, ref, toRefs } from 'vue'
import { IPagination } from '@/core/interfaces/Pagination'
import { useRouter } from 'vue-router'
import useNotifications from '@/shared/composables/useNotifications'
import { IIndustry } from '@/core/interfaces/Industry'
import { useIndustryStore } from '@/stores/IndustryStore'
import { useI18n } from 'vue-i18n'

interface IState {
  isLoading: boolean,
  pagination: IPagination,
  industries: IIndustry[],
  industry: IIndustry
}

export default function useIndustry () {
  const { openNotification } = useNotifications()
  const useStoreIndustry = useIndustryStore()
  const { t } = useI18n()

  const include = ref()

  const state = reactive<IState>({
    isLoading: false,
    pagination: {} as IPagination,
    industries: [],
    industry: {} as IIndustry
  })

  const fetchIndustries = async (params?: object) => {
    state.isLoading = true
    try {
      const { data, pagination } = await useStoreIndustry.getList({ ...include.value, ...params })
      state.industries = data
      state.pagination = pagination

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

  const addIndustry = async (industry: object) => {
    state.isLoading = true
    try {
      await useStoreIndustry.addItem(industry)
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

  const updateIndustry = async (id: string, industry: object) => {
    state.isLoading = true
    try {
      await useStoreIndustry.updateItem(id, industry)
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

  const deleteIndustry = async (id: string) => {
    state.isLoading = true
    try {
      await useStoreIndustry.deleteItem(id)
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
    fetchIndustries,
    addIndustry,
    updateIndustry,
    deleteIndustry
  }
}
