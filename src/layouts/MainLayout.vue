<script setup lang="ts">
import MainNavbar from '@/components/MainNavbar.vue'
</script>

<template>
  <div>
    <MainNavbar />
    <div>
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
