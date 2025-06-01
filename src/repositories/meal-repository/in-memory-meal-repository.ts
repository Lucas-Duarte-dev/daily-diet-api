import { Meal, MealInput, MealMetrics, MealRepository } from '.'

export class InMemoryMealRepository implements MealRepository {
  meals: Meal[] = []

  async create(meal: MealInput): Promise<Meal> {
    const newMeal = {
      ...meal,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Meal

    this.meals.push(newMeal)

    return newMeal
  }

  async deleteById(id: string): Promise<void> {
    this.meals = this.meals.filter((meal) => meal.id !== id)
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.meals.find((meal) => meal.id === id)
    return meal ?? null
  }

  async findByUserId(userId: string): Promise<Meal[]> {
    return this.meals.filter((meal) => meal.user_id === userId)
  }

  async getMetricsByUserId(userId: string): Promise<MealMetrics> {
    const userMeals = this.meals.filter((meal) => meal.user_id === userId)

    const totalMeals = userMeals.length
    const totalMealsOnDiet = userMeals.filter((meal) => meal.is_on_diet).length
    const totalMealsOffDiet = totalMeals - totalMealsOnDiet

    let bestSequence = 0
    let currentSequence = 0

    for (const meal of userMeals) {
      if (meal.is_on_diet) {
        currentSequence++
        bestSequence = Math.max(bestSequence, currentSequence)
      } else {
        currentSequence = 0
      }
    }

    return {
      bestSequence,
      totalMeals,
      totalMealsOffDiet,
      totalMealsOnDiet,
    }
  }

  async updateById(id: string, meal: MealInput): Promise<Meal> {
    const index = this.meals.findIndex((existingMeal) => existingMeal.id === id)

    if (index === -1) {
      throw new Error('Meal not found')
    }

    const updatedMeal = {
      ...this.meals[index],
      ...meal,
      updated_at: new Date().toISOString(),
    } as Meal

    this.meals[index] = updatedMeal

    return updatedMeal
  }
}
