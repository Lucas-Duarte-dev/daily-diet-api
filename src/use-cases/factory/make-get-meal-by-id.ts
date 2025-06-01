import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { GetMealByIdUseCase } from '../get-meal-by-id'

export function makeGetMealByIdUseCase() {
  const knexMealRepository = new KnexMealRepository()

  return new GetMealByIdUseCase(knexMealRepository)
}
