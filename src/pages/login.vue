<template>
  <v-app>
    <v-main>
      <v-container
        class="d-flex align-center justify-center h-screen"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="4"
            class="d-flex align-center justify-center"
          >
            <v-sheet
              class="bg-deep-purple pa-12"
              rounded
              width="500"
            >
              <v-form
                v-model="form"
                @submit.prevent="onSubmit"
              >
                <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[required]"
                  placeholder="ejemplo@gmail.com"
                  class="mb-2"
                  label="Correo electrónico"
                  clearable
                />

                <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :rules="[required]"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  clearable
                />

                <br>

                <v-btn
                  :disabled="!form || loading"
                  :loading="feedbackStore.isLoading()"
                  size="large"
                  type="submit"
                  block
                >
                  Iniciar sesión
                </v-btn>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/authStore' // Asegúrate de que la ruta sea correcta
import { FeedbackState } from '~/stores/feedbackStore'
definePageMeta({
  layout: 'public',
})

const authStore = useAuthStore()
const form = ref(false)
const { email, password } = storeToRefs(authStore)
const loading = ref(false)
const feedbackStore = useFeedbackStore()

const onSubmit = async () => {
  if (!form.value) return

  await authStore.signInWithPassword()
}

const required = (v) => {
  return !!v || 'Campo requerido'
}

watch(
  () => feedbackStore.status,
  async (newStatus:FeedbackState) => {
    if(newStatus === FeedbackState.SUCCESS){
      console.log(newStatus)
      await navigateTo('/')
    }
  }
)

onUnmounted(() => {
  feedbackStore.resetState()
})

</script>

<style scoped>
/* Tu estilo aquí */
</style>
