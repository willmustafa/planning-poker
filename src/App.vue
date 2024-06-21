<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRepositoryController } from '@/controllers/repository.controller'
import { onMounted, ref, watch } from 'vue'

const { createSession, createUser, updatePoints, listenToSession, sessionUsers } =
  useRepositoryController()
const user = ref({
  nickname: 'willian',
  session_id: '3f48b639-c938-47fe-ab0c-ffce38e76331',
  points: 0
})
const session = ref(null)

onMounted(() => {
  const subscription = listenToSession('3f48b639-c938-47fe-ab0c-ffce38e76331', session)
  console.log(subscription)
})

watch(session, () => {
  console.log(session)
})
</script>

<template>
  <div class="d-flex justify-content-center, align-items-center vw-100 vh-100 flex-column">
    <button @click="createSession">Criar sessão</button>
    <form @submit.prevent="createUser(user)">
      <input type="text" name="session" />
      <input type="text" name="nickname" />
      <button type="submit">Entrar</button>
    </form>
    <form @submit.prevent="updatePoints(user)">
      <input type="number" name="points" v-model="user.points" />
      <button type="submit">Enviar pontos</button>
    </form>
    <div>
      {{ sessionUsers }}
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
