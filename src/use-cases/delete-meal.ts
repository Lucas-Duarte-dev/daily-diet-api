import { MealRepository } from '@/repositories/meal-repository'

interface DeleteMealUseCaseRequest {
  mealId: string
}

interface DeleteMealUseCaseResponse {
  success: boolean
}

export class DeleteMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ mealId }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) {
      throw new Error('Meal not found')
    }

    await this.mealRepository.deleteById(mealId)

    return { success: true }
  }
}
