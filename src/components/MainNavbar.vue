<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
function logout() {
  router.push('/')
  userStore.user = null
}
</script>

<template>
  <nav class="navbar navbar-expand-lg py-4 fixed-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Poker Planning Free</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" v-if="route.path === ''">
        <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click="logout">Sair</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-brand {
  color: var(--text-color);
}

.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show {
  color: var(--text-color);
}
</style>
