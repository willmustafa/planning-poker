<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { userSchema } from '@/schemas/user.schema'
import { storeToRefs } from 'pinia'
import PokerCard from '@/components/PokerCard.vue'
import PokModal from '@/components/PokModal.vue'
import PokerTable from '@/components/PokerTable.vue'
import { useUserController } from '@/controllers/user.controller'
import { usePokerInit } from '@/composables/pokerInit.composable'
import { useSessionStore } from '@/stores/session.store'

const { init } = usePokerInit()
const { createUser, updatePoints } = useUserController()
const userStore = useUserStore()
const sessionStore = useSessionStore()
const route = useRoute()
const session_id = route.params.session_id
const nickname = ref('')

async function enter() {
  if (nickname.value) {
    const user = await createUser(userSchema.cast({ nickname: nickname.value, session_id }))
    if (user) {
      userStore.user = user.data?.[0]
      await init()
    }
  }
}

const userPoint = computed(() => userStore.user?.points)
function handlePoint(point: number) {
  if (userStore.user) {
    if (userPoint.value === point) userStore.user.points = null
    else userStore.user.points = point

    updatePoints(userStore.user as any)
  }
}
</script>

<template>
  <div class="d-flex vh-100 vw-100 justify-center align-items-center">
    <PokModal :isOpen="!userStore.user?.nickname">
      <div class="d-flex flex-column gap-2">
        <span>Seu nome</span>
        <input type="text" v-model="nickname" />
      </div>
      <template #footer>
        <button type="button" class="btn btn-primary" @click="enter">Entrar</button>
      </template>
    </PokModal>
    <div class="poker col-12 d-flex justify-content-center align-items-center">
      <PokerTable />
    </div>
    <div class="footer position-fixed vw-100 py-5">
      <div class="container d-flex flex-row align-items-end gap-4">
        <PokerCard
          class="col"
          v-for="point in sessionStore.session?.info?.points"
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

.poker {
  margin-bottom: 150px;
}
</style>
