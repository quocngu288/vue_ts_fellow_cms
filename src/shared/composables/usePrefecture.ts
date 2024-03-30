import { reactive, ref, toRefs } from 'vue'
import { usePrefectureStore } from '@/stores/PrefectureStore'
import { useI18n } from 'vue-i18n'
import useNotifications from '@/shared/composables/useNotifications'

interface IState {
  isLoading: boolean,
  prefectures: string[][],
}

export default function usePrefecture () {
  const useStorePrefecture = usePrefectureStore()
  const { openNotification } = useNotifications()
  const { t } = useI18n()
  const include = ref()

  const state = reactive<IState>({
    isLoading: false,
    prefectures: []
  })

  const fetchPrefectures = async (params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStorePrefecture.getList({ ...include.value, ...params })
      state.prefectures = data
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
    fetchPrefectures
  }
}
