import { defineStore } from 'pinia'
import type { userType } from '@/schemas/user.schema'

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      user: null as userType | null,
      usersInSession: [] as userType[],
      observersInSession: [] as userType[]
    }
  },

  actions: {
    resetSession() {
      this.user = null
      this.usersInSession = []
      this.observersInSession = []
    }
  }
})
