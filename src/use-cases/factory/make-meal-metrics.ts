import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { MealMetricsUseCase } from '../meal-metrics'

export function makeMealMetricsUseCase() {
  const knexMealRepository = new KnexMealRepository()

  return new MealMetricsUseCase(knexMealRepository)
}
