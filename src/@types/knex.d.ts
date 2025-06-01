/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      created_at: string
      date: number
      description: string
      id: string
      is_on_diet: boolean
      name: string
      updated_at: string
      user_id: string
    }
    users: {
      created_at: string
      email: string
      id: string
      name: string
      session_id: string
      updated_at: string
    }
  }
}
