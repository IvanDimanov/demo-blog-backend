import { RouteShorthandOptions } from 'fastify'

import { blogSchema } from '@src/database/mainDB/models/blogModel'

import badRequestErrorSchema from '@src/utils/jsonSchemas/httpError/badRequestErrorSchema'
import notFoundErrorSchema from '@src/utils/jsonSchemas/httpError/notFoundErrorSchema'


export const paramsSchema = {
  type: 'object',
  properties: {
    id: {
      description: 'Blog ID',
      type: 'string',
    },
  },
  required: ['id'],
  additionalProperties: false,
} as const


export const querystringSchema = {
  type: 'object',
  properties: {
    include: {
      description: 'Array of objects to be included in the API response',
      type: 'array',
      items: {
        description: 'Which additional object we`d like to include in the API response',
        type: 'string',
        enum: [
          'articles',
        ],
      },
    },
  },
  required: [],
  additionalProperties: false,
} as const


export const successResponseSchema = blogSchema


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Get Blog by ID',
    description: 'Return a single Blog by ID',
    tags: ['Blog'],

    params: paramsSchema,
    querystring: querystringSchema,

    response: {
      200: successResponseSchema,
      400: badRequestErrorSchema,
      404: notFoundErrorSchema,
    },
  },
}
