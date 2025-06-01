import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { GetMealsByUserUseCase } from '../get-meals-by-user'

export function makeGetMealsByUserUseCase() {
  const knexMealRepository = new KnexMealRepository()

  return new GetMealsByUserUseCase(knexMealRepository)
}
