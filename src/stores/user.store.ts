import { defineStore } from 'pinia'
import type { userType } from '@/schemas/user.schema'

export const useUserStore = defineStore('user', {
  persist: true,
  state: () => {
    return {
      user: null as userType | null
    }
  }
})
