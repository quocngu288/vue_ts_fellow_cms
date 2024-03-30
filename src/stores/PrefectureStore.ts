import { defineStore } from 'pinia'
import { PrefectureService } from '@/services/modules/prefecture.service'

export const usePrefectureStore = defineStore('PrefectureStore', {
  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Get Prefecture List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await PrefectureService.list<string[][]>(params)
    }
  }
})
