import { Router } from 'https://deno.land/x/oak/mod.ts'
import db from '../db/index.ts'

const router = new Router()

router.get('/', context => {
  context.response.body = [...db]
})

router.get('/:id', context => {
  const { id } = context.params

  if (id && db.has(id)) {
    context.response.body = db.get(id)
  } else {
    const error = new Error('not found')
    context.response.status = 404
    throw error
  }
})

router.post('/', async context => {
  const result = context.request.body({ type: 'json' })
  const newDino = await result.value

  if (newDino) {
    const id = crypto.randomUUID()
    newDino['id'] = id
    db.set(id, newDino)

    context.response.body = db.get(id)
  }
})

router.delete('/:id', context => {
  const { id } = context.params

  if (id && db.has(id)) {
    try {
      context.response.status = 204
      db.delete(id)
    } catch (error) {
      throw error
    }
  } else {
    context.response.status = 404
    const error = new Error('not found')
    throw error
  }
})

export default router
