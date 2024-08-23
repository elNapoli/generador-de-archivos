// services/authService.ts
import type { SupabaseClient } from '@supabase/supabase-js'

class AuthService {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async signInWithPassword(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return data
    }
    catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      throw new Error('Error al iniciar sesión')
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut()

      if (error) {
        throw error
      }
    }
    catch (error) {
      console.error('Error al iniciar sesión:', error.message)
      throw new Error('Error al iniciar sesión')
    }
  }
}

export default AuthService
