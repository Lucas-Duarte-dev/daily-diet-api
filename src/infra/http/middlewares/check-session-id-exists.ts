import { KnexUserRepository } from '@/repositories/user-repository/knex-user-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
  const userRepository = new KnexUserRepository()

  const user = await userRepository.findBySessionId(sessionId)

  if (!user) {
    return reply.status(401).send({ error: 'Unauthorized' })
  }

  request.user = user
}
