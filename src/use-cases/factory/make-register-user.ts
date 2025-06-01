import { KnexUserRepository } from '@/repositories/user-repository/knex-user-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUserUseCase() {
  const userRepository = new KnexUserRepository()

  return new RegisterUserUseCase(userRepository)
}
