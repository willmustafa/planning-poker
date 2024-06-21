import { createClient } from '@supabase/supabase-js'
import { userSchema } from '@/schemas/user.schema'
import { ref, type Ref } from 'vue'

export const useRepositoryController = () => {
  const supabase = createClient(
    import.meta.env.VITE_DB_PROJECT_URL,
    import.meta.env.VITE_DB_ANON_KEY
  )

  const sessionUsers: Ref<
    {
      created_at: string
      nickname: string
      points: number
      session_id: string
      user_id: number
    }[]
  > = ref([])

  async function createSession() {
    const { data, error } = await supabase.from('sessions').insert({}).select()
    return data
  }

  async function createUser(user: typeof userSchema) {
    const parsedUser = userSchema.cast(user)
    const { data, error } = await supabase
      .from('session_users')
      .insert({
        nickname: parsedUser.nickname,
        session_id: parsedUser.session_id
      })
      .select()
    return data
  }

  async function updatePoints(user: typeof userSchema) {
    const parsedUser = userSchema.cast(user)
    const { data, error } = await supabase
      .from('session_users')
      .update(userSchema.cast(user))
      .eq('nickname', parsedUser.nickname)
      .eq('session_id', parsedUser.session_id)
    return data
  }

  function listenToSession(sessionId: string, session: Ref<any>) {
    const channel = supabase
      .channel(`session_users`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'session_users',
          filter: `session_id=eq.${sessionId}`
        },
        (payload) => {
          const newPayload = payload.new
          const foundUser = sessionUsers.value.find((el) => el.user_id === newPayload.user_id)
          if (foundUser) {
            foundUser.points = newPayload.points
          } else {
            sessionUsers.value.push(newPayload as any)
          }
        }
      )
      .subscribe()
    console.log(channel)
  }

  return {
    createSession,
    createUser,
    updatePoints,
    listenToSession,
    sessionUsers
  }
}
