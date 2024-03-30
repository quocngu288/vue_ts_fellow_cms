import { i18n } from '@/plugins/i18n'
import dayjs, { Dayjs } from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

dayjs.extend(isSameOrBefore)

const { t } = i18n.global

export const convertPagination = (pagination) => {
  return {
    defaultCurrent: 1,
    defaultPageSize: 50,
    current: parseInt(pagination && pagination.currentPage) || 1,
    total: parseInt(pagination && pagination.total) || null,
    pageSize: parseInt(pagination && pagination.perPage) || null,
    pageCount: parseInt(pagination && pagination.totalPages) || null,
    showSizeChanger: false,
    showTotal: (total) => {
      return `${t('PAGINATION.TOTAL')} ${total} ${t('PAGINATION.ITEMS')}`
    },
    position: ['topRight', 'bottomRight']
  }
}
