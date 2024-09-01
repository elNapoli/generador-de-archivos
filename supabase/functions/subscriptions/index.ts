import { honoObject } from '../_shared/honoObject.ts'
import { _fetch } from './controllers/_fetch.ts'

const app = honoObject('/subscriptions')

app.get('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await _fetch(auth)
  return new Response(JSON.stringify(data), { status: data.status })
})

Deno.serve(app.fetch)
