import { makeRegisterMealUseCase } from '@/use-cases/factory/make-register-meal'
import { FastifyInstance } from 'fastify'
import z from 'zod'
import { type ZodTypeProvider } from 'fastify-type-provider-zod'
import { makeUpdateMealUseCase } from '@/use-cases/factory/make-update-meal'
import { makeDeleteMealUseCase } from '@/use-cases/factory/make-delete-meal'
import { makeGetMealsByUserUseCase } from '@/use-cases/factory/make-get-meals-by-user'
import { makeMealMetricsUseCase } from '@/use-cases/factory/make-meal-metrics'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { makeGetMealByIdUseCase } from '@/use-cases/factory/make-get-meal-by-id'
import { ResourceAlreadyExistsError } from '@/use-cases/errors/resource-already-exist'

const registerMealUseCase = makeRegisterMealUseCase()
const updateMealUseCase = makeUpdateMealUseCase()
const deleteMealUseCase = makeDeleteMealUseCase()
const getMealsByUserUseCase = makeGetMealsByUserUseCase()
const mealMetricsUseCase = makeMealMetricsUseCase()
const getMealById = makeGetMealByIdUseCase()

export function mealsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string(),
          is_on_diet: z.boolean(),
          date: z.coerce.date(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description, is_on_diet, date } = request.body

      const userId = request.user?.id

      const meal = await registerMealUseCase.execute({
        meal: {
          name,
          description,
          is_on_diet,
          date: date.getTime(),
          user_id: userId!,
        },
      })

      return reply.status(201).send(meal)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().nullable().optional(),
          description: z.string().optional(),
          is_on_diet: z.boolean().optional(),
          date: z.coerce.date().nullable().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { name, description, is_on_diet, date } = request.body

      const meal = await updateMealUseCase.execute({
        id,
        meal: {
          name: name ?? undefined,
          description: description ?? undefined,
          is_on_diet: is_on_diet ?? undefined,
          date: date?.getTime() ?? undefined,
        },
      })

      return reply.status(200).send(meal)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      await deleteMealUseCase.execute({ mealId: id })

      return reply.status(204).send()
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const userId = request.user?.id

      const meals = await getMealsByUserUseCase.execute({ userId: userId! })

      return reply.status(200).send(meals)
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      try {
        const meal = await getMealById.execute({ mealId: id })

        return reply.status(200).send(meal)
      } catch (error) {
        if (error instanceof ResourceAlreadyExistsError) {
          return reply.status(404).send({ error: 'Meal not found' })
        }

        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/metrics',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const userId = request.user?.id

      const metrics = await mealMetricsUseCase.execute({ userId: userId! })

      return reply.status(200).send(metrics)
    },
  )
}
