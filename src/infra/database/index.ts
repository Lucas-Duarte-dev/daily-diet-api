import { Knex, knex as setupKnex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DATABASE_URL,
        }
      : env.DATABASE_URL,
  migrations: {
    directory: './database/migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export const knex = setupKnex(config)
