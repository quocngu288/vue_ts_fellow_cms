import { defineStore } from 'pinia'

interface State {
  loading: boolean
  requestsPending: number
}

export const useLoaderStore = defineStore('LoaderStore', {
  // State
  state: (): State => ({
    loading: false,
    requestsPending: 0
  }),

  // Actions
  actions: {
    show () {
      this.loading = true
    },
    hide () {
      this.loading = false
    },
    pending () {
      if (this.requestsPending === 0) this.show()
      this.requestsPending++
    },
    done () {
      if (this.requestsPending >= 1) this.requestsPending--
      if (this.requestsPending <= 0) this.hide()
    }
  }
})
