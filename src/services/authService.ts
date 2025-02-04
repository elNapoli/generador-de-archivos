// services/authService.ts
import type { SupabaseClient } from '@supabase/supabase-js'

class AuthService {
  private supabase: SupabaseClient

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase
  }

  async signInWithPassword(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    })
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
