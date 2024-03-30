import { defineStore } from 'pinia'
import { MemberService } from '@/services/modules/member.service'
import { IMember } from '@/core/interfaces/Member'

interface State {
  list: IMember[]
}

export const useMemberStore = defineStore('MemberStore', {
  // State
  state: (): State => ({
    list: []
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Get Member List
     * @param params
     * @returns {Promise<void>}
     */
    async getList (params = {}) {
      return await MemberService.list<IMember[]>(params)
    },

    /**
     * Get Member
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async getItem (id, params = {}) {
      return await MemberService.item<IMember>(id, params)
    },

    /**
     * Add Member
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async addItem (id, params = {}) {
      return await MemberService.create(id, params)
    },

    /**
     * Update Member
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async updateItem (id, params = {}) {
      return await MemberService.edit(id, params)
    },

    /**
     * Delete Member
     * @param id
     * @returns {Promise<void>}
     */
    async deleteItem (id) {
      return await MemberService.delete(id)
    }
  }
})
