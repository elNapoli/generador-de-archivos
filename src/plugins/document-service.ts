// plugins/auth-service.ts
import { defineNuxtPlugin } from '#app'
import documentService from '~/services/documentService'

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  const authService = new documentService(supabase)
  nuxtApp.provide('documentService', authService)
})
