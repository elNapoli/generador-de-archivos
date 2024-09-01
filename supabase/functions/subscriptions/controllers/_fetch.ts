import { supabaseClient } from '../../_shared/supabaseClient.ts'
import { defaultData } from '../../_shared/defaultData.ts'

export const _fetch = async (authHeader) => {
  const supabase = supabaseClient(authHeader)
  const response = await supabase
    .from('subscription_plans')
    .select(`
      id,
      name,
      description,
      price,
      duration,
      trial_duration_days
    `)
    .order('description->order')
    .returns()
  return defaultData([], response)
}
