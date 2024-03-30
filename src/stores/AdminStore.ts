import { defineStore } from 'pinia'
import { AdminService } from '@/services/modules/admin.service'
import { IAdmin } from '@/core/interfaces/Admin'

interface State {
  list: IAdmin[]
}

export const useAdminStore = defineStore('AdminStore', {
  // State
  state: (): State => ({
    list: []
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Get Admin List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await AdminService.list<IAdmin[]>(params)
    },

    /**
     * Get Admin
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async getItem (id, params = {}) {
      return await AdminService.item<IAdmin>(id, params)
    },

    /**
     * Add Admin
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async addItem (id, params = {}) {
      return await AdminService.create(id, params)
    },

    /**
     * Update Admin
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async updateItem (id, params = {}) {
      return await AdminService.edit(id, params)
    },

    /**
     * Delete Admin
     * @param id
     * @returns {Promise<void>}
     */
    async deleteItem (id) {
      return await AdminService.delete(id)
    }
  }
})
