<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
</script>

<template>
  <div>
    <MainNavbar />
    <div>
      <router-view />
    </div>
    <footer class="position-fixed fixed-bottom w-100 text-center p-3 opacity-65">
      Criado por <a href="https://willmustafa.github.io/">Willian Mustafa</a> - acesse meu
      <a href="https://github.com/willmustafa/"> Github</a>
    </footer>
  </div>
</template>

<style scoped>
footer {
  opacity: 0.75;
}
</style>
