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
                  :loading="loading"
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

definePageMeta({
  layout: 'public',
})

const authStore = useAuthStore()
const form = ref(false)
const { email, password, error } = storeToRefs(authStore)
const loading = ref(false)

const onSubmit = async () => {
  if (!form.value) return

  loading.value = true

  try {
    await authStore.signInWithPassword()
    await navigateTo('/')
  }
  catch (err) {
    console.error('Error al iniciar sesión:', err)
  }
  finally {
    loading.value = false
  }
}

const required = (v) => {
  return !!v || 'Campo requerido'
}
</script>

<style scoped>
/* Tu estilo aquí */
</style>
