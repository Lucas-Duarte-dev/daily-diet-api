import { makeRegisterUserUseCase } from '@/use-cases/factory/make-register-user'
import { type FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { randomUUID } from 'node:crypto'
import z from 'zod'

const registerUserUseCase = makeRegisterUserUseCase()

export function userRoutes(app: FastifyInstance): void {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          name: z.string().min(1),
        }),
      },
    },
    async (request, reply): Promise<void> => {
      const { email, name } = request.body

      let sessionId = request.cookies.sessionId

      if (!sessionId) {
        sessionId = randomUUID()

        reply.cookie('sessionId', sessionId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
        })
      }

      await registerUserUseCase.execute({
        user: {
          email,
          name,
          session_id: sessionId,
        },
      })

      return reply.status(201).send()
    },
  )
}
