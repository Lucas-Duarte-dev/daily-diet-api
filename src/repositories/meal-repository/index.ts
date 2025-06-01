export interface MealInput {
  date: number
  description: string
  is_on_diet: boolean
  name: string
  user_id: string
}

export interface Meal extends MealInput {
  created_at: string
  id: string
  updated_at: string
}

export interface MealMetrics {
  bestSequence: number
  totalMeals: number
  totalMealsOffDiet: number
  totalMealsOnDiet: number
}

export interface MealRepository {
  create(meal: MealInput): Promise<Meal>
  deleteById(id: string): Promise<void>
  findById(id: string): Promise<Meal | null>
  findByUserId(userId: string): Promise<Meal[]>
  getMetricsByUserId(userId: string): Promise<MealMetrics>
  updateById(id: string, meal: Partial<Omit<MealInput, 'user_id'>>): Promise<Meal>
}
