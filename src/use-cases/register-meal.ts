import { Meal, MealInput, MealRepository } from '@/repositories/meal-repository'

interface RegisterMealUseCaseRequest {
  meal: MealInput
}

interface RegisterMealUseCaseResponse {
  meal: Meal
}

export class RegisterMealUseCase {
  constructor(private mealsRepository: MealRepository) {}

  async execute({ meal }: RegisterMealUseCaseRequest): Promise<RegisterMealUseCaseResponse> {
    const registerMeal = await this.mealsRepository.create(meal)

    return {
      meal: registerMeal,
    }
  }
}
