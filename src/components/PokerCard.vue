<script setup lang="ts">
defineProps({
  point: [Number, String]
})
</script>

<template>
  <div>
    <div class="card-wrapper">
      <span class="fixed-point fixed-point-top">{{ point }}</span>
      <div>{{ point }}</div>
      <span class="fixed-point fixed-point-bottom">{{ point }}</span>
    </div>
  </div>
</template>

<style scoped>
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
  max-width: 90px;
  height: 150px;
  transition: all 0.6s ease;
}

.unset .card-wrapper {
  opacity: 1;
}

.card-wrapper:hover,
.active .card-wrapper {
  opacity: 1;
  border-color: #2c8dfe;
  margin-bottom: 2rem;
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
