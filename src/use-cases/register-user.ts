import { User, UserInput, UserRepository } from '@/repositories/user-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exist'

interface RegisterUserUseCaseRequest {
  user: UserInput
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ user }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const existingUser = await this.userRepository.findByEmail(user.email)

    if (existingUser) {
      throw new ResourceAlreadyExistsError()
    }

    const newUser = await this.userRepository.create(user)

    return { user: newUser }
  }
}
