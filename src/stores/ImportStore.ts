import { defineStore } from 'pinia'
import { ImportService } from '@/services/modules/import.service'

interface IErrorCSV {
  line: number
  message: string
  type: string
}

interface IErrors {
  error: IErrorCSV[]
  success
}

interface State {
  errors: IErrors,
  fail: number,
  success: number,
}

export const useImportStore = defineStore('ImportStore', {
  // State
  state: (): State => ({
    errors: {} as IErrors,
    fail: 0,
    success: 0
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Import file
     * @param id
     * @param params
     * @returns {Promise<void>}
     */
    async importCSV (params: FormData | File) {
      return await ImportService.importCSV(params)
    },

    setDataCSV (payload) {
      this.errors = payload.error
      this.fail = payload.fail
      this.success = payload.success
    }
  }
})
