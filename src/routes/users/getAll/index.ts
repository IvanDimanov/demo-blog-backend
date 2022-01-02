import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import getMongoosePaginateQuery from '@src/database/mainDB/getMongoosePaginateQuery'

import { querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/users',
  routeOptions,
  async ({ query }): Promise<FromSchema<typeof successResponseSchema>> => {
    const { userModel } = fastify.mainDB.models
    const users = await userModel
      .paginate(...getMongoosePaginateQuery(query))

    return {
      totalRecords: users.totalDocs,
      records: users.docs,
    }
  }
)
