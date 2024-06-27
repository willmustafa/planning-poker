<script setup lang="ts">
defineProps({
  isOpen: Boolean
})
</script>

<template>
  <div>
    <div class="modal-backdrop fade" :class="{ show: isOpen }"></div>
    <div
      class="modal fade modal-dialog-centered"
      :class="{ show: isOpen }"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Informe seu usuário</h1>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
