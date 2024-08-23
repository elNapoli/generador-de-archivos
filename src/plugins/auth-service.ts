// plugins/auth-service.ts
import { defineNuxtPlugin } from '#app'
import AuthService from '~/services/authService'

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  const authService = new AuthService(supabase)
  nuxtApp.provide('authService', authService)
})
