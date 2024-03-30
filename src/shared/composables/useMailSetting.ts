import { reactive, ref, toRefs } from 'vue'
import useNotifications from '@/shared/composables/useNotifications'
import { ISettingMail } from '@/core/interfaces/SettingMail'
import { useMailSettingStore } from '@/stores/MailSettingStore'
import { useI18n } from 'vue-i18n'
import { Nullable } from '@/core/interfaces/Base'

interface IState {
  isLoading: boolean,
  settingMails: ISettingMail[],
  mailReceived: Nullable<string>
}

export default function useMailSetting () {
  const { openNotification } = useNotifications()
  const useStoreMailSetting = useMailSettingStore()
  const { t } = useI18n()

  const include = ref(null)

  const state = reactive<IState>({
    isLoading: false,
    settingMails: [],
    mailReceived: null
  })

  const fetchSettingMailDefault = async (params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreMailSetting.getSettingMailDefault({ include: include.value, ...params })
      state.settingMails = data
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

  const fetchSettingMail = async (type, params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreMailSetting.getSettingMail(type, { include: include.value, ...params })
      state.settingMails = data
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

  const postSettingMailServer = async (params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreMailSetting.postSettingMailServer(params)
      state.settingMails = data
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

  const postMailReceived = async (params?: object) => {
    state.isLoading = true
    try {
      const { data } = await useStoreMailSetting.postMailReceived(params)
      state.settingMails = data
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

  const fetchMailReceived = async () => {
    state.isLoading = true
    try {
      const { data } = await useStoreMailSetting.getMailReceived()
      state.mailReceived = data.mail
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
    fetchSettingMailDefault,
    fetchSettingMail,
    fetchMailReceived,
    postSettingMailServer,
    postMailReceived
  }
}
