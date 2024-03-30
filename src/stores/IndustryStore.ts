import { defineStore } from 'pinia'
import { IndustryService } from '@/services/modules/industry.service'
import { IIndustry } from '@/core/interfaces/Industry'

interface State {
  list: IIndustry[],
  isReload: boolean
}

export const useIndustryStore = defineStore('IndustryStore', {
  // State
  state: (): State => ({
    list: [],
    isReload: false
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Set Is Reload
     * @param payload
     */
    setIsReload (payload) {
      this.isReload = payload
    },

    /**
     * Get Industry List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await IndustryService.list<IIndustry[]>(params)
    },

    /**
     * Add Industry
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async addItem (id, params = {}) {
      return await IndustryService.create(id, params)
    },

    /**
     * Update Industry
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async updateItem (id, params = {}) {
      return await IndustryService.edit(id, params)
    },

    /**
     * Delete Industry
     * @param id
     * @returns {Promise<void>}
     */
    async deleteItem (id) {
      return await IndustryService.delete(id)
    }
  }
})
