<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  point: {
    type: null as unknown as PropType<number | null | undefined>
  },
  isSmall: Boolean,
  isHidden: Boolean
})
</script>

<template>
  <div>
    <Transition name="flip" mode="out-in">
      <div class="card-hidden" v-if="isHidden"></div>
      <div v-else class="card-wrapper" :class="{ small: isSmall }">
        <span class="fixed-point fixed-point-top">{{ point }}</span>
        <div>{{ point }}</div>
        <span class="fixed-point fixed-point-bottom">{{ point }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.flip-enter-active,
.flip-leave-active {
  transition: all 0.2s;
}
.flip-enter,
.flip-leave-to {
  transform: translate(-50%, -50%) rotateY(-90deg);
}
.flip-enter-from,
.flip-leave-from {
  transform: translate(-50%, -50%) rotateY(-90deg);
}

.table-card.not-selected {
  border: 2px dashed var(--brown);
  border-radius: var(--border-radius);
}

.table-card.not-selected .card-hidden {
  background-image: none;
}

.card-hidden {
  width: 50px;
  height: 80px;
  background-image: url('@/assets/card-background.jpg');
  background-size: cover;
  border-radius: var(--border-radius);
}

.card-wrapper {
  background-color: #fff;
  border-radius: var(--border-radius);
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: stretch;
  border: #f7f7f7 2px solid;
  cursor: pointer;
  pointer-events: visible;
  opacity: 0.7;
  transition: all 0.4s ease;
}
.card-wrapper:not(.small) {
  max-width: 90px;
  height: 150px;
}
.card-wrapper.small {
  width: 50px;
  height: 80px;
}
.small > div {
  font-size: 12px !important;
}

.unset .card-wrapper {
  opacity: 1;
}

.card-wrapper:not(.small):hover,
.active .card-wrapper:not(.small) {
  opacity: 1;
  border-color: #2c8dfe;
  margin-bottom: 2rem;
}

.card-wrapper:hover,
.active .card-wrapper {
  opacity: 1;
}

.card-wrapper > div {
  flex: 1;
  border-radius: var(--border-radius);
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--dark);
  font-size: 20px;
  font-weight: bold;
}

.small .fixed-point {
  width: 20px;
  height: 20px;
}

.fixed-point {
  position: absolute;
  background-color: #fff;
  border-radius: calc(var(--border-radius) * 5);
  color: var(--dark);
  font-size: 6px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fixed-point-top {
  left: 0;
  top: 0;
}
.fixed-point-bottom {
  right: 0;
  bottom: 0;
}
</style>
