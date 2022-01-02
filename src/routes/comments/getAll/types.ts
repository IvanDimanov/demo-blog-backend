import { RouteShorthandOptions } from 'fastify'

import { commentSchema } from '@src/database/mainDB/models/commentModel'

import whereRulesSchema from '@src/utils/jsonSchemas/whereRulesSchema'
import orderBySchema from '@src/utils/jsonSchemas/orderBySchema'
import pageSchema from '@src/utils/jsonSchemas/pageSchema'

import badRequestErrorSchema from '@src/utils/jsonSchemas/httpError/badRequestErrorSchema'


export const querystringSchema = {
  type: 'object',
  properties: {
    whereRules: whereRulesSchema,
    orderBy: orderBySchema,
    page: pageSchema,
  },

  required: ['whereRules', 'page'],
  additionalProperties: false,
} as const


export const successResponseSchema = {
  title: 'Comments success response',
  description: 'Array of Comment objects with applied pagination, sorting, filtration',
  type: 'object',
  properties: {
    totalRecords: {
      description: 'How many records match the filtration criteria. Used to determine total number of pages.',
      type: 'integer',
      min: 0,
      max: 1_000_000,
      example: 731,
    },

    records: {
      description: 'Array of Comment objects',
      type: 'array',
      items: commentSchema,
    },
  },

  required: ['totalRecords', 'records'],
  additionalProperties: false,
} as const


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Get All Comments',
    description: 'Return multiple Comments by using pagination, sorting, filtration',
    tags: ['Comment'],

    querystring: querystringSchema,

    response: {
      200: successResponseSchema,
      400: badRequestErrorSchema,
    },
  },
}

