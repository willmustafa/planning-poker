<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { useSessionStore } from '@/stores/session.store'
import { onMounted } from 'vue'

const userStore = useUserStore()
const sessionStore = useSessionStore()

onMounted(() => {
  if (userStore.user && userStore.user.created_at) {
    const createdDate = new Date(userStore.user.created_at)
    const expireDate = new Date(createdDate.getTime() + 24 * 60 * 60 * 1000)

    if (new Date() > expireDate) {
      userStore.user = null
      userStore.usersInSession = []
      sessionStore.session = null
    }
  }
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
