import { Meal, MealRepository } from '@/repositories/meal-repository'

interface GetMealsByUserUseCaseRequest {
  userId: string
}

interface GetMealsByUserUseCaseResponse {
  meals: Meal[]
}

export class GetMealsByUserUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ userId }: GetMealsByUserUseCaseRequest): Promise<GetMealsByUserUseCaseResponse> {
    const meals = await this.mealRepository.findByUserId(userId)

    return { meals }
  }
}
