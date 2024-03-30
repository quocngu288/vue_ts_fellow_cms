import { defineStore } from 'pinia'
import Cookie from 'js-cookie'
import { AuthService } from '@/services/modules/auth.service'
import { ACCESS_TOKEN } from '@/core/enums/cookie.enum'
import { IProfile } from '@/core/interfaces/Profile'

interface State {
  token: boolean
  profile: IProfile | string
}

export const useAuthStore = defineStore('AuthStore', {
  // State
  state: (): State => ({
    token: !!Cookie.get(ACCESS_TOKEN),
    profile: ''
  }),

  // Getters
  getters: {},

  // Actions
  actions: {
    /**
     * Handle Login
     * @param payload
     */
    async userLogin (payload) {
      return await AuthService.login(payload)
    },

    /**
     * Set token
     * @param payload
     */
    setToken (payload) {
      Cookie.set(ACCESS_TOKEN, payload)
      this.token = !!payload
    },

    /**
     * Handle Logout
     */
    async userLogout () {
      try {
        this.setLogout()

        return true
      } catch (_) {
        return false
      }
    },

    /**
     * Handle Set Logout
     */
    setLogout () {
      this.token = false
      this.profile = ''
      Cookie.remove(ACCESS_TOKEN)
    },

    /**
     * Handle get profile
     */
    async userProfile () {
      try {
        const response = await AuthService.profile()
        this.profile = response.data

        return response
      } catch (err) {
        return err.response.data
      }
    },

    /**
     * Reset password
     * @param payload
     */
    resetPassword (payload) {
      return AuthService.resetPassword(payload)
    },

    /**
     * New password
     * @param token
     * @param params
     */
    newPassword (token, params = {}) {
      return AuthService.newPassword(token, params)
    },

    /**
     * New password
     * @param token
     */
    checkToken (token) {
      return AuthService.checkToken(token)
    }
  }
})
