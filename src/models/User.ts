export interface User {
  aud: string
  confirmed_at: string
  created_at: string
  email: boolean
  email_confirmed_at: string
  id: string
  role: string
  is_anonymous: boolean
}

export const UserInitializer = {
  initState(): User {
    return {
      aud: null,
      confirmed_at: null,
      created_at: null,
      email: null,
      email_confirmed_at: null,
      id: null,
      role: null,
      is_anonymous: null,
    }
  },
}
