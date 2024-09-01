import mammoth from 'npm:mammoth'
import { honoObject } from '../_shared/honoObject.ts'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import { _fetch } from './controllers/_fetch.ts'
import { _create } from './controllers/_create.ts'
import { _get } from './controllers/_get.ts'
import { _update } from './controllers/_update.ts'
import { _delete } from './controllers/_delete.ts'
import { detachAttributeFromTemplate } from './controllers/detachAttributeFromTemplate.ts'
import { attachAttributeToTemplate } from './controllers/atachAttributeToTemplate.ts'

const app = honoObject('/templates')

app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await _get(auth, id)
  return new Response(JSON.stringify(data), { status: data.status })
})

app.post('/:id/attributes', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const body = await c.req.json()
  const data = await attachAttributeToTemplate(auth, id, body)
  return new Response(JSON.stringify(data), { status: data.status })
})

app.get('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await _fetch(auth)
  return new Response(JSON.stringify(data), { status: data.status })
})

app.post('/', async (c) => {
  const auth = c.req.header('Authorization')
  const body = await c.req.json()
  const data = await _create(auth, body)
  return new Response(JSON.stringify(data), { status: data.status })
})

app.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const body = await c.req.json()
  const data = await _update(auth, id, body)
  return new Response(JSON.stringify(data))
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await _delete(auth, id)
  return new Response(JSON.stringify(data)) // TODO: hay que ver por que el codigo 409 no funciona
})

app.delete('/:id/attributes/:attribute-id', async (c) => {
  const id = c.req.param('id')
  const attributeId = c.req.param('attribute-id')
  const auth = c.req.header('Authorization')
  const data = await detachAttributeFromTemplate(auth, attributeId, id)
  return new Response(JSON.stringify(data))
})

app.post('/:id/transform-doc-to-html', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')

  const formData = await c.req.formData()
  const file = formData.get('file') as File

  const arrayBuffer = await file.arrayBuffer()
  const response = await mammoth.convertToHtml({ buffer: arrayBuffer })
  const supabase = supabaseClient(auth)
  const responseQuery = await supabase
    .from('document_templates')
    .update({
      content: response.value,
    })
    .eq('id', id)
  return new Response(JSON.stringify(responseQuery))
})

Deno.serve(app.fetch)
