import { useUserStore } from '@/stores/user.store'
import { useSessionStore } from '@/stores/session.store'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionController } from '@/controllers/session.controller'
import { useUserController } from '@/controllers/user.controller'
import { UserType } from '@/schemas/user.schema'

export const usePokerInit = () => {
  const userStore = useUserStore()
  const sessionStore = useSessionStore()
  const { getSession, listenToSession } = useSessionController()
  const { findUsers, listenToUsers } = useUserController()
  const router = useRouter()

  async function init() {
    if (userStore.user) {
      const session_id = router.currentRoute.value.params.session_id as string
      const { data: sessionData } = await getSession(session_id)
      sessionStore.session = sessionData?.[0] ?? null

      const { data: userData } = await findUsers(session_id)
      userStore.usersInSession = userData?.filter((user) => user.type === UserType.PLAYER) ?? []
      userStore.observersInSession =
        userData?.filter((user) => user.type === UserType.OBSERVER) ?? []

      if (userStore.user && sessionStore.session) {
        listenToUsers(session_id, router)
        listenToSession(session_id)
      }
    }
  }

  onMounted(async () => {
    await init()
  })

  watch(() => userStore.user?.nickname, init)

  return {
    init
  }
}
