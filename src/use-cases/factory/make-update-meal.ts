import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { UpdateMealUseCase } from '../update-meal'

export function makeUpdateMealUseCase() {
  const knexMealRepository = new KnexMealRepository()

  return new UpdateMealUseCase(knexMealRepository)
}
