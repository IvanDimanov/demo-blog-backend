import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
import { Types } from 'mongoose'

import notFoundReply from '@src/utils/httpReply/notFoundReply'

import { paramsSchema, querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Params: FromSchema<typeof paramsSchema>,
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/comments/:id',
  routeOptions,
  async ({ params, query }, reply): Promise<FromSchema<typeof successResponseSchema>> => {
    const { commentModel } = fastify.mainDB.models
    const comment = await commentModel
      .findById(new Types.ObjectId(params.id))
      .populate(query.include)

    if (!comment) {
      return notFoundReply(
        reply,
        'COMMENT_NOT_FOUND',
        `Comment with id "${params.id}" was not found`,
      )
    }

    return comment
  }
)
