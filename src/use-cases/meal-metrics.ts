import { MealMetrics, MealRepository } from '@/repositories/meal-repository'

interface MealMetricsUseCaseRequest {
  userId: string
}

interface MealMetricsUseCaseResponse {
  metrics: MealMetrics
}

export class MealMetricsUseCase {
  constructor(private mealRepository: MealRepository) {}

  async execute({ userId }: MealMetricsUseCaseRequest): Promise<MealMetricsUseCaseResponse> {
    const metrics = await this.mealRepository.getMetricsByUserId(userId)

    return {
      metrics,
    }
  }
}
