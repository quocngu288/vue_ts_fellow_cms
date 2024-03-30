import { reactive, toRefs } from 'vue'
import useNotifications from '@/shared/composables/useNotifications'
import { useImportStore } from '@/stores/ImportStore'
import { useModalStore } from '@/stores/ModalStore'
import { useI18n } from 'vue-i18n'

interface IState {
  isLoading: boolean,
}

export default function useImport () {
  const { openNotification } = useNotifications()
  const useStoreImport = useImportStore()
  const useModal = useModalStore()
  const { t } = useI18n()

  const state = reactive<IState>({
    isLoading: false
  })

  const importCSV = async (industry: FormData | File) => {
    state.isLoading = true
    try {
      const res = await useStoreImport.importCSV(industry)
      if (res.datas) {
        const data = res.datas
        useStoreImport.setDataCSV(data)
        showModalResult()
        return
      }
      openNotification({})
    } catch (e) {
      if (e.response.status === 400) {
        useStoreImport.errors = e.response.data.error
        showModalResult()
      }
    } finally {
      state.isLoading = false
    }
  }

  const showModalResult = (): void => {
    useModal.toggleModal({
      isShow: true,
      width: '500px',
      title: t('MODAL.TITLE_IMPORT_RESULT'),
      content: 'ModalResultImportCSV'
    })
  }

  return {
    ...toRefs(state),
    importCSV
  }
}
