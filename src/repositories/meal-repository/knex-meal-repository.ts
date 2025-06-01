import { knex } from '@/infra/database'
import { Meal, MealInput, MealMetrics, MealRepository } from '.'
import { randomUUID } from 'node:crypto'

export class KnexMealRepository implements MealRepository {
  async create(meal: MealInput): Promise<Meal> {
    const [newMeal] = await knex('meals')
      .insert({ ...meal, id: randomUUID() })
      .returning('*')

    return newMeal
  }

  async deleteById(id: string): Promise<void> {
    await knex('meals').where({ id }).delete()
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await knex('meals').where({ id }).first()

    return meal ?? null
  }

  async findByUserId(userId: string): Promise<Meal[]> {
    const meals = await knex('meals').where({ user_id: userId })

    return meals
  }

  async getMetricsByUserId(userId: string): Promise<MealMetrics> {
    const totalMealsOnDiet = await knex('meals')
      .where({
        user_id: userId,
        is_on_diet: true,
      })
      .count('id', { as: 'total' })
      .first()

    const totalMealsOffDiet = await knex('meals')
      .where({
        user_id: userId,
        is_on_diet: false,
      })
      .count('id', { as: 'total' })
      .first()

    const totalMeals = await knex('meals')
      .where({
        user_id: userId,
      })
      .orderBy('date', 'desc')

    const { bestSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.is_on_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestSequence) {
          acc.bestSequence = acc.currentSequence
        }

        return acc
      },
      { bestSequence: 0, currentSequence: 0 },
    )

    return {
      bestSequence,
      totalMeals: totalMeals.length,
      totalMealsOffDiet: Number(totalMealsOffDiet?.total) || 0,
      totalMealsOnDiet: Number(totalMealsOnDiet?.total) || 0,
    }
  }

  async updateById(id: string, meal: MealInput): Promise<Meal> {
    const [updatedMeal] = await knex('meals').where({ id }).update(meal).returning('*')

    if (!updatedMeal) {
      throw new Error('Meal not found')
    }

    return updatedMeal
  }
}
