import { defineStore } from 'pinia'
import { SettingMailService } from '@/services/modules/setting-mail.service'
import { IMailReceivedResponse, ISettingMail } from '@/core/interfaces/SettingMail'

interface State {
  list: ISettingMail[]
}

export const useMailSettingStore = defineStore('MailSettingStore', {
  // State
  state: (): State => ({
    list: []
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Get Setting Mail Default
     * @param params
     * @returns {Promise<void>}
     */
    async getSettingMailDefault (params = {}) {
      return await SettingMailService.getSettingMailDefault<ISettingMail[]>(params)
    },

    /**
     * Get Setting Mail
     * @param type
     * @param params
     * @returns {Promise<void>}
     */
    async getSettingMail (type, params = {}) {
      return await SettingMailService.getSettingMail<ISettingMail[]>(type, params)
    },

    async getMailReceived () {
      return await SettingMailService.getMailReceived<IMailReceivedResponse>({})
    },

    /**
     * Add Setting Mail Server
     * @param params
     * @returns {Promise<void>}
     */
    async postSettingMailServer (params = {}) {
      return await SettingMailService.postSettingMailServer(params)
    },

    /**
     * Add Mail Received
     * @param params
     * @returns {Promise<void>}
     */
    async postMailReceived (params = {}) {
      return await SettingMailService.postMailReceived(params)
    }
  }
})
