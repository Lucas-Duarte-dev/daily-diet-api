import { Meal, MealInput, MealRepository } from '@/repositories/meal-repository'
import { ResourceAlreadyExistsError } from './errors/resource-already-exist'

export interface UpdateMealUseCaseRequest {
  id: string
  meal: Partial<Omit<MealInput, 'user_id'>>
}

export interface UpdateMealUseCaseResponse {
  meal: Meal
}

export class UpdateMealUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ id, meal }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
    const existingMeal = await this.mealRepository.findById(id)

    if (!existingMeal) {
      throw new ResourceAlreadyExistsError()
    }

    const updatedMeal = await this.mealRepository.updateById(id, meal)

    return { meal: updatedMeal }
  }
}
