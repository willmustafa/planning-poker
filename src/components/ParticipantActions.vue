<script setup lang="ts">
import type { userType } from '@/schemas/user.schema'
import XMarkIcon from '@/assets/XMarkIcon.vue'
import CrownIcon from '@/assets/CrownIcon.vue'
import type { PropType } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { useUserController } from '@/controllers/user.controller'

defineProps({
  participant: {
    type: Object as PropType<userType>,
    required: true
  }
})

const userStore = useUserStore()
const { removeUser } = useUserController()
</script>

<template>
  <span class="actions">
    <i class="admin" v-if="participant.is_admin"><CrownIcon /></i>
    <i
      class="remove"
      v-if="!participant.is_admin && userStore.user?.is_admin"
      @click="removeUser(participant)"
      ><XMarkIcon
    /></i>
  </span>
</template>

<style scoped></style>
