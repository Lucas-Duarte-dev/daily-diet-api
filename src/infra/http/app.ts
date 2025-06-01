import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { userRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

export const app = fastify()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(cookie)

app.register(userRoutes, { prefix: 'users' })
app.register(mealsRoutes, { prefix: 'meals' })
