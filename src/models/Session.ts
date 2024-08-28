export interface Session {
  access_token: string
  expires_at: number
  expires_in: number
  refresh_token: string
  token_type: string
}

export const SessionInitializer = {
  initState(): Session {
    return {
      access_token: null,
      expires_at: 0,
      expires_in: 0,
      refresh_token: null,
      token_type: 'bearer',
    }
  },
}
