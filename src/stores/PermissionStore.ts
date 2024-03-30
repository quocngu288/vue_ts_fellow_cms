import { defineStore } from 'pinia'
import { IPermission } from '@/core/interfaces/Role'
import { IPagination } from '@/core/interfaces/Pagination'
import { PermissionService } from '@/services/modules/permissions.service'

interface State {
  list: IPermission[]
  pagination: IPagination,
}

export const usePermissionStore = defineStore('PermissionStore', {
  // State
  state: (): State => ({
    list: [],
    pagination: {} as IPagination
  }),

  // Actions
  actions: {
    /**
     * Get Permission List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await PermissionService.list<IPermission[]>(params)
    }
  }
})
