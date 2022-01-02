import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import getMongoosePaginateQuery from '@src/database/mainDB/getMongoosePaginateQuery'

import { querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/blogs',
  routeOptions,
  async ({ query }): Promise<FromSchema<typeof successResponseSchema>> => {
    const { blogModel } = fastify.mainDB.models
    const blogs = await blogModel
      .paginate(...getMongoosePaginateQuery(query))

    return {
      totalRecords: blogs.totalDocs,
      records: blogs.docs,
    }
  }
)
