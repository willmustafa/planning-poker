<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { userSchema, UserType } from '@/schemas/user.schema'
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
const sessionObservers = computed(() => userStore.observersInSession)
const isRevealed = computed(() => sessionStore.session?.info.revealed ?? false)

async function enter(type: UserType) {
  if (nickname.value) {
    const user = await createUser(userSchema.cast({ nickname: nickname.value, session_id, type }))
    if (user) {
      userStore.user = user.data?.[0]
      await init()
    }
  }
}

const userPoint = computed(() => userStore.user?.points)
function handlePoint(point: number) {
  if (userStore.user && !isRevealed.value) {
    if (userPoint.value === point) userStore.user.points = null
    else userStore.user.points = point

    updatePoints(userStore.user as any)
  }
}
</script>

<template>
  <div class="d-flex vh-100 vw-100 justify-center align-items-center position-relative">
    <PokModal :isOpen="!userStore.user?.nickname">
      <form @submit.prevent="() => {}" class="d-flex flex-column gap-2">
        <span>Seu nome</span>
        <input class="form-control" type="text" v-model="nickname" />
      </form>
      <template #footer>
        <div class="d-flex justify-content-between gap-3">
          <button type="button" class="btn btn-outline-light" @click="enter(UserType.OBSERVER)">
            Entrar como observador
          </button>
          <button type="button" class="btn btn-success" @click="enter(UserType.PLAYER)">
            Entrar como jogador
          </button>
        </div>
      </template>
    </PokModal>
    <p class="observers" v-if="sessionObservers.length">
      {{ sessionObservers.length }}
      {{ sessionObservers.length > 1 ? 'Observadores' : 'Observador' }}
    </p>
    <div class="poker col-12 d-flex justify-content-center align-items-center">
      <PokerTable />
    </div>
    <div class="footer position-fixed vw-100 py-5" v-if="userStore.user?.type === UserType.PLAYER">
      <div class="container d-flex flex-row align-items-end gap-4">
        <PokerCard
          class="col"
          v-for="point in sessionStore.session?.info?.points"
          :key="point"
          :point="point"
          :class="{ active: point === userPoint, unset: userPoint == null }"
          @click="handlePoint(point)"
          :isRevealed="isRevealed"
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

.observers {
  position: absolute;
  right: 5vw;
  top: 90px;
  font-size: 0.8rem;
  opacity: 0.5;
}
</style>
