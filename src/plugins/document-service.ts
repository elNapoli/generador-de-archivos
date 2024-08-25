// plugins/auth-service.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  const authService = new documentService(supabase)
  nuxtApp.provide('documentService', authService)
})
