import { defineStore } from 'pinia'
import type { sessionType } from '@/schemas/session.schema'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      session: null as sessionType | null
    }
  }
})
