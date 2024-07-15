import { userSchema, UserType, type userType } from '@/schemas/user.schema'
import { fetchClient } from '@/controllers/fetch.controller'
import { useUserStore } from '@/stores/user.store'
import type { Router } from 'vue-router'
import { useToast } from 'vue-toastification'

export const useUserController = () => {
  const fetch = fetchClient
  const userStore = useUserStore()
  const toast = useToast()

  async function findUsers(session_id: string) {
    return fetch.from('session_users').select().eq('session_id', session_id)
  }

  async function createUser(user: userType) {
    return fetch.from('session_users').insert(userSchema.cast(user)).select()
  }

  async function removeUser(user: userType) {
    return fetch.from('session_users').delete().eq('user_id', user.user_id)
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

  function listenToUsers(sessionId: string, router: Router) {
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
          if (payload.eventType === 'DELETE') {
            const oldPayload = payload.old as userType
            userStore.usersInSession = userStore.usersInSession.filter(
              (user) => user.user_id !== oldPayload.user_id
            )
            if (userStore.user?.user_id === oldPayload.user_id) {
              userStore.resetSession()
              router.push('/')
              toast.error('Você foi removido da sessão')
            }
          } else {
            const newPayload = payload.new as userType
            if (userStore.user && userStore.user?.user_id === newPayload.user_id)
              userStore.user.points = newPayload.points
            const foundUser = userStore.usersInSession.find(
              (el) => el.user_id === newPayload.user_id
            )
            if (foundUser) {
              foundUser.points = newPayload.points
            } else if (newPayload.type === UserType.PLAYER) {
              userStore.usersInSession.push(newPayload as any)
            } else if (newPayload.type === UserType.OBSERVER) {
              userStore.observersInSession.push(newPayload as any)
            }
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
    resetPoints,
    removeUser
  }
}
