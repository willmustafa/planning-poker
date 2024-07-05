<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'vue-router'
import { useSessionController } from '@/controllers/session.controller'

const nickname = ref('')
const { createSessionAndUser } = useSessionController()
const toast = useToast()
const router = useRouter()
const userStore = useUserStore()

async function startSession() {
  if (!nickname.value) toast.error('Insira seu nome')
  else {
    const user = await createSessionAndUser(nickname.value)
    if (user.user) {
      await router.push(`/${userStore.user?.session_id}`)
    } else toast.error('Ocorreu um erro para criar a sessão')
  }
}
</script>

<template>
  <div class="d-flex vw-100 vh-100 align-items-center justify-content-center flex-column gap-3">
    <h1>Iniciar nova sessão</h1>
    <form class="d-flex flex-column" @submit.prevent="startSession">
      <div class="mb-3">
        <label class="form-label">Seu Nome</label>
        <input class="form-control" type="text" name="nickname" v-model="nickname" />
      </div>
      <button class="btn btn-success" type="submit">Começar!</button>
    </form>
  </div>
</template>
