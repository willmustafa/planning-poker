<script setup lang="ts">
import PokerCard from '@/components/PokerCard.vue'
import { computed, ref } from 'vue'
import type { userType } from '@/schemas/user.schema'
import { useUserStore } from '@/stores/user.store'
import { useUserController } from '@/controllers/user.controller'
import { useSessionStore } from '@/stores/session.store'

const userStore = useUserStore()
const sessionStore = useSessionStore()
const isRevealed = computed(() => sessionStore.session?.info.revealed ?? false)
const { resetPoints } = useUserController()
const sessionUsers = computed(() => userStore.usersInSession)

const sessionUsersGrouped = computed(() => {
  const _sessionUsers = [...sessionUsers.value]
  const result: userType[][] = []

  for (let i = 0; i < 2; i++) {
    if (_sessionUsers.length > 2) {
      result.push(_sessionUsers.splice(0, 2))
    } else {
      break
    }
  }

  if (_sessionUsers.length > 0) {
    result.push(_sessionUsers)
  }

  return result
})

function resetGame() {
  if (sessionStore.session) sessionStore.session.info.revealed = false
  resetPoints()
}

function reveal() {
  if (sessionStore.session) sessionStore.session.info.revealed = true
}

const median = computed(() => {
  return (
    sessionUsers.value.reduce((acc, currentUser) => (acc = (currentUser.points || 0) + acc), 0) /
    sessionUsers.value.length
  )
})
</script>

<template>
  <div class="poker-table col-8">
    <div v-if="sessionUsersGrouped[0]?.length" class="users-wrapper users-left d-flex flex-column">
      <div
        class="user col d-flex align-items-center"
        v-for="participant in sessionUsersGrouped[0]"
        :key="participant.session_id"
      >
        <span>{{ participant.nickname }}</span>
        <PokerCard :point="participant.points" isSmall class="active" :isHidden="!isRevealed" />
      </div>
    </div>
    <div v-if="sessionUsersGrouped[1]?.length" class="users-wrapper users-right d-flex flex-column">
      <div
        class="user col d-flex align-items-center"
        v-for="participant in sessionUsersGrouped[1]"
        :key="participant.session_id"
      >
        <PokerCard :point="participant.points" isSmall class="active" :isHidden="!isRevealed" />
        <span>{{ participant.nickname }}</span>
      </div>
    </div>
    <div v-if="sessionUsersGrouped[2]?.length" class="users-wrapper users-top d-flex">
      <div
        class="user col d-flex align-items-center flex-column text-center"
        v-for="participant in sessionUsersGrouped[1]"
        :key="participant.session_id"
      >
        <span>{{ participant.nickname }}</span>
        <PokerCard :point="participant.points" isSmall class="active" :isHidden="!isRevealed" />
      </div>
    </div>
    <div class="background"></div>
    <div class="info-wrapper d-flex flex-column align-items-center">
      <div class="info mt-auto d-flex gap-1 flex-column align-items-center py-3">
        <input type="text" class="form-control task-input mb-2" placeholder="Digite o card" />
        <button class="btn btn-info" v-if="!isRevealed" @click="reveal">Revelar</button>
        <div v-else>
          <span>Média: {{ median.toFixed(2) }}</span>
          <button class="btn btn-info ms-4" @click="resetGame">Resetar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.poker-table {
  border: var(--table-stroke) 25px solid;
  border-radius: 120px;
  background-color: var(--table-background);
  min-height: 400px;
  position: relative;
}

.background {
  background-image: url('@/assets/table.jpg');
  background-size: 150px;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 90px;
  opacity: 0.1;
}

.info-wrapper {
  min-height: 400px;
  z-index: 10;
  position: relative;
}

.info {
  background-color: var(--table-stroke);
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  padding-left: 6rem;
  padding-right: 6rem;
}

.users-wrapper {
  position: absolute;
  z-index: 11;
}

.users-right {
  right: -120px;
  top: 75px;
  height: 270px;
  width: 200px;
}

.users-left {
  left: -120px;
  top: 75px;
  height: 270px;
  width: 200px;
}

.users-top {
  left: 85px;
  top: -80px;
  height: 270px;
  width: 80%;
}

.user {
  gap: 80px;
}

.users-top .user {
  gap: 50px !important;
}

.user > span {
  width: 120px;
}

.task-input {
  background: transparent;
  border-left: none;
  border-top: none;
  border-right: none;
  text-align: center;
  border-radius: 0;
}

.task-input:focus {
  background: #fff;
}
</style>
