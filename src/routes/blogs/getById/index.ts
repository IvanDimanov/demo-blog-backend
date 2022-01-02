import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import notFoundReply from '@src/utils/httpReply/notFoundReply'

import { paramsSchema, querystringSchema, successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get<{
  Params: FromSchema<typeof paramsSchema>,
  Querystring: FromSchema<typeof querystringSchema>,
}>(
  '/api/blogs/:id',
  routeOptions,
  async ({ params, query }, reply): Promise<FromSchema<typeof successResponseSchema>> => {
    const { blogModel } = fastify.mainDB.models
    const blog = await blogModel
      .findById(params.id)
      .populate(query.include)

    if (!blog) {
      return notFoundReply(
        reply,
        'BLOG_NOT_FOUND',
        `Blog with id "${params.id}" was not found`,
      )
    }

    return blog
  }
)
