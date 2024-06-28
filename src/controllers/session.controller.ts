import { userSchema } from '@/schemas/user.schema'
import { ref } from 'vue'
import { fetchClient } from '@/controllers/fetch.controller'
import type { sessionType } from '@/schemas/session.schema'
import { useSessionStore } from '@/stores/session.store'
import { useUserStore } from '@/stores/user.store'
import { useUserController } from '@/controllers/user.controller'

export const useSessionController = () => {
  const fetch = fetchClient
  const session = ref({})
  const sessionStore = useSessionStore()
  const userStore = useUserStore()
  const { createUser } = useUserController()

  async function createSession() {
    return fetch
      .from('sessions')
      .insert({ info: { points: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89], revealed: false } })
      .select()
  }

  async function updateSession() {
    if (sessionStore.session?.info)
      return fetch
        .from('sessions')
        .update({ info: sessionStore.session.info })
        .eq('session_id', sessionStore.session.session_id)
  }

  async function getSession(session_id: string) {
    return fetch.from('sessions').select().eq('session_id', session_id)
  }

  async function createSessionAndUser(nickname: string) {
    const session: sessionType[] | null = await createSession().then((res) => res.data)
    sessionStore.session = session?.[0] ?? null
    const user = await createUser(
      userSchema.cast({
        nickname,
        session_id: session?.[0]?.session_id
      })
    )
    userStore.user = user.data?.[0] ?? null

    return { user: user.data?.[0], session: session?.[0] }
  }

  function listenToSession(sessionId: string) {
    fetch
      .channel(`sessions`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'sessions',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          session.value = payload.new
        }
      )
      .subscribe()
  }

  return {
    createSession,
    createUser,
    listenToSession,
    createSessionAndUser,
    getSession,
    updateSession,
    session
  }
}
