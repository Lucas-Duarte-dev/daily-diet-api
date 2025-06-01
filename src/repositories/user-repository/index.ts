export interface UserInput {
  email: string
  name: string
  session_id: string
}

export interface User extends UserInput {
  created_at: string
  id: string
  updated_at: string
}

export interface UserRepository {
  create(user: UserInput): Promise<User>
  findByEmail(email: string): Promise<null | User>
  findBySessionId(sessionId: string): Promise<null | User>
}
