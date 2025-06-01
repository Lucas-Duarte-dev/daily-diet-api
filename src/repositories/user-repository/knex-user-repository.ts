import { knex } from '@/infra/database'
import { User, UserInput, UserRepository } from '.'
import { randomUUID } from 'node:crypto'

export class KnexUserRepository implements UserRepository {
  async create(user: UserInput): Promise<User> {
    const [createdUser] = await knex('users')
      .insert({ ...user, id: randomUUID() })
      .returning('*')
    return createdUser
  }

  async findByEmail(email: string): Promise<null | User> {
    const user = await knex('users').where({ email }).first()
    return user ?? null
  }

  async findBySessionId(sessionId: string): Promise<null | User> {
    const user = await knex('users').where({ session_id: sessionId }).first()
    return user ?? null
  }
}
