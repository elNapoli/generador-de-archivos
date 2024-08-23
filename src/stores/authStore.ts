// stores/authStore.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    email: '',
    password: '',
    error: '',
  }),
  actions: {
    async signInWithPassword() {
      const { $authService } = useNuxtApp()

      try {
        return await $authService.signInWithPassword(this.email, this.password)
      }
      catch (e) {
        if (e.status === 401) {
          this.error = 'Datos no coinciden, favor verifique su contraseña o cree una cuenta si aún no se ha registrado'
        }
        else {
          console.log(e)
          this.error = 'Ha ocurrido un error, intente nuevamente'
        }
        return null
      }
    },

    async signOut() {
      const { $authService } = useNuxtApp()

      try {
        return await $authService.signOut()
      }
      catch (e) {
        if (e.status === 401) {
          this.error = 'Datos no coinciden, favor verifique su contraseña o cree una cuenta si aún no se ha registrado'
        }
        else {
          console.log(e)
          this.error = 'Ha ocurrido un error, intente nuevamente'
        }
        return null
      }
    },
  },
})
