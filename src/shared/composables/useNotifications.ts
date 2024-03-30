import { Modal, notification } from 'ant-design-vue'
import { i18n } from '@/plugins/i18n'
import { h } from 'vue'
import { forEach, get } from 'lodash-es'

interface Notification {
  message?: string
  description?: string
  placement?: string
  type?: string
}

const { t } = i18n.global
const openNotification = ({
  message = t('NOTIFICATION.MESSAGE_SUCCESSFUL'),
  description = t('NOTIFICATION.DESCRIPTION_SUCCESSFUL'),
  placement = 'topRight',
  type = 'success'
} : Notification) => {
  const _description = description?.split('\n')
  notification[type]({
    message,
    description: _description.map((item) => h('div', item)),
    placement
  })
}

const openDeleteConfirm = (t, id, callback) => {
  Modal.confirm({
    title: t('MODAL.TITLE_DELETE'),
    content: t('MODAL.CONTENT_DELETE'),
    okText: t('MODAL.OK_TEXT'),
    okType: 'danger',
    cancelText: t('MODAL.CANCEL_TEXT'),
    async onOk () {
      return await callback(id)
    }
  })
}

const checkErrorsAPI = (err, action) => {
  forEach(get(err, 'response.data.errors'), (item) => {
    action.setFieldError(item.field, item.message[0])
  })
}

export default function useNotifications () {
  return { openNotification, openDeleteConfirm, checkErrorsAPI }
}
