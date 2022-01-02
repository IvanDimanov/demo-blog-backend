import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import getMongoosePaginateQuery from '@src/database/mainDB/getMongoosePaginateQuery'

import { querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/articles',
  routeOptions,
  async ({ query }): Promise<FromSchema<typeof successResponseSchema>> => {
    const { articleModel } = fastify.mainDB.models
    const articles = await articleModel
      .paginate(...getMongoosePaginateQuery(query))

    return {
      totalRecords: articles.totalDocs,
      records: articles.docs,
    }
  }
)
