import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      created_at: string
      email: string
      id: string
      name: string
      session_id: string
      updated_at: string
    }
  }
}
