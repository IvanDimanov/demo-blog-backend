import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import notFoundReply from '@src/utils/httpReply/notFoundReply'

import { paramsSchema, querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Params: FromSchema<typeof paramsSchema>,
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/users/:id',
  routeOptions,
  async ({ params, query }, reply): Promise<FromSchema<typeof successResponseSchema>> => {
    const { userModel } = fastify.mainDB.models
    const user = await userModel
      .findById(params.id)
      .populate(query.include)

    if (!user) {
      return notFoundReply(
        reply,
        'USER_NOT_FOUND',
        `User with id "${params.id}" was not found`,
      )
    }

    return user
  }
)
