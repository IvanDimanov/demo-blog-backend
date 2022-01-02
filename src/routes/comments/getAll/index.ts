import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import getMongoosePaginateQuery from '@src/database/mainDB/getMongoosePaginateQuery'

import { querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/comments',
  routeOptions,
  async ({ query }): Promise<FromSchema<typeof successResponseSchema>> => {
    const { commentModel } = fastify.mainDB.models
    const comments = await commentModel
      .paginate(...getMongoosePaginateQuery(query))

    return {
      totalRecords: comments.totalDocs,
      records: comments.docs,
    }
  }
)
