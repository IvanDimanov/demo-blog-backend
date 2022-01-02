import { RouteShorthandOptions } from 'fastify'

import { commentSchema } from '@src/database/mainDB/models/commentModel'

import badRequestErrorSchema from '@src/utils/jsonSchemas/httpError/badRequestErrorSchema'
import notFoundErrorSchema from '@src/utils/jsonSchemas/httpError/notFoundErrorSchema'


export const paramsSchema = {
  type: 'object',
  properties: {
    id: {
      description: 'Comment ID',
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
          'article',
        ],
      },
    },
  },
  required: [],
  additionalProperties: false,
} as const


export const successResponseSchema = commentSchema


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Get Comment by ID',
    description: 'Return a single Comment by ID',
    tags: ['Comment'],

    params: paramsSchema,
    querystring: querystringSchema,

    response: {
      200: successResponseSchema,
      400: badRequestErrorSchema,
      404: notFoundErrorSchema,
    },
  },
}
