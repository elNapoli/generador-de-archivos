// plugins/auth-service.ts
import { defineNuxtPlugin } from '#app'
import templateService from '~/services/templateService'

export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  const authService = new templateService(supabase)
  nuxtApp.provide('templateService', authService)
})
