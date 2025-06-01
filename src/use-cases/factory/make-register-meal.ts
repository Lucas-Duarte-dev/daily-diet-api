import { KnexMealRepository } from '@/repositories/meal-repository/knex-meal-repository'
import { RegisterMealUseCase } from '../register-meal'

export function makeRegisterMealUseCase(): RegisterMealUseCase {
  const knexMealRepository = new KnexMealRepository()

  return new RegisterMealUseCase(knexMealRepository)
}
