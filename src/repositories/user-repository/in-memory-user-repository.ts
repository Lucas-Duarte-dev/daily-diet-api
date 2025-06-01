import { randomUUID } from 'node:crypto'
import { User, UserInput, UserRepository } from '.'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async create(user: UserInput): Promise<User> {
    const newUser = { ...user, id: randomUUID(), created_at: new Date().toDateString(), updated_at: new Date().toDateString() } as User
    this.users.push(newUser)
    return newUser
  }

  async findByEmail(email: string): Promise<null | User> {
    const user = this.users.find((user) => user.email === email)
    return user ?? null
  }

  async findBySessionId(sessionId: string): Promise<null | User> {
    const user = this.users.find((user) => user.session_id === sessionId)
    return user ?? null
  }
}
