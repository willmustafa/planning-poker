<script setup lang="ts">
import PokerCard from '@/components/PokerCard.vue'
import { ref } from 'vue'
const isRevealed = ref()
</script>

<template>
  <div class="poker-table col-8">
    <div class="users-wrapper users-left d-flex flex-column">
      <div class="user col d-flex align-items-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
      <div class="user col d-flex align-items-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
    </div>
    <div class="users-wrapper users-right d-flex flex-column">
      <div class="user col d-flex align-items-center">
        <PokerCard point="2" isSmall class="active" />
        <span>João de almeida</span>
      </div>
      <div class="user col d-flex align-items-center">
        <PokerCard point="2" isSmall class="active" />
        <span>João de almeida</span>
      </div>
    </div>
    <div class="users-wrapper users-top d-flex">
      <div class="user col d-flex align-items-center flex-column text-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
      <div class="user col d-flex align-items-center flex-column text-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
      <div class="user col d-flex align-items-center flex-column text-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
      <div class="user col d-flex align-items-center flex-column text-center">
        <span>João de almeida</span>
        <PokerCard point="2" isSmall class="active" />
      </div>
    </div>
    <div class="background"></div>
    <div class="info-wrapper d-flex flex-column align-items-center">
      <div class="info mt-auto d-flex gap-1 flex-column align-items-center py-3">
        <span>EV-580</span>
        <button class="btn btn-info" v-if="!isRevealed" @click="isRevealed = !isRevealed">
          Revelar
        </button>
        <span v-else>Média: 4,5</span>
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
</style>
