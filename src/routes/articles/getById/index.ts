import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import notFoundReply from '@src/utils/httpReply/notFoundReply'

import { paramsSchema, querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Params: FromSchema<typeof paramsSchema>,
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/articles/:id',
  routeOptions,
  async ({ params, query }, reply): Promise<FromSchema<typeof successResponseSchema>> => {
    const { articleModel } = fastify.mainDB.models
    const article = await articleModel
      .findById(params.id)
      .populate(query.include)

    if (!article) {
      return notFoundReply(
        reply,
        'ARTICLE_NOT_FOUND',
        `Article with id "${params.id}" was not found`,
      )
    }

    return article
  }
)
