import { Meal, MealRepository } from '@/repositories/meal-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exist'

interface GetMealByIdUseCaseRequest {
  mealId: string
}

interface GetMealByIdUseCaseResponse {
  meal: Meal
}

export class GetMealByIdUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      throw new ResourceAlreadyExistsError()
    }

    return { meal }
  }
}
