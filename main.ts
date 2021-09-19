import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import dinosaurs from './routes/dinosaurs.ts'

const router = new Router()

router.get('/', context => {
  context.response.body = 'Deno Dino CRUD'
})

router.use('/dinosaurs', dinosaurs.routes())

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (context, next) => {
  try {
    await next()
  } catch (error) {
    context.response.status = error.status || 500
    context.response.body = {
      message: error.message,
    }
  }
})

const port = 8000
console.log(`Server running on: http://localhost:${port}`)
await app.listen({ port })
