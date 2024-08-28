// stores/authStore.ts
import { defineStore } from 'pinia'
import { useNuxtApp } from '#app'
import { SessionInitializer } from '~/models/Session'
import { UserInitializer } from '~/models/User'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    form: {
      email: null,
      password: null,
    },
    session: SessionInitializer.initState(),
    user: UserInitializer.initState(),
    error: null,
  }),
  actions: {
    async signInWithPassword() {
      const { $authService } = useNuxtApp()
      try {
        const { data, error } = await $authService.signInWithPassword(this.form.email, this.form.password)
        this.user = data.user ? data.user : UserInitializer.initState()
        this.session = data.session ? data.session : SessionInitializer.initState()
        this.error = error ? error.message : error
      }
      catch (e) {
        console.log(e)
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
