import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

class SubscriptionService {
  private supabase: SupabaseClient

  constructor() {
    this.supabase = useSupabaseClient<Database>()
  }

  async fetchPlans() {
    const response = await this.supabase.functions.invoke(
      'subscriptions',
      { method: 'GET' },
    )
    return JSON.parse(response.data)
  }
}

export default SubscriptionService
