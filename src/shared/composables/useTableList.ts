import { reactive, toRefs } from 'vue'
import { IPagination } from '@/core/interfaces/Pagination'
import { Modal } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

interface IState {
  filterParams: object,
  arrDates: string[]
}

export default function useTableList ({ emit }) {
  const { t } = useI18n()

  const state = reactive<IState>({
    filterParams: {},
    arrDates: []
  })

  /**
   * Handle change pagination
   * @param pagination
   */
  const handleChangePagination = (pagination: IPagination) => {
    emit('onPageChange', pagination)
  }

  /**
   * Handle edit record
   * @param rowData
   */
  const handleEditRecord = (rowData) => {
    emit('onHandleEdit', rowData)
  }

  /**
   * Show modal delete confirm
   * @param rowData
   */
  const showDeleteConfirm = (rowData) => {
    Modal.confirm({
      title: t('MODAL_CONFIRM.TITLE_DELETE_ADMIN'),
      content: t('MODAL_CONFIRM.CONTENT_DELETE_ADMIN'),
      okText: t('BUTTON.YES'),
      okType: 'danger',
      cancelText: t('BUTTON.NO'),
      onOk: () => handleDeleteRecord(rowData)
    })
  }

  /**
   * Handle delete record
   * @param id
   */
  const handleDeleteRecord = (id) => {
    emit('onHandleDelete', id)
  }

  return {
    ...toRefs(state),
    handleChangePagination,
    handleEditRecord,
    showDeleteConfirm,
    handleDeleteRecord
  }
}
