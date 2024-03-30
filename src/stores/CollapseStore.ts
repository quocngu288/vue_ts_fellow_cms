import { defineStore } from 'pinia'

interface State {
  sidebarCollapsed: boolean
}

export const useCollapseStore = defineStore('CollapseStore', {
  // State
  state: (): State => ({
    sidebarCollapsed: false
  }),

  // Actions
  actions: {
    setToggleSidebar (payload) {
      this.sidebarCollapsed = payload
    }
  }
})
