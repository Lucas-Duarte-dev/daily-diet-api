import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { DeleteMealUseCase } from '../delete-meal'

export function makeDeleteMealUseCase(): DeleteMealUseCase {
  const mealRepository = new KnexMealRepository()

  return new DeleteMealUseCase(mealRepository)
}
