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
                @submit.prevent="onSubmit"
              >
                <v-alert
                  v-if="error"
                  class="my-4"
                  type="error"
                  :text="error"
                />
                <v-text-field
                  v-model="form.email"
                  :rules="[required]"
                  placeholder="ejemplo@gmail.com"
                  class="mb-2"
                  label="Correo electrónico"
                  clearable
                />

                <v-text-field
                  v-model="form.password"
                  :rules="[required]"
                  type="password"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña"
                  clearable
                />

                <br>

                <v-btn
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
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/authStore' // Asegúrate de que la ruta sea correcta

definePageMeta({
  layout: 'public',
})

const authStore = useAuthStore()
const { form, error, user } = storeToRefs(authStore)

const onSubmit = async () => {
  await authStore.signInWithPassword()
  if (user.value.aud === 'authenticated') {
    await navigateTo('/')
  }
}

const required = (v) => {
  return !!v || 'Campo requerido'
}
</script>

<style scoped>
/* Tu estilo aquí */
</style>
