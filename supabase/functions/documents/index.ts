import { honoObject } from '../_shared/honoObject.ts'
import { _fetch } from './controllers/_fetch.ts'
import { _create } from './controllers/_create.ts'
import { _get } from './controllers/_get.ts'
import { _update } from './controllers/_update.ts'
import { generatePdf } from './controllers/generatePdf.ts'
import { getPdfUrl } from './controllers/getPdfUrl.ts'
import { _delete } from './controllers/_delete.ts'

const app = honoObject('/documents')

app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await _get(auth, id)
  return new Response(JSON.stringify(data))
})

app.get('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await _fetch(auth)
  return new Response(JSON.stringify(data))
})

app.post('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await c.req.json()
  const response = await _create(auth, data)
  return new Response(JSON.stringify(response))
})

app.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await c.req.json()
  const response = await _update(auth, id, data)
  return new Response(JSON.stringify(response))
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await _delete(auth, id)
  return new Response(JSON.stringify(data))
})

app.post('/:id/generate-pdf', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await generatePdf(auth, id)
  return new Response(JSON.stringify(data))
})

app.get('/:id/pdf-url', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await getPdfUrl(auth, id)
  return new Response(JSON.stringify(data))
})

Deno.serve(app.fetch)
