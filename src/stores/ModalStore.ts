import { defineStore } from 'pinia'

interface State {
  globalModal: {
    isShow: boolean
    width: string
    title: string | null
    content: string | null
  }
}

export const useModalStore = defineStore('ModalStore', {
  // State
  state: (): State => ({
    globalModal: {
      isShow: false,
      width: '520px',
      title: null,
      content: null
    }
  }),

  // Actions
  actions: {
    toggleModal (payload) {
      this.globalModal = Object.assign(this.globalModal, payload)
    }
  }
})
