import { defineStore } from 'pinia'
import { IRole } from '@/core/interfaces/Role'
import { IPagination } from '@/core/interfaces/Pagination'
import { RoleService } from '@/services/modules/roles.service'

interface State {
  list: IRole[]
  pagination: IPagination,
}

export const useRoleStore = defineStore('RoleStore', {
  // State
  state: (): State => ({
    list: [],
    pagination: {} as IPagination
  }),

  // Actions
  actions: {
    /**
     * Get Role List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await RoleService.list<IRole[]>(params)
    },

    /**
     * Get Role
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async getItem (id, params = {}) {
      return await RoleService.item<IRole>(id, params)
    },

    /**
     * Add Role
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async addItem (id, params = {}) {
      return await RoleService.create(id, params)
    },

    /**
     * Update Role
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async updateItem (id, params = {}) {
      return await RoleService.edit(id, params)
    },

    /**
     * Delete Role
     * @param id
     * @returns {Promise<void>}
     */
    async deleteItem (id) {
      return await RoleService.delete(id)
    },

    /**
     * Delete Role
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async syncPermission (id, params = {}) {
      return await RoleService.syncPermissions(id, params)
    }
  }
})
