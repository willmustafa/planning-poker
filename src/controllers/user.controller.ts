import { userSchema, type userType } from '@/schemas/user.schema'
import { fetchClient } from '@/controllers/fetch.controller'
import { useUserStore } from '@/stores/user.store'

export const useUserController = () => {
  const fetch = fetchClient
  const userStore = useUserStore()

  async function findUsers(session_id: string) {
    return fetch.from('session_users').select().eq('session_id', session_id)
  }

  async function createUser(user: userType) {
    const parsedUser = userSchema.cast(user)
    return fetch
      .from('session_users')
      .insert({
        nickname: parsedUser.nickname,
        session_id: parsedUser.session_id
      })
      .select()
  }

  async function updatePoints(user: typeof userSchema) {
    const parsedUser = userSchema.cast(user)
    const { data } = await fetch
      .from('session_users')
      .update({ points: parsedUser.points })
      .eq('user_id', parsedUser.user_id)
      .eq('session_id', parsedUser.session_id)

    const foundUser = userStore.usersInSession.find((el) => el.user_id === parsedUser.user_id)
    if (foundUser) {
      foundUser.points = parsedUser.points
    }

    return data
  }

  async function resetPoints() {
    if (userStore.user?.session_id) {
      await fetch
        .from('session_users')
        .update({ points: null })
        .eq('session_id', userStore.user?.session_id)

      userStore.usersInSession.map((el) => {
        return {
          ...el,
          points: null
        }
      })
      if (userStore.user?.points) userStore.user.points = null
    }
  }

  function listenToUsers(sessionId: string) {
    fetch
      .channel(`session_users`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'session_users',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          const newPayload = payload.new as any
          if (userStore.user && userStore.user?.user_id === newPayload.user_id)
            userStore.user.points = newPayload.points
          const foundUser = userStore.usersInSession.find((el) => el.user_id === newPayload.user_id)
          if (foundUser) {
            foundUser.points = newPayload.points
          } else {
            userStore.usersInSession.push(newPayload as any)
          }
        }
      )
      .subscribe()
  }

  return {
    updatePoints,
    listenToUsers,
    findUsers,
    createUser,
    resetPoints
  }
}
