import { defineStore } from 'pinia'
import { IRegister } from '@/core/interfaces/Register'
import { RegisterService } from '@/services/modules/register.service'

interface State {
  list: IRegister[]
}

export const useRegisterStore = defineStore('RegisterStore', {
  // State
  state: (): State => ({
    list: []
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Get Register List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await RegisterService.list<IRegister[]>(params)
    }
  }
})
