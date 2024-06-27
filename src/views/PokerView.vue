<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useRepositoryController } from '@/controllers/repository.controller'
import { userSchema } from '@/schemas/user.schema'
import { storeToRefs } from 'pinia'
import PokerCard from '@/components/PokerCard.vue'
import PokModal from '@/components/PokModal.vue'

const { createUser, listenToSession, sessionUsers, updatePoints } = useRepositoryController()
const userStore = useUserStore()
const route = useRoute()
const session_id = route.params.session_id
const nickname = ref('')
const { user } = storeToRefs(userStore)
const isModalOpen = ref(!user)

async function enter() {
  if (nickname.value) {
    const user = await createUser(userSchema.cast({ nickname: nickname.value, session_id }))
    if (user) {
      userStore.user = user[0]
      isModalOpen.value = false
    }
  }
}

watch(user, () => {
  if (user.value) {
    isModalOpen.value = false
    listenToSession(session_id.toString())
  }
})

onMounted(() => {
  if (userStore.user?.user_id) listenToSession(session_id.toString())
  else isModalOpen.value = true
})

const points = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
const currentUserFromSession = computed(() => {
  console.log(sessionUsers.value)
  return sessionUsers.value?.find((el) => (el.user_id = user.value?.user_id))
})

const userPoint = ref<number | null>(null)
function handlePoint(point: number) {
  if (userPoint.value === point) userPoint.value = null
  else userPoint.value = point
}
</script>

<template>
  <div class="d-flex vh-100 vw-100">
    <PokModal :isOpen="isModalOpen">
      <div class="d-flex flex-column gap-2">
        <span>Seu nome</span>
        <input type="text" v-model="nickname" />
      </div>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="enter">Entrar</button>
      </template>
    </PokModal>
    <div class="footer position-fixed vw-100 py-5">
      <div class="container d-flex flex-row align-items-end gap-4">
        <PokerCard
          class="col"
          v-for="point in points"
          :key="point"
          :point="point"
          :class="{ active: point === userPoint, unset: userPoint == null }"
          @click="handlePoint(point)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  bottom: 0;
  left: 0;
}
</style>
