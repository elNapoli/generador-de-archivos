import { honoObject } from '../_shared/honoObject.ts'
import { fetchDocuments } from './controllers/fetchDocuments.ts'
import { deleteDocument } from './controllers/deleteDocument.ts'
import { createDocument } from './controllers/createDocument.ts'
import { getDocument } from './controllers/getDocument.ts'
import { updateDocument } from './controllers/updateDocument.ts'

const app = honoObject('/document')

app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await getDocument(auth, id)
  return new Response(JSON.stringify(data))
})

app.get('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await fetchDocuments(auth)
  return new Response(JSON.stringify(data))
})

app.post('/', async (c) => {
  const auth = c.req.header('Authorization')
  const data = await c.req.json()
  const response = await createDocument(auth, data)
  return new Response(JSON.stringify(response))
})

app.patch('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await c.req.json()
  const response = await updateDocument(auth, id, data)
  console.log(response)
  return new Response(JSON.stringify(response))
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id')
  const auth = c.req.header('Authorization')
  const data = await deleteDocument(auth, id)
  return new Response(JSON.stringify(data))
})

Deno.serve(app.fetch)
