import { RouteShorthandOptions } from 'fastify'

import { userSchema } from '@src/database/mainDB/models/userModel'

import badRequestErrorSchema from '@src/utils/jsonSchemas/httpError/badRequestErrorSchema'
import notFoundErrorSchema from '@src/utils/jsonSchemas/httpError/notFoundErrorSchema'


export const paramsSchema = {
  type: 'object',
  properties: {
    id: {
      description: 'User ID',
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
          'blogs',
          'comments',
          'authoredArticles',
          'reviewedArticles',
        ],
      },
    },
  },
  required: [],
  additionalProperties: false,
} as const


export const successResponseSchema = userSchema


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Get User by ID',
    description: 'Return a single User by ID',
    tags: ['User'],

    params: paramsSchema,
    querystring: querystringSchema,

    response: {
      200: successResponseSchema,
      400: badRequestErrorSchema,
      404: notFoundErrorSchema,
    },
  },
}
